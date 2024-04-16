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
    console.log(result)
    return result.data
  } catch (error) {
    console.log(error)
  }
}

const createHorizontalCards = () => {
  const horizontalCardContainer = document.getElementById("horizontalCardContainer")

  fetchAlbum("Eminem")
    .then((songs) => {
      const slicedSongs = songs.slice(0, 6)
      for (let i = 0; i < slicedSongs.length; i++) {
        const col = document.createElement("div")
        col.classList.add("col")

        const innerRow = document.createElement("div")
        innerRow.classList.add("row")

        const imgContainer = document.createElement("div")
        imgContainer.classList.add("col-4")

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
        card.classList.add("card", "height-300")

        const img = document.createElement("img")
        img.classList.add("card-img-top")
        img.src = slicedSongs[i].album.cover_medium
        img.alt = slicedSongs[i].album.title

        const cardBody = document.createElement("div")
        cardBody.classList.add("card-body")

        const title = document.createElement("h5")
        title.classList.add("card-title")
        title.innerText = slicedSongs[i].album.title

        const songName = document.createElement("p")
        songName.classList.add("card-text", "text-2")
        songName.innerText = slicedSongs[i].title

        card.appendChild(img)
        cardBody.appendChild(title)
        cardBody.appendChild(songName)
        card.appendChild(cardBody)
        col.appendChild(card)
        verticalCardsContainer.appendChild(col)
      }
    })
    .catch((err) => console.log(err))
}

addEventListener("DOMContentLoaded", () => {
  createHorizontalCards()
  createVerticalCards("Ruggero dei Timidi")
  createVerticalCards("Ghali")
  createVerticalCards("Gigi d'Alessio")
})
