const feroDown = document.getElementById("att-fe-down")
const feroUp = document.getElementById("att-fe-up")
const feroAtt = document.getElementById("att-fe")

const witDown = document.getElementById("att-wi-down")
const witUp = document.getElementById("att-wi-up")
const witAtt = document.getElementById("att-wi")

const speedDown = document.getElementById("att-sp-down")
const speedUp = document.getElementById("att-sp-up")
const speedAtt = document.getElementById("att-sp")

const affectDown = document.getElementById("att-af-down")
const affectUp = document.getElementById("att-af-up")
const affectAtt = document.getElementById("att-af")

const attTotal = document.getElementById("att-total")
const attBtn = document.getElementsByClassName("att-btn")

const addRatBtn = document.getElementById("add-rat")
const ratError = document.getElementById("error-message")
const killRatBtn = document.getElementsByClassName("kill-btn")
const ratNameInput = document.getElementById("rat-name")

let rats = []

for (i = 0; i < attBtn.length; i++) {
    let x = attBtn[i].id
    attBtn[i].addEventListener('click', () => {
        switch (x) {
            case 'att-fe-down':
                if (feroAtt.textContent > 1) {
                    feroAtt.textContent--
                    attTotal.textContent++
                }
                break;
            case 'att-wi-down':
                if (witAtt.textContent > 1) {
                    witAtt.textContent--
                    attTotal.textContent++
                }
                break;
            case 'att-sp-down':
                if (speedAtt.textContent > 1) {
                    speedAtt.textContent--
                    attTotal.textContent++
                }
                break;
            case 'att-af-down':
                if (affectAtt.textContent > 1) {
                    affectAtt.textContent--
                    attTotal.textContent++
                }
                break;
            case 'att-fe-up':
                if (feroAtt.textContent < 10 && attTotal.textContent > 0) {
                    feroAtt.textContent++
                    attTotal.textContent--
                }
                break;
            case 'att-wi-up':
                if (witAtt.textContent < 10 && attTotal.textContent > 0) {
                    witAtt.textContent++
                    attTotal.textContent--
                }
                break;
            case 'att-sp-up':
                if (speedAtt.textContent < 10 && attTotal.textContent > 0) {
                    speedAtt.textContent++
                    attTotal.textContent--
                }
                break;
            case 'att-af-up':
                if (affectAtt.textContent < 10 && attTotal.textContent > 0) {
                    affectAtt.textContent++
                    attTotal.textContent--
                }
                break;
            default:
                console.log('err')
        }
    })
}

addRatBtn.addEventListener('click', () => {
    let atts = parseInt(feroAtt.textContent) + parseInt(witAtt.textContent) + parseInt(speedAtt.textContent) + parseInt(affectAtt.textContent)
    console.log(atts)

    // ERROR check: repeat names, invalid attribute stats, unnamed rats, unused att points//
    if (attTotal.textContent > 0 ||
        ratNameInput.value == false ||
        atts != 20 ||
        rats.map(obj => obj.name).includes(ratNameInput.value) ||
        rats.length > 9
    ) {
        rats.length > 9 ? ratError.textContent = '(ERROR: Rat Overload! kill some rats!)' : '';
        rats.map(obj => obj.name).includes(ratNameInput.value) ? ratError.textContent = `(ERROR: rat already named '${ratNameInput.value}')` : '';
        atts != 20 ? ratError.textContent = "(ERROR: stats invalid)" : '';
        attTotal.textContent > 0 ? ratError.textContent = "(please use All attribute points!)" : '';
        ratNameInput.value === '' ? ratError.textContent = "(please name your rat!)" : '';
        ratError.style.display = '';
    }
    else {

        let newRat = {}
        newRat.name = ratNameInput.value
        newRat.ferocity = parseInt(feroAtt.textContent)
        newRat.wit = parseInt(witAtt.textContent)
        newRat.speed = parseInt(speedAtt.textContent)
        newRat.affection = parseInt(affectAtt.textContent)
        newRat.hunger = 3
        newRat.condition = ''
        rats.push(newRat)
        addToRatDisplay(newRat)
        console.log(rats)

        ratError.style.display = 'none'
        ratNameInput.value = ''
        feroAtt.textContent = 1
        witAtt.textContent = 1
        speedAtt.textContent = 1
        affectAtt.textContent = 1
        attTotal.textContent = 16
    }

})

const ratDisplayTray = document.getElementById("rat-tray")

function ratRandomizer() {
    const names = ["Jogun", "Misser", "Loosh", "Patten", "Lop", "Bóck", "Björn", "lithete", "Ulmm", "Olmaes", "Aptat", "Abby", "Jake", "Tom", "Aless", "Alice", "Tread", "Red", "Holly", "Sister", "Marge", "Kapuy", "Illum", "Ill", "Robin", "Royce", "Jacette", "Lord", "General", "Furry", "Wolf", "Bun-Bun", "Frogert", "Alpine"]
    let newRat = {
        name: names[Math.floor(Math.random() * names.length)],
        ferocity: 1,
        wit: 1,
        speed: 1,
        affection: 1
    }
    for (i = 1; i <= 16; i++) {
        let attributes = ['fr', 'wit', 'sp', 'aff']
        let attPoint = attributes[Math.floor(Math.random() * attributes.length)]
        switch (attPoint) {
            case 'fr':
                newRat.ferocity++
                break;
            case 'wit':
                newRat.wit++
                break;
            case 'sp':
                newRat.speed++
                break;
            case 'aff':
                newRat.affection++
                break;
        }
    }
    while (rats.map(obj => obj.name).includes(newRat.name)) {
        newRat.name = names[Math.floor(Math.random() * names.length)]
        console.log("switched")
    }

    if (rats.length > 9) {
        ratError.textContent = '(ERROR: Rat Overload! kill some rats!)'
        ratError.style.display = '';
    }
    else {
        rats.push(newRat)
        addToRatDisplay(newRat)
        ratError.style.display = 'none';
    }
}

function addToRatDisplay(newrat) {
    ratDisplayTray.innerHTML += `
        <div class="rat">
            <h4>${newrat.name}</h4>
            <p class="stat">ferocity: <span class="stat-value">${newrat.ferocity}</span></p>
            <p class="stat">wit: <span class="stat-value">${newrat.wit}</span></p>
            <p class="stat">speed: <span class="stat-value">${newrat.speed}</span></p>
            <p class="stat">affection: <span class="stat-value">${newrat.affection}</span></p>
            <button class="kill-btn" id="${newrat.name}">kill</button>
        </div> 
    `

    // to enable kil-btn once rat is made
    for (i = 0; i < killRatBtn.length; i++) {
        let ratID = killRatBtn[i].id
        let ratElement = killRatBtn[i].parentElement
        killRatBtn[i].addEventListener("click", () => {
            rats = rats.filter(obj => obj.name !== ratID)
            ratElement.remove()

            assignRatID()
        })
    }

    sortRatBySp()
    assignRatID()
}

// assigns and reassigns RatID based on place in array
function assignRatID() {
    for (i = 0; i < rats.length; i++) {
        rats[i].ratID = `rats[${i}]`
    }
}
// sorts rat based on speed
function sortRatBySp() {
    rats.sort((rat1, rat2) => (rat1.speed > rat2.speed ? -1 : 1))
}

////////////////////////
//GAME START TEST CODE//
////////////////////////
function startGame() {
    let locations = ['Laboratory', 'Trash Pits', 'Scrap Heap', 'Burn Room', 'Storage']
    for (i = 0; i < rats.length; i++) {
        rats[i].location = locations[Math.floor(Math.random() * locations.length)]
        console.log(`${rats[i].name} in the ${rats[i].location}`)
    }
    playRound()
}

function currentRound() {
    let round = 1

    return () => {
        let x = `Round ${round}`
        // addToPlot(x, '') // add method for Round display later
        for (i = 0; i < rats.length; i++) {
            ratTurn(rats[i])
        }
        round++
        let plotArr = addToPlot()
        readPlots = setInterval(plotReader(plotArr), 2000)
    }

}
const playRound = currentRound()

//PLOTPOINT AND METHOD KEEPER//
function plotKeeper() {
    let plotpoints = []
    return (plotline, method) => {
        let x = {}
        x.text = plotline
        x.method = method
        plotpoints.push(x)
        console.log(plotpoints)
        plotline == undefined ? plotpoints.pop() : '';
        return plotpoints
    }

}
const addToPlot = plotKeeper()

function plotReader(plotArr) {
    let toRead = plotArr
    let plotpoint = 0
    console.log(toRead.length)
    return () => {
        console.log(toRead[plotpoint].text)
        plotpoint++
        if (plotpoint >= toRead.length) {
            clearInterval(readPlots)
            toRead = []
        }
    }
}


//RAT TURN//
function ratTurn(protagRat) {
    let motives = ['hungry', 'moving', 'lonely'] //motive()
    let x = motives[Math.floor(Math.random() * motives.length)]
    let y
    let m
    switch (x) {
        case 'hungry':
            y = `${protagRat.name} is hungry`
            m = `console.log(${protagRat.ratID}.condition = 'hungry')`
            addToPlot(y, m)
            break;
        case 'moving':
            y = `${protagRat.name} is moving`
            m = `console.log(${protagRat.ratID}.condition = 'moving')`
            addToPlot(y, m)
            break;
        case 'lonely':
            y = `${protagRat.name} is lonely`
            m = `console.log(${protagRat.ratID}.condition = 'lonely')`
            addToPlot(y, m)
            break;
    }
}



// //test code below
// //example of 'rats'
// let obj = [{ name: 'clary', ID: 'obj[0]' }, { name: 'henry', ID: 'obj[01]' }]
// //example of event array to be read
// let testarr = []

// //test function for event maker that stores plotpoints and correponding method objects in testarr
// testFunc()

// //the plot point is read and 'eval()' to use method stored in event array
// console.log(testarr[0].plotpoint)
// eval(testarr[0].method)
// console.log(obj[0].condition)

// //example of plot point added to event array
// function testFunc() {
//     let x = {}
//     x.plotpoint = `${obj[0].name} is out of food`
//     x.method = `${obj[0].ID}.condition = 'starved'`
//     testarr.push(x)
// }
