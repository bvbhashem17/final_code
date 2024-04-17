import * as THREE from 'three'

//////////////////////////////////////////////////////////////////////////////////////////
export class LightManager{
  constructor(scene){
    this.scene=scene
  }
  addLights(choose){
    const {type,params}=choose;
    switch(type){
      case'ambient':
      this.addAmbient(params);
      break;
      case 'directional':
        this.addDirectional(params);
        break;
      case 'point':
        this.addPoint(params);
        break;
      case 'spot':
        this.addSpot(params);
        break;
      case 'rect':
        this.addRectAreaLight(params);
        break;

    }
  }

  addAmbient(params){
    const {colorn,intensityn}=params;
    const amb = new THREE.AmbientLight(colorn,intensityn);
    this.scene.add(amb);

  }

  addDirectional(params){
    const {colorn,intensityn,position}=params;
    const dire=new THREE.DirectionalLight(colorn,intensityn);
    dire.position.set(position.x,position.y,position.z).normalize();
    this.scene.add(dire);

  }
  addPoint(params){
    const {color,intensity,position,distance}=params;
    const poi=new THREE.PointLight(color,intensity,distance);
    poi.position.set(position.x,position.y,position.z).normalize();
    this.scene.add(poi);
  }

  addSpot(params){
    const {color,intensity,position,targetPosition,angle,penumbra,distance}=params;
    const spo = new THREE.SpotLight(color,intensity);
    spo.position.set(position.x,position.y,position.z).normalize();
    spo.target.position.set(targetPosition.x,targetPosition.y,targetPosition.z);
    spo.angle=angle;
    spo.penumbra=penumbra;
    spo.distance=distance;
    this.scene.add(spo);
  }
  addRectAreaLight(params){
    const {color,intensity,width,height,position,normal}=params;
    const area= new THREE.RectAreaLight(color,intensity,width,height);
    area.position.set(position.x,position.y,position.z);
    area.lookAt(normal.x,normal.y,normal.z);
    this.scene.add(area);
  }

}
