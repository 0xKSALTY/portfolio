import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { normalMap } from 'three/examples/jsm/nodes/Nodes.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import gsap from "gsap";


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

// camera movement
function moveCamera(){
	const t = document.body.getBoundingClientRect().top;
	camera.position.z = t * -0.01;
	camera.position.x = t * -0.0002;
	camera.position.y = y * -0.0002;
}

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
    var aboutMeDetails = document.getElementById('aboutMeDetails');
    var closeBtns = document.querySelectorAll('.close');

    aboutMeLink.onclick = function(event) {
        event.preventDefault();
        aboutMeDetails.innerHTML = 
            "Hello! I'm Keelan, a Cyber Security undergraduate with a passion for all things computer science. My journey into the tech world is unique, starting with a solid foundation in the military, where I served as an Air Traffic Controller for nearly six years. This experience has honed my attention to detail, discipline, and problem-solving skills, which I now channel into the field of cybersecurity and computer science.<br><br>" +
            "I am deeply fascinated by the endless possibilities within computer science and spend much of my spare time developing tools and applications using Python and C. Recently, I've began learning C++.<br><br>" +
            "Beyond programming, I enjoy participating in Capture The Flag (CTF) competitions and exploring challenges on platforms like Hack The Box, where I can put my skills to the test and continuously learn new techniques. My interests also extend to web development, where I dabble in both front-end and back-end technologies.<br><br>" +
            "As I transition from my military career to fully immerse myself in the world of computer science, I am eager to apply my skills and knowledge to real-world challenges, collaborate with like-minded individuals, and contribute to the ever-evolving tech landscape. Thank you for visiting my portfolio, and I look forward to connecting with you!";

        aboutMePopup.classList.remove('hidden');
        aboutMePopup.classList.add('opacity-100');
        aboutMePopup.querySelector('.popup-content').classList.add('scale-100');
    }

    closeBtns.forEach(function(btn) {
        btn.onclick = function() {
            aboutMePopup.classList.remove('opacity-100');
            aboutMePopup.querySelector('.popup-content').classList.remove('scale-100');
            setTimeout(function() {
                aboutMePopup.classList.add('hidden');
            }, 300);
        }
    });

    window.onclick = function(event) {
        if (event.target == aboutMePopup) {
            aboutMePopup.classList.remove('opacity-100');
            aboutMePopup.querySelector('.popup-content').classList.remove('scale-100');
            setTimeout(function() {
                aboutMePopup.classList.add('hidden');
            }, 300);
        }
    }
});



