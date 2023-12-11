/* eslint-disable no-undef */
const result = document.querySelector('.result')
const baseUrl = `${window.location.origin}/api/vehicles/`
const fetchVehicles = async () => {
  try {
    const { data } = await axios.get(baseUrl)
    console.log(data)
    const vehicles = data.data.map((vehicle) => {
      return createVehicleCard(vehicle)
    })
    result.innerHTML = `<div class="row">
                         ${vehicles.join('')} 
                        </div>`
  } catch (error) {
    console.log(error)
    // eslint-disable-next-line quotes
    result.innerHTML = `<div class="alert alert-danger mt-3">Error fetching data</div>`
  }
}

const createVehicleCard = (vehicle) => {
  return `<div class="col-sm-4 pt-4">
            <div class="card">
              <div class="card-body">
              <h5 class="card-title">${vehicle.license_plate}</h5>
              <p class="card-text">${vehicle.make}</p>
              <p class="card-text">${vehicle.model}</p>
              <p class="card-text">${vehicle.commissioned}</p>
              <p class="card-text">${vehicle.user.name}</p>
              
              </div>
            </div>
          </div>
          `
}

const emptyFields = (make, model, license_plate, commissioned) => {
  make.value = ''
  model.value = ''
  license_plate.value = ""
  commissioned.value = ""

}

const setNotification = (msg) => {
  formAlert = document.querySelector('.form-alert')
  formAlert.textContent = msg
  setTimeout(() => {
    formAlert.textContent = '' }, 5000)
}

// submit form
const btn = document.querySelector('.btn-primary')
const make = document.querySelector('#make')
const model = document.querySelector('#model')
const license_plate = document.querySelector("#license_plate")
const commissioned = document.querySelector("commissioned")

btn.addEventListener('click', async (e) => {
  e.preventDefault()
  const makeValue = make.value
  const modelValue = model.value

  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = await axios.post(baseUrl, { make: makeValue, model: modelValue, license_plate: license_plate, commissioned: commissioned })
    fetchVehicles()
    emptyFields(make, model, commissioned, license_plate)
  } catch (error) {
    const { msg } = error.response.data
    setNotification(msg)
  }
})

// Fetch vehicles on page load
fetchVehicles()