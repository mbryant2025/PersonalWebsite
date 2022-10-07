import * as THREE from '../libraries/three/build/three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2,2,2);
camera.lookAt(new THREE.Vector3(0,0,0));

const renderer = new THREE.WebGLRenderer( {
    canvas: document.querySelector('#tetrahedron')
});

renderer.setSize(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

const geometry = new THREE.TetrahedronGeometry(1, 0);

const edges = new THREE.EdgesGeometry(geometry);
const tetrahedron = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x00ff00 } ) );
scene.add(tetrahedron);

tetrahedron.rotation.x = -0.1;
tetrahedron.rotation.y = -0.2;
tetrahedron.rotation.z = 0.2;

tetrahedron.position.x = 1.8;
tetrahedron.position.y = 0;
tetrahedron.position.z = -1.8;

scene.add(tetrahedron);

var i = 0;

function rotate() {
    requestAnimationFrame(rotate);
    tetrahedron.rotation.x += 0.004;
    tetrahedron.rotation.y -= 0.0025;
    tetrahedron.rotation.z -= 0.0001;
    renderer.render(scene, camera);
}

rotate();
