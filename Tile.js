export default class Tile {
    #tileElement
    #valueElement
    #x
    #y
    #value
    #decayCounter
    #isMergedThisTurn
  
    constructor(tileContainer, value = Math.random() > 0.5 ? 2 : 4) {
      this.#tileElement = document.createElement("div")
      this.#tileElement.classList.add("tile")

      this.#valueElement = document.createElement("span")
      this.#valueElement.classList.add("tile-value")
      this.#tileElement.append(this.#valueElement)
      tileContainer.append(this.#tileElement)

      this.value = value
      this.decayCounter = 2 * this.value
      this.#isMergedThisTurn = false
    }
  
    get value() {
      return this.#value
    }
  
    set value(v) {
      this.#value = v
      this.#valueElement.textContent = v
      const power = Math.log2(v)
      const backgroundLightness = 100 - power * 9
      this.#tileElement.style.setProperty(
        "--background-lightness",
        `${backgroundLightness}%`
      )
      this.#tileElement.style.setProperty(
        "--text-lightness",
        `${backgroundLightness <= 50 ? 90 : 10}%`
      )

      if (v >= 16) {
        this.#tileElement.classList.add("rod")
      } else {
        this.#tileElement.classList.remove("rod")
      }

      this.#updateTimerRatio()
    }

    get decayCounter() {
      return this.#decayCounter
    }

    set decayCounter(val) {
      this.#decayCounter = val
      this.#updateTimerRatio()
    }

    #updateTimerRatio() {
      const max = 2 * this.#value
      const ratio = max > 0 ? this.#decayCounter / max : 1
      this.#tileElement.style.setProperty("--timer-ratio", ratio)
    }

    get isMergedThisTurn() {
      return this.#isMergedThisTurn
    }

    set isMergedThisTurn(val) {
      this.#isMergedThisTurn = val
    }
  
    set x(value) {
      this.#x = value
      this.#tileElement.style.setProperty("--x", value)
    }
  
    set y(value) {
      this.#y = value
      this.#tileElement.style.setProperty("--y", value)
    }
  
    remove() {
      this.#tileElement.remove()
    }
  
    waitForTransition(animation = false) {
      return new Promise(resolve => {
        this.#tileElement.addEventListener(
          animation ? "animationend" : "transitionend",
          resolve,
          {
            once: true,
          }
        )
      })
    }
  }