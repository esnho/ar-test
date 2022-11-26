import { Scene, WebGLRenderer, Camera, Object3D } from "three";
import { resizeRendererToDisplaySize } from "./resizeMethod";

export type updatable = {
  scene?: Object3D,
  update: (time: number) => void;
}

export type app = { renderer: WebGLRenderer; scene: Scene; camera: Camera; updatables: updatable[] };;

export function renderApp(p: {
  beforeRender?: (app: app) => void;
  afterRender?: (app: app) => void;
  time: number;
  app: app
}) {
  p.beforeRender && p.beforeRender(p.app);

  p.app.updatables.forEach(obj => {
    obj.update(p.time);
  })

  resizeRendererToDisplaySize(p.app.renderer);
  p.app.renderer.render(p.app.scene, p.app.camera);

  p.afterRender && p.afterRender(p.app);
  
  // loop
  requestAnimationFrame((time) => {
    renderApp({
      beforeRender: p.beforeRender,
      afterRender: p.afterRender,
      time,
      app: p.app,
    });
  });
}
