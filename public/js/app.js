console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevent the page from refreshing

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    // fetch browser API 
    fetch('/weather?address=' + location).then ((response) => {
        response.json().then((data) => {
            if (data.error) {
                //console.log (data.error)
                messageOne.textContent = data.error
            } else {
                //console.log(data.location)
                //console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})