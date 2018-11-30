let scene, camera, renderer;
let ambientLight, pointLight;
let controls;
let anomolyGeometry, anomolyCamera;
let renderScene, bloomPass, composer;

function init() { 
  scene = new THREE.Scene();
  scene.position.set(0, 0, 0)
  let anomolySize = 70;

  let screenWidth = window.innerWidth,
    screenHeight = window.innerHeight;
  let fov = 60,
    aspect = screenWidth / screenHeight,
    near = 0.1,
    far = 100000;

  let bloomParams = {
    bloomStrength: 0.24,
    bloomThreshold: 0,
    bloomRadius: 0
  };

  // Anomoly
  anomolyGeometry = new THREE.SphereGeometry(anomolySize, 60, 40);
  anomolyCamera = new THREE.CubeCamera(0.1, 6000, 512);
  anomolyMaterial = new THREE.MeshBasicMaterial({ envMap: anomolyCamera.renderTarget.texture })

  let anomoly = new THREE.Mesh(anomolyGeometry, anomolyMaterial);
  anomoly.position.set(0, 0, 0);
  anomolyCamera.position.set(0, 0, 0);

  // Scene lights
  ambientLight = new THREE.AmbientLight(0xa0a0a0);
  pointLight = new THREE.PointLight(0xffffff, 1);

  // Scene camera
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 1000);
  camera.lookAt(scene.position);
  camera.add(pointLight);

  // Scene objects
  // scene.add(ambientLight);
  scene.add(camera);
  scene.add(anomoly);
  scene.add(anomolyCamera);

  // Scene background
  new THREE.CubeTextureLoader()
    .setPath('assets/images/skybox/')
    .load(
      ['front.png', 'back.png', 'up.png', 'down.png', 'right.png', 'left.png'],
      texture => {
        scene.background = texture;
      }
    );

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(screenWidth, screenHeight);
  renderer.toneMapping = THREE.NoToneMapping; 

  let domElement = renderer.domElement;

  // Composer
  renderScene = new THREE.RenderPass(scene, camera);
  bloomPass = new THREE.UnrealBloomPass(
    new THREE.Vector2(screenWidth, screenHeight), 0.5, 0.1, 0.25
  );
  bloomPass.renderToScreen = true;
  bloomPass.threshold = bloomParams.bloomThreshold;
  bloomPass.strength = bloomParams.bloomStrength;
  bloomPass.radius = bloomParams.bloomRadius;

  composer = new THREE.EffectComposer(renderer);
  composer.setSize(screenWidth, screenHeight);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);

  // Controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.minDistance = 100;
  controls.maxDistance = 500;
  controls.maxPolarAngle = Math.PI;

  // Add renderer DOM element to canvas
  document.body.querySelector("#canvasContainer").appendChild(domElement);
}

function render() {
  anomolyCamera.update(renderer, scene);
  // camera.lookAt(scene.position);
  // renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
  composer.render();
}

document.addEventListener("DOMContentLoaded", function() {
  init();
  animate();
});

window.onresize = function () {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  camera.aspect = screenWidth/screenHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(screenWidth, screenHeight);
  composer.setSize(screenWidth, screenHeight);
};