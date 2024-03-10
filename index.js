var rubik
class Rubik{
  constructor(args){
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.activeCubes = new THREE.Group();                      
    this.activeAxis = new THREE.Vector3(1,0,0).normalize();     
    this.direction = 1;                                         
    this.steps = 0;                                             

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableKeys = false;

    this.colours = [0xC41E3A, 0x009E60,0xFF5800,0x0051BA, 0xFFD500, 0xFFFFFF];
     this.faceMaterials = this.colours.map(function(c) {
       return new THREE.MeshLambertMaterial({ color: c});
     });

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(this.ambientLight);
    this.cubeSize = 1;

    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
          for (let z = -1; z < 2; z++) {
              this.newCube(x,y,z);
          }
      }
  }
    this.camera.position.set(5,3,6)
  }

  newCube(x, y, z) {
    this.cubeGeometry = new THREE.BoxGeometry( this.cubeSize, this.cubeSize,  this.cubeSize);
    this.cube = new THREE.Mesh( this.cubeGeometry, this.faceMaterials);
    this.cube.position.set(x, y, z);  
    this.scene.add(this.cube);
    var edgesGeometry = new THREE.EdgesGeometry(this.cubeGeometry);
    var edgesMaterial = new THREE.LineBasicMaterial({ color: 0x00000});
    var edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    this.cube.add(edges);
  }
  update_() {
    this.controls.update(); 
    this.renderer.render(this.scene, this.camera);
  }
};
function animate() {
  requestAnimationFrame(animate);
  rubik.update_();
}

var init = function() { 
  rubik = new Rubik();
  animate();
}
init();

