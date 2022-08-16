
const weaderFORM = document.querySelector('form')
const search = document.querySelector('input')
const myParagraph = document.querySelector('#thiago')
weaderFORM.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    myParagraph.textContent = 'Carregando...'
    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                myParagraph.textContent = data.error
            }else {
                myParagraph.textContent = data.feelslike

            }
        })
    })

})
