import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// scene setup inlcudes scene, camera and renderer
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
})

renderer.setPixelRatio( window.devicePixelRatiom )
renderer.setSize( window.innerWidth, window.innerHeight )
camera.position.setZ(30)
renderer.render( scene, camera )

// shape and materials
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 )
const material = new THREE.MeshStandardMaterial( { color: 0xe6aace } )
const torus = new THREE.Mesh( geometry, material )

scene.add(torus)

// lighting
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight, ambientLight)

// lighting help tools
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

// orbit controller
const controls = new OrbitControls(camera, renderer.domElement)

// procedurally generated objects
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
    const star = new THREE.Mesh( geometry, material )

    // using threejs to randomly select a point on the x y z axis using an array
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ))

    star.position.set(x, y, z)
    scene.add(star)
}
// sets the amount of stars generated
Array(300).fill().forEach(addStar)

// animation loop function
function animate() {
    requestAnimationFrame( animate )

    torus.rotation.x += 0.01
    torus.rotation.y += 0.005
    torus.rotation.z += 0.01

    // updates the orbit
    controls.update()

    renderer.render( scene, camera )
}

animate()