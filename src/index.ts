import { init } from "./ThreeApp";

window.onload = () => {
  init(
    {target: document.getElementById('app') as HTMLElement}
  );

  document.getElementById('loading')?.remove();
};