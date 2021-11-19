import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

import BB from './asset/building_11.glb';

let camera, scene, renderer, canvas, geometry, material;

const App = () => {
  
  init();
  const init = () => {
    canvas = document.querySelector('canvas.webgl')
    scene = new THREE.Scene()
    geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh)
  
    const sizes = {
      width: 800,
      height: 600
    }
    
    // Camera
    camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    camera.position.z = 50;
    scene.add(camera)
  
    let loader = new GLTFLoader();
    loader.load(BB, function(object) {
      mesh = object.scene;
      mesh.scale.set(1,1,1);
      scene.add(mesh)
    })
  
    //빛
    let spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set(-32, 72, 80);
    scene.add( spotLight );

    renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    renderer.setSize(sizes.width, sizes.height)
    //renderer.setAnimationLoop( animation );
    renderer.render(scene, camera);
  }

  function animation( time ) {
    renderer.render( scene, camera );
    requestAnimationFrame(animation)
  }

  return (
      <canvas class="webgl"></canvas>
  );
}

export default App;
