//search-page creata qua per ora, domani vediamo
document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault()

  const inputForm = document.getElementById("artist")
  const textForm = inputForm.value
  console.log(textForm)
})
