const screens = document.querySelectorAll('.screen')
const choose_pokemon_btns = document.querySelectorAll('.choose-pokemon-btn')
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const messageEl = document.getElementById('message')

let seconds = 0
let score = 0
let selectedPokemon = {}

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

choose_pokemon_btns.forEach((btn) =>
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img')
    const src = img.getAttribute('src')
    const alt = img.getAttribute('alt')
    selectedPokemon = { src, alt }
    screens[1].classList.add('up')

    setTimeout(createPokemon, 1000)
    startGame()
  })
)

function startGame() {
  setInterval(increaseTime, 1000)
}

function increaseTime() {
  let m = Math.floor(seconds / 60)
  let s = seconds % 60

  m = m < 10 ? `0${m}` : m
  s = s < 10 ? `0${s}` : s

  timeEl.innerHTML = `Time: ${m}:${s}`
  seconds++
}

function createPokemon() {
  const pokemon = document.createElement('div')
  pokemon.classList.add('pokemon')
  const { x, y } = getRandomLocation()
  pokemon.style.top = `${y}px`
  pokemon.style.left = `${x}px`

  pokemon.innerHTML = `<img src=${selectedPokemon.src} alt=${
    selectedPokemon.alt
  } style="transform: rotate(${Math.random() * 360}deg)"/>`

  pokemon.addEventListener('click', catchEmAll)

  game_container.appendChild(pokemon)
}

function getRandomLocation() {
  const width = window.innerWidth
  const height = window.innerHeight
  const x = Math.random() * (width - 200) + 100
  const y = Math.random() * (height - 200) + 100

  return { x, y }
}

function catchEmAll() {
  increaseScore()
  this.classList.add('.caught')
  setTimeout(() => this.remove(), 2000)
  addPokemon()
}

function addPokemon() {
  setTimeout(createPokemon, 1000)
  setTimeout(createPokemon, 1500)
}

function increaseScore() {
  score++

  if (score > 19) {
    messageEl.classList.add('visible')
  }

  scoreEl.innerHTML = `Score: ${score}`
}
