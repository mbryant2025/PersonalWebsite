import * as THREE from '../libraries/three/build/three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,2.5,2.5);
camera.lookAt(new THREE.Vector3(0,0,0));

const renderer = new THREE.WebGLRenderer( {
    canvas: document.querySelector('#bg')
});

renderer.setSize(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
    cube.rotation.x += 0.005;
    renderer.render(scene, camera);
}

animate();
