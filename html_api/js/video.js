var container = document.getElementById("container");
var controller = document.getElementById("controller");
var video = document.getElementById("video");
var play = document.getElementById("play");
var range = document.getElementById("range");
var current = document.getElementById("current");
var mute = document.getElementById("mute");
var volume = document.getElementById("volume");
var fullScreen = document.getElementById("fullScreen");


// video가 시작될때 이벤트
video.addEventListener("canplay",function(){

  // 진행바에 최대 길이 넣기
  seek.max = this.duration;
})

// video를 재생하면 currnetTime이 적용될때 발생하는 이벤트
video.addEventListener("timeupdate",function(e){

  // 프로세스바 움직이게 하기
  seek.value = this.currentTime;
  updateTime(this.currentTime)
});

// video가 전부재생되고 나서 이벤트
video.addEventListener("ended",function(){

  // 모든 값 초기화
  play.innerHTML = "재생";
  seek.value = 0;
  video.currentTime = 0;
  updateTime(0);
})

// play btn 이벤트 처리
play.addEventListener("click",function(){
  if(video.paused || video.ended){
    video.play();
    this.innerHTML = "pause";
  }else{
    video.pause();
    this.innerHTML = "play";
  }
})

// seek 이벤트 처리
seek.addEventListener("click",function(e){

  // seek바를 클릭했을 때 이동
  // 비디오 전체길 * 현재좌표 / seek의 전체 넓이
  var newTime = video.duration * e.offsetX / this.offsetWidth;
  console.log(this.offsetWidth);
  console.log(video.duration);
  console.log(newTime);
  seek.value = newTime;
  video.currentTime = newTime;

})

// 마우스가 떨어지면 멈추게하기
seek.addEventListener("mousedown", function(){
  video.pause()
})

// 재생시간 변경
seek.addEventListener("input",function(){
  video.currentTime = seek.value;
  updateTime(seek.value)
})

// 마우스가 올라갔을때
seek.addEventListener("mouseup",function(){

  // 시작버튼이 멈춤이면 시작해라
  if(play.innerHTML == "pause"){
    video.play();
  }
})

// 음소거 기능
mute.addEventListener("click",function(){
  video.muted =!video.muted;
  if(video.muted){
    this.innerHTML = "notmute";
  }else{
    this.innerHTML = "mute";
  }
})

volume.addEventListener("input",function(e){
  video.volume = this.value;
})

// fullscreen
// requestFullScreen,fullscreenchange,isFullScreen은 벤더 프리픽스달아야함
fullScreen.addEventListener("click",function(){

  // 벤터프리픽스 적용하기
  container.requestFullscreen = container.requestFullScreen || container.mozRequestFullScreen || container.webkitRequestFullScreen || container.msRequestFullScreen;
  container.requestFullscreen();
  container.style.width = "100%";
})

// webkit
document.addEventListener("webkitfullscreenchange",function(){
  if(!document.webkitisFullScreen){
    container.style.width="300px";
  }
})

// firefox
document.addEventListener("mozfullscreenchange",function(){
  if(!document.mozisFullScreen){
    container.style.width="300px";
  }
})

// MS
document.addEventListener("MSfullscreenchange",function(){
  if(!document.MSisFullScreen){
    container.style.width="300px";
  }
})

// 시간업데이트
function updateTime(time){
  var date = new Date(1000 * time);
  var m = date.getMinutes();
  var s = date.getSeconds();
  console.log(m +" , "+ s)
  current.innerHTML = (m <= 9 ? "0" + m:m) +":" + (s <=9 ? "0" + s:s);
}























