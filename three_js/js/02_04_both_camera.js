var camera;
var scene;
var renderer;

function init() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 120;
    camera.position.y = 60;
    camera.position.z = 180;

    renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    renderer.setSize(window.innerWidth, window.innerHeight);

    var planeGeometry = new THREE.PlaneGeometry(180, 180);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;

    scene.add(plane);

    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    console.log(planeGeometry.parameters)

    for (var j = 0; j < (planeGeometry.parameters.height / 5); j++) {
        for (var i = 0; i < planeGeometry.parameters.width / 5; i++) {
            var rnd = Math.random() * 0.75 + 0.25;
            var cubeMaterial = new THREE.MeshLambertMaterial();

            // 0과 1사이 색상
            cubeMaterial.color = new THREE.Color(rnd, rnd, 0);
            var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

            cube.position.z = -((planeGeometry.parameters.height) / 2) + 2 + (j * 5);
            cube.position.x = -((planeGeometry.parameters.width) / 2) + 2 + (i * 5);
            cube.position.y = 2;

            scene.add(cube);
        }
    }

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(-20, 40, 60);
    scene.add(directionalLight);

    var ambientLight = new THREE.AmbientLight(0x292929);
    scene.add(ambientLight);


    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    var controls = new function() {
        this.perspective = "Perspective";
        this.switchCamera = function() {
            if (camera instanceof THREE.PerspectiveCamera) {
                camera = new THREE.OrthographicCamera(window.innerWidth / -16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / -16, -200, 500);
                camera.position.x = 120;
                camera.position.y = 60;
                camera.position.z = 180;
                camera.lookAt(scene.position);
                this.perspective = "Orthographic";
            } else {
                camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                camera.position.x = 120;
                camera.position.y = 60;
                camera.position.z = 180;

                camera.lookAt(scene.position);
                this.perspective = "Perspective";
            }
        };
    };

    var gui = new dat.GUI();
    gui.add(controls, 'switchCamera');
    gui.add(controls, 'perspective').listen();

    camera.lookAt(scene.position);

    render();

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
}
window.onload = init