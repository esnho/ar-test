import { BufferGeometry, OrthographicCamera } from "three";

export function updateCameraByBoundingSphere(geometry: BufferGeometry, camera: OrthographicCamera) {

  geometry.computeBoundingSphere();

  const cameraFrustum = Math.min(
    Math.max(
      geometry.boundingSphere!.radius * 1.6,
      180
    ),
    250
  );

  camera.left = -cameraFrustum;
  camera.right = cameraFrustum;
  camera.top = cameraFrustum;
  camera.bottom = -cameraFrustum;

  camera.updateProjectionMatrix();

}
