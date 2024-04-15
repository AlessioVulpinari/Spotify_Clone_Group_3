//search-page creata qua per ora, domani vediamo
document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault()

  const inputForm = document.getElementById("artist")
  const textForm = inputForm.value
  console.log(textForm)
  const URL = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${textForm}`
  fetch(URL, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7bb7b892camsh19e62b97b35c5eap18efcajsn2826de1cc4bd",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Unable to fetch product details")
      }
      return response.json()
    })
    .then(data => {
      console.log(data)
      const results = data.data
      renderResults(results)
    })
    .catch(error => {
      console.error("Error:", error)
    })
})

function renderResults(results) {
  const resultsContainer = document.getElementById("startCard")

  resultsContainer.innerHTML = ""

  results.forEach(result => {
    const colCard = document.createElement("div")
    colCard.classList.add("col-lg-3", "col-md-6", "col-sm-12", "mb-4")
    const card = document.createElement("div")
    card.classList.add("card", "m-2", "bg-dark", "grey-text")

    const imgLink = document.createElement("a")
    imgLink.href = "#" // link pagina album qui
    const img = document.createElement("img")
    img.classList.add("img-fluid")
    img.src = result.album.cover_medium
    img.alt = result.album.title
    card.appendChild(img)

    const titleLink = document.createElement("a")
    titleLink.href = "#" //link pagina album
    titleLink.textContent = result.title
    const title = document.createElement("h5")
    title.appendChild(titleLink)
    card.appendChild(title)

    const artistLink = document.createElement("a")
    artistLink.href = "#" //link pagina artista
    const artistName = document.createElement("p")
    artistName.textContent = result.artist.name
    card.appendChild(artistName)

    const link = document.createElement("a")
    link.href = result.link
    link.textContent = "Ascolta su Deezer"
    card.appendChild(link)

    colCard.appendChild(card)
    resultsContainer.appendChild(colCard)
  })
}
