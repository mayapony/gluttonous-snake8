const GLOBAL = require('./global')
const Square = require('./Square')

function createFood() {
  let x = null,
    y = null,
    include = true,
    rand = null

  rand = Math.round(Math.random() * 10)

  while (include) {
    let flag = false

    x = Math.round(Math.random() * (GLOBAL.td - 1))
    y = Math.round(Math.random() * (GLOBAL.tr - 1))

    GLOBAL.snake.pos.forEach((value) => {
      if (x == value[0] && y == value[1]) {
        flag = true
      }
    })

    if (flag) {
      include = true
    } else {
      include = false
    }

    if (!include) {
      GLOBAL.snake.shitPos.forEach((value) => {
        if (x == value[0] && y == value[1]) {
          flag = true
        }
      })
      if (flag) {
        include = true
      } else {
        include = false
      }
    }
  }
  if (rand == 6 || rand == 9) {
    GLOBAL.hamburger = new Square(x, y, 'hamburger')
    console.log('出现汉堡')
    GLOBAL.hamburger.pos = [x, y]
    GLOBAL.hamburger.create()
    GLOBAL.food = null
  } else {
    GLOBAL.food = new Square(x, y, 'food')
    GLOBAL.food.pos = [x, y]
    GLOBAL.food.create()
    GLOBAL.hamburger = null
  }
}

function createShit() {
  let x = GLOBAL.snake.tail.x,
    y = GLOBAL.snake.tail.y,
    timer = null

  timer = setTimeout(() => {
    GLOBAL.shit = new Square(x / GLOBAL.sw, y / GLOBAL.sh, 'shit')
    GLOBAL.snake.shitPos.push([x / GLOBAL.sw, y / GLOBAL.sh])
    GLOBAL.shit.create()
    GLOBAL.snake.shitSqu.push(GLOBAL.shit)
  }, 200)
}

module.exports = {
  createFood,
  createShit
}
