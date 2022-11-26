import { WebGLRenderer } from "three";

export function createRenderer(canvas: HTMLCanvasElement, pixelRatio: number): WebGLRenderer {

  const renderer = new WebGLRenderer({ canvas, preserveDrawingBuffer: true });
  renderer.setPixelRatio(pixelRatio);
  renderer.autoClearColor = true;

  (window as any).renderer = renderer;

  return renderer;

}
