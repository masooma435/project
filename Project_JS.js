var forward = new Audio("Audio Files/Forward.wav");
var backward = new Audio("Audio Files/Backward.wav");

function test(){
    alert("test");
}

function open_wing() {
    $("#Wing,#Fuselage,#Tail,#Winglet,#Propulsion").hide();
    $("#Wing_Section_1,#Wing_Section_2,#Wing_Section_3,#back_button").show();
}

function open_fuselage() {
    $("#Wing,#Fuselage,#Tail,#Winglet,#Propulsion").hide();
    $("#Fuselage_Section_1,#Fuselage_Section_2,#Fuselage_Section_3,#back_button").show();
}

function open_tail() {
    $("#Wing,#Fuseslage,#Tail,#Winglet,#Propulsion").hide();
    $("#Tail_Section_1,#Tail_Section_2,#Tail_Section_3,#back_button").show();
}

function open_winglet() {
    $("#Wing,#Fuselage,#Tail,#Winglet,#Propulsion").hide();
    $("#Winglet_Section_1,#Winglet_Section_2,#Winglet_Section_3,#back_button").show();
}

function open_propulsion() {
    $("#Wing,#Fuselage,#Tail,#Winglet,#Propulsion").hide();
    $("#Propulsion_Section_1,#Propulsion_Section_2,#Propulsion_Section_3,#back_button").show();
}


$(function () {
    $("#Wing_Section_1,#Wing_Section_2,#Wing_Section_3,#Tail_Section_1,#Tail_Section_2,#Tail_Section_3,#Fuselage_Section_1,#Fuselage_Section_2,#Fuselage_Section_3,#Winglet_Section_1,#Winglet_Section_2,#Winglet_Section_3,#Propulsion_Section_1,#Propulsion_Section_2,#Propulsion_Section_3,#back_button").hide()
});

function back() {
    $("#Wing_Section_1,#Wing_Section_2,#Wing_Section_3,#Tail_Section_1,#Tail_Section_2,#Tail_Section_3,#Fuselage_Section_1,#Fuselage_Section_2,#Fuselage_Section_3,#Winglet_Section_1,#Winglet_Section_2,#Winglet_Section_3,#Propulsion_Section_1,#Propulsion_Section_2,#Propulsion_Section_3,#back_button").hide()
    $("#Wing,#Fuselage,#Tail,#Winglet,#Propulsion").show();
}

function forward_sound() {
    forward.play();
}
function backward_sound() {
    backward.play();
}


let scene, camera, renderer, controls, threeContainer;

let container_width = 500;
let container_height = 500;

function load_model(file_path) {
    threeContainer = document.getElementById("3d_model");
    $("#3d_model").empty();

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xff0000);
    

    createCamera(threeContainer)
    createLights();
    createMeshes(file_path)
    createRenderer(threeContainer);
    createControls();

    renderer.setAnimationLoop(() => {
        update();
        render();
    });

}

function createCamera(threeContainer) {
    camera = new THREE.PerspectiveCamera(40, container_width / container_height , 0.1, 1000);

    camera.rotation.y = 45 / 180 * Math.PI;
    camera.position.x = 10;
    camera.position.y = 10;
    camera.position.z = 10;
}

function createLights() {
    directionalLight = new THREE.DirectionalLight(0xffffff, 100);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    light = new THREE.PointLight(0xc4c4c4, 10);
    light.position.set(0, 300, 500);
    scene.add(light);
    light2 = new THREE.PointLight(0xc4c4c4, 10);
    light2.position.set(500, 100, 0);
    scene.add(light2);
    light3 = new THREE.PointLight(0xc4c4c4, 10);
    light3.position.set(0, 100, -500);
    scene.add(light3);
    light4 = new THREE.PointLight(0xc4c4c4, 10);
    light4.position.set(-500, 300, 500);
    scene.add(light4);
}

function createMeshes(file_path) {
    console.log(file_path);
    let loader = new THREE.GLTFLoader();
    loader.load(file_path, function (gltf) {
        console.log(gltf.scene)
        //cam = gltf.scene.children[0];
        //cam.scale.set(30, 30, 30);
        scene.add(gltf.scene);
    }, undefined, function (error) { console.error(error); });
}

function createRenderer(threeContainer) {

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xdddddd)
    renderer.setSize(container_width, container_height);

    document.body.appendChild(renderer.domElement);

    renderer.physicallyCorrectLights = true;

    threeContainer.appendChild(renderer.domElement);
}

function createControls() {
    controls = new THREE.OrbitControls(camera, threeContainer);
}

function update() {
    // update elements in this function
}

// render, or 'draw a still image', of the scene
function render() {
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    threeContainer = document.getElementById("3d_model");
    renderer.setSize(container_width, container_height);
    camera.aspect = container_width / container_height

    camera.updateProjectionMatrix();
})