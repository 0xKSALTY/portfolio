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
const geometry = new THREE.TorusKnotGeometry( 1.5, 0.5, 200, 16 );
const material = new THREE.MeshStandardMaterial( { color: 0xC0C0C0, roughness: 0, metalness: 0 })
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
camera.position.z = 10;

// lighting, pointlight chosen
const pointLight = new THREE.SpotLight(0xff0000, 100)
pointLight.position.set(5,5,10)
const pointLight2 = new THREE.PointLight(0x00dd00, 100)
pointLight2.position.set(-5, 3, 3)
const pointLight3 = new THREE.PointLight(0x0000ff, 100)
pointLight3.position.set(-7, 8, 3)
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(pointLight, ambientLight, pointLight2, pointLight3) // add ambientLight

// gridhelpers
const gridHelper = new THREE.GridHelper(200, 50);
const lightHelper = new THREE.PointLightHelper(pointLight3)
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
	const material = new THREE.MeshStandardMaterial( { color: 0xbbbbbb, roughness: 0, metalness: 0 })
	const star = new THREE.Mesh( geometry, material );

	const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
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

// camera movement
function moveCamera(){
	const t = document.body.getBoundingClientRect().top;
	camera.position.z = t * -0.01;
	camera.position.x = t * -0.0002;
	camera.position.y = y * -0.0002;
}
//document.body.onscroll = moveCamera

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


// About Me. POPUP
document.addEventListener('DOMContentLoaded', function() {

    var aboutMeLink = document.getElementById('aboutMeLink');
    var aboutMePopup = document.getElementById('aboutMePopup');
    var closeBtn = document.getElementsByClassName('close')[0];
    var aboutMeDetails = document.getElementById('aboutMeDetails');

    aboutMeLink.onclick = function(event) {
        event.preventDefault();
        aboutMeDetails.textContent = "Hello! I'm Keelan, a Cyber Security undergrad with a passion for all things computer science! I have a military background and have been an Airtraffic Controller for nearly 6 years. I am now looking to follow my passion with all things computer science. I often use my spare time developing tools using Python and C, I have also just started to learn C++. I love the occasional CTF and playing with boxes within Hack The Box! I also dabble in some front-end and back-end Web Dev!";
        aboutMePopup.style.display = 'block';
    }

    closeBtn.onclick = function() {
        aboutMePopup.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == aboutMePopup) {
            aboutMePopup.style.display = 'none';
        }
    }
});

function toggleDropdown() {
    var dropdownMenu = document.querySelector('.dropdown-menu');
    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
    } else {
        dropdownMenu.style.display = 'block';
    }
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdown-toggle')) {
        var dropdownMenus = document.querySelectorAll('.dropdown-menu');
        dropdownMenus.forEach(function(menu) {
            if (menu.style.display === 'block') {
                menu.style.display = 'none';
            }
        });
    }
}
