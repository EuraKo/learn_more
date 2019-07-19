function init() {


    var scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render and set the size
    var renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0xeeeeee, 1.0));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    var planeGeometry = new THREE.PlaneGeometry(600, 200, 20, 20);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = -5;
    plane.position.z = 0;

    scene.add(plane);

    // create a cube
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff3333 });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    // position the cube
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;

    // add the cube to the scene
    scene.add(cube);

    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // position the sphere
    sphere.position.x = 20;
    sphere.position.y = 0;
    sphere.position.z = 2;
    sphere.castShadow = true;

    // add the sphere to the scene
    scene.add(sphere);
    // position and point the camera to the center of the scene
    camera.position.x = -35;
    camera.position.y = 30;
    camera.position.z = 25;
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    // add subtle ambient lighting
    var ambiColor = "#1c1c1c";
    var ambientLight = new THREE.AmbientLight(ambiColor);
    scene.add(ambientLight);

    var target = new THREE.Object3D();
    target.position = new THREE.Vector3(5, 0, 0);

    var pointColor = "#ff5808";
    var directionalLight = new THREE.DirectionalLight(pointColor);
    directionalLight.position.set(-40, 60, -10);
    directionalLight.castShadow = true;
    directionalLight.shadowCameraNear = 2;
    directionalLight.shadowCameraFar = 200;
    directionalLight.shadowCameraLeft = -50;
    directionalLight.shadowCameraRight = 50;
    directionalLight.shadowCameraTop = 50;
    directionalLight.shadowCameraBottom = -50;

    directionalLight.distance = 0;
    directionalLight.intensity = 0.5;
    directionalLight.shadowMapHeight = 1024;
    directionalLight.shadowMapWidth = 1024;


    scene.add(directionalLight);

    var sphereLight = new THREE.SphereGeometry(0.2);
    var sphereLightMaterial = new THREE.MeshBasicMaterial({ color: 0xac6c25 });
    sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
    sphereLightMesh.castShadow = true;

    sphereLightMesh.position = new THREE.Vector3(3, 20, 3);
    scene.add(sphereLightMesh);


    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    var step = 0;
    var invert = 1;
    var phase = 0;

    var controls = new function() {
        this.rotationSpeed = 0.03;
        this.bouncingSpeed = 0.03;
        this.ambientColor = ambiColor;
        this.pointColor = pointColor;
        this.intensity = 0.5;
        this.distance = 0;
        this.exponent = 30;
        this.angle = 0.1;
        this.debug = false;
        this.castShadow = true;
        this.onlyShadow = false;
        this.target = "Plane";

    }

    var gui = new dat.GUI();
    gui.addColor(controls, 'ambientColor').onChange(function(e) {
        ambientLight.color = new THREE.Color(e);
    })
    gui.addColor(controls, 'pointColor').onChange(function(e) {
        directionalLight.color = new THREE.Color(e);
    })
    gui.add(controls, 'intensity', 0, 5).onChange(function(e) {
        directionalLight.intensity = e;
    });

    gui.add(controls, 'distance', 0, 200).onChange(function(e) {
        directionalLight.distance = e;
    });

    gui.add(controls, 'debug').onChange(function(e) {
        directionalLight.shadowCameraVisible = e;
    });

    gui.add(controls, 'castShadow').onChange(function(e) {
        directionalLight.castShadow = e;
    });

    gui.add(controls, 'onlyShadow').onChange(function(e) {
        directionalLight.onlyShadow = e;
    });
    gui.add(controls, 'target', ['Plane', 'Sphere', 'Cube']).onChange(function(e) {
        console.log(e);
        switch (e) {
            case "Plane":
                directionalLight.target = plane;
                break;
            case "Sphere":
                directionalLight.target = sphere;
                break;
            case "Cube":
                directionalLight.target = cube;
                break;
        }

    });
    render();

    function render() {
        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;

        step += controls.bouncingSpeed;
        sphere.position.x = 20 + (10 * (Math.cos(step)));
        sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

        sphereLightMesh.position.z = -8;
        sphereLightMesh.position.y = +(27 * (Math.sin(step / 3)));
        sphereLightMesh.position.x = 10 + (26 * (Math.cos(step / 3)));

        directionalLight.position.copy(sphereLightMesh.position)

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

}
window.onload = init