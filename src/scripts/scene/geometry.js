import {
  BoxGeometry,
  SphereGeometry,
  MeshBasicMaterial,
  MeshFaceMaterial,
  ImageUtils,
  BackSide,
  Mesh,
  CubeCamera,
  Vector3
} from "three";

export default class Geometry {
  constructor(skyboxSize = 5000, anomolySize = 100) {
    this.skyboxSize = skyboxSize;
    this.anomolySize = anomolySize;

    this.center = new Vector3(0, 0, 0);

    this.initSkybox(this.skyboxSize);
    this.initAnomoly(this.anomolySize);
  }

  initSkybox() {
    let directions = ["right", "left", "top", "down", "back", "front"];

    let skyboxMaterialArr = [];
    directions.forEach(dir => {
      skyboxMaterialArr.push(
        new MeshBasicMaterial({
          map: ImageUtils.loadTexture(`~/assets/images/skybox/${dir}.png`),
          side: BackSide
        })
      );
    });

    this.skyboxGeometry = new BoxGeometry(
      this.skyboxSize,
      this.skyboxSize,
      this.skyboxSize
    );
    this.skyboxMaterial = new MeshFaceMaterial(skyboxMaterialArr);

    this.skybox = new Mesh(this.skyboxGeometry, this.skyboxMaterial);

    this.skybox.eulerOrder = "XYZ";
    this.skybox.renderDepth = 1000.0;
  }

  initAnomoly() {
    this.anomolyGeometry = new SphereGeometry(this.anomolySize, 60, 40);
    this.anomolyCamera = new CubeCamera(0.1, 6000, 512);
    this.anomolyMeterial = new MeshBasicMaterial({
      envMap: this.anomolyCamera.renderTarget
    });

    this.anomoly = new Mesh(this.anomolyGeometry, this.anomolyMeterial);
    this.anomoly.position.set(this.center);
    this.anomolyCamera.position.set(this.center);
  }
}
