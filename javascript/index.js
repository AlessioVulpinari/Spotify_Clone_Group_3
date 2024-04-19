const URL_DEEZER = "https://deezerdevs-deezer.p.rapidapi.com/search?q="

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

        const anchorCard = document.createElement("a")
        anchorCard.classList.add("cursor-pointer")

        const albumInfo = {
          preview: slicedSongs[i].preview,
          cover: slicedSongs[i].album.cover_small,
          songName: slicedSongs[i].title,
          artist: slicedSongs[i].artist.name,
          artistId: slicedSongs[i].artist.id,
          albumId: slicedSongs[i].album.id,
        }

        anchorCard.addEventListener("click", () => {
          loadNewSong(albumInfo)
        })

        const text = document.createElement("h5")
        text.innerText = slicedSongs[i].title

        imgContainer.appendChild(albumImg)
        innerRow.appendChild(imgContainer)
        anchorCard.appendChild(text)
        textContainer.appendChild(anchorCard)
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

const handlePlaySalmo = function () {
  audioPlayer.src = "https://cdns-preview-a.dzcdn.net/stream/c-a97dcc722aae5375f05d9a74f9d69a76-3.mp3"
  audioPlayer.play()
  setInterval(handlePlayerBar, 1000)

  const coverLink = document.getElementById("coverLink")
  coverLink.href = `/album.html?id=366045987`
  const trackCover = document.getElementById("trackCover")
  trackCover.src = "https://e-cdns-images.dzcdn.net/images/artist/c81faf6a9e1eadf4d174c379bfcd6312/56x56-000000-80-0-0.jpg"

  const trackLink = document.getElementById("trackLink")
  trackLink.href = `/album.html?id=366045987`
  const trackTitle = document.getElementById("trackTitle")
  trackTitle.innerText = "VIOLA (feat. Salmo)"

  const artistLink = document.getElementById("artistLink")
  artistLink.href = `/artist.html?id=3239781`
  const trackArtist = document.getElementById("trackArtist")
  trackArtist.innerText = "Fedez & Salmo"
}

addEventListener("DOMContentLoaded", () => {
  createHorizontalCards("Eminem")
  createVerticalCards("Ruggero dei Timidi")
  createVerticalCards("Ghali")
  createVerticalCards("Billie Eilish")

  const playSalmo = document.getElementById("playSalmo")
  playSalmo.addEventListener("click", handlePlaySalmo)
})
