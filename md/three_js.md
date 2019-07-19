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

### 모양내기

- **plane** 평면생성
  - new THREE.PlaneGeometry(x의 길이, y의 길이, ?, ?);
  - new THREE.Mesh() 지오메트리와 질감을 합쳐줘야한다.

```
var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xaadddd });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;

plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;

scene.add(plane);
```

- **box** 네모생성

  - new THREE.BoxGeometry(x의 길이, y의 길이, z의 길이);
  - new THREE.Mesh() 지오메트리와 질감을 합쳐줘야한다.

  ```
  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;
  
  cube.position.set(-4, 3, 0);
  scene.add(cube);
  ```

- **sphere** 구체생성

  - new THREE.SphereGeometry(구의 지름, x의 면의 수, y의 면의 수);
  - new THREE.Mesh() 지오메트리와 질감을 합쳐줘야한다.

  ```
  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.castShadow = cube;
  
  sphere.position.set(20, 0, 2);
  
  scene.add(sphere);
  ```

  

###  질감 & 광원

> 광원은 3장에서 질감은 4장에서자세히 다룸

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

- 네모회전

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


- 공튀기기

- ```
  render();
  var step = 0;
  function render() {
  
   step += 0.02;
  
   // 기준이되는 시작하는 거리 or 높이 + (왔다갔다 범위 * (Math.cos(속도)));
   sphere.position.x = 20 + (10 * (Math.cos(step)));
   sphere.position.y = 4 + (10 * Math.abs(Math.sin(step)));
  
   requestAnimationFrame(render);
   renderer.render(scene, camera);
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

## 2장 02 지오메트리와 메시
> 02_02_custom_geometry.html
- 지오메트리란? 기본적으로 3d공간에서의 점(꼭지점)들과 이 점들을 연결하는 면들의 집합을 말한다.
- three.js에서의 면은 항상 삼각형을 만드는세개의 꼭지점으로 구성된다.
- 즉 네모난 한면을 만들기 위해서는 2개의 삼각형으로 구성된다.

---

## 2장 03 메시용 함수와 속성

### position

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



### rotation

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



### scale
### translateX(amount)

- 현재 위치에서 상대적으로 이동한다.
- 객체를 x축으로 지정된 만큼 이동
- 수치를 입력후 하단의 버튼을 눌러야함

### visivle

- 속성이 false가 되면 렌더링 하지않음

---

## 2장 카메라 워킹

### **원근(perspective)카메라**

- 가장자연스러운 뷰

- **THREE.PerspectuveCamera(fov, aspect, near, far, zoom);**

  - **fov **: filed of view 카메라 시야각 

    - 대부분의 게임 : 60~90도
    - three.js는 수평 fov를 결정
    - 좋은 기본값: 50

  - **aspect** : 수평과 수직 간의 종횡비(aspect ratio)

    - 수평fov와 수직fov간의 차이 
    - three.js는 수직 fov를 결정
    - 좋은 기본값 : window.innerWidth / window.innerHeight

  - **near** : 카메라와 얼마나 가까이에서 렌더링하는지 정의

    - 일반적으로 카메라의 위치에서 모든 것을 직접 렌더링하기 위해 아주 작은 값으로 설정
    - three.js는 근거리 면의 위치를 결정
    - 좋은 기본값 : 0.1

  - **far** : 카메라에서 볼 수 있는 거리 정의

    - 너무 작으면 일부가 렌더링되지않고 너무 크면 렌더링 성능에 영향을 준다
    - three.js는 원거리 면의 위치를 결정
    - 좋은 기본값 : 1000

  - **zoom** : 줌인/줌아웃

    - 1보다 작은 숫자를 사용하면 줌아웃, 크면 줌인, 음수는 거꾸로 뒤집혀 렌더링
    - 좋은 기본값 : 1

  - ```
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    ```

  - 근거리(near) 면과 원거리(far) 면의 사이의 공간이  렌더링 되는것

### **직교(orthographic)카메라**

- 모든 정육면체는 카메라와 객체 사이의 거리에 관계없이 동일한 크기로 렌더링

- 때문에 종횡비나 fov를 상관하지 않는다

- 예) 심시티4

- **new THREE.OrthographicCamera(left, right, top, bottom, near, far, zoom)**

  - **left** : 렌더링되는 왼쪽의 경계
  	- 카메라 사각뿔의 왼쪽 면
  	- -100으로 설정하면 왼쪽에 있는 아무런 객체도 볼 수 없다.
  - **rigth** : left와 유사하지만 더 오른쪽의 객체는 렌더링 되지 않는다
  - **top** : 렌더링되는 상단의 경계 위치
  - **botton** : 렌더링되는 하단의 경계 위치
  - **near** : 카메라의 위치에 기반해 이 시점부터 장면까지 렌더링 된다
  - **far** : 카메라의 위치에 기반해 이 시점부터 장면까지 렌더링 된다
  - **zoom** : 1보다 작은 숫자를 사용하면 줌아웃, 크면 줌인, 음수는 거꾸로 뒤집혀 렌더링
    - 기본값 : 1


  ```
  var camera = new THREE.OrthographicCamera(window.innerWidth / -16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / -16, -200, 500)
  ```




### lookAt()

> 02_05_cameras_lookat.html

- 카메라의 시점

- **camera.lookAt()**

- ```
  camera.position.x = -25;
      camera.position.y = 30;
      camera.position.z = 25;
      camera.lookAt(scene.position);
  ```

- camera.lookAt(**new THREE.Vector3(x, y, z)**)

- 카메라를 특정 지점으로 지정할 수 있다.

- ```
  camera.position.x = -25;
  camera.position.y = 30;
  camera.position.z = 25;
  camera.lookAt(new THREE.Vector3(10, 0, 0));
  ```

- 빨간공을 이용한 시점표시

- ```
  // 카메라가 바라보는 지점인 동그라미 공을 생성
  var lookAtGeom = new THREE.SpherGeometry(2);
  var lookAtMesh = new THREE.Mesh(lookAtGeom, new THREE.MeshLambbertMaterial({ color : 0xff0000}));
  scene.add(lookAtMesh);
  
  ...
  var step = 0;
  function() render(){
  
  step+=0.02;
  
  if(camera instanceof THREE.Camera){
  var x = 10 + (100 * (Math.sin(step)));
  //화면 전체 왔다갔다
  camera.lookAt(new THREE.Vector3(x, 10, 0));
  // 카메라시점(빨간공)왔다갔다
  lookAtMesh.position.copy(new THREE.Vector3(x, 10, 0));
  }
  ...
  }
  
  ```

---

## 3장 광원

### THREE.AmbientLight

> 03_01_ambient_light.html

- 기본광원

- 특정한 빛의 시작점이 없으면 그림자를 만들지 않아 단독으로 사용하지 않음

- 객체의 모양에 관계없이 동일한 색상을 줘서 **THREE.SpotLight**나 **THREE.DirectionalLijght**와 함께 사용

- **THREE.AmbientLight(ambiColor);**

- ambiColor는 hex값으로 지정해야한다.

 ```
  var ambiColor = "#0c0c0c";
  var ambientLight = new THREE.AmbientLight(ambiColor);
  scene.add(ambientLight);
  
  //spotlight와 함께 쓰기 안그러면 까맣게나옴
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);
 ```

### THREE.Color 색상지정

- 색상은 THREE.MeshLambertMaterial안에 지정할 수 있지만 단독으로도 지정가능하다.

```
// 1. 0x핵사코드
new THREE.MeshLambertMaterial({color : 0xffffff});
  
// 2. 기본 흰색
var color = new THREE.Color();
  
// 2-1.
var color = new THREE.Color(0xff00000);

// 2-2. rgb string
var color = new THREE.Color("rgb(255,0,0)");
var color = new THREE.Color("rgb(100%,0%,0%)");

// 2-3. 이름지정
var color = new THREE.Color('skyblue');
 
// 2-4. hsl string
var color = new THREE.Color("hsl(0, 100%, 50%)");

// 2-5. rgb값 0~1사이
var color = new THREE.Color(1,0,0);
```

### THREE.PointLight

> 03_02_point_light.html

- 특정 지점에서 모든 방향으로 빛을 방사하는 방원

- 예 ) 밤하늘에 쏘아올려진 조명탄

- 그림자를 만들지 않는다 왜냐면 빛을 모든 방향으로 방풀하기 때문에 그림자를 계산하는 작업이 gpu에 큰 부담을 준다.

- 추가 옵션

  - **color** : 빛의 색상
- **distance** : 빛이 도달하는 거리, 기본값 0이며 거리에 따라 빛의 세기가 줄어들지 않음을 의미
  - **intensity** : 빛을 비추는 세기 
  - 기본값 : 1
    - 0으로 설정하면 아무것도 볼수 없음
- **position** : THREE.Scene에서 빛의 위치
  - **visible** : 기본값 true, THREE.Scene설정되면 기본값으로 설정 / false는 꺼짐

```
var pointColor = "#ccffcc";
var pointLight = new THREE.PointLight(pointColor);
pointLight.position.set(10,10,10);
scene.add(pointLight);
```

### THREE.SpotLight

> 03_03_spot_light.html

- 원뿔모양의 효과

- 플래시나 랜턴

- var spotLight = **new THREE.SpotLight(#000000);**

- 속성

  - **angle**

    - 광원으로 부터 광선이 얼마나 넓게 퍼져나가는지 결정
    - radian으로 측정되며 기본값은 Math.PI/3
    - spotLight.angle = 0.4;

  - **castShadow**

    - true면 광원의 그림자가 생김
    - spotLight.castShadow = true;

  - **color**

    - 빛의 색상

  - **distance**

    - 빛이 비추는 거리
    - 기본값 : 0 (거리에 따라 빛의 세기가 감소하지않음)

  - **exponent**

    - 빛의 세기
    - 빛의 시작점으로부터 멀어질수록 줄어든다. 값이 높을 수록 가까이에 있는 객체만 비춤

  - **intensity**

    - 빛이 비치는 세기
    - 기본값 : 1

  - **onlyShadow**

    - true면 그림자만 만들고 빛을 비추지 않음

  - **position**

    - 빛의 위치

  - **shadowBias**

    - 그림자를 없애거나 그림자의 방향을 객체쪽으로 이동
    - 얇은 객체에서 일어나는 특이한 현상이 생기면 이속성을 작은 값으로 설정하면된다(예:0.01)
    - 기본값 : 0

  - **shadowCameraFar**

    - 광원으로부터 그림자의 거리
    - 기본값:5000

  - **shadowCameraFov**

    - 그림자를 얼마나 큰 fov로 생성하는지 결정
    - 기본값 : 50

  - **shadowCameraNear**

    - 광원으로 부터 그림자거리
    - 기본값: 50

  - **shadowCameraVisible**

  - true면 광원이 어디서 어떻게 그림자를 만드는지 볼수 있음

  - **shadowDarkness**

    - 그림자의 어두운 정도
    - 렌더링후에는 변경할 수 없음
    - 기본값 : 0.5

  - **shadowMapWidth / shadowMapHeight**

    - 그림자를 만드는데 픽셀의 수
    - 가에가 울퉁불퉁하면 값을 높이기
    - 렌더링 후에는 변경할 수 없음
    - 기본값 : 512

  - **target**

    - 가리키는 방향,장면의 위치나 특정한 객체를 지정

    - **THREE.Mesh객체를 필요로함**

    -  spotLight.target = plane; <- plane은 평면메시임

    - 특정객체가 아닌 공간 내임의 지정(뭔지모르게씀)

    - ```
       var target = new THREE.Object3D();
       target.position = new THREE.Vector3(5, 0, 0);
       ...
       spotLight.target = target;
      ```

    - 

  - **visible**

    - true(기본값)면 빛이 켜지고 false면 꺼짐

### THREE.DirectionalLight

> 03_04_directional-light.html

- 아주 멀리까지간다. 빛이 보내는 광선들은 서로 나란히 나아간다
- 예 : 태양광선
- THREE.SpotLight와 다른 점은 거리에 따라 빛이 소멸되지 않는다.
- 빛에 의해 조명되는 전체 영역은 동일한 빛의 세기를 가진다.
- 속성은 THREE.SpotLight 참조

### THREE.HemisphereLight

> 03_05_hemisphere-light.html

- 야외조명
- var dirLight = **new THREE.DirectionalLight(pointColor);**
- 속성
  - **groundColor**
    - 지면에 방출되는 색상
  - **color**
    - 하늘에 방출되는 색상
  - **intensity**
    - 빛을 비추는 강도

---

## 4장 메시

### THREE.MeshBasicMaterial

> 04_01_mesh_basic.html

- 단순 평면 폴리곤 와이어 프레임 옵션이있음
- **new THREE.MeshBasicMaterial({ color: 0x777777,wireframe:true })**
- opacity를 사용하려면 transparent가 true여야한다
- side : 장면결정을 한다 (plane으로 테스트) double은 양면을 보여주는 성능에 영향을 미친다.

---

### 버전 106 에서는?

- webGLRenderer.setClearColor(new THREE.Color(0xffffff,1.0))쓰면 노란색나옴
- scene.background = new THREE.Color(0xffffff); < 이게 실질적인 배경색을 정한다.
- 

---

## Math 함수

### Math.PI

- 원주율 = 원주/지름
- 즉 원의 지름길이 대 원의 둘레길이의 비율
- Math.PI = 180도 

### Math.sin()

- x축 좌표

### Math.cos()

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




```

```