import { Vector4 } from "./vector";

let temp;
let identity;
let index;
let scalar;
let ortho;

export class Matrix4 {
  /**
   * ex:    col
   *    row 0    4    8    12
   *        1    5    9    13
   *        2    6    10   14
   *        3    7    11   15
   */
  constructor() {
    this.matrix = new Float32Array(16);
  }

  get(row, col) {
    index = col * 4 + row;
    return this.matrix[index];
  }

  set(row, col, value) {
    index = col * 4 + row;
    this.matrix[index] = value;
  }

  toBuffer() {
    return this.matrix;
  }

  static ortho(left, right, bottom, top, near, far) {
    ortho = new Matrix4();
    // set 1's
    ortho.set(0, 0, 2 / (right - left));
    ortho.set(1, 1, 2 / (top - bottom));
    ortho.set(2, 2, 2 / (near - far));

    ortho.set(0, 3, -((right + left) / (right - left)));
    ortho.set(1, 3, -((top + bottom) / (top - bottom)));
    ortho.set(2, 3, -((near + far) / (near - far)));
    ortho.set(3, 3, 1);

    // set 0's
    ortho.set(0, 1, 0);
    ortho.set(0, 2, 0);
    ortho.set(1, 0, 0);
    ortho.set(1, 2, 0);
    ortho.set(2, 0, 0);
    ortho.set(2, 1, 0);
    ortho.set(3, 0, 0);
    ortho.set(3, 1, 0);
    ortho.set(3, 2, 0);
    return ortho;
  }

  static fovPerspective(verticalFov, aspectRatio, near, far) {
    let top = Math.tan(verticalFov / 2) * near;
    let right = aspectRatio * top;

    let persp = new Matrix4();
    // set 1's
    persp.set(0, 0, near / right);
    persp.set(1, 1, near / top);
    persp.set(2, 2, (near + far) / (near - far));
    persp.set(3, 2, -1);
    persp.set(2, 3, (2 * (near * far)) / (near - far));

    persp.set(0, 3, 0);
    persp.set(1, 3, 0);
    persp.set(3, 3, 0);

    // set 0's
    persp.set(0, 1, 0);
    persp.set(0, 2, 0);
    persp.set(1, 0, 0);
    persp.set(1, 2, 0);
    persp.set(2, 0, 0);
    persp.set(2, 1, 0);
    persp.set(3, 0, 0);
    persp.set(3, 1, 0);
    return persp;
  }

  static identity() {
    identity = new Matrix4();
    // set 1's
    identity.set(0, 0, 1);
    identity.set(1, 1, 1);
    identity.set(2, 2, 1);
    identity.set(3, 3, 1);

    // set 0's
    identity.set(0, 1, 0);
    identity.set(0, 2, 0);
    identity.set(0, 3, 0);
    identity.set(1, 0, 0);
    identity.set(1, 2, 0);
    identity.set(1, 3, 0);
    identity.set(2, 0, 0);
    identity.set(2, 1, 0);
    identity.set(2, 3, 0);
    identity.set(3, 0, 0);
    identity.set(3, 1, 0);
    identity.set(3, 2, 0);
    return identity;
  }

  static scale(xFactor, yFactor, zFactor) {
    // set factors
    scalar = new Matrix4();
    scalar.set(0, 0, xFactor);
    scalar.set(1, 1, yFactor);
    scalar.set(2, 2, zFactor);
    scalar.set(3, 3, 1);

    // set 0's
    scalar.set(0, 1, 0);
    scalar.set(0, 2, 0);
    scalar.set(0, 3, 0);
    scalar.set(1, 0, 0);
    scalar.set(1, 2, 0);
    scalar.set(1, 3, 0);
    scalar.set(2, 0, 0);
    scalar.set(2, 1, 0);
    scalar.set(2, 3, 0);
    scalar.set(3, 0, 0);
    scalar.set(3, 1, 0);
    scalar.set(3, 2, 0);
    return scalar;
  }

  static translate(xOffset, yOffset, zOffset) {
    temp = new Matrix4();

    // identity
    temp.set(0, 0, 1);
    temp.set(1, 1, 1);
    temp.set(2, 2, 1);
    temp.set(3, 3, 1);

    // offsets
    temp.set(0, 3, xOffset);
    temp.set(1, 3, yOffset);
    temp.set(2, 3, zOffset);

    // 0's
    temp.set(0, 1, 0);
    temp.set(0, 2, 0);
    temp.set(1, 0, 0);
    temp.set(1, 2, 0);
    temp.set(2, 0, 0);
    temp.set(2, 1, 0);
    temp.set(3, 0, 0);
    temp.set(3, 1, 0);
    temp.set(3, 2, 0);

    return temp;
  }

  static rotateX(degrees) {
    let temp = new Matrix4();
    let angle = degrees * (Math.PI / 180);

    // set identity
    temp.set(0, 0, 1);
    temp.set(3, 3, 1);

    // set sin & cos
    temp.set(1, 1, Math.cos(angle));
    temp.set(1, 2, Math.sin(angle) * -1);
    temp.set(2, 1, Math.sin(angle));
    temp.set(2, 2, Math.cos(angle));

    // set 0's
    temp.set(0, 1, 0);
    temp.set(0, 2, 0);
    temp.set(0, 3, 0);
    temp.set(1, 0, 0);
    temp.set(1, 3, 0);
    temp.set(2, 0, 0);
    temp.set(2, 3, 0);
    temp.set(3, 0, 0);
    temp.set(3, 1, 0);
    temp.set(3, 2, 0);

    return temp;
  }

  static rotateY(degrees) {
    let temp = new Matrix4();
    let angle = degrees * (Math.PI / 180);

    // set identity
    temp.set(1, 1, 1);
    temp.set(3, 3, 1);

    // set sin & cos
    temp.set(0, 0, Math.cos(angle));
    temp.set(0, 2, Math.sin(angle) * -1);
    temp.set(2, 0, Math.sin(angle));
    temp.set(2, 2, Math.cos(angle));

    // set 0's
    temp.set(0, 1, 0);
    temp.set(0, 3, 0);
    temp.set(1, 0, 0);
    temp.set(1, 2, 0);
    temp.set(1, 3, 0);
    temp.set(2, 1, 0);
    temp.set(2, 3, 0);
    temp.set(3, 0, 0);
    temp.set(3, 1, 0);
    temp.set(3, 2, 0);

    return temp;
  }

  static rotateZ(degrees) {
    let temp = new Matrix4();
    let angle = degrees * (Math.PI / 180);

    // set identity
    temp.set(2, 2, 1);
    temp.set(3, 3, 1);

    // set sin & cos
    temp.set(0, 0, Math.cos(angle));
    temp.set(0, 1, Math.sin(angle) * -1);
    temp.set(1, 0, Math.sin(angle));
    temp.set(1, 1, Math.cos(angle));

    // set 0's
    temp.set(0, 2, 0);
    temp.set(0, 3, 0);
    temp.set(1, 2, 0);
    temp.set(1, 3, 0);
    temp.set(2, 0, 0);
    temp.set(2, 1, 0);
    temp.set(2, 3, 0);
    temp.set(3, 0, 0);
    temp.set(3, 1, 0);
    temp.set(3, 2, 0);

    return temp;
  }

  multiplyVector(otherVector) {
    let temp = new Vector4();

    temp.set(
      0,
      this.matrix[0] * otherVector.get(0) +
        this.matrix[4] * otherVector.get(1) +
        this.matrix[8] * otherVector.get(2) +
        this.matrix[12] * otherVector.get(3)
    );
    temp.set(
      1,
      this.matrix[1] * otherVector.get(0) +
        this.matrix[5] * otherVector.get(1) +
        this.matrix[9] * otherVector.get(2) +
        this.matrix[13] * otherVector.get(3)
    );
    temp.set(
      2,
      this.matrix[2] * otherVector.get(0) +
        this.matrix[6] * otherVector.get(1) +
        this.matrix[10] * otherVector.get(2) +
        this.matrix[14] * otherVector.get(3)
    );
    temp.set(
      3,
      this.matrix[3] * otherVector.get(0) +
        this.matrix[7] * otherVector.get(1) +
        this.matrix[11] * otherVector.get(2) +
        this.matrix[15] * otherVector.get(3)
    );
    return temp;
  }

  multiplyMatrix(otherMatrix) {
    let temp = new Matrix4();
    // row 0
    temp.set(
      0,
      0,
      this.matrix[0] * otherMatrix.get(0, 0) +
        this.matrix[4] * otherMatrix.get(1, 0) +
        this.matrix[8] * otherMatrix.get(2, 0) +
        this.matrix[12] * otherMatrix.get(3, 0)
    );
    temp.set(
      0,
      1,
      this.matrix[0] * otherMatrix.get(0, 1) +
        this.matrix[4] * otherMatrix.get(1, 1) +
        this.matrix[8] * otherMatrix.get(2, 1) +
        this.matrix[12] * otherMatrix.get(3, 1)
    );
    temp.set(
      0,
      2,
      this.matrix[0] * otherMatrix.get(0, 2) +
        this.matrix[4] * otherMatrix.get(1, 2) +
        this.matrix[8] * otherMatrix.get(2, 2) +
        this.matrix[12] * otherMatrix.get(3, 2)
    );
    temp.set(
      0,
      3,
      this.matrix[0] * otherMatrix.get(0, 3) +
        this.matrix[4] * otherMatrix.get(1, 3) +
        this.matrix[8] * otherMatrix.get(2, 3) +
        this.matrix[12] * otherMatrix.get(3, 3)
    );

    // row 1
    temp.set(
      1,
      0,
      this.matrix[1] * otherMatrix.get(0, 0) +
        this.matrix[5] * otherMatrix.get(1, 0) +
        this.matrix[9] * otherMatrix.get(2, 0) +
        this.matrix[13] * otherMatrix.get(3, 0)
    );
    temp.set(
      1,
      1,
      this.matrix[1] * otherMatrix.get(0, 1) +
        this.matrix[5] * otherMatrix.get(1, 1) +
        this.matrix[9] * otherMatrix.get(2, 1) +
        this.matrix[13] * otherMatrix.get(3, 1)
    );
    temp.set(
      1,
      2,
      this.matrix[1] * otherMatrix.get(0, 2) +
        this.matrix[5] * otherMatrix.get(1, 2) +
        this.matrix[9] * otherMatrix.get(2, 2) +
        this.matrix[13] * otherMatrix.get(3, 2)
    );
    temp.set(
      1,
      3,
      this.matrix[1] * otherMatrix.get(0, 3) +
        this.matrix[5] * otherMatrix.get(1, 3) +
        this.matrix[9] * otherMatrix.get(2, 3) +
        this.matrix[13] * otherMatrix.get(3, 3)
    );

    // row 2
    temp.set(
      2,
      0,
      this.matrix[2] * otherMatrix.get(0, 0) +
        this.matrix[6] * otherMatrix.get(1, 0) +
        this.matrix[10] * otherMatrix.get(2, 0) +
        this.matrix[14] * otherMatrix.get(3, 0)
    );
    temp.set(
      2,
      1,
      this.matrix[2] * otherMatrix.get(0, 1) +
        this.matrix[6] * otherMatrix.get(1, 1) +
        this.matrix[10] * otherMatrix.get(2, 1) +
        this.matrix[14] * otherMatrix.get(3, 1)
    );
    temp.set(
      2,
      2,
      this.matrix[2] * otherMatrix.get(0, 2) +
        this.matrix[6] * otherMatrix.get(1, 2) +
        this.matrix[10] * otherMatrix.get(2, 2) +
        this.matrix[14] * otherMatrix.get(3, 2)
    );
    temp.set(
      2,
      3,
      this.matrix[2] * otherMatrix.get(0, 3) +
        this.matrix[6] * otherMatrix.get(1, 3) +
        this.matrix[10] * otherMatrix.get(2, 3) +
        this.matrix[14] * otherMatrix.get(3, 3)
    );

    // row 3
    temp.set(
      3,
      0,
      this.matrix[3] * otherMatrix.get(0, 0) +
        this.matrix[7] * otherMatrix.get(1, 0) +
        this.matrix[11] * otherMatrix.get(2, 0) +
        this.matrix[15] * otherMatrix.get(3, 0)
    );
    temp.set(
      3,
      1,
      this.matrix[3] * otherMatrix.get(0, 1) +
        this.matrix[7] * otherMatrix.get(1, 1) +
        this.matrix[11] * otherMatrix.get(2, 1) +
        this.matrix[15] * otherMatrix.get(3, 1)
    );
    temp.set(
      3,
      2,
      this.matrix[3] * otherMatrix.get(0, 2) +
        this.matrix[7] * otherMatrix.get(1, 2) +
        this.matrix[11] * otherMatrix.get(2, 2) +
        this.matrix[15] * otherMatrix.get(3, 2)
    );
    temp.set(
      3,
      3,
      this.matrix[3] * otherMatrix.get(0, 3) +
        this.matrix[7] * otherMatrix.get(1, 3) +
        this.matrix[11] * otherMatrix.get(2, 3) +
        this.matrix[15] * otherMatrix.get(3, 3)
    );

    return temp;
  }

  inverse() {
    let m = new Matrix4();

    let a0 = this.get(0, 0) * this.get(1, 1) - this.get(0, 1) * this.get(1, 0);
    let a1 = this.get(0, 0) * this.get(1, 2) - this.get(0, 2) * this.get(1, 0);
    let a2 = this.get(0, 0) * this.get(1, 3) - this.get(0, 3) * this.get(1, 0);

    let a3 = this.get(0, 1) * this.get(1, 2) - this.get(0, 2) * this.get(1, 1);
    let a4 = this.get(0, 1) * this.get(1, 3) - this.get(0, 3) * this.get(1, 1);
    let a5 = this.get(0, 2) * this.get(1, 3) - this.get(0, 3) * this.get(1, 2);

    let b0 = this.get(2, 0) * this.get(3, 1) - this.get(2, 1) * this.get(3, 0);
    let b1 = this.get(2, 0) * this.get(3, 2) - this.get(2, 2) * this.get(3, 0);
    let b2 = this.get(2, 0) * this.get(3, 3) - this.get(2, 3) * this.get(3, 0);

    let b3 = this.get(2, 1) * this.get(3, 2) - this.get(2, 2) * this.get(3, 1);
    let b4 = this.get(2, 1) * this.get(3, 3) - this.get(2, 3) * this.get(3, 1);
    let b5 = this.get(2, 2) * this.get(3, 3) - this.get(2, 3) * this.get(3, 2);

    let determinant = a0 * b5 - a1 * b4 + a2 * b3 + a3 * b2 - a4 * b1 + a5 * b0;

    if (determinant != 0) {
      let inverseDeterminant = 1 / determinant;
      m.set(
        0,
        0,
        (+this.get(1, 1) * b5 - this.get(1, 2) * b4 + this.get(1, 3) * b3) *
          inverseDeterminant
      );
      m.set(
        0,
        1,
        (-this.get(0, 1) * b5 + this.get(0, 2) * b4 - this.get(0, 3) * b3) *
          inverseDeterminant
      );
      m.set(
        0,
        2,
        (+this.get(3, 1) * a5 - this.get(3, 2) * a4 + this.get(3, 3) * a3) *
          inverseDeterminant
      );
      m.set(
        0,
        3,
        (-this.get(2, 1) * a5 + this.get(2, 2) * a4 - this.get(2, 3) * a3) *
          inverseDeterminant
      );
      m.set(
        1,
        0,
        (-this.get(1, 0) * b5 + this.get(1, 2) * b2 - this.get(1, 3) * b1) *
          inverseDeterminant
      );
      m.set(
        1,
        1,
        (+this.get(0, 0) * b5 - this.get(0, 2) * b2 + this.get(0, 3) * b1) *
          inverseDeterminant
      );
      m.set(
        1,
        2,
        (-this.get(3, 0) * a5 + this.get(3, 2) * a2 - this.get(3, 3) * a1) *
          inverseDeterminant
      );
      m.set(
        1,
        3,
        (+this.get(2, 0) * a5 - this.get(2, 2) * a2 + this.get(2, 3) * a1) *
          inverseDeterminant
      );
      m.set(
        2,
        0,
        (+this.get(1, 0) * b4 - this.get(1, 1) * b2 + this.get(1, 3) * b0) *
          inverseDeterminant
      );
      m.set(
        2,
        1,
        (-this.get(0, 0) * b4 + this.get(0, 1) * b2 - this.get(0, 3) * b0) *
          inverseDeterminant
      );
      m.set(
        2,
        2,
        (+this.get(3, 0) * a4 - this.get(3, 1) * a2 + this.get(3, 3) * a0) *
          inverseDeterminant
      );
      m.set(
        2,
        3,
        (-this.get(2, 0) * a4 + this.get(2, 1) * a2 - this.get(2, 3) * a0) *
          inverseDeterminant
      );
      m.set(
        3,
        0,
        (-this.get(1, 0) * b3 + this.get(1, 1) * b1 - this.get(1, 2) * b0) *
          inverseDeterminant
      );
      m.set(
        3,
        1,
        (+this.get(0, 0) * b3 - this.get(0, 1) * b1 + this.get(0, 2) * b0) *
          inverseDeterminant
      );
      m.set(
        3,
        2,
        (-this.get(3, 0) * a3 + this.get(3, 1) * a1 - this.get(3, 2) * a0) *
          inverseDeterminant
      );
      m.set(
        3,
        3,
        (+this.get(2, 0) * a3 - this.get(2, 1) * a1 + this.get(2, 2) * a0) *
          inverseDeterminant
      );
    } else {
      throw Error("Matrix is singular.");
    }

    return m;
  }

  static rotateAroundAxis(axis, radians) {
    //request animation frame
    let rotate = new Matrix4();
    console.log(axis)
    // let radians = degrees * (Math.PI / 180);
    let s = Math.sin(radians);
    let c = Math.cos(radians);
    let d = 1 - c;
    // set 1's
    rotate.set(0, 0, d * axis.get(0) * axis.get(0) + c);
    rotate.set(1, 1, d * axis.get(1) * axis.get(1) + c);
    rotate.set(2, 2, d * axis.get(2) * axis.get(2) + c);
    rotate.set(3, 3, 1);

    // set 0's
    rotate.set(0, 1, d * axis.get(0) * axis.get(1) - s * axis.get(2));
    rotate.set(0, 2, d * axis.get(0) * axis.get(2) + s * axis.get(1));
    rotate.set(0, 3, 0);
    rotate.set(1, 0, d * axis.get(1) * axis.get(0) + s * axis.get(2));
    rotate.set(1, 2, d * axis.get(1) * axis.get(2) - s * axis.get(0));
    rotate.set(1, 3, 0);
    rotate.set(2, 0, d * axis.get(2) * axis.get(0) - s * axis.get(1));
    rotate.set(2, 1, d * axis.get(2) * axis.get(1) + s * axis.get(0));
    rotate.set(2, 3, 0);
    rotate.set(3, 0, 0);
    rotate.set(3, 1, 0);
    rotate.set(3, 2, 0);
    return rotate;
  }
}

/**
 * ex:    col
 *    row 0    4    8    12
 *        1    5    9    13
 *        2    6    10   14
 *        3    7    11   15
 */
