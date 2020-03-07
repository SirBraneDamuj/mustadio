/* eslint-disable */

$(() => {
  $('[data-toggle="tooltip"]').tooltip();

  $('.render-button').on('click', () => {
    $('#map-renderer-modal').modal('show');
  });

  const domElement = $('#map-renderer-target')[0];
  const myScene = new THREE.Scene();
  window.scene = myScene;
  const width = 640;
  const height = 480;
  const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
  window.camera = camera;
  camera.zoom = 75;
  camera.position.set(-2.5, 1.5, -2.0);
  camera.rotation.set(-2.5, -1, -2.5);
  camera.updateProjectionMatrix();
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(width, height);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setClearColor(0xffffff, 1);
  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;
  domElement.append(renderer.domElement);
  const loader = new THREE.GLTFLoader();
  const controls = new THREE.OrbitControls(camera, domElement);
  // controls.screenSpacePanning = true;
  const mapNumber = `MAP${domElement.dataset.mapNumber.padStart(3, '0')}`;
  let animationId;
  function animate() {
    animationId = requestAnimationFrame(animate);
    renderer.render(myScene, camera);
  }
  
  $('#map-renderer-modal').on('shown.bs.modal', (e) => {
    loader.load(`https://mustadio-maps.s3.amazonaws.com/${mapNumber}/${mapNumber}.gltf`, (result) => {
      myScene.add.apply(myScene, result.scene.children);
      const [skirt, terrain] = myScene.children;
      terrain.scale.x = -1;
      skirt.scale.x = -1;
      skirt.material.color = new THREE.Color('black');
      const box = new THREE.Box3().setFromObject(terrain);
      const center = box.getCenter(new THREE.Vector3());
      controls.target = terrain.position.clone();

      terrain.position.x += (terrain.position.x - center.x);
      terrain.position.y += (terrain.position.y - center.y);
      terrain.position.z += (terrain.position.z - center.z);
      skirt.position.x += (skirt.position.x - center.x);
      skirt.position.y += (skirt.position.y - center.y);
      skirt.position.z += (skirt.position.z - center.z);
      controls.update();
      animate();
    });
  });

  $('#map-renderer-modal').on('hidden.bs.modal', (e) => {
    cancelAnimationFrame(animationId);
    myScene.remove.apply(myScene, myScene.children);
  });
});