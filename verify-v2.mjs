import fs from 'node:fs';
import assert from 'node:assert/strict';
const local=s=>s.replace("from 'three'","from './dist/vendor/three.module.js'");
fs.writeFileSync('.check-model.mjs',local(fs.readFileSync('dist/model.js','utf8')));
fs.writeFileSync('.check-base.mjs',local(fs.readFileSync('dist/assembly-v2.js','utf8')).replace("'./model.js'","'./.check-model.mjs'"));
fs.writeFileSync('.check-assembly.mjs',local(fs.readFileSync('dist/assembly-v3.js','utf8')).replace("'./model.js'","'./.check-model.mjs'").replace("'./assembly-v2.js'","'./.check-base.mjs'"));
const {createModel,MODEL_RATIO}=await import('./.check-assembly.mjs');
const {assembly,parts,motions,count,stages,layout}=createModel();
assert.equal(parts.size,41);let vertices=0,triangles=0;
for(const p of parts.values()){assert.ok(p.meshes.length,p.id);for(const mesh of p.meshes){const a=mesh.geometry.attributes.position;for(const x of a.array)assert.ok(Number.isFinite(x),p.id+' nonfinite');vertices+=a.count;triangles+=(mesh.geometry.index?.count||a.count)/3;assert.equal(mesh.userData.part,p.id);}}
const wrap=a=>Math.atan2(Math.sin(a),Math.cos(a));
for(const s of stages){assert.equal(s.nr,s.ns+2*s.np);assert.ok(Number.isInteger(s.mounting_integer));assert.ok(s.sunBore<s.sunR-1.25*s.module);for(let i=0;i<3;i++){const a=i*2*Math.PI/3,planetPhase=(1-s.nr/s.np)*a-Math.PI/s.np;const ringMesh=wrap(s.np*(a-planetPhase)-s.nr*a-Math.PI);const sunMesh=wrap(s.ns*(a-s.sunPhase)+s.np*(a+Math.PI-planetPhase)-Math.PI);assert.ok(Math.abs(ringMesh)<1e-9);assert.ok(Math.abs(sunMesh)<1e-9);}const absolutePlanet=s.planetRelative+s.output;assert.ok(Math.abs(s.output*s.orbitR+absolutePlanet*s.planetR)<1e-12,'fixed-ring pitch velocity');}
assert.ok(Math.abs(MODEL_RATIO-32.608695652173914)<1e-10);assert.ok(Math.abs((MODEL_RATIO/32.62-1)*100)<.035);
assert.ok(layout.spindle-layout.spindleLength/2>layout.high+.102/2,'spindle tube stops before high');for(const z of layout.bearings)assert.ok(z>layout.spindle-layout.spindleLength/2&&z<layout.spindle+layout.spindleLength/2,'bearing on spindle');
const THREE=await import('./dist/vendor/three.module.js');assembly.updateMatrixWorld(true);
function radial(mesh){const attr=mesh.geometry.attributes.position,v=new THREE.Vector3();let min=Infinity,max=0;for(let i=0;i<attr.count;i++){v.fromBufferAttribute(attr,i).applyMatrix4(mesh.matrixWorld);const r=Math.hypot(v.x,v.y);min=Math.min(min,r);max=Math.max(max,r);}return {min,max};}
const cageMax=Math.max(...parts.get('cage').meshes.map(m=>radial(m).max)),toothMin=Math.min(...parts.get('stator').meshes.slice(1,49).map(m=>radial(m).min));assert.ok(toothMin-cageMax>.003,'actual generated air gap');
const shaftRad=radial(parts.get('shaft').meshes[0]),highBore=radial(parts.get('sunHigh').meshes[0]).min,lowBore=radial(parts.get('sunLow').meshes[0]).min,inter=radial(parts.get('intermediate').meshes[0]);assert.ok(shaftRad.max<highBore);assert.ok(shaftRad.max<inter.min);assert.ok(inter.max<lowBore);
const serviceBox=new THREE.Box3().setFromObject(parts.get('serviceBrake').group),serviceMin=Math.min(...parts.get('serviceBrake').meshes.map(m=>radial(m).min));const supportHere=parts.get('spindle').meshes.filter(m=>{const b=new THREE.Box3().setFromObject(m);return b.max.z>=serviceBox.min.z&&b.min.z<=serviceBox.max.z;});assert.ok(Math.max(...supportHere.map(m=>radial(m).max))<serviceMin,'actual brake bore clears support');
const seatGap=radial(parts.get('bearingSeats').meshes[1]).min-radial(parts.get('hubBearing').meshes[0]).max;assert.ok(seatGap>=0&&seatGap<.0011,'seat connects bearing with nominal clearance');
assert.ok(motions.some(m=>m.object.parent===parts.get('parkingBrake').group&&m.ratio===1));assert.ok(motions.some(m=>m.object.parent===parts.get('serviceBrake').group&&m.ratio===1/MODEL_RATIO));assert.ok(!parts.get('tires').visible);
const html=fs.readFileSync('dist/index.html','utf8');for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)){if(m[1].startsWith('http')||m[1]==='./')continue;assert.ok(fs.existsSync('dist/'+m[1]),m[1]);}
assert.ok(!html.includes('16/36/88'));assert.ok(!html.includes('32,5:1'));assert.ok(fs.existsSync('dist/assembly-v2.js'));
assert.equal(parts.get('parkingBrake').meshes.filter(m=>m.userData.role==='dry_rotating_disc').length,6);assert.equal(parts.get('parkingActuator').meshes.filter(m=>m.userData.role==='parking_spring').length,12);assert.ok(!parts.get('outerFrame').visible);const encoderBox=new THREE.Box3().setFromObject(parts.get('encoder').meshes[0]);for(const mesh of parts.get('parkingHousing').meshes){const b=new THREE.Box3().setFromObject(mesh);if(b.max.z>=encoderBox.min.z&&b.min.z<=encoderBox.max.z)assert.ok(radial(mesh).min>radial(parts.get('encoder').meshes[0]).max,'parking housing clears encoder');}
const report={revision:3,parts:parts.size,meshes:count,vertices,triangles,ratio:MODEL_RATIO,difference_percent:(MODEL_RATIO/32.62-1)*100,uniform_three_planet_phases:true,fixed_ring_pitch_velocity:true,finite_geometry:true,nominal_axial_radial_clearances:true,not_oem_validation:true};
fs.writeFileSync('dist/assets/geometry-checks.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
