function init() {

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0xeeeeee, 1.0));
    renderer.setSize(window.innerWidth, window.innerHeight);

    var planeGeometry = new THREE.PlaneGeometry(60, 20, 20, 20);
    var planeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);

    scene.add(plane);

    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff7777 });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    cube.position.set(-4, 3, 0);

    scene.add(cube);

    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterual = new THREE.MeshLambertMaterial({ color: 0x7777ff });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterual);

    sphere.position.set(20, 0, 2);
    sphere.castShadow = true;

    scene.add(sphere);

    camera.position.set(-25, 30, 25);
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    //  광원 ==========
    var ambiColor = "#0c0c0c";
    var ambientLight = new THREE.AmbientLight(ambiColor);
    scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    // scene.add(spotLight);

    var pointColor = "#ccffcc";
    var pointLight = new THREE.PointLight(pointColor);
    pointLight.distance = 100;
    scene.add(pointLight);

    var sphereLight = new THREE.SphereGeometry(0.2);
    var sphereLightMaterial = new THREE.MeshBasicMaterial({ color: 0xac6c25 });
    var sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
    sphereLightMesh.castShadow = true;

    sphereLightMesh.position = new THREE.Vector3(3, 0, 3);
    scene.add(sphereLightMesh);
    //  광원 끝 ==========

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    var invert = 1;
    var phase = 0;

    var controls = new function() {
        this.rotationSpeed = 0.03;
        this.bouncingSpeed = 0.03;
        this.ambientColor = ambiColor;
        this.pointColor = pointColor;
        this.intensity = 1;
        this.distance = 100;
    }

    var gui = new dat.GUI();
    gui.addColor(controls, 'ambientColor').onChange(function(e) {
        ambientLight.color = new THREE.Color(e);
    })

    gui.addColor(controls, 'pointColor').onChange(function(e) {
        pointLight.color = new THREE.Color(e);
    })

    gui.add(controls, 'intensity', 0, 3).onChange(function(e) {
        pointLight.intensity = e;
    })

    gui.add(controls, 'distance', 0, 100).onChange(function(e) {
        pointLight.distance = e;
    })

    render();
    var step = 0;

    function render() {

        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;

        step += controls.bouncingSpeed;
        sphere.position.x = 20 + (10 * (Math.cos(step)));
        sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

        if (phase > 2 * Math.PI) {
            invert = invert * -1;
            phase -= 2 * Math.PI;
        } else {
            phase += controls.rotationSpeed;
        }

        //긴 쪽으로 왔다갔다 시작점 +(왔다갔다 범위 * Math.sin(속도))
        sphereLightMesh.position.z = +(7 * (Math.sin(phase)));
        // 짧은 쪽으로 왔다갔다하는데 두개가 지진나면서 왔다갔다
        sphereLightMesh.position.x = +(14 * (Math.cos(phase)));
        sphereLightMesh.position.y = 5;

        //뒤집어서 돌게 해주는 애
        if (invert < 0) {
            var pivot = 14;
            sphereLightMesh.position.x = (invert * (sphereLightMesh.position.x - pivot)) + pivot;
        }

        // pointLight위치를 작은공이랑 같이 따라다니게 하기
        pointLight.position.copy(sphereLightMesh.position)

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
}
window.onload = init