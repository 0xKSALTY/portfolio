import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { normalMap } from 'three/examples/jsm/nodes/Nodes.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ffff } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const pointLight = new THREE.PointLight(0xffffff, 100)
pointLight.position.set(5,5,5)

// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(pointLight) // add ambientLight

const gridHelper = new THREE.GridHelper(200, 50);
const lightHelper = new THREE.PointLightHelper(pointLight)

scene.add(gridHelper, lightHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff})
	const star = new THREE.Mesh( geometry, material );

	const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
	star.position.set(x, y, z);
	scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const meTexture = new THREE.TextureLoader().load('me.jpg');

/* image of me
const me = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({map: meTexture})
);
scene.add(me);

*/

const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const textureTexture = new THREE.TextureLoader().load('texture.jpg')

const moon = new THREE.Mesh(
	new THREE.SphereGeometry(3, 32, 32),
	new THREE.MeshStandardMaterial({
		map: moonTexture,
		normalMap: textureTexture
	})
);
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

function moveCamera(){
	const t = document.body.getBoundingClientRect().top;
	moon.rotation.x += 0.05;
	moon.rotation.y += 0.075;
	moon.rotation.z += 0.05;

	camera.position.z = t * -0.01;
	camera.position.x = t * -0.0002;
	camera.position.y = y * -0.0002;

}
document.body.onscroll = moveCamera



function animate() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	cube.rotation.z += 0.01;
	controls.update();

	renderer.render( scene, camera );

}