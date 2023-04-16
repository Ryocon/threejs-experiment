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

// avatar
const ryanTexture = new THREE.TextureLoader().load('./images/rochimselfsmol.png')
const ryanTextureRound = new THREE.TextureLoader().load('./images/rochimselfsmolroundedpng.png')

const ryan = new THREE.Mesh(
    new THREE.BoxGeometry(3,4,3),
    new THREE.MeshBasicMaterial( { map: ryanTexture } )
)

scene.add(ryan)

// const ryanSphere = new THREE.Mesh(
//     new THREE.SphereGeometry( 15, 32, 16 ),
//     new THREE.MeshBasicMaterial( { map: ryanTextureRound } )
// )

// shape and materials
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 )
const material = new THREE.MeshStandardMaterial( { color: 0xe6aace } )
const torus = new THREE.Mesh( geometry, material )

scene.add(torus)

const icoGeometry = new THREE.IcosahedronGeometry(6, 0)
const icoMaterial = new THREE.MeshStandardMaterial( { color: 0x344966 } )
const icosahedron = new THREE.Mesh( icoGeometry, icoMaterial )

scene.add(icosahedron)

icosahedron.position.x = -30
icosahedron.position.y = 5



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
    // texture is currently my face
    const material = new THREE.MeshStandardMaterial( { map: ryanTextureRound } )
    const star = new THREE.Mesh( geometry, material )

    // using threejs to randomly select a point on the x y z axis using an array
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ))

    star.position.set(x, y, z)
    scene.add(star)
}
// sets the amount of stars generated
Array(300).fill().forEach(addStar)

// background image
// ! not in use
// const backgroundTexture = new THREE.TextureLoader().load('image.jpg')
// scene.background = backgroundTexture

// animation loop function
function animate() {
    requestAnimationFrame( animate )

    torus.rotation.x += 0.01
    torus.rotation.y += 0.005
    torus.rotation.z += 0.01
    icosahedron.rotation.x += 0.003
    icosahedron.rotation.y += 0.005
    icosahedron.rotation.z += 0.004

    ryan.rotation.y += 0.005

    // updates the orbit
    controls.update()

    renderer.render( scene, camera )
}

animate()

// function moveCamera() {

//     const t = document.body.getBoundingClientRect().top

//     camera.position.x = t * +0.1
//     // camera.position.y = t * +0.09
//     // camera.position.z = t * 0.002


// }

// document.body.onscroll = moveCamera