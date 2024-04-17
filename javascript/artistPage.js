const URL = `https://deezerdevs-deezer.p.rapidapi.com/artist/`
const id = "eminem"
window.onload = function () {
  fetch(URL + id, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9ca351345fmsh95edc7f7a170363p1d8824jsn6e74df62a896",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    })

    .then(obj => {
      // console.log("obj.name" + obj.name)
      // console.log("obj.nb_fan" + obj.nb_fan)
      document.getElementById("name").innerText = obj.name
      document.getElementById("fans").innerText = obj.nb_fan + " ascoltatori mensili"
      const imageDIv = document.getElementById("image-artist")
      imageDIv.style.backgroundImage =
        "url('https://e-cdns-images.dzcdn.net/images/artist/19cc38f9d69b352f718782e7a22f9c32/1000x1000-000000-80-0-0.jpg')"
    })
}

fetch(" https://striveschool-api.herokuapp.com/api/deezer/artist/13/top?limit=10", {
  method: "GET",
})
  .then(response => {
    if (response.ok) {
      return response.json()
    }
  })

  .then(obj => {
    obj.data.forEach(element => {
      console.log("element" + element)
      const table = document.getElementById("table")
      const row = document.createElement("div")

      row.classList.add("row", "align-items-center", "mb-2")
      row.innerHTML = `
    <div class="col-1 text-white text-end p-0">
        <span>1</span>
    </div>
    <div class="col-6">
        <img style="width: 45px" src="./assets/imgs/main/image-19.jpg" />
        <span class="text-white">${element.title}</span>
    </div>
    <div class="col-3 text-white">${element.rank}</div>
    <div class="col-2 text-white">${element.duration}</div>
`
      table.appendChild(row)
    })
  })
