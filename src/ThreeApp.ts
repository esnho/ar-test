import { createRenderer } from "./functions/createRenderer";
import { createCanvas } from "./functions/createCanvas";
import { ACESFilmicToneMapping, Color, MeshStandardMaterial, OrthographicCamera, Scene } from "three";
import { renderApp, updatable } from "./functions/renderApp";
import { OrbitControls, USDZExporter } from "three-stdlib";
import { loadFont, createText } from "./functions/text";
import { loadEnvMap } from "./functions/loadEnvMap";
import { updateCameraByBoundingSphere } from "./functions/updateCameraByBoundingSphere";

export let pixelRatio = Math.min(window.devicePixelRatio, 2);

export const init = ({target}: {target: HTMLElement}) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const testo = urlParams.get('n') || 'TEST';
  const canvas = createCanvas(target);
  const renderer = createRenderer(canvas, pixelRatio);
  const scene = new Scene();
  scene.background = new Color(0x00aaee);

  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 2;

  const updatables: updatable[] = [];

  const zoomRatio = 50;
  const camera = new OrthographicCamera(
    -1 * zoomRatio, // left
     1 * zoomRatio, // right
     1 * zoomRatio, // top
    -1 * zoomRatio, // bottom
     .1, // near,
     1000000, // far
  );
  const controls = new OrbitControls( camera, renderer.domElement );
  controls.enableDamping = true;
  controls.maxZoom = 3
  controls.minZoom = .5
  controls.maxPolarAngle = 1.4
  controls.minPolarAngle = .54
  controls.autoRotate = true;
  controls.autoRotateSpeed = .4;
  camera.position.set( 2000, 700, 1000 );
  updatables.push(controls);

  (window as any).scene = scene;
  (window as any).camera = camera;

  requestAnimationFrame((time) => {
    renderApp({
      time,
      app: {
        renderer,
        camera,
        scene,
        updatables,
      },
    });
  });

  loadFont({
    fontName: 'helvetiker',
    fontWeight: 'bold'
  })
  .then((font) => {
    const text = createText({
      text: testo,
      font,
    });

    updateCameraByBoundingSphere(text.geometry, camera);

    scene.add(text);

    return Promise.all([
      loadEnvMap(renderer, 'gym_entrance_1k'),
    ]).then((maps) => {
      (text.material as MeshStandardMaterial).envMap = maps[0];
      (text.material as MeshStandardMaterial).envMapIntensity = .5;
    })
    .catch(e => window.alert('Failed to assign env map to Text' + JSON.stringify(e)))
  })
  .catch(e => window.alert('Failed to create Text' + JSON.stringify(e)))
  .then(() => {
    // TODO: add AR
    // https://github.com/mrdoob/three.js/blob/master/examples/misc_exporter_usdz.html
    const exporter = new USDZExporter();
    exporter.parse( scene.getObjectByName('text')! )
    .then((arraybuffer) => {
      const blob = new Blob( [ arraybuffer ], { type: 'application/octet-stream' } );
      const link = document.getElementById( 'link' ) as HTMLAnchorElement;
			link.href = URL.createObjectURL( blob );
    })
  })
  .catch(e => window.alert('Failed to create AR scene' + JSON.stringify(e)))
};
