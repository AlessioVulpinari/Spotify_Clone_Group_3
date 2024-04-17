const params = new URLSearchParams(windows.location.search)
const id = param.get('id')
const URL = '' // needs url
const API_KEY = '' // api key here

// define html element you need to generate the others

window.addEventListener('DOMContentLoaded', () => {
  if (!id) {
    console.log('No song id has been found in URL.')
  }

  fetch(URL + id, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: API_KEY,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Failed to fetch songs id')
      }
    })
    .then((album) => {
      displayAlbumDetails(album)
    })
    .catch((error) => {
      console.log('Error:', error)
    })
})

const displayAlbumDetails = function (album) {
  const heroRow = document.getElementById('hero-row')
  heroRow.innerHTML = `
    <div class="col-3 p-0">
            <img src="${cover}" class="img-fluid" alt="album art" id="album-art" />
             </div>
                <div class="col-9 wrapper ps-2">
                <p>Album</p>
                    <h1 id="album-title">${title}</h1>
                        <div class="info">
                            <img src="${propic}" alt="artist propic" id="artist-propic">
                                <h6 id="artist-name"><a href="#"><span>${artist}</span></a> • ${year} • ${numSongs}, ${duration} </h6>
                            </div>
                        </div>
    `

  const cardsRow = document.getElementById('cards-row')
  cardsRow.innerHTML = `
  <div id="card" class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="icon-container d-flex align-items-center justify-content-start">
                                        <span class="number">${tracknum}</span>
                                    </div>
                                    <div class=" d-flex flex-column ">
                                        <a href="#">
                                            <h5 id=" trackTitle">${tracktitle}</h6>
                                        </a>
                                        <a href="#"><small id="trackArtist">${artist}</small></a>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center justify-content-between gap-3">
                                    <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                                        class="Svg-sc-ytk21e-0 cqasRA plus-icon">
                                        <path
                                            d="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z">
                                        </path>
                                        <path
                                            d="M17.999 12a1 1 0 0 1-1 1h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0v4h4a1 1 0 0 1 1 1z">
                                        </path>
                                    </svg>
                                    <div class="d-flex align-items-center justify-content-end gap-1">
                                        <p>3:33</p>
                                        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                                            class="Svg-sc-ytk21e-0 cqasRA other-icon">
                                            <path
                                                d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z">
                                            </path>
                                        </svg>
                                    </div>
                                </div>
                            </div>`
}
