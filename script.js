const adviceNumber = document.querySelector('.advice-number')
const adviceLabel = document.querySelector('.advice-label')
const advice = document.querySelector('.advice')
const rollDice = document.querySelector('.dice-container')
const adviceContainer = document.querySelector('.advice-container')
const patternDivider = document.querySelector('.pattern-divider img')
const initialMessage = document.querySelector('.initial-dice-roll')

const cachedAdvice = JSON.parse(localStorage.getItem('cachedAdvice')) || {}

rollDice.addEventListener('click', () => {

    initialMessage.style.display = 'none'
    adviceLabel.style.display = 'block'
    patternDivider.style.display = 'block'

    fetch('https://api.adviceslip.com/advice')
        .then((response) => response.json())
        .then((data) => {

            adviceNumber.innerText = `#${data.slip.id}`
            advice.innerText = data.slip.advice

            cachedAdvice.advice = advice.innerText
            cachedAdvice.id = adviceNumber.innerText
            localStorage.setItem('cachedAdvice', JSON.stringify(cachedAdvice))

        })
        .catch(error => {
            console.log(error)
            adviceContainer.style.display = 'none'
        })
})

if (Object.keys(cachedAdvice).length === 0) {
    initialMessage.style.display = 'block'
} else {
    if (cachedAdvice.advice) {
        advice.innerText = cachedAdvice.advice
        adviceLabel.style.display = 'block'
        patternDivider.style.display = 'block'
    }
    if (cachedAdvice.id) {
        adviceNumber.innerText = cachedAdvice.id
    }
}
