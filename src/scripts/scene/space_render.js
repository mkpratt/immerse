import { WebGLRenderer } from "three";

import Space from "./space";

export default class SpaceRender {
  constructor() {
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(screenWidth, screenHeight);

    this.domElement = this.renderer.domElement;
  }

  initRender() {
    document.body
      .querySelector("#canvasContainer")
      .appendChild(this.domElement);
  }

  initSpace() {
    this.space = new Space();
  }

  render() {
    this.Space.Geometry.anomolyGeometry.visible = false;
    this.Space.Geometry.anomolyCamera.updateCubeMap(this.renderer, Space.scene);
    this.Space.Geometry.anomolyGeometry.visible = true;

    this.renderer.render(Space.scene, Space.camera);
  }

  animate() {
    requestAnimationFrame(animate);
    this.render();
  }
}
