// ====== sketch.js 完整程式碼 ======

let character; // 角色物件
let canvas;    // 畫布物件

// 1. 初始化設定
function setup() {
  // 建立全螢幕畫布
  canvas = createCanvas(windowWidth, windowHeight);
  // 設定背景顏色為 caf0f8
  background('#caf0f8');

  // 在畫面中央建立角色 (參數：x, y, 移動速度)
  character = new SimpleRobot(width / 2, height / 2, 5);
}

// 2. 持續繪製畫面
function draw() {
  // 每一幀重新填滿背景
  background('#caf0f8');

  // 監聽鍵盤左右方向鍵控制移動與轉向
  if (keyIsDown(RIGHT_ARROW)) {
    character.moveRight();
  }
  if (keyIsDown(LEFT_ARROW)) {
    character.moveLeft();
  }

  // 更新動畫與繪製角色
  character.update();
  character.display();
}

// 視窗大小改變時自動調整畫布
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


// ====== 簡單可愛的機器人類別 ======

class SimpleRobot {
  constructor(x, y, speed) {
    this.x = x;            // X 座標
    this.y = y;            // Y 座標
    this.speed = speed;    // 移動速度
    this.direction = 1;    // 1 代表朝右，-1 代表朝左
    this.step = 0;         // 用於計算走路擺動的變數
  }

  // 向右移動
  moveRight() {
    this.x += this.speed;
    this.direction = 1;
    this.step += 0.15; // 移動時增加步伐計數
  }

  // 向左移動
  moveLeft() {
    this.x -= this.speed;
    this.direction = -1;
    this.step += 0.15;
  }

  // 如果沒走路則歸零
  update() {
    if (!keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW)) {
      this.step = 0;
    }
  }

  // 繪製角色
  display() {
    push();
    translate(this.x, this.y); // 移動到角色中心
    scale(this.direction, 1);   // 左右轉向翻轉

    rectMode(CENTER);
    noStroke();

    // 1. 繪製雙腳（利用 sin 產生簡單的交替踏步效果）
    fill('#023e8a');
    let legOffset = sin(this.step) * 8;
    rect(-8, 25 + legOffset, 8, 16, 4); // 左腳
    rect(8, 25 - legOffset, 8, 16, 4);  // 右腳

    // 2. 身體
    fill('#0077b6');
    rect(0, 5, 36, 32, 8);

    // 3. 頭部
    fill('#48cae4');
    rect(0, -22, 30, 24, 6);

    // 4. 眼睛
    fill('#ffffff');
    ellipse(-5, -24, 8, 8);
    ellipse(5, -24, 8, 8);
    fill('#03045e');
    ellipse(-5, -24, 3, 3);
    ellipse(5, -24, 3, 3);

    pop();
  }
}