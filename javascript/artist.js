const params = new URLSearchParams(window.location.search)
const id = params.get("id")
const URL_ARTIST = "https://deezerdevs-deezer.p.rapidapi.com/artist/"
const URL_TRACKLIST_PROXY = `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=10`
const API_KEY = "088f517bd4msh33faf2f02471acfp15abc8jsnf340e72fad46"
const API_HOST = "deezerdevs-deezer.p.rapidapi.com"

const handleBackground = function (obj) {
  const background = document.getElementById("background")
  const artistName = document.getElementById("artist-name")
  background.style.backgroundImage = `linear-gradient(transparent, #121212, #121212), url(${obj.data[0].contributors[0].picture_xl})`
  artistName.innerText = obj.data[0].artist.name
}

const handleCreateCards = function (albumObj) {
  const cardContainer = document.getElementById("cards-row")

  for (let i = 0; i < albumObj.data.length; i++) {
    const col = document.createElement("div")
    col.classList.add("col")

    const albumInfo = {
      preview: albumObj.data[i].preview,
      cover: albumObj.data[i].album.cover_medium,
      songName: albumObj.data[i].title,
      artist: albumObj.data[i].artist.name,
      artistId: albumObj.data[i].artist.id,
      albumId: albumObj.data[i].album.id,
    }

    const card = document.createElement("div")
    card.classList.add("track-card", "d-flex", "align-items-center", "justify-content-between", "cursor-pointer")
    card.addEventListener("click", () => {
      loadNewSong(albumInfo)
    })

    const innerCardContainer = document.createElement("div")
    innerCardContainer.classList.add("d-flex", "align-items-center", "gap-3")

    const iconContainer = document.createElement("div")
    iconContainer.classList.add("icon-container", "d-flex", "align-items-center", "justify-content-start")

    const number = document.createElement("span")
    number.innerText = i + 1

    const icon = document.createElement("i")
    icon.classList.add("bi", "bi-play-fill")

    const textContainer = document.createElement("div")
    textContainer.classList.add("d-flex", "flex-column")

    const anchorTitle = document.createElement("a")

    const title = document.createElement("h5")
    title.innerText = albumObj.data[i].title

    const anchorArtist = document.createElement("a")

    const artist = document.createElement("small")
    artist.innerText = albumObj.data[i].artist.name

    const songStreamContainer = document.createElement("div")

    const songStream = document.createElement("p")
    songStream.innerText = albumObj.data[i].rank

    const svgContainer = document.createElement("div")
    svgContainer.classList.add("d-flex", "align-items-center", "justify-content-between", "gap-3")

    const svgPlusIcon = document.createElement("svg")
    svgPlusIcon.innerHTML = `
    <svg
        data-encore-id="icon"
        role="img"
        aria-hidden="true"
        viewBox="0 0 24 24"
        class="Svg-sc-ytk21e-0 cqasRA plus-icon"
    >
        <path
            d="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z">
        </path>
        <path
            d="M17.999 12a1 1 0 0 1-1 1h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0v4h4a1 1 0 0 1 1 1z">
        </path>
    </svg>`

    const innerSvgContainer = document.createElement("div")
    innerSvgContainer.classList.add("d-flex", "align-items-center", "justify-content-end", "gap-1")

    const trackDuration = document.createElement("p")
    trackDuration.innerText = formatDuration(albumObj.data[i].duration)

    const treeDotsIcon = document.createElement("svg")
    treeDotsIcon.innerHTML = `      
    <svg
        data-encore-id="icon"
        role="img"
        aria-hidden="true"
        viewBox="0 0 24 24"
        class="Svg-sc-ytk21e-0 cqasRA other-icon">
        <path
        d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z">
        </path>
    </svg>`

    iconContainer.appendChild(number)
    iconContainer.appendChild(icon)
    svgContainer.appendChild(svgPlusIcon)
    innerSvgContainer.appendChild(trackDuration)
    innerSvgContainer.appendChild(treeDotsIcon)
    svgContainer.appendChild(innerSvgContainer)
    songStreamContainer.appendChild(songStream)
    anchorTitle.appendChild(title)
    textContainer.appendChild(anchorTitle)
    anchorArtist.appendChild(artist)
    textContainer.appendChild(anchorArtist)
    innerCardContainer.appendChild(iconContainer)
    innerCardContainer.appendChild(textContainer)
    card.appendChild(innerCardContainer)
    card.appendChild(songStreamContainer)
    card.appendChild(svgContainer)
    col.appendChild(card)
    cardContainer.appendChild(col)
  }
}

const handleCreateAlbumCover = function (albumObj) {
  const slicedAlbumObj = albumObj.data.slice(0, 5)
  slicedAlbumObj.forEach((obj) => {
    const row = document.getElementById("album-row")

    const albumCard = document.createElement("div")

    const innerAnchor = document.createElement("a")
    innerAnchor.href = "/album.html?id=" + obj.album.id

    const innerCard = document.createElement("div")
    innerCard.classList.add("card")

    const albumCover = document.createElement("img")
    albumCover.classList.add("card-img-top")
    albumCover.src = obj.album.cover_medium
    albumCover.alt = obj.album.title

    const textContainer = document.createElement("div")

    const svgCircle = document.createElement("svg")
    svgCircle.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-play-circle-fill play-btn" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
    </svg> `

    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")

    const albumTitle = document.createElement("h6")
    albumTitle.innerText = obj.album.title

    const albumInfo = document.createElement("p")
    albumInfo.innerText = formatDuration(obj.duration) + " • Album"

    cardBody.appendChild(albumTitle)
    cardBody.appendChild(albumInfo)
    textContainer.appendChild(svgCircle)
    textContainer.appendChild(cardBody)
    innerCard.appendChild(albumCover)
    innerCard.appendChild(textContainer)
    innerAnchor.appendChild(innerCard)
    albumCard.appendChild(innerAnchor)
    row.appendChild(albumCard)
  })
}

const getRandomArtist = function () {
  fetch(URL_ARTIST + getRandomIntInclusive(1, 1000), {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Failed to fetch artist id")
      }
    })
    .then((data) => {
      console.log(data)
      handleCreateArtistCard(data)
    })
    .catch((error) => {
      console.log("Error:", error)
    })
}

const handleCreateArtistCard = function (obj) {
  console.log(obj)
  const row = document.getElementById("artist-row")

  const card = document.createElement("div")
  card.classList.add("rec-card")

  const innerAnchor = document.createElement("a")
  innerAnchor.href = "/artist.html?id=" + obj.id

  const innerCard = document.createElement("div")
  innerCard.classList.add("card")

  const imgArtist = document.createElement("img")
  imgArtist.src = obj.picture_medium
  imgArtist.classList.add("card-img-top", "rec-cover")
  imgArtist.alt = obj.name

  const textContainer = document.createElement("div")

  const svgCircle = document.createElement("svg")
  svgCircle.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-play-circle-fill play-btn" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
    </svg> `

  const cardBody = document.createElement("div")
  cardBody.classList.add("card-body")

  const artistName = document.createElement("h6")
  artistName.innerText = obj.name
  artistName.id = "card-album-cover"

  const artist = document.createElement("p")
  artist.classList.add("card-text")
  artist.id = "card-info"
  artist.innerText = "Artist"

  cardBody.appendChild(artistName)
  cardBody.appendChild(artist)
  textContainer.appendChild(svgCircle)
  textContainer.appendChild(cardBody)
  innerCard.appendChild(imgArtist)
  innerCard.appendChild(textContainer)
  innerAnchor.appendChild(innerCard)
  card.appendChild(innerAnchor)
  row.appendChild(card)
}

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

// duration function
const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${hours}h ${minutes}min`
}

window.addEventListener("DOMContentLoaded", () => {
  if (!id) {
    console.log("No song id has been found in URL.")
  }

  fetch(URL_TRACKLIST_PROXY, {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Failed to fetch songs id")
      }
    })
    .then((data) => {
      handleBackground(data)
      handleCreateCards(data)
      handleCreateAlbumCover(data)
      for (let i = 0; i < 5; i++) {
        getRandomArtist()
      }
    })
    .catch((error) => {
      console.log("Error:", error)
    })
})
