const URL_DEEZER = "https://deezerdevs-deezer.p.rapidapi.com/search?q="
const audioPlayer = document.getElementById("audio-output")

const fetchAlbum = async function (artist) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "5f71a89e46msh47af0cbc9247d65p156862jsn8326d2e0ee02",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  }
  try {
    const response = await fetch(URL_DEEZER + artist, options)
    const result = await response.json()
    console.log(result)
    return result.data
  } catch (error) {
    console.log(error)
  }
}

const createHorizontalCards = (artist) => {
  const horizontalCardContainer = document.getElementById("horizontalCardContainer")

  fetchAlbum(artist)
    .then((songs) => {
      const slicedSongs = songs.slice(0, 6)
      for (let i = 0; i < slicedSongs.length; i++) {
        const col = document.createElement("div")
        col.classList.add("col", "content-box", "bg-secondary")

        const innerRow = document.createElement("div")
        innerRow.classList.add("row")

        const imgContainer = document.createElement("div")
        imgContainer.classList.add("col-4")

        // Link all'album page anche qui?
        const albumImg = document.createElement("img")
        albumImg.classList.add("img-fluid")
        albumImg.src = slicedSongs[i].album.cover_medium
        albumImg.alt = slicedSongs[i].album.title

        const textContainer = document.createElement("div")
        textContainer.classList.add("col-8")

        const text = document.createElement("h5")
        text.innerText = slicedSongs[i].title

        imgContainer.appendChild(albumImg)
        innerRow.appendChild(imgContainer)
        textContainer.appendChild(text)
        innerRow.appendChild(textContainer)
        col.appendChild(innerRow)
        horizontalCardContainer.appendChild(col)
      }
    })
    .catch((err) => console.log(err))
}

const createVerticalCards = (artist) => {
  const verticalCardsContainer = document.getElementById("verticalCardsContainer")

  fetchAlbum(artist)
    .then((songs) => {
      const slicedSongs = songs.slice(0, 5)
      for (let i = 0; i < slicedSongs.length; i++) {
        const col = document.createElement("div")
        col.classList.add("col")

        const card = document.createElement("div")
        card.classList.add("card", "height-300", "bg-secondary", "text-white")

        const anchorImg = document.createElement("a")
        anchorImg.href = `/album.html?id=${slicedSongs[i].album.id}`

        const img = document.createElement("img")
        img.classList.add("card-img-top")
        img.src = slicedSongs[i].album.cover_medium
        img.alt = slicedSongs[i].album.title

        const cardBody = document.createElement("div")
        cardBody.classList.add("card-body")

        const anchorTitle = document.createElement("a")
        anchorTitle.href = `/album.html?id=${slicedSongs[i].album.id}`

        const title = document.createElement("h5")
        title.classList.add("card-title", "text-2")
        title.innerText = slicedSongs[i].album.title

        const anchorArtist = document.createElement("a")
        anchorArtist.href = `/artist.html?id=${slicedSongs[i].artist.id}`

        const artistName = document.createElement("p")
        artistName.classList.add("card-text", "text-2")
        artistName.innerText = slicedSongs[i].artist.name

        anchorImg.appendChild(img)
        card.appendChild(anchorImg)
        anchorTitle.appendChild(title)
        cardBody.appendChild(anchorTitle)
        anchorArtist.appendChild(artistName)
        cardBody.appendChild(anchorArtist)
        card.appendChild(cardBody)
        col.appendChild(card)
        verticalCardsContainer.appendChild(col)
      }
    })
    .catch((err) => console.log(err))
}

const playAudio = function (url) {
  audioPlayer.src = url
  audioPlayer.play()
}

const stopAudio = function () {
  if (audioPlayer.paused !== true) {
    audioPlayer.pause()
  } else {
    audioPlayer.play()
  }
}

addEventListener("DOMContentLoaded", () => {
  createHorizontalCards("Eminem")
  createVerticalCards("Ruggero dei Timidi")
  createVerticalCards("Ghali")
  createVerticalCards("Billie Eilish")
})
