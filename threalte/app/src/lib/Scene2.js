import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as dat from 'dat.gui';

export class Scene2 {
      constructor(){
           this.scene = new THREE.Scene();
           this.camera = new THREE.PerspectiveCamera(75 , window.innerWidth / window.innerHeight , 0.1 , 1000);
           this.camera.position.z = 5;
           
           this.renderer = new THREE.WebGLRenderer();
           this.renderer.setSize(window.innerWidth , window.innerHeight);
           this.renderer.setClearColor(0xffffff);
           document.body.appendChild(this.renderer.domElement);

           this.model = null ;
           this.controls = null;
      }

      init(){
           this.setAudio();
           this.loadModel();
           this.setBoxes();
           this.setLights();
           this.setHelpers();
           this.setControls();
           this.animate();
      }

      loadModel(){
            const loader = new GLTFLoader();

            loader.load('/burgir.glb', (gltf)=>{
                   this.model = gltf.scene;
                   this.model.scale.set(1,1,1);
                   this.model.rotation.x = 0.3;
                   this.scene.add(this.model);
            });
      }


      setAudio(){
              const audioListener = new THREE.AudioListener();
              this.camera.add(audioListener);
              const oceanAmbientLoad = new THREE.Audio( audioListener );
              this.scene.add( oceanAmbientLoad );

              const loader = new THREE.AudioLoader();
              loader.load('glitch.mp3',
                  function ( audioBuffer ){
                           oceanAmbientLoad.setBuffer( audioBuffer );
                           oceanAmbientLoad.play();
                  },
                  function ( xhr ){
                         console.log((xhr.loaded / xhr.total * 100) + '% loaded' );
                  },
                  function ( err ){
                           console.log('An error occured');
                  }
               )
      }
    
      setGUI(box1 , box2){
            const gui = new dat.GUI();

            const options = {
              color1: '#00ff00',
              color2: '#00ffff'
            };
            
            
            gui.addColor(options, 'color1').onChange(function (e) {
                 box1.material.color.set(e);
            });
            
            gui.addColor(options, 'color2').onChange(function (e) {
              box2.material.color.set(e);
            });
      }


      setLights(){
            const ambientLight = new THREE.AmbientLight(0x404040);
            this.scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            this.scene.add(directionalLight);

            const pointLight = new THREE.PointLight(0xffffff, 1 , 100);
            pointLight.position.set(5,10,5);
            this.scene.add(pointLight);

            const spotLight = new THREE.SpotLight(0xffffff);
            spotLight.position.set(5,10,5);
            this.scene.add(spotLight);
      }


      setBoxes(){
              const mesh1 = this.addBox(1 , 1 , 1 , '#00ff00');
              mesh1.position.set(2,4,4);


              const mesh2 = this.addBox(1 , 2 , 1 , '#00ffff');
              mesh2.position.set(3,1,-3);
              this.setGUI(mesh1 , mesh2);
      }

      addBox(x,y,z , color){
            const geometry = new THREE.BoxGeometry(x,y,z);
            const material = new THREE.MeshBasicMaterial({color : color});
            const mesh = new THREE.Mesh(geometry , material);
            this.scene.add(mesh);
            return mesh;
      }


      setHelpers(){
            const axesHelper = new THREE.AxesHelper(5);
            this.scene.add(axesHelper);
      }



      setControls(){
            this.controls = new OrbitControls(this.camera , this.renderer.domElement);
            this.controls.enableDamping = false;
            this.controls.dampingFactor = 0.05;
      }

      animate(){
          requestAnimationFrame(()=>this.animate());
          this.model.rotation.y += 0.01;
          this.renderer.render(this.scene , this.camera);
      }
}

