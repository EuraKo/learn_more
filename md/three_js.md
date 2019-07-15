# three.js

## 1장 기본구성
> chapter01 / 01_basic-sketleton.html

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
var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);

//1
var planeMaterial = new THREE.MeshLambertMaterial({color:0xAADDDD});

// 2
var planeMaterial = new THREE.MeshLambertMaterial({color:0xAADDDD,wireframe:true});

var plane = new THREE.Mesh(planeGeometry, planeMaterial);
```

- 광원의 위치 설정

```
var spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(-40, 60, -10);
    scene.add(spotLight);
```

- 광원과 메시 같이 설정하기

```
var geom = new THREE.Geometry();
    geom.vertices = vertices;
    geom.faces = faces;
    
var materials = [
new THREE.MeshLambertMaterial({
 opacity:0.6,
 color:0x44ff44,
 transparent:true
}),
new THREE.MeshLambertMaterial({
 color:0x000000,
 wireframe:true
})
];
  
var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials);
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
plane.receiveShadow = true; //그림자가 비춰질 곳
...
cube.castShadow = true; //그림자 객체
...
sphere.castShadow = true;
...
spotLight.castShadow = true;

```
- 모든 객체 그림자 넣기

```
mesh.children.forEach(function(e){
e.castShadow = true;
})
```



### 애니메이션 반복

- requestAnimationFrame()

  ```
  renderScene();
  
  function renderScene(){
  stats.update(); //stats플러그인으로 프레임수를 실시간 업데이트하기위함
  
  // 애니메이션 효과줄 친구들 저기
  cube.rotation.x += 수치;
  cube.rotation.y += 수치;
  cube.rotation.z += 수치;
  
  requestAnimationFrame(renderScene); // 재귀함수로 자기자신을 반복시킴
  
  renderer.render(scene, camera); // 장면이 바뀔 때마다 화면 렌더링
  }
  ```

  

### 브라우저 크기변경에 따라 자동으로 결과물조정

1. init()외부에 이벤트 리스너 추가
2. onResize()함수 생성
3. camera, scene, renderer 변수 정의를 init()함수 외부로 이동해 다른 함수에 접근 가능하게 한다
```
// 3
var camera;
var scene;
var renderer;

init(){
...
}

...

// 2
function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

// 1
window.addEventListener('resize', onResize, false);
```

---

### 플러그인

1. stas.js
   
   - 좌측 상단 애니메이션 되는 초당 프레임수를 그래프로 보여주는 라이브러리
   
2. dat.gui.js
   
   - 변수를 변경할 수 있는 인터페이스 제공
   
---

   

## 2장 -01 네모박스 추가 컨트롤러

> 02_01_basic_scene.html 리모콘으로 네모만들고 지우기

### 주변광(ambient light)

``` 
var ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);
```

### 스포트라이트(sportLihgt)

```
var sportLight = new THREE.SportLight(0xffffff);
sportLight.position.set(-40, 60, -10);
sportLight.catShadow = true;
scene.add(sportLight);
```

### 장면과 관련된 함수/속성

- Add(object) : 장면에 객체를 추가
- Remove(object) : 장면에서 객체를 삭제
- children : 장면에 있는 모든 자식들의 목록을 가져옴
- getObjectByName(name,recursive) : 이름으로 장면에서 특정한 객체를 가져온다. recursive인자가 true이면 three.js는 특정이름의 객체를 찾기위해 모든 객체의 트리를 탐색한다
- traverse(function) : 자식객체에 접근 가능한 함수. 자식객체가 하나씩 지정한 함수에 전달된다.

### 안개(fog)

1. scene.fog = new THREE.Fog(color, near, far);
2. scene.fog = new THREE.FogExp2(color, 밀도);

```
// 1
scene.fog = new THREE.Fog(0xffffff, 0.015, 100);
// 2
scene.fog = new THREE.FogExp2(0xffffff, 0.015);
```

### material

- 장면의 모든 객체에 overrideMaterial속성 부과
- 모든 객체가 자신의 속성을 무시하고 반사안되는 모노톤재질?이된다.

```
scene.overrideMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
```

---

### 2장 02 지오메트리와 메시
> 02_02_custom_geometry.html
- 지오메트리란? 기본적으로 3d공간에서의 점(꼭지점)들과 이 점들을 연결하는 면들의 집합을 말한다.
- three.js에서의 면은 항상 삼각형을 만드는세개의 꼭지점으로 구성된다.
- 즉 네모난 한면을 만들기 위해서는 2개의 삼각형으로 구성된다.

---

### 2장 03 메시용 함수와 속성

#### position

- 부모 객체에 상대적이다. 부모 위치가 기준이된다.
- 부모객체는 일반적으로 객체를 추가한 장면이거나 THREE.Object3D 객체, THREE.Mesh객체가 될 수 있다.

```
// 직접설정
cube.position.x = 10;
cube.position.y = 3;
cube.position.z = 1;

// 전체설정
cube.postion.set(10,3,1);

// 객체설정 : position속성은 THREE.Vector3의 객체다.
cube.position = new THREE.Vector3(10,3,1);
```



#### rotation

- position과 동일
- Math.PI는 180도

```
// 직접설정(90도)
cube.rotation.x = 0.5 * Math.PI;

// 전체설정
cube.rotation.set(0.5 * math.PI, 0, 0);

// 객체설정 : position속성은 THREE.Vector3의 객체다.
cube.rotation = new THREE.Vector(0.5 * Math.PI, 0, 0);

// 각도를 대신 하려면 radian으로 변환
var degrees = 45;
var inRadians = degrees * (Math.PI / 180);
```



#### scale
#### translateX(amount)

- 현재 위치에서 상대적으로 이동한다.
- 객체를 x축으로 지정된 만큼 이동
- 수치를 입력후 하단의 버튼을 눌러야함

#### visivle

- 속성이 false가 되면 렌더링 하지않음

---

## Math 함수

### Math.PI

- 원주율 = 원주/지름
- 즉 원의 지름길이 대 원의 둘레길이의 비율
- Math.PI = 180도 

### Math.sin

- x축 좌표

### Math.cos

- y축 좌표
- 
### 소수점 처리
#### Math.ceil()

- 소수점 이하를 올림

#### Math.floor()

- 소수점 이하를 버림

#### Math.round()

- 소수점이하를 반올림

### Math.random()

- 0~1까지의 수를 랜덤으로 가져옴



