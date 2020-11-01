var voiceStatus = true // 默认有声

var voiceBtn = document.querySelector('.show img')

voiceBtn.onclick = (event) => {
  event.stopPropagation()
  console.log('我被点了')
  let audio = document.getElementById('music1')

  if (audio !== null) {
    if (audio.paused) {
      audio.play()
      voiceStatus = true
      voiceBtn.setAttribute('src', './images/open.png')
    } else {
      audio.pause() // 这个就是暂停
      voiceStatus = false
      voiceBtn.setAttribute('src', './images/off.png')
    }
  }
}

function eatAudio() {
  let audio = document.getElementById('eat')

  if (audio !== null && voiceStatus) {
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
      audio.play()
    }
  }
}

module.exports = eatAudio
