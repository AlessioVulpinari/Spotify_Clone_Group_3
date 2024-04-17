const params = new URLSearchParams(window.location.search)
const id = params.get('id')
const URL = 'https://deezerdevs-deezer.p.rapidapi.com/album/75621062'
const API_KEY = '088f517bd4msh33faf2f02471acfp15abc8jsnf340e72fad46'
const API_HOST = 'deezerdevs-deezer.p.rapidapi.com'

// define html element you need to generate the others

window.addEventListener('DOMContentLoaded', () => {
  //   if (!id) {
  //     console.log('No song id has been found in URL.')
  //   }

  fetch(URL, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Failed to fetch songs id')
      }
    })
    .then((data) => {
      displayAlbumDetails(data)
      console.log(data)
    })
    .catch((error) => {
      console.log('Error:', error)
    })
})

const displayAlbumDetails = function (data) {
  const heroRow = document.getElementById('hero-row')
  if (!heroRow) {
    console.error('Hero row not found')
    return
  }

  heroRow.innerHTML = `
    <div class="col-3 p-0">
            <img src="${data.album.cover}" class="img-fluid" alt="album art" id="album-art" />
             </div>
                <div class="col-9 wrapper ps-2">
                <p>Album</p>
                    <h1 id="album-title">${data.album.title}</h1>
                        <div class="info">
                            <img src="${data.artist.picture}" alt="artist propic" id="artist-propic">
                                <h6 id="artist-name"><a href="#"><span>${data.artist.name}</span></a> • ${data.rank} • ${data.type}, ${data.duration} </h6>
                            </div>
                        </div>
    `

  const cardsRow = document.getElementById('cards-row')
  if (!cardsRow) {
    console.error('Cards row not found')
    return
  }
  cardsRow.innerHTML = tracks
    .map(
      (track, i) => `
    <div id="card" class="d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center gap-3">
        <div class="icon-container d-flex align-items-center justify-content-start">
          <span class="number">${i + 1}</span>
        </div>
        <div class="d-flex flex-column">
          <a href="#">
            <h5>${track.title}</h5>
          </a>
          <a href="#"><small>${data.artist.name}</small></a>
        </div>
      </div>
      <div class="d-flex align-items-center justify-content-between gap-3">
        <svg ...>...</svg>
        <div class="d-flex align-items-center justify-content-end gap-1">
          <p>${track.duration}</p>
          <svg ...>...</svg>
        </div>
      </div>
    </div>
  `
    )
    .join('')
}
