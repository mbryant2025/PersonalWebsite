import * as THREE from '../libraries/three/build/three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2,2,2);
camera.lookAt(new THREE.Vector3(0,0,0));

const renderer = new THREE.WebGLRenderer( {
    canvas: document.querySelector('#bg')
});

renderer.setSize(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

const geometry = new THREE.BoxGeometry(1, 1, 1);

const edges = new THREE.EdgesGeometry(geometry);
const cube = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x00ff00 } ) );
scene.add(cube);

cube.rotation.x = -0.1;
cube.rotation.y = -0.2;
cube.rotation.z = 0.2;

cube.position.x = 1.8;
cube.position.y = 0;
cube.position.z = -1.8;


scene.add(cube);


var i = 0;

function rotate() {
    requestAnimationFrame(rotate);
    cube.rotation.x += 0.004;
    cube.rotation.y -= 0.0025;
    cube.rotation.z -= 0.0001;
    renderer.render(scene, camera);
}

rotate();
