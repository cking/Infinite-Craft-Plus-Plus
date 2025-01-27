const sideControls = document.querySelector(".side-controls")

let timer = null
let targetString = null
const timeElement = document.createElement("span")
timeElement.innerText = "00:00:00.000"
const startStopIcon = document.createElement("img")

const start = () => {
    const startTime = Date.now()
    startStopIcon.src = chrome.runtime.getURL("images/stop-solid.svg")
    timer = setInterval(() => {
        const timeElapsed = new Date(Date.now() - startTime)
        
        const hours = String(timeElapsed.getHours()-1).padStart(2, '0')
        const minutes = String(timeElapsed.getMinutes()).padStart(2, '0')
        const seconds = String(timeElapsed.getSeconds()).padStart(2, '0')
        const milliseconds = String(timeElapsed.getMilliseconds()).padStart(3, '0')
        
        timeElement.innerText = `${hours}:${minutes}:${seconds}.${milliseconds}`
    }, 1)
}

const stop = () => {
    clearInterval(timer)
    timer = null
    startStopIcon.src = chrome.runtime.getURL("images/play-solid.svg")
}

const setTargetString = (str) => {
    targetString = str.toLowerCase()
}

const injectMenu = () => {
    // BUTTON
    const button = document.createElement("div")
    button.classList.add("ICPP_speedrunTimerMenuButton")
    const timerIcon = document.createElement("img")
    timerIcon.src = chrome.runtime.getURL("images/stopwatch-solid.svg")
    timerIcon.classList.add("ICPP_timerIcon")
    button.appendChild(timerIcon)

    // MENU
    const menuContainer = document.createElement("div")
    const startStopBtn = document.createElement("div")
    const targetInput = document.createElement("input")

    menuContainer.classList.add("ICPP_timerMenuContainer")
    menuContainer.classList.add("ICPP_hidden")
    startStopIcon.src = chrome.runtime.getURL("images/play-solid.svg")
    startStopIcon.classList.add("ICPP_startStopIcon")
    targetInput.placeholder = "🞋 Target"

    startStopBtn.appendChild(startStopIcon)
    menuContainer.appendChild(timeElement)
    menuContainer.appendChild(startStopBtn)
    menuContainer.appendChild(targetInput)

    // INSERT CONTENT
    sideControls.insertBefore(button, sideControls.firstChild)
    sideControls.insertBefore(menuContainer, sideControls.firstChild)
    
    // ADD EVENT LISTENERS
    button.addEventListener("click", () => {
        if (menuContainer.classList.contains("ICPP_hidden")) {
            menuContainer.classList.remove("ICPP_hidden")
        } else {
            menuContainer.classList.add("ICPP_hidden")
        }
    })

    startStopBtn.addEventListener("click", () => {
        timer ? stop() : start()
    })

    targetInput.addEventListener("keyup", () => {
        setTargetString(targetInput.value)
    })

}

const compareToTargetString = (str) => {
    if (str === targetString) {
        stop()
    }
}

export {start, stop, setTargetString, compareToTargetString, injectMenu}