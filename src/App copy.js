import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
// import Stats from 'three/examples/jsm/libs/stats.module.js';

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

import GLBBOX from './asset/glbTest.glb';
import BUILDING from './asset/Building_1.gltf'

import B1 from './asset/building_11.obj';
import B1m from './asset/building_11.mtl'

let camera, scene, renderer;
let geometry, material, mesh, text;

const App = () => {
  init();

  function init() {

    //카메라
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.set(0,0,5)

    //장면
    scene = new THREE.Scene();

    //3D파일 로더
    //let loader = new GLTFLoader();
    let materialLoader = new MTLLoader();
    let objLoader = new OBJLoader();
    materialLoader.setMaterialOptions( { invertTrProperty: true } )

    materialLoader.load( B1m, function( materials ) {
      materials.preload();
      objLoader.setMaterials( materials );

      objLoader.load( B1, function ( object ) {
        mesh = object.scene;
        mesh.scale.set(1,1,1);
        scene.add(mesh);
      } )
    })



    

    // loader.load(B1, function(object) {
    //   mesh = object.scene;
    //   mesh.scale.set(1,1,1);
    //   scene.add( mesh );
    // })

    //가이드라인
    let axes = new THREE.AxesHelper(50); 
    scene.add( axes );

    //그리드
    let gridHelper = new THREE.GridHelper( 100, 5 );
    scene.add( gridHelper );

    //필요한 모든조명 추가
    const ambientLight = new THREE.AmbientLight(0x101010);
    scene.add(ambientLight);

    //포인트 라이트
    const pointLight = new THREE.PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    scene.add(pointLight);

    //빛
    let spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set(-32, 72, 80);
    scene.add( spotLight );

    //렌더
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animation );

    document.body.appendChild( renderer.domElement );
  }
  
  function animation( time ) {
    renderer.render( scene, camera );
    requestAnimationFrame(animation)
  }

  return (
    
    <div>
      <div id="info"></div>
    </div>
  );
}

export default App;
