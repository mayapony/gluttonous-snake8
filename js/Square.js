const GLOBAL = require('./global')

function Square(x, y, className) {
  this.x = x * GLOBAL.sw
  this.y = y * GLOBAL.sh
  this.class = className

  this.viewContent = document.createElement('div')
  this.viewContent.className = this.class
  this.parent = document.getElementById('snakeWrap')
}

Square.prototype.create = function () {
  // 创建方块DOM
  this.viewContent.style.position = 'absolute'
  this.viewContent.style.width = GLOBAL.sw + 'px'
  this.viewContent.style.height = GLOBAL.sh + 'px'
  this.viewContent.style.left = this.x + 'px'
  this.viewContent.style.top = this.y + 'px'

  this.parent.appendChild(this.viewContent)
}

Square.prototype.remove = function () {
  this.parent.removeChild(this.viewContent)
}

module.exports = Square
