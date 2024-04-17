const audioPlayer = document.getElementById("audio-output")
const audioProgressBar = document.getElementById("audioProgressBar")
const playIcon = document.getElementById("playIcon")
let volume = 1

const loadNewSong = function (url) {
  audioPlayer.src = url
}

const handlePlayerAudioButton = function () {
  if (audioPlayer.paused !== true) {
    audioPlayer.pause()
  } else {
    audioPlayer.play()
    audioPlayer.volume = volume
  }
}

audioProgressBar.oninput = function () {
  audioPlayer.volume = audioProgressBar.value / 100
  volume = audioPlayer.volume
  console.log(audioProgressBar.value / 100)
}

addEventListener("DOMContentLoaded", () => {
  playIcon.addEventListener("click", handlePlayerAudioButton)
  audioProgressBar.value = 100
})

loadNewSong("https://cdns-preview-6.dzcdn.net/stream/c-655dfb802c35579d26a32136e3d0e7b3-12.mp3")
