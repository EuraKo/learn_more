# three.js

## 기본구성

- scene : 렌더링할 모든 객체와 사용할 모든 광원을 저장하는 컨테이너
- camera : 장면을 렌더링했을 때 어떻게 보여질 것인가
- renderer : scene객체가 camera객체의 각도에 따라 브라우저에 어떻게 보여지는지 산출


```
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
```

###  배경색 지정
 ```
 renderer.setClearColorHex();
 renderer.setClearColor(new THREE.Color(0xEEEEEE));
 ```
 
### 장면의 크기
 
 ```
 renderer.setSize(window.innerWidth, window.innerHeight);
 ```

###  질감 & 광원

- 그냥 면 : MeshBasicMaterial()

```
var planeMaterial = new THREE.MeshBasicMaterial({color:0xAADDDD});
```

- 메시 (그물) : MeshBasicMaterial({,wireframe:true})

```
var sphereMaterial = new THREE.MeshBasicMaterial({color:0x7777ff, wireframe:true});
```

- 광원 (빛과 어둠표현) : MeshLambertMaterial()
- **광원의 위치 설정과 꼭 같이쓰기!** 
- 메시로 하려면 ({,wireframe:true}) 넣기

```
var planeMaterial = new THREE.MeshLambertMaterial({color:0xAADDDD});
var planeMaterial = new THREE.MeshLambertMaterial({color:0xAADDDD,wireframe:true});

```

- 광원의 위치 설정

```
var spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(-40, 60, -10);
    scene.add(spotLight);
```

### 그림자 설정
- 그림자는 렌더링시 컴퓨팅 파워가 많이 필요하므로 기본설정은 비활성화되있다.


```
//1.0을 써서 그림자를 넣을 거란걸 알린다
renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));

// 그림자 모드 활성화
renderer.shadowMapEnabled = true;


...
// 각 객체에 그림자 넣기
plane.receiveShadow = true;
...
cube.castShadow = true;
...
sphere.castShadow = true;
...
spotLight.castShadow = true;

```
 