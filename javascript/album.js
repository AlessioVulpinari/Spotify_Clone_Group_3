const params = new URLSearchParams(window.location.search)
const id = params.get('id')
const URL = 'https://deezerdevs-deezer.p.rapidapi.com/album/75621062'
const API_KEY = '088f517bd4msh33faf2f02471acfp15abc8jsnf340e72fad46'
const API_HOST = 'deezerdevs-deezer.p.rapidapi.com'

window.addEventListener('DOMContentLoaded', () => {
  if (!id) {
    console.log('No song id has been found in URL.')
  }

  fetch(URL + id, {
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

const displayAlbumDetails = function (album) {
  const heroRow = document.getElementById('hero-row')
  if (!heroRow) {
    console.error('Hero row not found')
    return
  }

  heroRow.innerHTML = ''

  // Image container and image element
  const imgContainer = document.createElement('div')
  imgContainer.className = 'col-3 p-0'
  const albumArt = document.createElement('img')
  albumArt.src = album.cover_big
  albumArt.className = 'img-fluid'
  albumArt.id = 'album-art'
  imgContainer.appendChild(albumArt)

  // Wrapper for album details
  const detailWrapper = document.createElement('div')
  detailWrapper.className = 'col-9 wrapper ps-2'

  const albumLabel = document.createElement('p')
  albumLabel.innerText = 'Album'

  // Title wrapper and content
  const titleWrapper = document.createElement('div')
  titleWrapper.className = 'title-wrapper'
  const titleContent = document.createElement('div')
  titleContent.className = 'title-content'
  const albumTitle = document.createElement('h1')
  albumTitle.id = 'album-title'
  albumTitle.innerText = album.title
  titleContent.appendChild(albumTitle)
  titleWrapper.appendChild(titleContent)

  // Artist info
  const infoDiv = document.createElement('div')
  infoDiv.className = 'info'
  const artistPic = document.createElement('img')
  artistPic.src = album.artist.picture_big
  artistPic.id = 'artist-propic'
  const artistName = document.createElement('h6')
  artistName.id = 'artist-name'
  const artistLink = document.createElement('a')
  artistLink.href = '#'
  artistLink.innerHTML = `<span>${album.artist.name}</span>`
  artistName.appendChild(artistLink)
  artistName.innerHTML += ` • ${formatDuration(album.duration)}`
  infoDiv.appendChild(artistPic)
  infoDiv.appendChild(artistName)

  // Append all to detailWrapper
  detailWrapper.appendChild(albumLabel)
  detailWrapper.appendChild(titleWrapper)
  detailWrapper.appendChild(infoDiv)

  // Append to heroRow
  heroRow.appendChild(imgContainer)
  heroRow.appendChild(detailWrapper)

  const cardsRow = document.getElementById('cards-row')
  if (!cardsRow) {
    console.error('Cards row not found')
    return
  }

  cardsRow.innerHTML = ''

  if (album.tracks && album.tracks.data) {
    cardsRow.innerHTML = album.tracks.data
      .map(
        (track, index) => `
        <div id="card-${index}" class="track-card d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-3">
                <div class="icon-container d-flex align-items-center justify-content-start">
                    <span class="number">${index + 1}</span>
                </div>
                <div class="d-flex flex-column">
                    <a href="#">
                        <h5 id="trackTitle">${track.title}</h5>
                    </a>
                    <a href="#"><small id="trackArtist">${
                      album.artist.name
                    }</small></a>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-between gap-3">
                <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                    class="Svg-sc-ytk21e-0 cqasRA plus-icon">
                    <path d="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z"></path>
                    <path d="M17.999 12a1 1 0 0 1-1 1h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0v4h4a1 1 0 0 1 1 1z"></path>
                </svg>
                <div class="d-flex align-items-center justify-content-end gap-1">
                    <p>${Math.floor(track.duration / 60)}:${(
          '0' +
          (track.duration % 60)
        ).slice(-2)}</p>
                    <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                        class="Svg-sc-ytk21e-0 cqasRA other-icon">
                        <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
                    </svg>
                </div>
            </div>
        </div>
    `
      )
      .join('')
  }
}

// duration function
const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${hours}h${minutes}min`
}
