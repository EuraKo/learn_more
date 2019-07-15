var camera;
var scene;
var renderer;

function init() {
    var stats = initStats();

    scene = new THREE.Scene();
    // scene.fog = new THREE.Fog(0xffffff, 0.015, 100);
    // scene.fog = new THREE.FogExp2(0x2ffffff, 0.015);
    scene.overrideMaterial = new THREE.MeshLambertMaterial({ color: 0xaadddd });
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // 여러장면을 작업할때는 수동으로 직접 장면을 추가하기 위해 넣은것 원래는 자동으로 들어감
    scene.add(camera);
    renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0xaadddd, 1.0));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;

    scene.add(plane);

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // 주변광 ambient light
    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    // 스포트라이트
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);


    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    var step = 0;

    var controls = new function() {
        this.rotationSpeed = 0.02;
        this.numberOfObjects = scene.children.length;

        this.removeCube = function() {
            var allChildren = scene.children;
            var lastObject = allChildren[allChildren.length - 1];
            if (lastObject instanceof THREE.Mesh) {
                scene.remove(lastObject);
                this.numberOfObjects = scene.children.length;
            }
        };
        this.addCube = function() {

            var cubeSize = Math.ceil((Math.random() * 3)); // 1~3사이의 랜덤값지정
            var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            var cubeMaterial = new THREE.MeshLambertMaterial({
                color: Math.random() * 0xffffff
            });
            var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.castShadow = true;
            cube.name = "cube-" + scene.children.length;

            cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
            cube.position.y = Math.round((Math.random() * 5));
            cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));

            scene.add(cube);
            this.numberOfObjects = scene.children.length;

        };

        // 현재 모든 속성을 콘솔로 내보내줌
        this.outputObjects = function() {
            console.log(scene.children);
        }
    }
    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5); // 최소값 최대값
    gui.add(controls, 'addCube');
    gui.add(controls, 'removeCube');
    gui.add(controls, 'outputObjects');
    gui.add(controls, 'numberOfObjects').listen(); // 카메라, 배경평면, 주변광, 스포트라이트(add가 있는 개수 세주는것)

    render();

    function render() {
        stats.update();

        // 자식객체에 접근할 수 있는 함수
        // 자식객체가 하나씩 지정한 함수에 전달된다.
        scene.traverse(function(e) {
            // e매개변수의 타입이 THREE.Mesh이고, 매개변수가 plane이 아니면
            if (e instanceof THREE.Mesh && e != plane) {
                e.rotation.x += 0.2;
                e.rotation.y += 0.2;
                e.rotation.z += 0.2;
            }
        });
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    function initStats() {

        var stats = new Stats();
        stats.setMode(0); // 0:fps, 1:ms

        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.right = '0px';

        document.getElementById("Stats-output").appendChild(stats.domElement);

        return stats;
    }
}
window.onload = init

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onResize, false);