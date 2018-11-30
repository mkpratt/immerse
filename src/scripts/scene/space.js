import { Scene, PerspectiveCamera } from "three";

import Geometry from "./geometry";

export default class Space {
  constructor() {
    let screenWidth = window.innerWidth,
      screenHeight = window.innerHeight;
    let fov = 45,
      aspect = screenWidth / screenHeight,
      near = 0.1,
      far = 20000;

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(fov, aspect, near, far);
    //this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    this.camera.position.set(0, 0, 450);
    this.camera.lookAt(scene.position);

    this.scene.add(camera);

    this.addSkybox(Geometry.skybox);
    this.addAnomoly(Geometry.anomoly, Geometry.anomolyCamera);
  }

  addSkybox(skybox) {
    this.scene.add(skybox);
  }

  addAnomoly(anomoly, anomolyCamera) {
    this.scene.aad(anomoly);
    this.scene.add(anomolyCamera);
  }
}
