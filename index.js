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
const randomRatBtn = document.getElementById("random-rat")
const ratError = document.getElementById("error-message")
const killRatBtn = document.getElementsByClassName("kill-btn")
const ratNameInput = document.getElementById("rat-name")

const startBtn = document.getElementById('start-btn')
const roundBtn = document.getElementById('round-btn')
const restartBtn = document.getElementById("restart-btn")


const custContainer = document.getElementById('cust-container')
const gameContainer = document.getElementById('game-container')

const textBox = document.getElementById('text-box')
const ratBox = document.getElementById('rat-stats')
const quiteBtn = document.getElementById("quit-btn")

startBtn.style.visibility = 'hidden'
restartBtn.style.display = 'none'
roundBtn.style.visibility = 'hidden'
gameContainer.style.display = 'none'

let rats = []
let ratsDis = []
let ratIcon = 1
let locStatus = [
    {
        name: 'Laboratory',
        occupant: 'empty'
    },
    {
        name: 'Trash Pit',
        occupant: 'empty'
    },
    {
        name: 'Burn Room',
        occupant: 'empty'
    },
    {
        name: 'Storage',
        occupant: 'empty'
    }
]

const miscValues = {
    acts: {

        agitatedDumb: () => {
            let emote = ['"Grrrr.."', '"Hsssss..!"', '*Stares agrily*..', '@_@;', '-.-;', '*Claws ground nervously*']
            let choice = emote[Math.floor(Math.random() * emote.length)]
            return choice
        },

        happyDumb: () => {
            let emote = ['"Hap! Hap!"', '*snickers*', '*smiles*', '"Heee!"', '*Rawr* XD', '*Squeek* *Squeek*', '*Jumps happily*!', '"Prrrrr..."']
            let choice = emote[Math.floor(Math.random() * emote.length)]
            return choice
        }
    },

    catActive: false,
    slimeActive: false,
    owlActive: false
}

for (i = 0; i < attBtn.length; i++) {
    let x = attBtn[i].id

    attBtn[i].addEventListener('click', () => {
        switch (x) {
            case 'icon-btn-down':
                ratIcon--
                ratIcon <= 0 ? ratIcon = 22 : '';

                ratCustIcon.src = `rat-img/rat-${ratIcon}.gif`
                break;
            case 'icon-btn-up':
                ratIcon++
                ratIcon > 22 ? ratIcon = 1 : '';
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
                if (feroAtt.textContent < 9 && attTotal.textContent > 0) {
                    feroAtt.textContent++
                    attTotal.textContent--
                }
                break;
            case 'att-wi-up':
                if (witAtt.textContent < 9 && attTotal.textContent > 0) {
                    witAtt.textContent++
                    attTotal.textContent--
                }
                break;
            case 'att-sp-up':
                if (speedAtt.textContent < 9 && attTotal.textContent > 0) {
                    speedAtt.textContent++
                    attTotal.textContent--
                }
                break;
            case 'att-af-up':
                if (affectAtt.textContent < 9 && attTotal.textContent > 0) {
                    affectAtt.textContent++
                    attTotal.textContent--
                }
                break;
            default:
                console.log('err')
        }
    })
}

addRatBtn.addEventListener('click', addRat = () => {
    let atts = parseInt(feroAtt.textContent) + parseInt(witAtt.textContent) + parseInt(speedAtt.textContent) + parseInt(affectAtt.textContent)

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
        const locations = ['Laboratory', 'Trash Pit', 'Burn Room', 'Storage']

        newRat.name = ratNameInput.value
        newRat.icon = ratIcon
        newRat.ferocity = parseInt(feroAtt.textContent)
        newRat.wit = parseInt(witAtt.textContent)
        newRat.speed = parseInt(speedAtt.textContent)
        newRat.affection = parseInt(affectAtt.textContent)
        newRat.hunger = 3
        newRat.condition = ''
        newRat.lifeStat = 'alive'
        newRat.kills = [],
            newRat.eaten = []
        newRat.sheltered = false
        newRat.location = locations[Math.floor(Math.random() * locations.length)]
        rats.push(newRat)
        ratsDis.push(copyRat(newRat))
        addToRatDisplay(newRat)

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

randomRatBtn.addEventListener('click', function ratRandomizer() {
    const names = ["Jogun", "Misser", "Loosh", "Patten", "Lop", "Bóck", "Björn", "lithete", "Ulmm", "Olmaes", "Aptat", "Abby", "Jake", "Tom", "Aless", "Alice", "Tread", "Red", "Holly", "Sister", "Marge", "Kapuy", "Illum", "Ill", "Robin", "Royce", "Jacette", "Lord", "General", "Furry", "Wolf", "Bun-Bun", "Frogert", "Alpine"]

    const locations = ['Laboratory', 'Trash Pit', 'Burn Room', 'Storage']
    let newRat = {
        name: names[Math.floor(Math.random() * names.length)],
        icon: Math.ceil(Math.random() * 21),
        ferocity: 1,
        wit: 1,
        speed: 1,
        affection: 1,
        hunger: 3,
        condition: '',
        lifeStat: 'alive',
        sheltered: false,
        location: locations[Math.floor(Math.random() * locations.length)],
        kills: [],
        eaten: []
    }

    let attPoints = 16
    while (attPoints > 0) {
        let attributes = ['fr', 'wit', 'sp', 'aff']
        let attPoint = attributes[Math.floor(Math.random() * attributes.length)]
        switch (attPoint) {
            case 'fr':
                newRat.ferocity < 9 ? newRat.ferocity++ : '';
                attPoints--
                break;
            case 'wit':
                newRat.wit < 9 ? newRat.wit++ : '';
                attPoints--
                break;
            case 'sp':
                newRat.speed < 9 ? newRat.speed++ : ';'
                attPoints--
                break;
            case 'aff':
                newRat.affection < 9 ? newRat.affection++ : '';
                attPoints--
                break;
        }
    }

    while (rats.map(obj => obj.name).includes(newRat.name)) {
        newRat.name = names[Math.floor(Math.random() * names.length)]
    }
    while (rats.map(obj => obj.icon).includes(newRat.icon)) {
        newRat.icon = Math.ceil(Math.random() * 21)
    }

    if (rats.length > 7) {
        ratError.textContent = '(ERROR: Rat Overload! kill some rats!)'
        ratError.style.display = '';
    }
    else {
        rats.push(newRat)
        ratsDis.push(copyRat(newRat))
        addToRatDisplay(newRat)
        ratError.style.display = 'none';
    }
})

function addToRatDisplay(newrat) {
    ratDisplayTray.innerHTML += `
        <div class="rat">
            <h4>${newrat.name}</h4>
            <img class="rat-tray-icon" src="rat-img/rat-${newrat.icon}.gif" alt="${newrat.name}">
            <p class="stat">ferocity: <span class="stat-value">${newrat.ferocity}</span></p>
            <p class="stat">wit: <span class="stat-value">${newrat.wit}</span></p>
            <p class="stat">speed: <span class="stat-value">${newrat.speed}</span></p>
            <p class="stat">affection: <span class="stat-value">${newrat.affection}</span></p>
            <button class="kill-btn btn-subtle" id="${newrat.name}">kill</button>
        </div> 
    `

    // to enable kil-btn once rat is made
    for (i = 0; i < killRatBtn.length; i++) {
        let ratID = killRatBtn[i].id
        let ratElement = killRatBtn[i].parentElement
        killRatBtn[i].addEventListener("click", () => {
            rats = rats.filter(obj => obj.name !== ratID)
            ratsDis = ratsDis.filter(obj => obj.name !== ratID)
            ratElement.remove()

            assignRatID()
            //removes start btn when < 4 rats
            rats.length < 5 ? startBtn.style.visibility = 'hidden' : ''
        })
    }
    if (rats.length >= 5) {
        startBtn.style.visibility = 'visible'
    }

    sortRatBySp()
    assignRatID()
}

function assignRatID() {
    for (i = 0; i < rats.length; i++) {
        rats[i].ratID = `rats[${i}]`
        rats[i].num = i
        ratsDis[i].ratID = `ratsDis[${i}]`
    }
}

function sortRatBySp() {
    rats.sort((rat1, rat2) => (rat1.speed > rat2.speed ? -1 : 1))
    ratsDis.sort((rat1, rat2) => (rat1.speed > rat2.speed ? -1 : 1))
}

function copyRat(ratObj) {
    let ratCopy = {}

    ratCopy.name = ratObj.name
    ratCopy.icon = ratCopy.trueIcon = ratObj.icon
    ratCopy.ferocity = ratObj.ferocity
    ratCopy.wit = ratObj.wit
    ratCopy.speed = ratObj.speed
    ratCopy.affection = ratObj.affection
    ratCopy.hunger = ratObj.hunger
    ratCopy.condition = ratObj.condition
    ratCopy.lifeStat = ratObj.lifeStat
    ratCopy.sheltered = ratObj.sheltered
    ratCopy.location = ratObj.location

    return ratCopy
}

////////////////////////
//     GAME START!    //
////////////////////////

startBtn.addEventListener('click', function startGame() {

    document.getElementById('cust-container').style.display = 'none';
    document.getElementById('game-container').style.display = '';
    updateRatDisplay()
    playRound('start')
})

roundBtn.addEventListener('click', () => {
    playRound('start')
    textBox.classList.toggle('scroller')
})

restartBtn.addEventListener('click', () => {
    restartGame()
    playRound('start')
    roundBtn.style.display = ''
    restartBtn.style.display = 'none'
    textBox.classList.toggle('scroller')
})

function updateRatDisplay() {
    let allRats = ratsDis.length
    ratBox.innerHTML = ''
    const statFunc = {
        hunger: (hungerLvl) => {
            let x
            switch (hungerLvl) {
                case 1:
                    x = `<span class="stat-value fine">full</span>`
                    break;
                case 2:
                    x = `<span class="stat-value fine">sated</span>`
                    break;
                case 3:
                    x = `<span class="stat-value warning">hungry</span>`
                    break;
                case 4:
                    x = `<span class="stat-value warning">empty</span>`
                    break;
                case 5:
                    x = `<span class="stat-value danger">starved</span>`
                    break;
            }
            return x
        },



        sheltered: (sheltered) => {
            let x = '</>'
            if (sheltered) {
                x = '<img class="shelter-icon" src="misc-img/shelter.png" alt="sheltered">'
            }
            return x
        }
    }

    for (i = 0; i < allRats; i++) {
        if (ratsDis[i].lifeStat == 'alive') {
            ratBox.innerHTML += `
            <div class="rat-status ${ratsDis[i].condition}">
                <h4>${ratsDis[i].name}</h4>
                <section class="rat-stat-icon-sctn">
                <img class="rat-tray-icon" src="rat-img/rat-${ratsDis[i].icon}.gif" alt="${ratsDis[i].name}">
                ${statFunc.sheltered(ratsDis[i].sheltered)}
                </section>

                <section class="rat-stat-sctn">
                <p class="stat">F: <span class="stat-value">${ratsDis[i].ferocity}</span></p>
                <p class="stat">W: <span class="stat-value">${ratsDis[i].wit}</span></p>
                </section>

                <section class="rat-stat-sctn">
                <p class="stat">S: <span class="stat-value">${ratsDis[i].speed}</span></p>
                <p class="stat">A: <span class="stat-value">${ratsDis[i].affection}</span></p>
                </section>

                <p class="stat"><span class="stat-value">${ratsDis[i].location}</span></p>
                <p class="stat">${statFunc.hunger(ratsDis[i].hunger)}</p>
            </div>`
        }
        else if (ratsDis[i].lifeStat == 'dead') {
            ratBox.innerHTML += `
            <div class="rat-status rat-dead">
                <h4>${ratsDis[i].name}</h4>
                <img class="rat-tray-icon dead-icon" src="rat-img/rat-${ratsDis[i].icon}.gif" alt="${ratsDis[i].name}">
                
                <section class="rat-stat-sctn">
                <p class="stat">F: <span class="stat-value">${ratsDis[i].ferocity}</span></p>
                <p class="stat">W: <span class="stat-value">${ratsDis[i].wit}</span></p>
                </section>

                <section class="rat-stat-sctn">
                <p class="stat">S: <span class="stat-value">${ratsDis[i].speed}</span></p>
                <p class="stat">A: <span class="stat-value">${ratsDis[i].affection}</span></p>
                </section>

                <p class="stat"><b>DEAD</b></p>
            </div>`
        }
    }
}


const playRound = currentRound()
function currentRound() {
    let round = 1
    return (command) => {
        if (command == 'start') {
            roundBtn.style.visibility = 'hidden'
            textBox.innerHTML += `<h3 class="round-num">Round ${round}</h3>`
            console.log(`round: ${round}`)
            textBox.scrollTop = textBox.scrollHeight; //auto scroll to bottom
            const allRats = rats.length

            for (let i = 0; i < allRats; i++) {
                rats[i].lifeStat == 'alive' ? ratTurnDay(rats[i], ratsDis[i]) : '';
            }

            let txt = `<h4 class="day-transition">Midday</h4>`
            let mthd = true
            addToPlot(txt, mthd)

            for (let i = 0; i < allRats; i++) {
                rats[i].lifeStat == 'alive' ? ratTurnDay(rats[i], ratsDis[i]) : '';
            }

            txt = `<h4 class="day-transition">Nightfall</h4>`
            mthd = true
            addToPlot(txt, mthd)

            for (let i = 0; i < allRats; i++) {
                rats[i].lifeStat == 'alive' ? ratTurnNight(rats[i], ratsDis[i]) : ratRevivalChance(rats[i], ratsDis[i]);
            }

            let even
            round % 2 ? even = false : even = true;
            even && round < 7 ? events.calamity.colapse() : '';

            round++
            let plotArr = addToPlot()
            readPlots = setInterval(plotReader(plotArr), 2730)
        }
        else if (command == 'clear') {
            round = 1
        }
    }
}



//PLOTPOINT AND METHOD KEEPER AND READER//
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
    return () => {
        textBox.innerHTML += `<section class="text-section">
            ${toRead[plotpoint].text}
            </section>
        `
        eval(toRead[plotpoint].method)
        updateRatDisplay()
        plotpoint++
        textBox.scrollTop = textBox.scrollHeight; //auto scroll to bottom

        let livingRat = ratsDis.filter(obj => obj.lifeStat == 'alive')
        livingRat.length == 1 ? gameWinner() : '';
        plotpoint >= toRead.length && livingRat.length > 1 ? endRound() : '';
    }
}

function endRound() {
    clearInterval(readPlots)
    addToPlot('clear') //clears plotpoints array for new round

    rats.map(obj => obj.lifeStat).includes('alive') ? roundBtn.style.visibility = 'visible' : '';

    const allRats = rats.length
    for (let i = 0; i < allRats; i++) {
        if (rats[i].lifeStat == 'alive') {
            rats[i].hunger++
            ratsDis[i].hunger++
        }
    }
    updateRatDisplay()

    textBox.classList.toggle('scroller')
}

function gameWinner() {
    clearInterval(readPlots)
    let ratsWinner = ratsDis.filter(obj => obj.lifeStat == 'alive')
    textBox.innerHTML += `
    <section class="text-section">
    <img class="winner-icon" src="rat-img/rat-${ratsWinner[0].icon}.gif" alt="${ratsWinner[0].name}">
        <h4>Winner</h4>
        <h4>${ratsWinner[0].name}</h4>
    </section>
    `
    textBox.scrollTop = textBox.scrollHeight; //auto scroll to bottom
    textBox.classList.toggle('scroller')

    restartBtn.style.display = ''
    roundBtn.style.display = 'none'
}

function restartGame() {

    textBox.innerHTML = ''
    roundBtn.style.visibility = 'hidden'
    locStatus = [
        {
            name: 'Laboratory',
            occupant: 'empty'
        },
        {
            name: 'Trash Pit',
            occupant: 'empty'
        },
        {
            name: 'Burn Room',
            occupant: 'empty'
        },
        {
            name: 'Storage',
            occupant: 'empty'
        }
    ]
    restartRats()
    addToPlot('clear')
    playRound('clear')
}

function restartRats() {

    for (let i = 0; i < rats.length; i++) {
        rats[i].icon = ratsDis[i].trueIcon
        ratsDis[i].icon = ratsDis[i].trueIcon //ratsdis holds original icon
        rats[i].condition = ratsDis[i].condition = ""
        rats[i].eaten = []
        rats[i].hunger = ratsDis[i].hunger = 3
        rats[i].lifeStat = ratsDis[i].lifeStat = 'alive'
        rats[i].kills = []
        rats[i].location = ratsDis[i].location = locStatus[Math.floor(Math.random() * 4)].name
        rats[i].sheltered = ratsDis[i].sheltered = false

    }
    updateRatDisplay()
}




//////////////
// RAT TURN //
//////////////
function ratTurnDay(protagRat, protagCopy) {
    let x = events.motiveDay(protagRat)
    switch (x) {
        case 'hungry':
            events.hunger.hungerPart1(protagRat, protagCopy)
            break;
        case 'moving':
            events.moving.movingPart1(protagRat, protagCopy)
            break;
        case 'shelter':
            events.shelter.shelterPart1(protagRat, protagCopy)
            break;
        case undefined:
            events.emote.loafing(protagRat, protagCopy)
            break;
    }

}

function ratTurnNight(protagRat, protagCopy) {
    let x = events.motiveNight(protagRat)
    switch (x) {
        case 'hungry':
            events.nights.hungerNight(protagRat, protagCopy)
            break;
        case 'dream':
            events.nights.dreaming(protagRat, protagCopy)
            break;
        case 'nightmare':
            events.nights.nightmare(protagRat, protagCopy)
            break;
        case 'enemy':
            events.nights.enemyNight(protagRat, protagCopy)
            break;
        case 'desperation':
            events.nights.desperation(protagRat, protagCopy)
            break;

    }
}

function ratRevivalChance(protagRat, protagCopy) {
    let x = Math.ceil(Math.random() * 5)

    let y = rats.filter(obj => obj.icon == 0)

    if (x == 1 && protagRat.icon !== 0 && !y[0]) {
        let txt
        let mthd

        txt = `
            <img class="text-icon dead-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
            <p> <b>${protagRat.name}</b>'s corpse lay deteriorating</p>
        `
        mthd = true
        addToPlot(txt, mthd)

        txt = `<p>Something flutters from above...</p> `
        mthd = true
        addToPlot(txt, mthd)

        txt = `<img class="scene-icon" src="misc-img/blue-gift-scene.gif" alt="the blue gift">`
        mthd = true
        addToPlot(txt, mthd)

        txt = `
            <img class="text-icon" src="misc-img/blue-gift.gif" alt="the blue gift">
            <p>The <b>blue gift</b> breathes life anew..</p>
        `
        mthd = true
        addToPlot(txt, mthd)

        let liveRats = rats.filter(obj => obj.lifeStat == 'alive')
        let locale = liveRats[Math.floor(Math.random() * liveRats.length)].location

        protagRat.icon = 0
        protagRat.hunger = 3
        protagRat.condition = ""
        protagRat.lifeStat = "alive"
        protagRat.location = locale

        txt = `
            <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
            <p> <b>${protagRat.name}</b> is <b>reborn</b>.</p>
        `
        mthd = `
            ${protagCopy.ratID}.icon = 0
            ${protagCopy.ratID}.hunger = 3
            ${protagCopy.ratID}.condition = ""
            ${protagCopy.ratID}.lifeStat = 'alive'
            ${protagCopy.ratID}.location = '${locale}'
        `
        addToPlot(txt, mthd)
    }
}

/////////////////////////
////// GAME EVENTS //////
/////////////////////////

const events = {
    motiveDay: (protagRat) => {
        let motives = []
        protagRat.hunger >= 3 ? motives.push('hungry') : ''
        rats.filter(obj => obj.location == protagRat.location)[1] ? '' : motives.push('moving')
        protagRat.location == 'vents' ? motives.push('moving') : ''
        protagRat.sheltered == false && protagRat.location !== 'vents' ? motives.push('shelter') : ''
        protagRat.sheltered == true ? motives = motives.filter(mot => mot !== 'moving') : ''
        
        // let localRats = rats
        //     .filter(obj => obj.location == protagRat.location)
        //     .filter(obj => obj.ratID !== protagRat.ratID)
        //     .filter(obj => obj.sheltered == false)
        //     .filter(obj => obj.lifeStat  == 'alive')

        // localRats[0] ? motives.push('interact') : ''

        let x = motives[Math.floor(Math.random() * motives.length)]
        return x
    },


    motiveNight: (protagRat) => {
        let txt
        let mthd
        let x
        switch (protagRat.hunger) {
            case 1:
                x = `full`
                break;
            case 2:
                x = `sated`
                break;
            case 3:
                x = `hungry`
                break;
            case 4:
                x = `empty`
                break;
            case 5:
                x = `starved`
                break;
        }

        if (protagRat.hunger < 5) { //neccesary txt skip for starved
            txt = `
            <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
            <p><b>${protagRat.name}</b> sleeps with a <b>${x}</b> stomach</p>
            `
            mthd = true
            addToPlot(txt, mthd)
        }
        else { }

        let motives = ['dream']
        // protagRat.hunger >= 3 ? motives.push('hungry') : '';
        protagRat.kills[0] ? motives.push('nightmare') : '';
        protagRat.sheltered ? '' : motives.push('enemy')
        protagRat.hunger >= 5 ? motives = ['desperation'] : '';

        return motives[Math.floor(Math.random() * motives.length)]
    },

    statChance: (stat) => {
        let x = 10 - stat
        let chances = []
        //success chance
        for (let i = 0; i < stat; i++) {
            chances.push(1)
        }
        //failure chance
        for (let i = 0; i < x; i++) {
            chances.push(0)
        }

        //randomly sort array
        newArray = []
        cycles = chances.length
        for (let i = 0; i < cycles; i++) {
            let index = Math.floor(Math.random() * chances.length)
            newArray.push(chances.splice(index, 1)[0])
        }

        let result = newArray[Math.floor(Math.random() * chances.length)]

        return result

    },

    nights: {

        dreaming: (protagRat, protagCopy) => {
            let txt
            let mthd
            let x = protagRat.eaten[Math.floor(Math.random() * protagRat.eaten.length)]

            if (!x) {
                let dreams = ['vents', 'spiders', 'rat', 'food']
                dreams = dreams[Math.floor(Math.random() * 4)]

                switch (dreams) {
                    case 'vents':
                        txt = `<p>${protagRat.name} dreams of the hollow vents...</p>`
                        mthd = true
                        addToPlot(txt, mthd)
                        break;
                    case 'spiders':
                        txt = `<p>${protagRat.name} dreams of <b>Spiders</b>...</p>`
                        mthd = true
                        addToPlot(txt, mthd)

                        events.emote.agitatedDumb(protagRat)
                        break;
                    case 'rat':
                        let dreamRat = ratsDis[Math.floor(Math.random() * ratsDis.length)].name
                        txt = `<p>${protagRat.name} dreams of <b>${dreamRat}<b>...</p>`
                        mthd = true
                        addToPlot(txt, mthd)

                        events.emote.agitatedDumb(protagRat)
                        break;
                    case 'food':
                        txt = `<p>${protagRat.name} dreams of food...</p>`
                        mthd = true
                        addToPlot(txt, mthd)

                        txt = `
                            <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                            <p><b>* drools *</b>...</p>
                        `
                        mthd = true
                        addToPlot(txt, mthd)
                        break;
                }
            }

            else {

                txt = `<p>${protagRat.name} dreams of the <b>${x}</b> they ate.</p>`
                mthd = true
                addToPlot(txt, mthd)
            }

        },
        nightmare: (protagRat, protagCopy) => {
            let txt
            let mthd

            let x = protagRat.kills[Math.floor(Math.random() * protagRat.kills.length)]

            txt = `<p>They are <b>haunted</b> by nightmares...</p>`
            mthd = true
            addToPlot(txt, mthd)

            txt = `
                <img class="text-icon dead-icon" src="rat-img/rat-${x.icon}.gif" alt="${x.name}">
                <p> <b>${x.name}</b>'s specter plagues their memory</p>
            `
            mthd = true
            addToPlot(txt, mthd)

            txt = `
                <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p><b>${protagRat.name}</b> twists and turns...</p>
            `
            mthd = true
            addToPlot(txt, mthd)

            if (Math.floor(Math.random() * 3) == 2) {

                txt = `<p>They suddenly awake and-</p>`
                mthd = true
                addToPlot(txt, mthd)

                txt = `<img class="specter-icon" src="misc-img/specter-${Math.ceil(Math.random() * 3)}.gif" alt="${x.name}">`
                mthd = true
                addToPlot(txt, mthd)

                txt = `
                    <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p>..Ah-..<b>Ack</b>!</p>
                `
                mthd = true
                addToPlot(txt, mthd)
            }
        },

        nightSpider: (protagRat, protagCopy) => {
            let txt
            let mthd

            txt = `
                <img class="text-icon" src="misc-img/spider-1.gif" alt="spider">
                <p><b>${protagRat.name}</b> encounters a <b>spider</b>!</p>
            `
            mthd = true
            addToPlot(txt, mthd)

            events.emote.agitatedDumb(protagRat)

            if (events.statChance(protagRat.ferocity)) {
                protagRat.hunger <= 1 ? '' : protagRat.hunger -= 2;
                protagRat.hunger <= 0 ? protagRat.hunger = 1 : ''
                txt = `
                    <p><b>${protagRat.name}</b> bites the spider, killing it! Free food..</p>
                    <span class="success">F:${protagRat.ferocity}</span>
                    `

                mthd = `
                    ${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger -= 2;
                    ${protagCopy.ratID}.hunger <= 0 ? ${protagCopy.ratID}.hunger = 1 : ''
                `
                addToPlot(txt, mthd)
            }

            else {
                events.encounter.enemySpiderPart2(protagRat, protagCopy)
            }
        },
        enemyNight: (protagRat, protagCopy) => {
            let txt
            let mthd

            txt = `<p>They lie exposed without <b>shelter</b>...</p>`
            mthd = true
            addToPlot(txt, mthd)

            txt = `<p>Something stirs in the darkness, <b>${protagRat.name}</b> awakens..</p>`
            mthd = true
            addToPlot(txt, mthd)

            if (Math.floor(Math.random() * 2)) {
                let enemy = Math.floor(Math.random() * 2)
                enemy == 1 ? events.nights.nightSpider(protagRat, protagCopy) : events.encounter.enemyJessica(protagRat, protagCopy);
            }

            else {
                txt = `<p>But nothing appeared...</p>`
                mthd = true
                addToPlot(txt, mthd)

                events.emote.agitatedDumb(protagRat)

            }

        },
        hungerNight: (protagRat, protagCopy) => {
            let txt
            let mthd


        },
        desperation: (protagRat, protagCopy) => {
            let txt
            let mthd

            txt = `
                <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p><b>${protagRat.name}</b> is starving, they cannot rest.</p>
            `
            mthd = true
            addToPlot(txt, mthd)

            txt = `<p>they search for food..</p>`
            mthd = true
            addToPlot(txt, mthd)

            let options = ['spider', 'scrap', 'spider']

            let x = options[Math.floor(Math.random() * options.length)]


            switch (x) {
                case 'spider':
                    txt = `
                        <img class="text-icon" src="misc-img/spider-1.gif" alt="spider">
                        <p><b>${protagRat.name}</b> encounters a <b>spider</b>!</p>
                    `
                    mthd = true
                    addToPlot(txt, mthd)

                    txt = `
                        <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                        <p><b>${protagRat.name}</b> tackles it!</p>
                    `
                    mthd = true
                    addToPlot(txt, mthd)

                    txt = `
                        <img class="text-icon" src="misc-img/spider-1.gif" alt="spider">
                        <p><b>Screeee</b>!</p>
                    `
                    mthd = true
                    addToPlot(txt, mthd)

                    if (events.statChance(protagRat.ferocity)) {
                        protagRat.hunger = 3
                        txt = `
                            <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                            <p><b>${protagRat.name}</b> gorges on spidery flesh!</p>
                            <span class="success">F:${protagRat.ferocity}</span>
                        `
                        mthd = true
                        addToPlot(txt, mthd)

                        txt = `<p>they feel much better!</p>`
                        mthd = `${protagCopy.ratID}.hunger = 3`
                        addToPlot(txt, mthd)
                    }
                    else {
                        protagRat.lifeStat = 'dead'
                        txt = `<p>The <b>spider</b> sinks its fangs <b>deep</b> in the weakened ${protagRat.name}</p>`
                        mthd = true
                        addToPlot(txt, mthd)

                        txt = `
                            <img class="text-icon dead-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                            <p><b>${protagRat.name}</b> is dead..</p>
                            <span class="failure">F:${protagRat.ferocity}</span> 
                        `
                        mthd = `${protagCopy.ratID}.lifeStat = 'dead'`
                        addToPlot(txt, mthd)
                    }
                    break;
                case 'scrap':
                    protagRat.hunger--
                    txt = `
                        <img class="text-icon" src="misc-img/scrap.gif" alt="scrap">
                        <p>They dig and find some <b>scraps</b>!</p>
                    `
                    mthd = `${protagCopy.ratID}.hunger--;`
                    addToPlot(txt, mthd)

                    txt = `<p>Its not much, but tonight they <b>survive</b>...</p>`
                    mthd = true
                    addToPlot(txt, mthd)

                    events.emote.happyDumb(protagRat)
                    break;
            }
        }
    },


    hunger: {
        hungerPart1: (protagRat, protagCopy) => {
            let txt
            let mthd

            txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
            <p><b>${protagRat.name}</b> looks for food..</p>`
            mthd = true
            addToPlot(txt, mthd)

            if (events.statChance(protagRat.ferocity) && protagRat.ferocity >= 6) {
                events.hunger.hungerPart3(protagRat, protagCopy)
            }
            else { events.hunger.hungerPart2(protagRat, protagCopy) }
        },
        hungerPart2: (protagRat, protagCopy) => {
            let txt
            let mthd

            let foodFound = events.statChance(protagRat.wit)
            if (foodFound) {

                const scraps = ['berry', 'cricket', 'bone', 'scrap']
                const foundScrap = scraps[Math.floor(Math.random() * 4)]

                let localRats = rats
                    .filter(obj => obj.location == protagRat.location)
                    .filter(obj => obj.ratID !== protagRat.ratID)
                    .filter(obj => obj.sheltered == false)
                    .filter(obj => obj.speed >= 5)
                    .filter(obj => obj.hunger <= 3)
                    .filter(obj => obj.lifeStat == 'alive')

                if (localRats[0]) {
                    let antagRat = localRats[Math.floor(Math.random() * localRats.length)]
                    let antagCopy = ratsDis[antagRat.num]

                    txt = `
                        <img class="text-icon" src="misc-img/${foundScrap}.gif" alt="${foundScrap}">
                        <p>They dig and find a ${foundScrap}!</p>
                    <span class="success">W:${protagRat.wit}</span>
                    `
                    mthd = true
                    addToPlot(txt, mthd)

                    events.hunger.foodTheft(protagRat, protagCopy, antagRat, antagCopy, foundScrap)
                }

                else {
                    protagRat.eaten.push(foundScrap)

                    txt = `
                        <img class="text-icon" src="misc-img/${foundScrap}.gif" alt="${foundScrap}">
                        <p>They dig and find a ${foundScrap}</p>
                        <span class="success">W:${protagRat.wit}</span>
                    `

                    events.hunger.foodType(protagRat, protagCopy, foundScrap, txt)
                    events.encounter.encounterChance(protagRat, protagCopy, 4)
                }

            }
            else {
                txt = `
                    <p>They look and find nothing..</p>
                    <span class="failure">W:${protagRat.wit}</span>
                `
                mthd = true
                addToPlot(txt, mthd)

                if (events.statChance(protagRat.affection) && protagRat.affection >= 6) {
                    events.hunger.hungerPart4(protagRat, protagCopy)
                }
                else {
                    events.encounter.encounterChance(protagRat, protagCopy, 3)
                }
            }

        },
        hungerPart3: (protagRat, protagCopy) => {
            let txt
            let mthd

            let localRats = rats
                .filter(obj => obj.location == protagRat.location)
                .filter(obj => obj.ratID !== protagRat.ratID)
                .filter(obj => obj.sheltered == false)
                .filter(obj => obj.lifeStat == 'alive')

            if (localRats[0]) {

                let antagRat = localRats[Math.floor(Math.random() * localRats.length)]
                let antagCopy = ratsDis[antagRat.num]

                txt = `<p>They approach <b>${antagRat.name}</b> with hungry eyes</p>`
                mthd = true
                addToPlot(txt, mthd)

                if (antagRat.speed > protagRat.speed && events.statChance(antagRat.speed)) {
                    events.encounter.speedDefence(antagRat, antagCopy)

                    events.emote.agitatedDumb(protagRat)
                }

                else {

                    if (events.statChance(protagRat.ferocity) && protagRat.ferocity >= antagRat.ferocity) {
                        txt = `
                            <p><b>${protagRat.name}</b> bites some flesh out of <b>${antagRat.name}</b>!</p>
                            <span class="success">F:${protagRat.ferocity}</span>
                        `
                        mthd = true
                        addToPlot(txt, mthd)

                        txt = `
                            <img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                            <p><b>A-Ack!</b></p>
                        `
                        mthd = true
                        addToPlot(txt, mthd)


                        if (antagRat.condition == 'wounded') {
                            protagRat.hunger <= 1 ? '' : protagRat.hunger - 2;
                            protagRat.eaten.push('rat meat')
                            protagRat.kills.push(antagRat)
                            antagRat.lifeStat = 'dead'
                            txt = `
                                <img class="text-icon dead-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                                <p><b>${antagRat.name}</b> dies of their wounds..</p>
                            `
                            mthd = ` 
                                ${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger - 2;
                                ${antagCopy.ratID}.lifeStat = 'dead';`
                            addToPlot(txt, mthd)

                            txt = `
                                <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                                <p>*grumbles*..</p>
                            `
                            mthd = true
                            addToPlot(txt, mthd)

                        }

                        else {
                            protagRat.hunger <= 1 ? '' : protagRat.hunger - 2;
                            protagRat.eaten.push('rat meat')
                            antagRat.condition = 'wounded'
                            txt = `
                                <img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                                <p><b>${antagRat.name}</b> scurries away, wounded!</p>
                            `
                            mthd = `${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger - 2;
                            ${antagCopy.ratID}.condition = 'wounded';`
                            addToPlot(txt, mthd)
                        }
                    }
                    else {
                        txt = `
                            <img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                            <p><b>${antagRat.name}</b> growls at <b>${protagRat.name}</b>..</p>
                        `
                        mthd = true
                        addToPlot(txt, mthd)

                        txt = `
                            <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                            <p><b>${protagRat.name}</b> is nervous, they leave them be..</p>
                            <span class="failure">F:${protagRat.ferocity}</span>
                        `
                        mthd = true
                        addToPlot(txt, mthd)

                    }
                }
            }
            else {
                txt = `<p>They look and find nothing..</p>`
                mthd = true
                addToPlot(txt, mthd)
                events.encounter.encounterChance(protagRat, protagCopy, 2)
            }
        },
        hungerPart4: (protagRat, protagCopy) => {
            let txt
            let mthd

            let localRats = rats
                .filter(obj => obj.location == protagRat.location)
                .filter(obj => obj.ratID !== protagRat.ratID)
                .filter(obj => obj.hunger <= 3)
                .filter(obj => obj == 'alive')

            txt = ` 
                <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p><b>${protagRat.name}</b> cries out for help!</p>
                <span class="success">A:${protagRat.affection}</span>
            `
            mthd = true
            addToPlot(txt, mthd)

            txt = `<p>Something approaches..</p>`
            mthd = true
            addToPlot(txt, mthd)

            if (localRats[0]) {

                let antagRat = localRats[Math.floor(Math.random() * localRats.length)]
                let antagCopy = ratsDis[antagRat.num]

                txt = `<img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                <p>Its <b>${antagRat.name}</b></p>`
                mthd = true
                addToPlot(txt, mthd)

                txt = `<p><b>${antagRat.name}</b> approches the begging ${protagRat.name}</p>`
                mthd = true
                addToPlot(txt, mthd)

                if (antagRat.wit <= 7) {
                    antagRat.hunger++
                    protagRat.hunger <= 1 ? '' : protagRat.hunger--;
                    protagRat.eaten.push(`puke from ${antagRat.name}`)

                    txt = `
                        <p><b>${antagRat.name}</b> feels bad, and coughs up some food</p>
                        <span class="failure">W:${protagRat.wit}</span>
                    `
                    mthd = `${antagCopy.ratID}.hunger++`
                    addToPlot(txt, mthd)

                    txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> happily gobbles it down!</p>`
                    mthd = `${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger--;`
                    addToPlot(txt, mthd)

                }
                else {
                    txt = `
                        <p><b>${antagRat.name}</b> sees through their tears and turns away..</p>
                        <span class="success">W:${protagRat.wit}</span>
                    `
                    mthd = true
                    addToPlot(txt, mthd)

                    events.emote.agitatedDumb(protagRat)
                }
            }
            else {

                let event = Math.ceil(Math.random() * 3)
                switch (event) {
                    case 1:
                        events.encounter.enemySpider(protagRat, protagCopy)
                        break;
                    case 2:
                        events.encounter.ratTrap(protagRat, protagCopy)
                        break;
                    case 3:
                        events.encounter.enemySwarm(protagRat, protagCopy)
                        break;
                }
            }
        },
        foodTheft(protagRat, protagCopy, antagRat, antagCopy, food) {
            let txt
            let mthd

            txt = `<img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
            <p><b>${antagRat.name}</b> quickly <b>swoops</b> in!</p>`
            mthd = true
            addToPlot(txt, mthd)

            if (antagRat.speed > protagRat.speed) {

                antagRat.eaten.push(`stolen ${food}`)
                txt = `
                    <p>They gobble up <b>${protagRat.name}</b>'s food and scurries away!</p>
                    <span class="success">S:${protagRat.speed}</span>
                `
                events.hunger.foodType(antagRat, antagCopy, food, txt)

                txt = `
                    <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p>..Ah-<b>Agh</b>!?</p>
                `
                mthd = true
                addToPlot(txt, mthd)

                events.emote.happyDumb(antagRat)
            }

            else {
                protagRat.eaten.push(`${food}`)
                txt = `
                    <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p>But <b>${protagRat.name}</b> is too fast, they swallow it whole!</p>
                    <span class="success">S:${protagRat.speed}</span>
                `
                events.hunger.foodType(protagRat, protagCopy, food, txt)

                txt = `
                    <img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                    <p><b>*Grumbles*..</b></p>
                `
                mthd = true
                addToPlot(txt, mthd)
            }
        },
        foodType(protagRat, protagCopy, food, txt) {
            switch (food) {
                case 'berry':
                    protagRat.hunger <= 1 ? '' : protagRat.hunger -= 3;
                    protagRat.hunger <= 0 ? protagRat.hunger = 1 : ''
                    mthd = `
                        ${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger -= 3;
                        ${protagCopy.ratID}.hunger <= 0 ? ${protagCopy.ratID}.hunger = 1 : ''
                    `
                    break;
                case 'cricket':
                    protagRat.hunger <= 1 ? '' : protagRat.hunger -= 2;
                    protagRat.hunger <= 0 ? protagRat.hunger = 1 : ''
                    mthd = `
                        ${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger -= 2;
                        ${protagCopy.ratID}.hunger <= 0 ? ${protagCopy.ratID}.hunger = 1 : ''
                    `
                    break;
                case 'bone':
                    protagRat.hunger <= 1 ? '' : protagRat.hunger -= 2;
                    protagRat.hunger <= 0 ? protagRat.hunger = 1 : ''
                    mthd = `
                        ${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger -= 2;
                        ${protagCopy.ratID}.hunger <= 0 ? ${protagCopy.ratID}.hunger = 1 : ''
                    `
                    break;
                case 'scrap':
                    protagRat.hunger <= 1 ? '' : protagRat.hunger--;
                    mthd = `${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger--;`
                    break;
            }

            addToPlot(txt, mthd)
        }
    },

    moving: {
        movingPart1: (protagRat, protagCopy) => {
            let txt
            let mthd

            txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
            <p><b>${protagRat.name}</b> is moving</p>`
            mthd = true
            addToPlot(txt, mthd)
            if (protagRat.location == 'vents') {
                events.moving.movingPart2(protagRat, protagCopy)
            }
            else if (protagRat.speed >= 7 && events.statChance(protagRat.speed)) {
                txt = `
                    <p>They move through vents with <b>great speed</b>!</p>
                    <span class="success">S:${protagRat.speed}</span>
                `
                mthd = true
                addToPlot(txt, mthd)
                events.moving.movingPart2(protagRat, protagCopy)
            }
            else {
                protagRat.location = 'vents'
                txt = `<p><b>${protagRat.name}</b> moved to the <b>vents</b></p>`

                mthd = `${protagCopy.ratID}.location = 'vents'`
                addToPlot(txt, mthd)

                events.encounter.encounterChance(protagRat, protagCopy, 2)
            }
        },

        movingPart2: (protagRat, protagCopy) => {
            let txt
            let mthd

            let locations = []
            let availLoc = locStatus.length
            for (let i = 0; i < availLoc; i++) {
                locations.push(locStatus[i].name)
            }
            locations.filter(x => x !== protagRat.location)
            let newLoc = locations[Math.floor(Math.random() * locations.length)]

            protagRat.location = newLoc

            txt = `<p><b>${protagRat.name}</b> moves to the <b>${newLoc}</b></p>`
            mthd = `${protagCopy.ratID}.location = '${newLoc}'`
            addToPlot(txt, mthd)

        }
    },

    shelter: {
        shelterPart1: (protagRat, protagCopy) => {
            let txt
            let mthd

            txt = `
                <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p>${protagRat.name} looks for the <b>${protagRat.location}</b> shelter</p>
            `
            mthd = true
            addToPlot(txt, mthd)
            events.shelter.shelterPart2(protagRat, protagCopy)
        },
        shelterPart2: (protagRat, protagCopy) => {
            let txt
            let mthd

            let shelter = locStatus.filter(obj => obj.name == protagRat.location)[0]

            if (shelter.occupant == 'empty' || shelter.occupant.lifeStat !== 'alive') {
                protagRat.sheltered = true
                shelter.occupant = protagRat
                txt = `<p>${protagRat.name} settles in.</p>`

                mthd = `${protagCopy.ratID}.sheltered = true`
                addToPlot(txt, mthd)

                txt = ` 
                    <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p>${miscValues.acts.happyDumb()}</p>
                `
                mthd = true
                addToPlot(txt, mthd)

                //events.shelter.shelterEncounter(protagRat, protagCopy, 3)
            }
            else {
                let antagRat = shelter.occupant
                let antagCopy = ratsDis[antagRat.num]
                txt = `<p>They approach the shelter, but <b>${antagRat.name}</b> lives there!</p>`
                mthd = true
                addToPlot(txt, mthd)

                txt = `<img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                <p><b>${miscValues.acts.agitatedDumb()}</b></p>`
                mthd = true
                addToPlot(txt, mthd)
                events.shelter.shelterPart3(protagRat, protagCopy, antagRat, antagCopy, shelter)
            }
        },
        shelterPart3: (protagRat, protagCopy, antagRat, antagCopy, shelter) => {
            let txt
            let mthd

            if (events.statChance(protagRat.ferocity)) {
                txt = `
                    <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p>${protagRat.name} growls fiercely at ${antagRat.name}!</p>
                    <span class="success">F:${protagRat.ferocity}</span>
                `
                mthd = true
                addToPlot(txt, mthd)


                if (events.statChance(antagRat.ferocity)) {
                    txt = `
                        <img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                        <p>${antagRat.name} bites at ${protagRat.name}! They will not move..</p>
                        <span class="success">F:${antagRat.ferocity}</span>
                    `
                    mthd = true
                    addToPlot(txt, mthd)

                    if (events.statChance(protagRat.ferocity) && protagRat.condition !== 'wounded' && protagRat.ferocity >= 7) {
                        events.shelter.shelterPart4(protagRat, protagCopy, antagRat, antagCopy, shelter)
                    }
                    else {
                        txt = `
                            <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                            <p>${protagRat.name} flinches. They leave ${antagRat.name} alone..</p>
                        `
                        mthd = true
                        addToPlot(txt, mthd)
                    }
                }

                else {
                    protagRat.sheltered = true
                    antagRat.sheltered = false
                    shelter.occupant = protagRat

                    txt = `
                        <img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                        <p><b>${antagRat.name}</b> was scared away..</p>
                    `
                    mthd = true
                    addToPlot(txt, mthd)

                    txt = `
                        <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                        <p>${protagRat.name} settles into the empty shelter.</p>
                    `
                    mthd = `
                        ${protagCopy.ratID}.sheltered = true
                        ${antagCopy.ratID}.sheltered = false
                    `
                    addToPlot(txt, mthd)

                    if (antagRat.wit >= 6 && events.statChance(antagRat.wit)) {
                        txt = `
                            <img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                            <p>But <b>${antagRat.name}</b> set a trap!</p>
                            <span class="success">W:${antagRat.wit}</span>
                        `
                        mthd = true
                        addToPlot(txt, mthd)

                        events.encounter.witTrap(protagRat, protagCopy, antagRat)

                        events.emote.happyDumb(antagRat)
                    }
                    else { }

                }

            }
            else {
                txt = `
                    <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p>${protagRat.name} leaves ${antagRat.name} be..</p>
                    <span class="failure">F:${protagRat.ferocity}</span>
                `
                mthd = true
                addToPlot(txt, mthd)
            }
        },

        shelterPart4: (protagRat, protagCopy, antagRat, antagCopy, shelter) => {
            let txt
            let mthd

            txt = `
                <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p>${protagRat.name} Angrily jumps in with ${antagRat.name}</p>
                <span class="success">F:${protagRat.ferocity}</span>
            `
            mthd = true
            addToPlot(txt, mthd)

            txt = `<p>In a cloud of dust they claw and bite!</p>`
            mthd = true
            addToPlot(txt, mthd)

            if (antagRat.condition == 'wounded') {
                shelter.occupant = protagRat
                protagRat.sheltered = true
                protagRat.condition = 'wounded'
                antagRat.lifeStat = 'dead'
                txt = `
                    <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> bites hard into <b>${antagRat.name} one last time!</b></p>
                `
                mthd = true
                addToPlot(txt, mthd)

                txt = `
                    <img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                    <p><b>${antagRat.name} is dead..</b></p>
                `
                mthd = `${antagCopy.ratID}.lifeStat = 'dead'`
                addToPlot(txt, mthd)

                txt = `
                    <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> licks their wounds and settle into the shelter..</p>
                `

                mthd = `
                    ${protagCopy.ratID}.sheltered = true
                    ${protagCopy.ratID}.condition = 'wounded'
                `
                addToPlot(txt, mthd)
            }

            else {
                protagRat.sheltered = true
                antagRat.sheltered = false
                shelter.occupant = protagRat
                antagRat.condition = 'wounded'
                protagRat.condition = 'wounded'

                txt = `
                    <img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                    <p><b>${antagRat.name}</b> was scared away..</p>
                `
                mthd = `
                    ${antagCopy.ratID}.condition = 'wounded'
                    ${antagCopy.ratID}.sheltered = false
                `
                addToPlot(txt, mthd)

                txt = `
                    <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> licks their wounds and settles into the shelter..</p>
                `
                mthd = `
                    ${protagCopy.ratID}.condition = 'wounded'
                    ${protagCopy.ratID}.sheltered = true
                `
                addToPlot(txt, mthd)
            }

        },

        shelterEncounter: (protagRat, protagCopy, chance) => {
            let txt
            let mthd
            let result = Math.ceil(Math.random() * chance)

            if (result == 1) {
                txt = `<p>But something stirs in the back of the shelter...</p>`
                mthd = true
                addToPlot(txt, mthd)
                let event = Math.floor(Math.random() * 2)
                event == 1 ? events.shelter.shelterTrap(protagRat, protagCopy) : events.shelter.shelterBug(protagRat, protagCopy);
            }
            else { }
        },

        shelterTrap: (protagRat, protagCopy) => {
            let txt
            let mthd
            let chanceWit = events.statChance(protagRat.wit)

            txt = `
                <img class="text-icon" src="misc-img/rat-trap.gif" alt="rat-trap">
                <p>Its a wad of cheese on a <b>mouse trap</b></p>
            `
            mthd = true
            addToPlot(txt, mthd)

            if (chanceWit) {
                protagRat.hunger <= 1 ? '' : protagRat.hunger -= 2;
                protagRat.hunger <= 0 ? protagRat.hunger = 1 : ''
                protagRat.eaten.push('cheese wad')
                txt = `
                    <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> swats the cheese out of the trap! Free food..</p>
                    <span class="success">W:${protagRat.wit}</span>
                `

                mthd = `
                    ${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger -= 2;
                    ${protagCopy.ratID}.hunger <= 0 ? ${protagCopy.ratID}.hunger = 1 : ''
                `
                addToPlot(txt, mthd)
            }
            else {
                let shelter = locStatus.filter(obj => obj.name == protagRat.location)[0]
                if (protagRat.condition == 'wounded') {
                    shelter.occupant = 'empty'
                    protagRat.sheltered = false
                    protagRat.lifeStat = 'dead'
                    txt = `
                        <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                        <p><b>${protagRat.name}</b> bites the cheese and the trap snaps their head!</p>
                        <span class="failure">W:${protagRat.wit}</span>
                    `
                    mthd = true
                    addToPlot(txt, mthd)

                    txt = `
                        <img class="text-icon dead-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                        <p><b>${protagRat.name}</b> is dead..</p>
                    `
                    mthd = `
                        ${protagCopy.ratID}.sheltered = false
                        ${protagCopy.ratID}.lifeStat = 'dead'
                    `
                    addToPlot(txt, mthd)
                }

                else {
                    shelter.occupant = 'empty'
                    protagRat.sheltered = false
                    protagRat.condition = 'wounded'

                    txt = `
                        <p><b>${protagRat.name}</b> bites the cheese and the trap snaps their nose!</p>
                        <span class="failure">W:${protagRat.wit}</span>
                    `
                    mthd = `${protagCopy.ratID}.condition = 'wounded'`
                    addToPlot(txt, mthd)

                    txt = `
                        <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                        <p><b>${protagRat.name}</b> quickly runs from shelter!</p>
                    `
                    mthd = `${protagCopy.ratID}.sheltered = false`
                    addToPlot(txt, mthd)
                }
            }
        },

        shelterBug: (protagRat, protagCopy) => {
            let txt
            let mthd
            let chanceFerocity = events.statChance(protagRat.ferocity)

            txt = `
                <img class="text-icon" src="misc-img/spider-1.gif" alt="spider">
                <p>A <b>Spider</b> has made their nest here!</p>
            `
            mthd = true
            addToPlot(txt, mthd)

            txt = `
                <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p>${miscValues.acts.agitatedDumb()}</p>
            `
            mthd = true
            addToPlot(txt, mthd)

            if (chanceFerocity) {
                protagRat.hunger <= 1 ? '' : protagRat.hunger -= 2;
                protagRat.hunger <= 0 ? protagRat.hunger = 1 : ''

                txt = `
                    <p><b>${protagRat.name}</b> bites the spider, killing it! Free food..</p>
                    <span class="success">F:${protagRat.ferocity}</span>
                `
                mthd = `
                    ${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger -= 2;
                    ${protagCopy.ratID}.hunger <= 0 ? ${protagCopy.ratID}.hunger = 1 : ''
                `
                addToPlot(txt, mthd)
            }

            else {
                let shelter = locStatus.filter(obj => obj.name == protagRat.location)[0]
                if (protagRat.condition == 'wounded') {
                    shelter.occupant = 'empty'
                    protagRat.lifeStat = 'dead'
                    protagRat.sheltered = false
                    txt = `
                        <img class="text-icon" src="misc-img/spider-1.gif" alt="spider">
                        <p>The spider stabs <b>${protagRat.name}</b> with its fangs!</p>
                    `
                    mthd = true
                    addToPlot(txt, mthd)

                    txt = `
                        <img class="text-icon dead-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                        <p><b>${protagRat.name}</b> is dead..</p>
                        <span class="failure">F:${protagRat.ferocity}</span>
                    `
                    mthd = `
                        ${protagCopy.ratID}.sheltered = false
                        ${protagCopy.ratID}.lifeStat = 'dead'
                    `
                    addToPlot(txt, mthd)
                }

                else {
                    shelter.occupant = 'empty'
                    protagRat.condition = 'wounded'
                    protagRat.sheltered = false
                    txt = `
                        <img class="text-icon" src="misc-img/spider-1.gif" alt="spider">
                        <p>The spider bites <b>${protagRat.name}</b> and they run from the shelter..</p>
                    `
                    mthd = `
                        ${protagCopy.ratID}.sheltered = false
                        ${protagCopy.ratID}.condition = 'wounded'
                    `
                    addToPlot(txt, mthd)
                }
            }
        }

    },

    encounter: {

        encounterChance: (protagRat, protagCopy, chance) => {
            let result = Math.ceil(Math.random() * chance)

            protagRat.sheltered ? result = 0 : '';

            if (result == 1) {

                txt = `<p>something stirs in the darkness..</p>`
                mthd = true
                addToPlot(txt, mthd)

                let event = Math.ceil(Math.random() * 4)
                switch (event) {
                    case 1:
                        events.encounter.enemySpider(protagRat, protagCopy)
                        break;
                    case 2:
                        events.encounter.ratTrap(protagRat, protagCopy)
                        break;
                    case 3:
                        events.encounter.enemyJessica(protagRat, protagCopy)
                        break;
                    case 4:
                        events.encounter.enemySwarm(protagRat, protagCopy)
                }
            }
            else { }
        },

        ratTrap: (protagRat, protagCopy) => {
            let txt
            let mthd

            txt = `
                <img class="text-icon" src="misc-img/rat-trap.gif" alt="rat-trap">
                <p>Its a wad of cheese on a <b>mouse trap</b></p>
            `
            mthd = true
            addToPlot(txt, mthd)

            if (events.statChance(protagRat.wit)) {
                protagRat.hunger <= 1 ? '' : protagRat.hunger -= 2;
                protagRat.hunger <= 0 ? protagRat.hunger = 1 : ''
                protagRat.eaten.push('cheese wad')

                txt = `
                    <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> cleverly swats the cheese out of the trap! Free food..</p>
                    <span class="success">W:${protagRat.wit}</span>
                `

                mthd = `
                    ${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger -= 2;
                    ${protagCopy.ratID}.hunger <= 0 ? ${protagCopy.ratID}.hunger = 1 : ''
                `
                addToPlot(txt, mthd)
            }

            else {

                if (protagRat.condition == 'wounded') {
                    protagRat.lifeStat = 'dead'

                    txt = `
                        <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                        <p><b>${protagRat.name}</b> bites the cheese and the trap snaps their head!</p>
                        <span class="failure">W:${protagRat.wit}</span>
                    `
                    mthd = true
                    addToPlot(txt, mthd)

                    txt = `
                        <img class="text-icon dead-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                        <p><b>${protagRat.name}</b> is dead..</p>
                    `
                    mthd = `${protagCopy.ratID}.lifeStat = 'dead'`
                    addToPlot(txt, mthd)
                }

                else {
                    protagRat.condition = 'wounded'

                    txt = `
                        <p><b>${protagRat.name}</b> bites the cheese and the trap snaps their nose!</p>
                        <span class="failure">W:${protagRat.wit}</span>
                    `
                    mthd = `${protagCopy.ratID}.condition = 'wounded'`
                    addToPlot(txt, mthd)
                }
            }
        },

        enemySpider: (protagRat, protagCopy) => {
            let txt
            let mthd

            txt = `
                <img class="text-icon" src="misc-img/spider-1.gif" alt="spider">
                <p>Its a <b>spider</b>!</p>
            `
            mthd = true
            addToPlot(txt, mthd)

            events.emote.agitatedDumb(protagRat)

            if (events.statChance(protagRat.ferocity)) {
                protagRat.hunger <= 1 ? '' : protagRat.hunger -= 2;
                protagRat.hunger <= 0 ? protagRat.hunger = 1 : ''
                protagRat.eaten.push('spider')

                txt = `
                    <p><b>${protagRat.name}</b> bites the spider, killing it! Free food..</p>
                    <span class="success">F:${protagRat.ferocity}</span>
                `

                mthd = `
                    ${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger -= 2;
                    ${protagCopy.ratID}.hunger <= 0 ? ${protagCopy.ratID}.hunger = 1 : ''
                `
                addToPlot(txt, mthd)
            }

            else if (events.statChance(protagRat.affection) && protagRat.affection >= 6) {
                events.encounter.affDefence(protagRat, protagCopy, 'spider')
            }

            else if (events.statChance(protagRat.speed) && protagRat.speed >= 4) {
                events.encounter.speedDefence(protagRat, protagCopy)
            }

            else {
                events.encounter.enemySpiderPart2(protagRat, protagCopy)
            }
        },

        enemySpiderPart2: (protagRat, protagCopy) => {
            let txt
            let mthd
            if (protagRat.condition == 'wounded') {
                protagRat.lifeStat = 'dead'
                txt = `
                    <img class="text-icon" src="misc-img/spider-1.gif" alt="spider">
                    <p>The spider stabs <b>${protagRat.name}</b> with its fangs!</p>
                `

                mthd = true
                addToPlot(txt, mthd)

                txt = `
                    <img class="text-icon dead-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> is dead..</p>
                    <span class="failure">F:${protagRat.ferocity}</span>
                `

                mthd = `${protagCopy.ratID}.lifeStat = 'dead'`
                addToPlot(txt, mthd)
            }

            else {
                protagRat.condition = 'wounded'
                txt = `
                    <img class="text-icon" src="misc-img/spider-1.gif" alt="spider">
                    <p>The spider bites <b>${protagRat.name}</b>, but they live..</p>
                    <span class="failure">F:${protagRat.ferocity}</span>
                `

                mthd = `${protagCopy.ratID}.condition = 'wounded'`
                addToPlot(txt, mthd)
            }
        },

        enemySwarm: (protagRat, protagCopy) => {
            let txt
            let mthd

            txt = `
                <img class="text-icon" src="misc-img/swarm.gif" alt="swarm">
                <p>It's a <b>Mite Swarm</b>!</p>
            `
            mthd = true
            addToPlot(txt, mthd)

            events.emote.agitatedDumb(protagRat)

            txt = `
                <img class="text-icon" src="misc-img/swarm.gif" alt="swarm">
                <p>They quickly swarm onto <b>${protagRat.name}</b>!</p>
            `
            mthd = true
            addToPlot(txt, mthd)

            if (protagRat.wit >= 4 && events.statChance(protagRat.wit)) {

                if (protagRat.wit >= 6) {
                    txt = `
                    <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> thinks fast! they start <b>rolling</b> on the floor!</p>
                    <span class="success">W:${protagRat.wit}</span>
                    `
                    mthd = true
                    addToPlot(txt, mthd)

                    txt = `
                        <img class="text-icon" src="misc-img/swarm.gif" alt="Jessica">
                        <p>The mites are <b>crushed</b> bit by bit!</p>
                    `
                    mthd = true
                    addToPlot(txt, mthd)

                    txt = `<p>until theres nothing left..</p>`
                    mthd = true
                    addToPlot(txt, mthd)

                    events.emote.happyDumb(protagRat)
                }

                else {
                    protagRat.hunger++
                    txt = `
                    <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> thinks fast! They <b>vomit</b> on the floor!</p>
                    <span class="success">W:${protagRat.wit}</span>
                    `
                    mthd = `${protagCopy.ratID}.hunger++`
                    addToPlot(txt, mthd)

                    txt = `
                        <img class="text-icon" src="misc-img/swarm.gif" alt="Jessica">
                        <p>The mites follow the stinking vomit, leaving ${protagRat.name} be..</p>
                    `
                    mthd = true
                    addToPlot(txt, mthd)

                    txt = `
                    <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b>'s stomach grumbles</p>
                    `
                    mthd = true
                    addToPlot(txt, mthd)
                }


            }

            else if (events.statChance(protagRat.affection) && protagRat.affection >= 4) {
                events.encounter.swarmAffDefence(protagRat, protagCopy)
            }

            else {
                events.encounter.enemySwarm2(protagRat, protagCopy)
            }

        },

        enemySwarm2: (protagRat, protagCopy) => {
            let txt
            let mthd

            txt = `
                <img class="text-icon" src="misc-img/swarm.gif" alt="swarm">
                <p>The swarm engulfs <b>${protagRat.name}</b>, sucking their blood!</p>
                <span class="failure">W:${protagRat.wit}</span>
            `
            mthd = true
            addToPlot(txt, mthd)


            if (protagRat.condition == 'wounded') {
                protagRat.lifeStat = 'dead'
                txt = `
                    <p>...until theres nothing left.</p>
                `
                mthd = true
                addToPlot(txt, mthd)

                txt = `
                    <img class="text-icon dead-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> is dead..</p>
                `
                mthd = `${protagCopy.ratID}.lifeStat = 'dead'`
                addToPlot(txt, mthd)
            }

            else {
                protagRat.condition = 'wounded'
                txt = `<p>They suck until their fill and pass over <b>${protagRat.name}</b>.</p>`
                mthd = `${protagCopy.ratID}.condition = 'wounded'`
                addToPlot(txt, mthd)

                txt = `
                    <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> feels drained..</p>
                `
                mthd = `${protagCopy.ratID}.condition = 'wounded'`
                addToPlot(txt, mthd)
            }
        },

        swarmAffDefence: (protagRat, protagCopy) => {
            let txt
            let mthd
            let localRats = rats
                .filter(obj => obj.location == protagRat.location)
                .filter(obj => obj.ratID !== protagRat.ratID)
                .filter(obj => obj.lifeStat == 'alive')

            txt = `
                <p><b>${protagRat.name}</b> cries for help!</p>
                <span class="success">A:${protagRat.affection}</span>
            `
            mthd = true
            addToPlot(txt, mthd)

            if (localRats[0]) {
                let antagRat = localRats[Math.floor(Math.random() * localRats.length)]
                let antagCopy = ratsDis[antagRat.num]

                txt = `
                    <img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                    <p> An unknowing <b>${antagRat.name}</b> arrives..</p>
                `
                mthd = true
                addToPlot(txt, mthd)

                txt = `<p><b>${antagRat.name}</b> sees the strugling ${protagRat.name}!</p>`
                mthd = true
                addToPlot(txt, mthd)

                if (events.statChance(antagRat.wit) && antagRat.wit >= 4) {

                    txt = `
                        <p>...they slowly back away</p>
                        <span class="success">W:${protagRat.wit}</span>
                    `
                    mthd = true
                    addToPlot(txt, mthd)

                    txt = `
                        <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                        <p><b>* cries *</b>..</p>
                    `
                    mthd = true
                    addToPlot(txt, mthd)

                    events.encounter.enemySwarm2(protagRat, protagCopy)

                }
                else {

                    txt = `<p><b>${antagRat.name}</b> feels bad, they jump into the swarm!</p>`
                    mthd = true
                    addToPlot(txt, mthd)

                    events.encounter.enemySwarm2(antagRat, antagCopy)
                    events.emote.happyDumb(protagRat)
                }
            }
            else {
                txt = `<p>...but no one came</p>`
                mthd = true
                addToPlot(txt, mthd)

                events.encounter.enemySwarm2(protagRat, protagCopy)
            }
        },

        enemyJessica: (protagRat, protagCopy) => {
            let txt
            let mthd

            txt = `
                <img class="text-icon" src="misc-img/Jessica.gif" alt="Jessica">
                <p>It's <b>Jessica</b>!</p>
            `
            mthd = true
            addToPlot(txt, mthd)

            events.emote.agitatedDumb(protagRat)

            txt = `
                <img class="text-icon" src="misc-img/Jessica.gif" alt="Jessica">
                <p><b>Jessica's</b> eyes widen. She gives <b>chase!</b></p>
            `
            mthd = true
            addToPlot(txt, mthd)

            if (protagRat.speed >= 4 && events.statChance(protagRat.speed)) {

                events.encounter.speedDefence(protagRat)

                txt = `
                    <img class="text-icon" src="misc-img/Jessica.gif" alt="Jessica">
                    <p><b>Jessica</b> Cant keep up! She retreats..for now.</p>
                `
                mthd = true
                addToPlot(txt, mthd)

                events.emote.happyDumb(protagRat)

            }

            else if (events.statChance(protagRat.wit) && protagRat.wit >= 4) {
                txt = ` 
                    <img class="text-icon dead-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> thinks fast, they <b>play dead</b>!</p>
                    <span class="success">W:${protagRat.wit}</span>
                `
                mthd = true
                addToPlot(txt, mthd)

                txt = `
                    <img class="text-icon" src="misc-img/Jessica.gif" alt="Jessica">
                    <p><b>Jessica</b> approaches the corpse... She leaves it be.</p>
                `
                mthd = true
                addToPlot(txt, mthd)

                txt = ` 
                    <img class="text-icon dead-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>*sweats*</b>..</p>
                `
                mthd = true
                addToPlot(txt, mthd)
            }

            else {
                events.encounter.enemyJessica2(protagRat, protagCopy)
            }

        },

        enemyJessica2: (protagRat, protagCopy) => {
            let txt
            let mthd

            txt = ` 
                <p>She pounces on <b>${protagRat.name}</b> and beats them with her paws!</p>
            `

            mthd = true
            addToPlot(txt, mthd)

            txt = `
                <img class="text-icon" src="misc-img/Jessica.gif" alt="Jessica">
                <p><b>"Mrrrr!"</b></p>
            `

            mthd = true
            addToPlot(txt, mthd)

            if (protagRat.condition == 'wounded') {
                protagRat.lifeStat = 'dead'

                txt = `
                    <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p>Its too much for <b>${protagRat.name}</b>. Their heart gives out..</p>
                    <span class="failure">S:${protagRat.speed}</span>
                `
                mthd = true
                addToPlot(txt, mthd)

                txt = `
                    <img class="text-icon dead-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> is dead..</p>
                `
                mthd = `${protagCopy.ratID}.lifeStat = 'dead'`
                addToPlot(txt, mthd)
            }

            else {
                protagRat.condition = 'wounded'
                txt = `
                    <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> is beaten, but they survive..</p>
                    <span class="failure">S:${protagRat.speed}</span>
                `
                mthd = `${protagCopy.ratID}.condition = 'wounded'`
                addToPlot(txt, mthd)

            }
        },

        enemyFlexworm: (protagRat, protagCopy) => {
            let txt
            let mthd

            txt = `<p>Something is crawling out of the ground</p>`
            mthd = true
            addToPlot(txt, mthd)

            txt = `
                <img class="text-icon" src="misc-img/flexworm.gif" alt="flexworm">
                <p>Its a large <b>Flexworm</b>!</p>
            `
            mthd = true
            addToPlot(txt, mthd)

            events.emote.agitatedDumb(protagRat)
            let misfortune = ['wound', 'hunger', 'evict']
            let x = misfortune[Math.floor(Math.random() * 3)]
            switch (x) {
                case 'wound':
                    if (protagRat.condition == 'wounded') {
                        let shelter = locStatus.filter(obj => obj.name == protagRat.location)[0]
                        shelter.occupant = 'empty'
                        protagRat.sheltered = false
                        protagRat.lifeStat = 'dead'
                        txt = `<img class="text-icon" src="misc-img/flexworm.gif" alt="flexworm">
                        <p>The flexworm melts <b>${protagRat.name}</b> with a spray of <b>acid</b>!</p>`

                        mthd = true
                        addToPlot(txt, mthd)

                        txt = `<img class="text-icon dead-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                        <p><b>${protagRat.name}</b> is dead..</p>`
                        mthd = `${protagCopy.ratID}.lifeStat = 'dead'
                        ${protagCopy.ratID}.sheltered = false`
                        addToPlot(txt, mthd)

                    }

                    else {
                        protagRat.condition = 'wounded'
                        txt = `<img class="text-icon" src="misc-img/flexworm.gif" alt="flexworm">
                        <p>The flexworm sprays <b>acid</b> over <b>${protagRat.name}</b>, but they live..</p>`

                        mthd = `${protagCopy.ratID}.condition = 'wounded'`
                        addToPlot(txt, mthd)

                    }
                    break;
                case 'hunger':
                    protagRat.hunger++
                    txt = `<img class="text-icon" src="misc-img/flexworm.gif" alt="flexworm">
                    <p>The flexworm sprays <b>toxins</b> into the air!</p>`
                    mthd = true
                    addToPlot(txt, mthd)

                    txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> throws up! They feel more <b>empty</b>..</p>`
                    mthd = `${protagCopy.ratID}.hunger++`
                    addToPlot(txt, mthd)

                    break;
                case 'evict':
                    let shelter = locStatus.filter(obj => obj.name == protagRat.location)[0]
                    shelter.occupant = 'empty'
                    protagRat.sheltered = false
                    txt = `<img class="text-icon" src="misc-img/flexworm.gif" alt="flexworm">
                    <p>The flexworm <b>screams</b>! It hurts to hear!</p>`
                    mthd = true
                    addToPlot(txt, mthd)

                    txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> cant take it, they <b>run away</b> from the shelter..</p>`
                    mthd = `${protagCopy.ratID}.sheltered = false`
                    addToPlot(txt, mthd)
                    break;
            }

        },

        affDefence: (protagRat, protagCopy, bug) => {
            let txt
            let mthd
            let localRats = rats
                .filter(obj => obj.location == protagRat.location)
                .filter(obj => obj.ratID !== protagRat.ratID)
                .filter(obj => obj.lifeStat == 'alive')

            txt = `
                <p><b>${protagRat.name}</b> cries for help!</p>
                <span class="success">A:${protagRat.affection}</span>
            `
            mthd = true
            addToPlot(txt, mthd)

            if (localRats[0]) {
                let antagRat = localRats[Math.floor(Math.random() * localRats.length)]
                let antagCopy = ratsDis[antagRat.num]

                txt = `
                    <img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                    <p> A curious <b>${antagRat.name}</b> arrives..
                `
                mthd = true
                addToPlot(txt, mthd)

                if (events.statChance(antagRat.ferocity)) {
                    antagRat.hunger <= 1 ? '' : antagRat.hunger -= 2;
                    antagRat.hunger <= 0 ? antagRat.hunger = 1 : ''
                    antagRat.eaten.push('spider')
                    txt = `<p><b>${antagRat.name}</b> bites the ${bug}, killing it! Free food..</p>`

                    mthd = `
                        ${antagCopy.ratID}.hunger <= 1 ? '' : ${antagCopy.ratID}.hunger -= 2;
                        ${antagCopy.ratID}.hunger <= 0 ? ${antagCopy.ratID}.hunger = 1 : ''
                    `
                    addToPlot(txt, mthd)
                }
                else {
                    events.encounter.enemySpiderPart2(antagRat, antagCopy)
                    events.emote.happyDumb(protagRat)
                }
            }
            else {
                switch (bug) {
                    case 'spider':
                        events.encounter.enemySpiderPart2(protagRat, protagCopy)
                        break;
                }

            }

        },

        speedDefence: (protagRat) => {
            let txt
            let mthd

            txt = `
                <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p><b>${protagRat.name}</b> is too fast! They <b>run away</b>!</p>
                <span class="success">S:${protagRat.speed}</span>
            `
            mthd = true
            addToPlot(txt, mthd)
        },

        witTrap: (protagRat, protagCopy, witRat) => {
            let txt
            let mthd
            let traps = ['poop', 'pit']
            let choice = traps[Math.floor(Math.random() * traps.length)]

            switch (choice) {
                case 'poop':
                    protagRat.hunger >= 4 ? protagRat.hunger = 5 : protagRat.hunger += 2;

                    txt = '<p>Its a stinking mound of <b>poop</b>! The smell is <b>unbearable!</b></p>'
                    mthd = true
                    addToPlot(txt, mthd)

                    txt = `
                        <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                        <p><b>${protagRat.name}</b> throws up! They feel more empty..</p>
                    `
                    mthd = `${protagCopy.ratID}.hunger >= 4 ? ${protagCopy.ratID}.hunger = 5 : ${protagCopy.ratID}.hunger += 2;`
                    addToPlot(txt, mthd)

                    break;
                case 'pit':

                    txt = `<p>The ground trembles..Its a <b>pit trap</b>!</p>`
                    mthd = true
                    addToPlot(txt, mthd)

                    if (protagRat.condition == 'wounded') {
                        protagRat.lifeStat = 'dead'
                        witRat.kills.push(protagRat)

                        txt = `
                            <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                            <p><b>${protagRat.name}</b> tumbles and lands on a <b>spike</b>!</p>
                        `
                        mthd = true
                        addToPlot(txt, mthd)

                        txt = `
                            <img class="text-icon dead-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                            <p><b>${protagRat.name}</b> is dead..</p>
                        `

                        mthd = `${protagCopy.ratID}.lifeStat = 'dead'`
                        addToPlot(txt, mthd)
                    }

                    else {
                        protagRat.condition = 'wounded'
                        txt = `
                            <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                            <p><b>${protagRat.name}</b> falls in and grazes a sharp <b>spike</b>! too close..</p>
                        `
                        mthd = true
                        addToPlot(txt, mthd)

                        txt = `<p><b>${protagRat.name}</b> is wounded</p>`
                        mthd = `${protagCopy.ratID}.condition = 'wounded'`
                        addToPlot(txt, mthd)
                    }
                    break;
            }
        }
    },

    calamity: {

        colapse: () => {
            let txt
            let mthd

            let locale = locStatus[Math.floor(Math.random() * locStatus.length)]
            let locName = locale.name
            let localRats = rats.filter(obj => obj.location == locName)
            let localRatsCopy = []
            for (let i = 0; i < localRats.length; i++) {
                localRatsCopy.push(ratsDis[localRats[i].num])
            }

            txt = `<p class="calamity-txt">The <b>${locale.name}</b> crumbles..Rocks and Debris fall from above.</p>`
            mthd = true
            addToPlot(txt, mthd)

            const allRats = localRats.length
            for (let i = 0; i < allRats; i++) {
                localRats[i].lifeStat == 'alive' ? events.calamity.escapeTurn(localRats[i], localRatsCopy[i]) : '';

            }

            txt = `<p class="calamity-txt">The <b>${locale.name}</b> is destroyed...</p>`
            mthd = true
            addToPlot(txt, mthd)

            locStatus = locStatus.filter(obj => obj.name !== locale.name)

        },

        escapeTurn: (protagRat, protagCopy) => {
            let txt
            let mthd
            let survival = events.statChance(protagRat.speed)


            if (survival) {

                txt = `
                    <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p>${protagRat.name} scrambles to escape!</p>
                `
                mthd = true
                addToPlot(txt, mthd)

                protagRat.location = 'vents'
                protagRat.sheltered = false
                txt = `
                    <p>${protagRat.name} avoids the falling debris and escape to the <b>vents</b>!</p>
                    <span class="success">S:${protagRat.speed}</span>
                `
                mthd = `${protagCopy.ratID}.location = 'vents'
                ${protagCopy.ratID}.sheltered = false`
                addToPlot(txt, mthd)
            }
            else {
                events.calamity.escapeTurnP2(protagRat, protagCopy)
            }



        },

        escapeTurnP2: (protagRat, protagCopy) => {
            let txt
            let mthd

            txt = `
                <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p>${protagRat.name} scrambles to escape! But they're <b>too slow</b>!</p>
                <span class="failure">S:${protagRat.speed}</span>
            `
            mthd = true
            addToPlot(txt, mthd)

            if (protagRat.condition == 'wounded') {
                protagRat.lifeStat = 'dead'
                protagRat.sheltered = false

                txt = `<p>${protagRat.name} is <b>crushed</b> by a massive rock!</p>`
                mthd = `${protagCopy.ratID}.sheltered = false`
                addToPlot(txt, mthd)

                txt = `
                    <img class="text-icon dead-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> is dead..</p>
                `
                mthd = `${protagCopy.ratID}.lifeStat = 'dead'`
                addToPlot(txt, mthd)
            }
            else {
                protagRat.location = 'vents'
                protagRat.sheltered = false
                protagRat.condition = 'wounded'
                txt = `<p>A rock falls on ${protagRat.name}, but they live..</p>`
                mthd = `${protagCopy.ratID}.location = 'vents'
                ${protagCopy.ratID}.sheltered = false
                ${protagCopy.ratID}.condition = 'wounded'`
                addToPlot(txt, mthd)

                events.emote.agitatedDumb(protagRat)
            }

        }

    },

    emote: {
        loafing: (protagRat, protagCopy) => {
            let txt
            let mthd

            txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
            <p><b>${protagRat.name}</b> is loafing about comfortably</p>`
            mthd = true
            addToPlot(txt, mthd)

            events.emote.happyDumb(protagRat)

            if (Math.floor(Math.random() * 2)) {
                events.encounter.enemyFlexworm(protagRat, protagCopy)
            }

        },

        happyDumb: (protagRat) => {
            let txt
            let mthd

            txt = ` 
                <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p>${miscValues.acts.happyDumb()}</p>
            `
            mthd = true
            addToPlot(txt, mthd)
        },

        agitatedDumb: (protagRat) => {
            let txt
            let mthd

            txt = `
                <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p>${miscValues.acts.agitatedDumb()}</p>
            `
            mthd = true
            addToPlot(txt, mthd)
        }
    },

    interact: {

        interactType: (protagRat, protagCopy) => {
            let intType = ['neut']
            let localRats = rats
                .filter(obj => obj.location == protagRat.location)
                .filter(obj => obj.ratID !== protagRat.ratID)
                .filter(obj => obj.sheltered == false)
                .filter(obj => obj.lifeStat == 'alive')

            let antagRat = localRats[Math.floor(Math.random() * localRats.length)]
            let antagCopy = ratsDis[antagRat.num]

            protagRat.ferocity >= 6 ? intType.push('agro') : ''
            protagRat.wit >= 6 ? intType.push('curio') : ''
            protagRat.affection >= 6 ? intType.push('afft') : ''

            intType = intType[Math.floor(Math.random() * intType.length)]

            switch (intType) {
                case 'agro':
                    events.interact.intAgro(protagRat, protagCopy, antagRat, antagCopy)
                    break;
                case 'curio':
                    events.interact.intCurio(protagRat, protagCopy, antagRat, antagCopy)
                    break;
                case 'afft':
                    events.interact.intAfft(protagRat, protagCopy, antagRat, antagCopy)
                    break;
                default:
                    events.interact.intNeut(protagRat, protagCopy, antagRat, antagCopy)
                    break;
            }

        },
        intAgro: (protagRat, protagCopy, antagRat, antagCopy) => {
            let txt
            let mthd

            txt = ` 
                <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p><b>${protagRat.name}</b> crosses paths with <b>${antagRat.name}</b></p>
            `
            mthd = true
            addToPlot(txt, mthd)

            txt = ` 
                <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p><b>"Hsssss..!"</b></p>
            `
            mthd = true
            addToPlot(txt, mthd)

            if (protagRat.ferocity > antagRat.ferocity) {
                txt = ` 
                    <img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                    <p><b>${antagRat.name}</b> is nervous..</p>
                `
                mthd = true
                addToPlot(txt, mthd)
            }

        },
        intCurio: (protagRat, protagCopy, antagRat, antagCopy) => {

        },
        intAfft: (protagRat, protagCopy, antagRat, antagCopy) => {

        },
        intNeut: (protagRat, protagCopy, antagRat, antagCopy) => {

        },
    }
}

quiteBtn.addEventListener('click', resetAll = () => {
    document.getElementById('cust-container').style.display = '';
    document.getElementById('game-container').style.display = 'none';

    ratDisplayTray.innerHTML = ''
    ratBox.innerHTML = ''
    textBox.innerHTML = ''
    startBtn.style.visibility = 'hidden'
    restartBtn.style.display = 'none'
    roundBtn.style.visibility = 'hidden'
    roundBtn.style.display = ''
    ratError.textContent = ''
    rats = []
    ratsDis = []
    ratIcon = 1
    locStatus = [
        {
            name: 'Laboratory',
            occupant: 'empty'
        },
        {
            name: 'Trash Pit',
            occupant: 'empty'
        },
        {
            name: 'Burn Room',
            occupant: 'empty'
        },
        {
            name: 'Storage',
            occupant: 'empty'
        }
    ]
    textBox.classList.remove('scroller')
    ratCustIcon.src = `rat-img/rat-${ratIcon}.gif`
    clearInterval(readPlots)
    addToPlot('clear')
    playRound('clear')
})