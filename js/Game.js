const GLOBAL = require('./global')
const Snake = require('./Snake')
const Square = require('./Square')
var {createFood} = require('./Create')

function Game() {
  this.timer = null
  this.score = 0
}

Game.prototype.init = function () {
  GLOBAL.snake.init()
  createFood()
  document.onkeydown = (ev) => {
    // 左37 上 右下
    if (
      (ev.which == 37 || ev.which == 65) &&
      GLOBAL.snake.direction != GLOBAL.snake.directionNum.right
    ) {
      GLOBAL.snake.direction = GLOBAL.snake.directionNum.left
    } else if (
      (ev.which == 38 || ev.which == 87) &&
      GLOBAL.snake.direction != GLOBAL.snake.directionNum.down
    ) {
      GLOBAL.snake.direction = GLOBAL.snake.directionNum.up
    } else if (
      (ev.which == 39 || ev.which == 68) &&
      GLOBAL.snake.direction != GLOBAL.snake.directionNum.left
    ) {
      GLOBAL.snake.direction = GLOBAL.snake.directionNum.right
    } else if (
      (ev.which == 40 || ev.which == 83) &&
      GLOBAL.snake.direction != GLOBAL.snake.directionNum.up
    ) {
      GLOBAL.snake.direction = GLOBAL.snake.directionNum.down
    }
    return false
  }
  this.start()
}

Game.prototype.start = function () {
  this.timer = setInterval(function () {
    GLOBAL.snake.getNextPos() 
  }, 200 - GLOBAL.game.score * 10)
}

Game.prototype.pause = function () {
  clearInterval(this.timer)
}

Game.prototype.over = function () {
  clearInterval(this.timer)
  alert('您的得分为：' + this.score)

  // 状态恢复
  let snakeWrap = document.getElementById('snakeWrap')
  snakeWrap.innerHTML = `
    <div class="show">
    <img src="./images/open.png" alt="音量">
    <div class="score">分数: 0</div>
    </div>
  `
  let scorer = document.getElementsByClassName('score')[0]
  scorer.innerHTML = '分数：0'

  GLOBAL.snake = new Snake()
  GLOBAL.game = new Game()
  let startBtnWrap = document.querySelector('.startBtn')
  startBtnWrap.style.display = 'block'
}

var snakeWrap = document.getElementById('snakeWrap')
var pauseBtn = document.querySelector('.pauseBtn button')
var startBtn = document.querySelector('.startBtn button')

startBtn.onclick = function () {
  startBtn.parentNode.style.display = 'none'
  GLOBAL.game.init()
}

snakeWrap.onclick = function () {
  GLOBAL.game.pause()
  pauseBtn.parentNode.style.display = 'block'
}

pauseBtn.onclick = function () {
  GLOBAL.game.start()
  pauseBtn.parentNode.style.display = 'none'
}

module.exports = Game
