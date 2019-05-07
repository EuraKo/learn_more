// canvas path
var canvas = document.getElementById("canvas");

// 2차원 도형을 그리기 위한 컨텍스트를 생성
var ctx = canvas.getContext("2d");

function drawStrokeRect() {

    // 패스 작성의 시작
    ctx.beginPath();

    // 펜의 위치를 10,10으로 이동시킨다.
    ctx.moveTo(10, 10);

    // (10,10)>(110,10)>(110,110)>(10,110)으로 이동하면서 선을 그림
    ctx.lineTo(110, 10);
    ctx.lineTo(110, 110);
    ctx.lineTo(10, 110);

    // 작성중인 패스를 닫음 (10,110)에서 (10,10)으로 선이 연결됨
    ctx.closePath();

    // stroke()함수를 호출하여 선을 그린다.
    ctx.stroke();

}

function drawFillRect() {
    ctx.beginPath();
    ctx.moveTo(160, 10);
    ctx.lineTo(260, 10);
    ctx.lineTo(260, 110);
    ctx.lineTo(160, 110);

    // fill()을 호출하여 안이 채워진 사각형이 호출되며 자동으로 closePath()함수가 호출된다
    ctx.fill();
}
drawStrokeRect();
drawFillRect();

// ===========================================

// canvas arc
var canvasArc = document.getElementById("canvasArc");
var ctxArc = canvasArc.getContext("2d");

function drawArc() {
    ctxArc.beginPath();

    // 원을 그리는 거라서 원의 중심부로 이동하는것
    ctxArc.moveTo(75, 75);
    ctxArc.lineTo(125, 75);
    // (75,75)지점에서 시작하는 50 반지름을 가진원이 시작은 0도이며 끝의 각도는 90이며 방향은 반시계방향이다.
    ctxArc.arc(75, 75, 50, 0, Math.PI / 180 * 90, true);
    ctxArc.closePath();
    ctxArc.stroke();

    // 새로운 path가 시작될 땐 꼭 beginPath를 줘야한다.
    ctxArc.beginPath();
    ctxArc.moveTo(85, 85);
    ctxArc.lineTo(135, 85);
    ctxArc.arc(85, 85, 50, 0, Math.PI / 180 * 90, false);
    ctxArc.fill();

}


drawArc();

// ==================================
// bezier curve
var canvasBezier = document.getElementById("canvasBezier");
var ctxBezier = canvasBezier.getContext("2d");

function speechBaloon() {
    ctxBezier.beginPath();
    ctxBezier.moveTo(75, 25);
    ctxBezier.quadraticCurveTo(25, 25, 25, 62.5);
    ctxBezier.quadraticCurveTo(25, 100, 50, 100);
    ctxBezier.quadraticCurveTo(50, 120, 30, 125);
    ctxBezier.quadraticCurveTo(60, 120, 65, 100);
    ctxBezier.quadraticCurveTo(125, 100, 125, 62.5);
    ctxBezier.quadraticCurveTo(125, 25, 75, 25);
    ctxBezier.stroke();
}

function heart() {
    ctxBezier.beginPath();
    ctxBezier.moveTo(275, 40);
    ctxBezier.bezierCurveTo(275, 37, 270, 25, 250, 25);
    ctxBezier.bezierCurveTo(220, 25, 220, 62.5, 220, 62.5);
    ctxBezier.bezierCurveTo(220, 80, 240, 102, 275, 120);
    ctxBezier.bezierCurveTo(310, 102, 330, 80, 330, 62.5);
    ctxBezier.bezierCurveTo(330, 62.5, 330, 25, 300, 25);
    ctxBezier.bezierCurveTo(285, 25, 275, 37, 275, 40);
    ctxBezier.fill();
}
speechBaloon();
heart();

// ==========================

// 색상 스타일

var canvasColor = document.getElementById("canvasColor");
var ctxColor = canvasColor.getContext("2d");
var rectWidth = 15;

function drawFillColorRect() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {

            // Math.floor함수는 실수값의 소수점이하를 버리고 정수로 치환해줌
            ctxColor.fillStyle = 'rgba(' + Math.floor(255 - 25.5 * i) + ',' + Math.floor(255 - 25.5 * j) + ',0,' + i / 10.0 + ')';
            ctxColor.fillRect(j * rectWidth, i * rectWidth, rectWidth,
                rectWidth);
        }
    }
}

function drawStrokeColorRect() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            ctxColor.strokeStyle = "rgb(" + Math.floor(255 - 25.5 * i) + "," + Math.floor(255 - 25.5 * j) + ",0)";
            ctxColor.strokeRect(300 + j * rectWidth, i * rectWidth, rectWidth, rectWidth);
        }
    }
}

drawFillColorRect();
drawStrokeColorRect();


// =====================================

// 선의 스타일
var canvasLine = document.getElementById("canvasLine");
var ctxLine = canvasLine.getContext("2d");

// 라인그리기
function drawLine() {
    for (var i = 0; i < 10; i++) {
        ctxLine.beginPath();
        ctxLine.lineWidth = 1 + i;
        ctxLine.moveTo(5, 5 + 15 * i);
        ctxLine.lineTo(145, 5 + 15 * i);
        ctxLine.stroke();
    }
}

// 캡모양
var caps = ["buff", "round", "square"];

function drawCap() {

    ctxLine.fillStyle = "#add";
    ctxLine.fillRect(250, 20, 110, 110);
    ctxLine.lineWidth = 15;
    for (var i = 0; i < caps.length; i++) {
        ctxLine.beginPath();
        ctxLine.lineCap = caps[i];
        ctxLine.moveTo(250, 50 + 30 * i);
        ctxLine.lineTo(360, 50 + 30 * i);
        ctxLine.stroke();
    }

}

// 모서리 모양
var join = ["round", "bevel", "miter"];

function drawJoin() {

    ctxLine.lineWidth = 20;
    for (var i = 0; i < join.length; i++) {
        ctxLine.beginPath();
        ctxLine.lineJoin = join[i];
        ctxLine.moveTo(450 + 30 * i, 10);
        ctxLine.lineTo(450 + 30 * i, 135 - 30 * i);
        ctxLine.lineTo(580, 135 - 30 * i);
        ctxLine.stroke();
    }
}
drawLine();
drawCap();
drawJoin();