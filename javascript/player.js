const audioPlayer = document.getElementById("audio-output")
const audioProgressBar = document.getElementById("audioProgressBar")
const playIcon = document.getElementById("playIcon")
let volume = 1

const loadNewSong = function (album) {
  if (album.preview !== "") {
    audioPlayer.src = album.preview
    audioPlayer.play()
    setInterval(handlePlayerBar, 1000)
  }

  const coverLink = document.getElementById("coverLink")
  coverLink.href = `/album.html?id=${album.albumId}`
  const trackCover = document.getElementById("trackCover")
  trackCover.src = album.cover

  const trackLink = document.getElementById("trackLink")
  trackLink.href = `/album.html?id=${album.albumId}`
  const trackTitle = document.getElementById("trackTitle")
  trackTitle.innerText = album.songName

  const artistLink = document.getElementById("artistLink")
  artistLink.href = `/album.html?id=${album.artistId}`
  const trackArtist = document.getElementById("trackArtist")
  trackArtist.innerText = album.artist
}

const handlePlaySalmo = function () {
  audioPlayer.src = "https://cdns-preview-a.dzcdn.net/stream/c-a97dcc722aae5375f05d9a74f9d69a76-3.mp3"
  audioPlayer.play()
  setInterval(handlePlayerBar, 1000)

  const coverLink = document.getElementById("coverLink")
  const trackCover = document.getElementById("trackCover")
  trackCover.src = "https://e-cdns-images.dzcdn.net/images/artist/c81faf6a9e1eadf4d174c379bfcd6312/56x56-000000-80-0-0.jpg"

  const trackLink = document.getElementById("trackLink")
  const trackTitle = document.getElementById("trackTitle")
  trackTitle.innerText = "VIOLA (feat. Salmo)"

  const artistLink = document.getElementById("artistLink")
  const trackArtist = document.getElementById("trackArtist")
  trackArtist.innerText = "Fedez & Salmo"
}

const handlePlayerAudioButton = function () {
  if (audioPlayer.paused !== true) {
    audioPlayer.pause()
  } else {
    audioPlayer.play()
    audioPlayer.volume = volume
  }
}

const handlePlayerBar = function () {
  if (audioPlayer.src !== "" && audioPlayer.paused !== true) {
    const playerBar = document.getElementById("playerBar")
    const startTimeContainer = document.getElementById("startTime")
    const time = audioPlayer.currentTime
    startTimeContainer.innerText = "0:" + Math.trunc(time)

    playerBar.style.width = (100 * time) / 30 + "%"
  }
}

audioProgressBar.oninput = function () {
  audioPlayer.volume = audioProgressBar.value / 100
  volume = audioPlayer.volume
  console.log(audioProgressBar.value / 100)
}

addEventListener("DOMContentLoaded", () => {
  const playSalmo = document.getElementById("playSalmo")
  playSalmo.addEventListener("click", handlePlaySalmo)
  playIcon.addEventListener("click", handlePlayerAudioButton)
  audioProgressBar.value = 100
})
