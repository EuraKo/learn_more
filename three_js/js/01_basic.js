var camera;
var scene;
var renderer;

function init() {
    var stats = initStats();

    //렌더링할 모든 객체와 사용할 모든 광원을 저장하는 컨테이너
    scene = new THREE.Scene();

    // 장면을 렌더링했을 때 어떻게 보여질 것인가
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // scene객체가 camera객체의 각도에 따라 브라우저에 어떻게 보여지는지 산출
    renderer = new THREE.WebGLRenderer();

    // 배경색 지정
    // renderer.setClearColorHex(0xEEEEEE);과 동일
    renderer.setClearColorHex();
    renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    // 장면이 얼마나 크게 랜더링 되는지
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    // 보조축과 평면을 추가
    var axes = new THREE.AxisHelper(20);
    scene.add(axes);

    // 평면 바닥추가 ============
    // 평면이 어떻게 보일지 / 평면 폭이 60 높이 20
    var planeGeometry = new THREE.PlaneGeometry(60, 20);

    // 평면의 색상이나 투명도 등...
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xAADDDD });

    // Mesh객체로 결합
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;


    // plane을 scene에 추가하기
    scene.add(plane);


    // 네모상자 추가 ============

    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;

    scene.add(cube);

    // 동그라미 추가 ============
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;

    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;

    scene.add(sphere);


    // 카메라 : 보여질 화면단 이게 없으면 화면 구성을 못함 ============
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;

    // 장면의 중앙을 가르키도록 하는 함수
    camera.lookAt(scene.position);

    // 물질과 광원, 그림자 추가 ==========
    var spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);


    // html에 연결시키기
    document.getElementById("WebGL-output").appendChild(renderer.domElement);



    // 애니메이션 ============
    var step = 0; // 파란공 튕기는 속도 초기화값

    var controls = new function() {
        // 컨트롤 될 것들의 초기값
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
    };

    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);
    renderScene();

    function renderScene() {
        stats.update();

        // 사각형 돌리기 // 각 축을 0.02씩 증가시켜라 
        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;

        // 공 튕기기
        step += controls.bouncingSpeed; // 바운싱 되는 속
        sphere.position.x = 20 + (10 * (Math.cos(step)));
        sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

        // 정해진 간격으로 함수가 호출되게 지정
        requestAnimationFrame(renderScene);

        // 애니메이션이 반복으로 들어가기때문에 함수 안으로 들어가야
        renderer.render(scene, camera);
    }

    // stats 라이브러리 사용
    function initStats() {
        var stats = new Stats();
        //setMode(0)은 초당 프레임수, 1은 렌더링 시간 측정
        stats.setMode(0);
        stats.domElement.style.position = "absolute";
        stats.domElement.style.left = "0";
        stats.domElement.style.top = "0";
        document.getElementById("Stats-output").appendChild(stats.domElement);
        return stats;
    }

}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;

window.addEventListener('resize', onResize, false);