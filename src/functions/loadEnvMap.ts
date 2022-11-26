import { HalfFloatType, PMREMGenerator, WebGLRenderer } from "three";
import { RGBELoader } from "three-stdlib";

export function loadEnvMap(renderer: WebGLRenderer, map: string = 'snowy_field_1k') {

  return import(`../media/${map}.hdr`)
  .then((map) => {

    return new RGBELoader()
      .setDataType(HalfFloatType)
      .loadAsync(map.default);

  }).then((texture) => {

    const pmrem = new PMREMGenerator(renderer);
    return pmrem.fromEquirectangular(texture).texture;

  });

}
