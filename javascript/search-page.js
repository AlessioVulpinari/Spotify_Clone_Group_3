function createStaticCards() {
  const staticContainer = document.getElementById("genreStatic")

  for (let i = 1; i <= 40; i++) {
    const colCard = document.createElement("div")
    colCard.classList.add("col-xl-2", "col-lg-3", "col-md-6", "col-sm-12", "mb-4")
    const card = document.createElement("div")
    card.classList.add("card", "static-card", "m-2", "bg-transparent", "grey-text", "rounded-sm")
    const imgLink = document.createElement("a")
    const img = document.createElement("img")
    img.classList.add("img-fluid", "rounded-sm")
    img.src = `assets/imgs/search/image-${i}.jpg`
    img.alt = `Image ${i}`
    imgLink.appendChild(img)
    card.appendChild(imgLink)
    colCard.appendChild(card)
    staticContainer.appendChild(colCard)
  }
}

window.addEventListener("DOMContentLoaded", createStaticCards)

document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault()

  const staticContainer = document.getElementById("genreStatic")
  staticContainer.innerHTML = ""
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
      if (data && data.data && data.data.length > 0) {
        const results = data.data
        renderResults(results)
      } else {
        const inputForm = document.getElementById("artist")
        const textForm = inputForm.value.trim()
        if (textForm === "") {
          createStaticCards()
        } else {
          const resultsContainer = document.getElementById("startCard")
          resultsContainer.innerHTML = "<p>Nessun risultato trovato.</p>"
        }
      }
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
    colCard.classList.add("col-xl-2", "col-lg-3", "col-md-6", "col-sm-12", "mb-4")

    const card = document.createElement("div")
    card.classList.add("card", "formCard", "m-1", "bg-dark", "grey-text", "p-3")
    console.log(result)
    const imgLink = document.createElement("a")
    imgLink.href = `./album.html?id=${result.album.id}`
    const img = document.createElement("img")
    img.classList.add("img-fluid", "mb-1")
    img.src = result.album.cover_medium
    img.alt = result.album.title
    imgLink.appendChild(img)
    card.appendChild(imgLink)

    const titleLink = document.createElement("a")
    titleLink.href = `./album.html?id=${result.album.id}`
    titleLink.textContent = result.title
    const title = document.createElement("h5")
    title.appendChild(titleLink)
    card.appendChild(title)

    const artistLink = document.createElement("a")
    artistLink.href = `./artist.html?id=${result.artist.id}` //da ricontrollare
    artistLink.textContent = result.artist.name

    const artistName = document.createElement("p")
    artistName.appendChild(artistLink)
    card.appendChild(artistName)

    const link = document.createElement("a")
    link.href = result.link
    link.textContent = "Ascolta su Deezer"
    card.appendChild(link)

    colCard.appendChild(card)
    resultsContainer.appendChild(colCard)
  })
}
