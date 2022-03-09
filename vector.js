export class Vector4 {
  constructor(x, y, z, w) {
    this.coordinates = [x, y, z, w];
  }

  get(index) {
    switch (index) {
      case 0:
        return this.coordinates[0];
      case 1:
        return this.coordinates[1];
      case 2:
        return this.coordinates[2];
      case 3:
        return this.coordinates[3];
      default:
        print('Not a correct component');
    }
  }

  set(index, value) {
    switch (index) {
      case 0:
        this.coordinates[0] = value;
      case 1:
        this.coordinates[1] = value;
      case 2:
        this.coordinates[2] = value;
      case 3:
        this.coordinates[3] = value;
    }
  }
}

export class Vector3 {
  constructor(x, y, z) {
    this.coordinates = [x, y, z];
  }

  get(index) {
    switch (index) {
      case 0:
        return this.coordinates[0];
      case 1:
        return this.coordinates[1];
      case 2:
        return this.coordinates[2];
      default:
        print('Not a correct component');
    }
  }

  set(index, value) {
    switch (index) {
      case 0:
        this.coordinates[0] = value;
      case 1:
        this.coordinates[1] = value;
      case 2:
        this.coordinates[2] = value;
    }
  }

  normalize() {
    let temp = this;
    let num = this.magnitude;
    temp.set(0, this.coordinates[0] / num);
    temp.set(0, this.coordinates[1] / num);
    temp.set(0, this.coordinates[2] / num);
    return temp;
  }

  magnitude(vec) {
    return Math.sqrt(
      Math.pow(this.coordinates[0], 2),
      Math.pow(this.coordinates[1], 2),
      Math.pow(this.coordinates[2], 2)
    );
  }

  dot(vec) {
    let dotProd;
    dotProd =
      this.coordinates[0] * vec.coordinates[0] +
      this.coordinates[1] * vec.coordinates[1] +
      this.coordinates[2] * vec.coordinates[2];
    return dotProd;
  }

  cross(vec) {
    let crossProd = this;
    crossProd.set(
      0,
      this.coordinates[1] * vec.coordinates[2] +
        this.coordinates[2] * vec.coordinates[1]
    );
    crossProd.set(
      1,
      this.coordinates[2] * vec.coordinates[0] +
        this.coordinates[0] * vec.coordinates[2]
    );

    crossProd.set(
      2,
      this.coordinates[0] * vec.coordinates[1] +
        this.coordinates[1] * vec.coordinates[0]
    );

    return crossProd;
  }
}
