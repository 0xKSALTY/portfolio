import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { normalMap } from 'three/examples/jsm/nodes/Nodes.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import gsap from "gsap"

// rendering and scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// shape, chosen cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial({ color: 0xce5d0f});
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
camera.position.z = 5;

// lighting, pointlight chosen
const pointLight = new THREE.PointLight(0xffffff, 100)
pointLight.position.set(5,5,5)
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(pointLight) // add ambientLight

// gridhelpers
const gridHelper = new THREE.GridHelper(200, 50);
const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(gridHelper, lightHelper)

// orbit controls 
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 0.2


//stars in bg
function addStar(){
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff})
	const star = new THREE.Mesh( geometry, material );

	const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
	star.position.set(x, y, z);
	scene.add(star)
}
Array(200).fill().forEach(addStar)

// space bg
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

// moon 
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

// camera movement
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

const canvas = document.querySelector(".webgl")
renderer.render(scene, camera)

// window resizing and rendering 
window.addEventListener("resize", () => {
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight
	camera.updateProjectionMatrix()
	camera.aspect = sizes.width / sizes.height
	renderer.setSize(sizes.width, sizes,height)
})

const loop = () => {
	renderer.render(scene, camera);
	window.requestAnimationFrame(loop);
}
loop()

renderer.setPixelRatio(2)

/* text on screen
const loader = new FontLoader();

loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

	const geometry = new TextGeometry( 'Hello three.js!', {
		font: font,
		size: 100,
		depth: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );
} );
*/

// animation 
function animate() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	cube.rotation.z += 0.01;
	controls.update();

	renderer.render( scene, camera );

}


// cube movement first scene animation, inc nav and title
const tl = gsap.timeline({defaults: {duration: 4}})
const nl = gsap.timeline({defaults: {duration: 2}})

tl.fromTo(cube.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo('.title', {opacity: 0}, {opacity: 1})
nl.fromTo('nav', {y:'-100%'}, {y:'0%'})

// mouse animation colour
let mouseDown = false
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))

window.addEventListener("mousemove", (e) => {
	if (mouseDown){
		rgb = [
			Math.round((e.pageX / sizes.width) * 255), 
			Math.round((e.pageY / sizes.height) * 255),
			150,
		]
		// animate colours
		let newColour = new THREE.Color('rgb(${rgb.join(",")})')
		new THREE.Color('rgb(0,100, 150)')
		gsap.to(cube.material.color, {
			r: newColour.r, 
			g: newColour.g, 
			b: newColour.b,
		})
	}
})
