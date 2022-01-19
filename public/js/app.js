console.log("Hi there!!");

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const massageOne = document.querySelector('#msg-1')
const massageTwo = document.querySelector('#msg-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    massageOne.textContent = 'Loading....'
    massageTwo.textContent = ''
    
    fetch('http://localhost:5000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                massageOne.textContent = data.error
            }else{
                massageOne.textContent = data.location
                massageTwo.textContent = data.forecast
            }
        })
    
    })

})