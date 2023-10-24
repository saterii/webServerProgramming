const result = document.querySelector('.result')
const baseUrl = `${window.location.origin}/api`
console.log(baseUrl)
const fetchAlbums = async () => {
  try {
    
    const { data } = await axios.get(`${baseUrl}/albums`)
    console.log(data)
    const albums = data.data.map((album) => {
      return `<ul><li>Artist: ${album.artist}</li><li>Title: ${album.title}</li><li>Year: ${album.year}</li></ul>`
    })
    result.innerHTML = albums.join('')
  } catch (error) {
    console.log(error)
    result.innerHTML = `<div class="alert alert-danger">Could not fetch data</div>`
  }
}
fetchAlbums()