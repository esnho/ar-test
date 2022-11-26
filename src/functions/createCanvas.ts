export function createCanvas(target: HTMLElement): HTMLCanvasElement {

  const c = document.createElement('canvas');
  c.style.width = '100%';
  c.style.height = '100%';

  target.append(c);

  return c;

}
