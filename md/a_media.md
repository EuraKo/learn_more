## html5 API 프로그래밍
### video api
- video.html
- 비디오 api에 대한 내용 p70~p100

#### html 구성요성
- src
- width,height
- controls
- loop
- autoplay
- poster
- preload

#### htmlMediaElement의 특성

##### 속성
- **double currentTime** : 현재 재생중인 위치의 시간(초)을 double형태로 반환,currnetTime에 값이 설정되면 해당 위치에서부터 재생을 시작
- **double duration** : 미디어 전체 재생 시간 읽기전용 미디어불가시 0반환,총 재생시간을 알 수 없으면 nan반환
- **boolean ended** : 미디어 종료여부 읽기전용 boolean값으로 반환
- **boolean muted** : 오디오가 음소거상태인지 반환 boolean값
- **double volume** : 오디오 음량을 0.0~1.0 사이에 값으로 설정

##### 함수
- **play()** : 미디어 재생
- **pause()** : 일시정지
- **load()** : 로딩하고 재상행되도록 준비

##### 이벤트
- **canplay** : 미디어가 재생가능한 상태가 되었을 때 발생하는 이벤트
- **error** : 미디어 재생중 에러가 났을때 발생하는 이벤트
- **progress** : 미디어가 다운로드 되는 상황에서 주기적으로 발생하는 이벤트로 진행상황을 화며에 업데이트하기 위해 주로 사용
- **timeupdate** : 미디어를 재생하면서 currentTime이 적용될 때 발생하는 이벤트