import {VertexAttributes} from './vertex-attributes';
import {ShaderProgram} from './shader-program';
import {VertexArray} from './vertex-array';
import {Vector3, Vector4} from './vector';
import {Matrix4} from './matrix';
import {Trackball} from './trackball';


let canvas;
let attributes;
let shaderProgram;
let vao;
let clipFromEye;
let eyeFromWorld = Matrix4.translate(0, 0, -20);
let positions;
let indices;
let normals;
let interlock;
let trackball;
let mouseIsDown = false;


async function readObjectFromFile(file) {
  const object = await fetch(file).then((response) => response.json());
  return object;
}

function render() {
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.1, 0.6, 0.9, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  shaderProgram.bind();
  shaderProgram.setUniformMatrix4('clipFromEye', clipFromEye);
  shaderProgram.setUniformMatrix4('eyeFromWorld', eyeFromWorld);
  shaderProgram.setUniformMatrix4('worldFromModel', trackball.getRotation());
  vao.bind();
  vao.drawIndexed(gl.TRIANGLES);
  vao.unbind();
  shaderProgram.unbind();
}

function onResizeWindow() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  clipFromEye = Matrix4.fovPerspective(45, canvas.width / canvas.height, 0.1, 100);
  trackball.setViewport(canvas.width, canvas.height);
  render();
}

async function initialize() {
  interlock = await readObjectFromFile("interlock.json");
  positions = interlock.positions;
  normals = interlock.normals;
  indices = interlock.indices;
  canvas = document.getElementById('canvas');
  window.gl = canvas.getContext('webgl2');
  
  gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);

  trackball = new Trackball();
  trackball.setViewport(canvas.width, canvas.height);


  attributes = new VertexAttributes();
  attributes.addAttribute('position', 3, 3, positions);
  attributes.addAttribute('normal', 3, 3, normals);
  attributes.addIndices(indices);

  const vertexSource = `
uniform mat4 clipFromEye;
uniform mat4 eyeFromWorld;
uniform mat4 worldFromModel;
in vec3 normal;
in vec3 position;
out vec3 mixNormal;
out vec3 mixPosition;

void main() {
  gl_PointSize = 3.0;
  gl_Position = clipFromEye * eyeFromWorld * worldFromModel * vec4(position, 1.0);
  mixNormal = (worldFromModel * vec4(normal, 0)).xyz;
  mixPosition = (worldFromModel * vec4(position, 1.0)).xyz;
}
  `;

  const fragmentSource = `
const vec3 lightDirection = normalize(vec3(1.0, 1.0, 1.5));
const vec3 albedo = vec3(0.9, 0.4, 0.6);
out vec4 fragmentColor;

in vec3 mixNormal;
in vec3 mixPosition;

void main() {
  vec3 normal = normalize(mixNormal);

  //Diffuse
  float litness = dot(normal, lightDirection);
  vec3 diffuse = litness * albedo;
  
  vec3 rgb = diffuse;


  fragmentColor = vec4(rgb, 1.0);
}
  `;

  shaderProgram = new ShaderProgram(vertexSource, fragmentSource);
  vao = new VertexArray(shaderProgram, attributes);

  window.addEventListener('resize', onResizeWindow);
  onResizeWindow();
}

  function onMouseDown(event) {
    let mouseY = canvas.height - event.clientY;
    let mouseX = event.clientX;
    let mousePixs = new Vector3(mouseX, mouseY, 0);
    mouseIsDown = true;
    trackball.start(mousePixs);
  }

  function onMouseDrag(event) {
    if (mouseIsDown) {
      let mouseY = canvas.height - event.clientY;
      let mouseX = event.clientX;
      let mousePixs = new Vector3(mouseX, mouseY, 0);
      trackball.drag(mousePixs);
    }
  }

  function onMouseUp(event) {
    mouseIsDown = false;
    trackball.end();
  }

window.addEventListener('load', initialize);
window.addEventListener('pointerdown', onMouseDown);
window.addEventListener('pointermove', onMouseDrag);
window.addEventListener('pointerup', onMouseUp);
window.addEventListener('keydown', (event) => {
  if (event.key === 'x') {
    trackball.cancel();
    console.log("Rotation canceled");
  }
});