import * as THREE from '../libraries/three/build/three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2,2,2);
camera.lookAt(new THREE.Vector3(0,0,0));

const renderer = new THREE.WebGLRenderer( {
    canvas: document.querySelector('#dodecahedron')
});

renderer.setSize(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

const geometry = new THREE.DodecahedronGeometry(0.75, 0);

const edges = new THREE.EdgesGeometry(geometry);
const dodecahedron = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xff0000 } ) );
scene.add(dodecahedron);

dodecahedron.rotation.x = -0.1;
dodecahedron.rotation.y = -0.2;
dodecahedron.rotation.z = 0.2;

dodecahedron.position.x = 1.8;
dodecahedron.position.y = 0;
dodecahedron.position.z = -1.8;

scene.add(dodecahedron);

var i = 0;

function rotate() {
    requestAnimationFrame(rotate);
    dodecahedron.rotation.x += 0.004;
    dodecahedron.rotation.y -= 0.0025;
    dodecahedron.rotation.z -= 0.0001;
    renderer.render(scene, camera);
}

rotate();
