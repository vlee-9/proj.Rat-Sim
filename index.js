const ratCustIcon = document.getElementById("cust-rat-icon")

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

const startBtn = document.getElementById('start-btn')
startBtn.style.display = 'none'
const roundStart = document.getElementById('round-btn')

const custContainer = document.getElementById('cust-container')
const gameContainer = document.getElementById('game-container')
gameContainer.style.display = 'none'
const textBox = document.getElementById('text-box')

let rats = []
let ratIcon = 1
for (i = 0; i < attBtn.length; i++) {
    let x = attBtn[i].id
    
    attBtn[i].addEventListener('click', () => {
        switch (x) {
            case 'icon-btn-down':
                ratIcon--
                console.log(ratIcon)
                ratIcon <= 0 ? ratIcon = 22: '';
                
                ratCustIcon.src = `rat-img/rat-${ratIcon}.gif`
                break;
            case 'icon-btn-up':
                ratIcon++
                ratIcon > 22 ? ratIcon = 1: '';
                console.log(ratIcon)
                ratCustIcon.src = `rat-img/rat-${ratIcon}.gif`
                break;
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
        rats.length > 7
    ) {
        rats.length > 7 ? ratError.textContent = '(ERROR: Rat Overload! kill some rats!)' : '';
        rats.map(obj => obj.name).includes(ratNameInput.value) ? ratError.textContent = `(ERROR: rat already named '${ratNameInput.value}')` : '';
        atts != 20 ? ratError.textContent = "(ERROR: stats invalid)" : '';
        attTotal.textContent > 0 ? ratError.textContent = "(please use All attribute points!)" : '';
        ratNameInput.value === '' ? ratError.textContent = "(please name your rat!)" : '';
        ratError.style.display = '';
    }
    else {

        let newRat = {}
        const locations = ['Laboratory', 'Trash Pits', 'Scrap Heap', 'Burn Room', 'Storage']
    
        newRat.name = ratNameInput.value
        newRat.icon = ratIcon
        newRat.ferocity = parseInt(feroAtt.textContent)
        newRat.wit = parseInt(witAtt.textContent)
        newRat.speed = parseInt(speedAtt.textContent)
        newRat.affection = parseInt(affectAtt.textContent)
        newRat.hunger = 3
        newRat.condition = ''
        newRat.location = locations[Math.floor(Math.random() * locations.length)]
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
    const locations = ['Laboratory', 'Trash Pits', 'Scrap Heap', 'Burn Room', 'Storage']
    let newRat = {
        name: names[Math.floor(Math.random() * names.length)],
        icon: Math.floor(Math.random() * 22),
        ferocity: 1,
        wit: 1,
        speed: 1,
        affection: 1,
        condition:'',
        location: locations[Math.floor(Math.random() * locations.length)]
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

    if (rats.length > 7) {
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
            <img class="rat-tray-icon" src="rat-img/rat-${newrat.icon}.gif" alt="${newrat.name}">
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
    if(rats.length >= 4){
        startBtn.style.display = ''
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

startBtn.addEventListener('click', function startGame() {
    let allRats = rats.length
    document.getElementById('cust-container').style.display = 'none';
    document.getElementById('game-container').style.display = '';
    ratBox = document.getElementById('rat-stats')
    for (i = 0; i < allRats; i++) {
        ratBox.innerHTML+= `
        <div class="rat-status">
            <h4>${rats[i].name}</h4>
            <img class="rat-tray-icon" src="rat-img/rat-${rats[i].icon}.gif" alt="${rats[i].name}">
            <p class="stat">ferocity: <span class="stat-value">${rats[i].ferocity}</span></p>
            <p class="stat">wit: <span class="stat-value">${rats[i].wit}</span></p>
            <p class="stat">speed: <span class="stat-value">${rats[i].speed}</span></p>
            <p class="stat">affection: <span class="stat-value">${rats[i].affection}</span></p>
            <p class="stat">In <span class="stat-value">${rats[i].location}</span></p>
        </div> 
        `
    } 
    playRound()
})


const playRound = currentRound()
function currentRound() {
    let round = 1
    return () => {
        textBox.innerHTML += `<h3>Round ${round}</h3>`
        console.log(`round: ${round}`)
        let x = `Round ${round}`
        // addToPlot(x, '') // add method for Round display later
        for (i = 0; i < rats.length; i++) {
            ratTurnDay(rats[i])
        }
        round++
        let plotArr = addToPlot()
        readPlots = setInterval(plotReader(plotArr), 4300)
    }
}


//PLOTPOINT AND METHOD KEEPER//
const addToPlot = plotKeeper()
function plotKeeper() {
    let plotpoints = []
    return (plotline, method) => {
        let x = {}
        if (plotline && method) {
            x.text = plotline
            x.method = method
            plotpoints.push(x)
        }
        else if (plotline == 'clear') {
            plotpoints = []
        }
        else { }
        return plotpoints
    }
}

function plotReader(plotArr) {
    let toRead = plotArr
    let plotpoint = 0
    console.log(toRead.length)
    return () => {
        textBox.innerHTML += toRead[plotpoint].text
        eval(toRead[plotpoint].method)
        plotpoint++
        if (plotpoint >= toRead.length) {
            clearInterval(readPlots)
            addToPlot('clear') //clears plotpoints array for new round
        }
    }
}


//RAT TURN//
function ratTurnDay(protagRat) {
    let motives = ['hungry', 'moving', 'lonely'] //motive()
    let x = motives[Math.floor(Math.random() * motives.length)]
    switch (x) {
        case 'hungry':
            txt = `<p><b>${protagRat.name}</b> is hungry</p>`
            mthd = `${protagRat.ratID}.condition = 'hungry'
                console.log(${protagRat.ratID}.condition)
            `
            addToPlot(txt, mthd)
            break;
        case 'moving':
            txt = `<p><b>${protagRat.name}</b> is moving</p>`
            mthd = `${protagRat.ratID}.condition = 'moving'
                console.log(${protagRat.ratID}.condition)
            `
            addToPlot(txt, mthd)
            break;
        case 'lonely':
            txt = `<p><b>${protagRat.name}</b> is lonely</p>`
            mthd = `${protagRat.ratID}.condition = 'lonely'
                console.log(${protagRat.ratID}.condition)
            `
            addToPlot(txt, mthd)
            break;
    }
}




/* //test code below
//example of 'rats'
let obj = [{ name: 'clary', ID: 'obj[0]' }, { name: 'henry', ID: 'obj[01]' }]
//example of event array to be read
let testarr = []

//test function for event maker that stores plotpoints and correponding method objects in testarr
testFunc()

//the plot point is read and 'eval()' to use method stored in event array
console.log(testarr[0].plotpoint)
eval(testarr[0].method)
console.log(obj[0].condition)

//example of plot point added to event array
function testFunc() {
    let x = {}
    x.plotpoint = `${obj[0].name} is out of food`
    x.method = `${obj[0].ID}.condition = 'starved'`
    testarr.push(x)
}
*/