var camera;
var scene;
var renderer;

function init() {


    render();

    function render() {
        requestAnimationFrame();
        renderer.render(scene, camera);
    }
}
window.onload = init