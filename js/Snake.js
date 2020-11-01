const GLOBAL = require('./global')
const {createFood, createShit} = require('./Create')
const Square = require('./Square')
const eatVoice = require('./Voice')

// 蛇
function Snake() {
  this.head = null // 存储蛇头的信息
  this.tail = null
  this.pos = [] // 存储每一个方块的位置
  this.shitPos = []
  this.shitSqu = []
  this.status = false // 是否为老八状
  this.directionNum = {
    // 存储蛇走的方向
    left: {
      x: -1,
      y: 0,
      rotate: 180
    },
    right: {
      x: 1,
      y: 0,
      rotate: 0
    },
    up: {
      x: 0,
      y: -1,
      rotate: -90
    },
    down: {
      x: 0,
      y: 1,
      rotate: 90
    }
  }
}

Snake.prototype.init = function () {
  let snakeHead = new Square(2, 0, 'snakeHead')
  snakeHead.create()
  this.head = snakeHead
  // 测试head是否正确
  console.log(this.head)
  console.log(snakeHead)
  console.log(GLOBAL.snake.head)

  this.pos.push([2, 0]) // 蛇头位置存储

  let snakeBody1 = new Square(1, 0, 'snakeBody')
  snakeBody1.create()
  this.pos.push([1, 0])

  let snakeBody2 = new Square(0, 0, 'snakeBody')
  snakeBody2.create()
  this.pos.push([0, 0])
  this.tail = snakeBody2

  // ! 形成链表关系
  snakeHead.last = null
  snakeHead.next = snakeBody1

  snakeBody1.last = snakeHead
  snakeBody1.next = snakeHead

  snakeBody2.last = snakeBody1
  snakeBody2.next = null

  // 给蛇添加方向属性
  this.direction = this.directionNum.right
}

Snake.prototype.getNextPos = function () {
  let nextPos = [
    this.head.x / GLOBAL.sw + this.direction.x,
    this.head.y / GLOBAL.sh + this.direction.y
  ]
  // 身体
  let selfCollied = false
  this.pos.forEach(function (value) {
    // 数组也是对象，对象比较也会比较地址 所以不能直接 value == nextPos
    if (value[0] === nextPos[0] && value[1] === nextPos[1]) {
      selfCollied = true
      console.log('碰到了自己')
    }
  })
  if (selfCollied) {
    this.strategies.die.call(this)
    return
  }
  // 撞到便便
  let shitCollied = false
  this.shitPos.forEach(function (shit) {
    if (shit[0] === nextPos[0] && shit[1] === nextPos[1]) {
      shit[0] = -1
      shit[1] = -1
      shitCollied = true
    }
  })
  if (shitCollied) {
    if (GLOBAL.snake.status) {
      console.log(GLOBAL.snake.status)
      this.strategies.move.call(this)
      this.shitSqu.forEach(function (squ) {
        if (squ.x / GLOBAL.sw == nextPos[0] && squ.y / GLOBAL.sh == nextPos[1]) {
          squ.remove()
        }
      })
      console.log('吃了便便')
    } else {
      console.log('撞到了便便')
      this.strategies.die.call(this)
    }
    return
  }
  // 墙
  if (nextPos[0] < 0 || nextPos[0] > 29 || nextPos[1] < 0 || nextPos[1] > 29) {
    console.log('碰到了墙')
    this.strategies.die.call(this)
    return
  }
  // 苹果
  if (GLOBAL.food && GLOBAL.food.pos[0] == nextPos[0] && GLOBAL.food.pos[1] == nextPos[1]) {
    console.log('撞到食物了')

    this.strategies.eat.call(this, true)
    return
  }
  // 汉堡
  if (
    GLOBAL.hamburger &&
    GLOBAL.hamburger.pos[0] == nextPos[0] &&
    GLOBAL.hamburger.pos[1] == nextPos[1]
  ) {
    console.log('撞到汉堡了')
    this.strategies.eat.call(this, false)
    GLOBAL.snake.status = true
    setTimeout(() => {
      GLOBAL.snake.status = false
    }, 3000)
    return
  }
  // 之外
  this.strategies.move.call(this)
}

Snake.prototype.strategies = {
  move: function (format) {
    console.log('move')
    let newBody = new Square(this.head.x / GLOBAL.sw, this.head.y / GLOBAL.sh, 'snakeBody')

    newBody.next = this.head.next
    newBody.next.last = newBody
    newBody.last = null

    this.head.remove()
    newBody.create()

    var newHead = new Square(
      this.head.x / GLOBAL.sw + this.direction.x,
      this.head.y / GLOBAL.sh + this.direction.y,
      'snakeHead'
    )
    newHead.viewContent.style.transform =
      'rotate(' + this.direction.rotate + 'deg)'

    newHead.create()
    newHead.next = newBody
    newHead.last = null
    newBody.last = newHead

    // !splice(位置，替换几个，用于替换的) 方法可以实现插入
    this.pos.splice(0, 0, [
      this.head.x / GLOBAL.sw + this.direction.x,
      this.head.y / GLOBAL.sh + this.direction.y
    ])
    this.head = newHead

    if (!format) {
      this.tail.remove()
      this.tail = this.tail.last
      this.pos.pop()
    }
  },
  eat: function (type) {
    this.strategies.move.call(this, true)
    eatVoice()
    if (type) {
      GLOBAL.food.remove()
    } else {
      GLOBAL.hamburger.remove()
    }
    createFood()
    createShit()
    GLOBAL.game.score++
    let scorer = document.getElementsByClassName('score')[0]
    scorer.innerHTML = '分数：' + GLOBAL.game.score
  },
  die: () => {
    console.log('die')
    GLOBAL.game.over()
  }
}

module.exports = Snake
