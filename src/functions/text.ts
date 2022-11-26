import { Mesh, MeshStandardMaterial } from "three";
import { TextGeometry, FontLoader, Font } from "three-stdlib";

export function loadFont({
  fontName, fontWeight
}: { fontName: string; fontWeight: string; }): Promise<Font> {
  return new Promise<Font>((resolve, error) => {
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/' + fontName + '_' + fontWeight + '.typeface.json', function (response) {
      resolve(response);
      //refreshText();
    }, undefined, error);
  });
}
export function createText({ text, font, size = 70, height = 20, curveSegments = 12, bevelThickness = 2, bevelSize = 2.5, bevelEnabled = true }: { text: string; font: Font; size?: number; height?: number; curveSegments?: number; bevelThickness?: number; bevelSize?: number; bevelEnabled?: boolean; }) {

  const materials = new MeshStandardMaterial({
    color: 0xFFFFFF,
    metalness: 1,
    roughness: .1,
  });

  materials.metalness = 1
  materials.roughness = .1

  const textGeo = new TextGeometry(text, {
    font: font,

    size: size,
    height: height,
    curveSegments: curveSegments,

    bevelThickness: bevelThickness,
    bevelSize: bevelSize,
    bevelEnabled: bevelEnabled,
    bevelOffset: .2,
  });

  textGeo.computeBoundingBox();

  const centerOffset = -0.5 * (textGeo.boundingBox!.max.x - textGeo.boundingBox!.min.x);

  const textMesh1 = new Mesh(textGeo, materials);

  textMesh1.position.x = centerOffset;
  textMesh1.position.y = 0;
  textMesh1.position.z = 0;

  textMesh1.rotation.x = Math.PI * -.25;
  textMesh1.rotation.y = Math.PI * 0;

  /* const group = new Group();
  group.add(textMesh1); */
  textMesh1.name = "text";

  return textMesh1;

  /* if ( mirror ) {
 
    textMesh2 = new THREE.Mesh( textGeo, materials );
 
    textMesh2.position.x = centerOffset;
    textMesh2.position.y = - hover;
    textMesh2.position.z = height;
 
    textMesh2.rotation.x = Math.PI;
    textMesh2.rotation.y = Math.PI * 2;
 
    group.add( textMesh2 );
 
  } */
}
