var canvas = document.getElementById("canvas");

// getContext() 2차원 도형을 그리기 위한 컨텍스트 생성
var ctx = canvas.getContext("2d");
function drawRect(){

  // 25,25좌표에서 가로 100,세로100으로 속이채워진 사각형을 그린다
  ctx.fillRect(25,25,100,100)
  // 45,45좌표에서 가로 60 세로60으로 사각형 영역을 지운다
  ctx.clearRect(45,45,60,60)
  // 50,50좌표에서 가로세로 50만큼 속이 비워진 사각형을 그린다.
  ctx.strokeRect(50,50,50,50)
}
drawRect();