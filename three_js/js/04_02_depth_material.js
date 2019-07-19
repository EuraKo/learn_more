function init() {

    var scene = new THREE.Scene();
    scene.overrideMaterial = new THREE.MeshDepthMaterial();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 130);
    var renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0x00000, 1.0));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    camera.position.x = -50;
    camera.position.y = 40;
    camera.position.z = 50;
    camera.lookAt(scene.position);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    var step = 0;

    var controls = new function() {
        this.cameraNear = camera.near;
        this.cameraFar = camera.far;
        this.rotationSpeed = 0.02;
        this.numberOfObjects = scene.children.length;

        this.removeCube = function() {
            var allChildren = scene.children;
            var lastObject = allChildren[allChildren.length - 1];
            if (lastObject instanceof THREE.Mesh) {
                scene.remove(lastObject);
                this.numberOfObjects = scene.children.length;
            }
        }

        this.addCube = function() {

            var cubeSize = Math.ceil(3 + (Math.random() * 3));
            var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            var cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffff00 });
            var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.castShadow = true;

            // position the cube randomly in the scene
            cube.position.x = -60 + Math.round((Math.random() * 100));
            cube.position.y = Math.round((Math.random() * 10));
            cube.position.z = -100 + Math.round((Math.random() * 150));

            // add the cube to the scene
            scene.add(cube);
            this.numberOfObjects = scene.children.length;
        };

        this.outputObjects = function() {
            console.log(scene.children);
        }
    }

    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5)
    gui.add(controls, 'addCube')
    gui.add(controls, 'removeCube')
    gui.add(controls, 'cameraNear', 0, 50).onChange(function(e) {
        camera.near = e;
    })
    gui.add(controls, 'cameraFar', 50, 200).onChange(function(e) {
        camera.far = e;
    });
    gui.add(controls, 'outputObjects')

    var i = 0;
    while (i < 10) {
        controls.addCube();
        i++;
    }

    render();

    function render() {
        scene.traverse(function(e) {
            if (e instanceof THREE.Mesh) {
                e.rotation.x += controls.rotationSpeed;
                e.rotation.y += controls.rotationSpeed;
                e.rotation.z += controls.rotationSpeed;
            }
        })

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

}
window.onload = init