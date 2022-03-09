import {Vector4, Vector3} from './vector';
import {Matrix4} from './matrix';

let mouseSphere0;
let mouseSphere;
let matrix;
let dimensions;
let isDown;
let prevMatrix;
let currMatrix;

export class Trackball {

    constructor() {
        mouseSphere0 = null;
        prevMatrix = Matrix4.identity();
        currMatrix = Matrix4.identity();
        isDown = false;
    }

    getRotation(){
        return matrix;
    }


    setViewport(width, height) {
        this.dimensions = new Vector3(width, height, 0);
    }

    start(mousePixels) {  
        mouseSphere0 = pixelToSphere(mousePixels);
    }

    drag(mousePixels) {
        mouseSphere = pixelToSphere(mousePixels);
        let dot = mouseSphere0.dot(mouseSphere);
        if (Math.abs(dot) < 1) {
            let radians = acos(dot);
            let axis = mouseSphere0.cross(mouseSphere).normalize();
            // Change to use angle and axis
            currMatrix = 
            matrix = currMatrix * prevMatrix;

        }
    }

    // End function
    end() {
        //mtrx
        prevMatrix = currMatrix;
        mouseSphere0 = null;
    }

    cancel(){
        //mtrx
        currMatrix = prevMatrix;
        mouseSphere0 = null;
    }


}

function pixelToSphere(mousePixels) {
  const mouseNorm = (mousePixels / dimensions) * 2 - 1;
  const z2 = 1 - mouseNorm.x * mouseNorm.x - mouseNorm.y * mouseNorm.y;
  mouseSphere = new Vector3(mouseNorm.x, mouseNorm.y, 0);
  if (z2 >= 0) {
    mouseSphere.z = Math.pow(z2, 0.5);
  } else {
    mouseSphere = mouseSphere.normalize();
  }
  return mouseSphere;
}

