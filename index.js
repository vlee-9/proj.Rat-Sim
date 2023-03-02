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
const roundStart = document.getElementById('round-btn')


const custContainer = document.getElementById('cust-container')
const gameContainer = document.getElementById('game-container')

const textBox = document.getElementById('text-box')
const ratBox = document.getElementById('rat-stats')
const quiteBtn = document.getElementById("quit-btn")

startBtn.style.display = 'none'
roundStart.style.visibility = 'hidden'
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
        name: 'Trash Pits',
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
            let emote = ['"Hap! Hap!"', '*snickers*', '*smiles*', '"Heee!"', '*Rawr XD', '*Squeek* *Squeek*', '*Jumps happily*!', '"Prrrrr..."']
            let choice = emote[Math.floor(Math.random() * emote.length)]
            return choice
        }
    },

    enemies: {}
}

for (i = 0; i < attBtn.length; i++) {
    let x = attBtn[i].id

    attBtn[i].addEventListener('click', () => {
        switch (x) {
            case 'icon-btn-down':
                ratIcon--
                console.log(ratIcon)
                ratIcon <= 0 ? ratIcon = 22 : '';

                ratCustIcon.src = `rat-img/rat-${ratIcon}.gif`
                break;
            case 'icon-btn-up':
                ratIcon++
                ratIcon > 22 ? ratIcon = 1 : '';
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

addRatBtn.addEventListener('click', addRat = () => {
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
        const locations = ['Laboratory', 'Trash Pits', 'Burn Room', 'Storage']

        newRat.name = ratNameInput.value
        newRat.icon = ratIcon
        newRat.ferocity = parseInt(feroAtt.textContent)
        newRat.wit = parseInt(witAtt.textContent)
        newRat.speed = parseInt(speedAtt.textContent)
        newRat.affection = parseInt(affectAtt.textContent)
        newRat.hunger = 3
        newRat.condition = ''
        newRat.isAlive = true
        // newRat.hasFood = false
        newRat.sheltered = false
        newRat.location = locations[Math.floor(Math.random() * locations.length)]
        rats.push(newRat)
        ratsDis.push(copyRat(newRat))
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

randomRatBtn.addEventListener('click', function ratRandomizer() {
    const names = ["Jogun", "Misser", "Loosh", "Patten", "Lop", "Bóck", "Björn", "lithete", "Ulmm", "Olmaes", "Aptat", "Abby", "Jake", "Tom", "Aless", "Alice", "Tread", "Red", "Holly", "Sister", "Marge", "Kapuy", "Illum", "Ill", "Robin", "Royce", "Jacette", "Lord", "General", "Furry", "Wolf", "Bun-Bun", "Frogert", "Alpine"]
    const locations = ['Laboratory', 'Trash Pits', 'Burn Room', 'Storage']
    let newRat = {
        name: names[Math.floor(Math.random() * names.length)],
        icon: Math.ceil(Math.random() * 21),
        ferocity: 1,
        wit: 1,
        speed: 1,
        affection: 1,
        hunger: 3,
        condition: '',
        isAlive: true,
        // hasFood: false,
        sheltered: false,
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
            rats.length < 4 ? startBtn.style.display = 'none' : ''
        })
    }
    if (rats.length >= 4) {
        startBtn.style.display = ''
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
    ratCopy.icon = ratObj.icon
    ratCopy.ferocity = ratObj.ferocity
    ratCopy.wit = ratObj.wit
    ratCopy.speed = ratObj.speed
    ratCopy.affection = ratObj.affection
    ratCopy.hunger = ratObj.hunger
    ratCopy.condition = ratObj.condition
    ratCopy.isAlive = ratObj.isAlive
    // ratCopy.hasFood = ratObj.hasFood
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

roundStart.addEventListener('click', () => {
    playRound('start')
    textBox.classList.toggle('scroller')
})

function updateRatDisplay() {
    let allRats = ratsDis.length
    ratBox.innerHTML = ''
    const statFunc = {
        hunger: (hungerLvl) => {
            let x
            if (hungerLvl == 1) {
                x = `<span class="stat-value fine">full</span>`
            }
            else if (hungerLvl == 2) {
                x = `<span class="stat-value fine">sated</span>`
            }
            else if (hungerLvl == 3 || hungerLvl == 4) {
                x = `<span class="stat-value warning">hungry</span>`
            }
            else if (hungerLvl >= 5) {
                x = `<span class="stat-value danger">starved</span>`
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
        if (ratsDis[i].isAlive) {
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
        else if (ratsDis[i].isAlive == false) {
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

                <p class="stat"><span class="stat-value">${ratsDis[i].location}</span></p>
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
            roundStart.style.visibility = 'hidden'
            textBox.innerHTML += `<h3 class="round-num">Round ${round}</h3>`
            console.log(`round: ${round}`)

            const allRats = rats.length
            for (let i = 0; i < allRats; i++) {
                rats[i].isAlive == true ? ratTurnDay(rats[i], ratsDis[i]) : '';

            }

            let txt = `<h4 class="day-transition">Midday</h4>`
            let mthd = true
            addToPlot(txt, mthd)

            for (let i = 0; i < allRats; i++) {
                rats[i].isAlive == true ? ratTurnDay(rats[i], ratsDis[i]) : '';

            }

            txt = `<h4 class="day-transition">Nightfall</h4>`
            mthd = true
            addToPlot(txt, mthd)

            round++
            let plotArr = addToPlot()
            // console.log(plotArr)
            readPlots = setInterval(plotReader(plotArr), 2700)
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
    console.log(toRead.length)
    return () => {
        textBox.innerHTML += `<section class="text-section">
            ${toRead[plotpoint].text}
            </section>
        `
        eval(toRead[plotpoint].method)
        updateRatDisplay()
        plotpoint++
        if (plotpoint >= toRead.length) {
            clearInterval(readPlots)
            addToPlot('clear') //clears plotpoints array for new round
            //temporary block for all dead rats
            rats.map(obj => obj.isAlive).includes(true) ? roundStart.style.visibility = 'visible' : '';
            textBox.classList.toggle('scroller')
            textBox.scrollTop = textBox.scrollHeight; //auto scroll to bottom
        }
    }
}

// RAT TURN //
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

// GAME EVENTS //

const events = {
    motiveDay: (protagRat) => {
        let motives = ['hungry', 'moving', 'shelter']
        motives = protagRat.hunger <= 2 ? motives.filter(x => x !== 'hungry') : motives;
        motives = protagRat.sheltered ? motives.filter(x => x !== 'shelter') : motives;
        motives = protagRat.sheltered ? motives.filter(x => x !== 'moving') : motives;
        motives = protagRat.location == 'vents' ? motives.filter(x => x !== 'shelter') : motives;
        // console.log(motives)
        let x = motives[Math.floor(Math.random() * motives.length)]
        return x
    },

    motiveDay2: (protagRat) => {
        let motives = ['hungry', 'moving', 'shelter']
        motives = protagRat.hunger <= 2 ? motives.filter(x => x !== 'hungry') : motives;
        motives = protagRat.sheltered ? motives.filter(x => x !== 'shelter') : motives;
        motives = protagRat.sheltered ? motives.filter(x => x !== 'moving') : motives;
        motives = protagRat.location == 'vents' ? motives.filter(x => x !== 'shelter') : motives;

        // console.log(motives)
        let x = motives[Math.floor(Math.random() * motives.length)]
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

        // console.log(newArray, stat)
        let result = newArray[Math.floor(Math.random() * chances.length)]

        return result

    },

    hunger: {
        hungerPart1: (protagRat, protagCopy) => {
            let txt
            let mthd
            let chanceFerocity = events.statChance(protagRat.ferocity)

            txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
            <p><b>${protagRat.name}</b> looks for food..</p>`
            mthd = true
            addToPlot(txt, mthd)
            if (chanceFerocity && protagRat.ferocity >= 7) {
                events.hunger.hungerPart3(protagRat, protagCopy)
            }
            else { events.hunger.hungerPart2(protagRat, protagCopy) }
        },
        ///////
        hungerPart2: (protagRat, protagCopy) => {
            let txt
            let mthd

            let foodFound = events.statChance(protagRat.wit)
            if (foodFound) {

                let localRats = rats
                .filter(obj => obj.location == protagRat.location)
                .filter(obj => obj.ratID !== protagRat.ratID)
                .filter(obj => obj.sheltered == false)
                .filter(obj => obj.speed >= 6)
                .filter(obj => obj.hunger <= 3)
                .filter(obj => obj.isAlive)

                if(localRats[0]){
                    let antagRat = localRats[Math.floor(Math.random() * localRats.length)]
                    let antagCopy = ratsDis[antagRat.num]

                    txt = `<p>They dig and find some scraps!</p>`
                    mthd = true
                    addToPlot(txt, mthd)

                    events.hunger.foodTheft(protagRat, protagCopy, antagRat, antagCopy)
                }

                else{
                    protagRat.hunger <= 1 ? '' : protagRat.hunger--;

                    txt = `<p>They dig and find some scraps!</p>`
                    mthd = `${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger--;`
                    addToPlot(txt, mthd)
                }

            }
            else {
                txt = `<p>They look and find nothing..</p>`
                mthd = true
                addToPlot(txt, mthd)

                if (events.statChance(protagRat.affection) && protagRat.affection >= 6) {
                    events.hunger.hungerPart4(protagRat, protagCopy)
                }
                else { events.encounter.encounterChance(protagRat, protagCopy, 3) }
            }

        },
        ///////
        hungerPart3: (protagRat, protagCopy) => {
            let txt
            let mthd

            let localRats = rats
                .filter(obj => obj.location == protagRat.location)
                .filter(obj => obj.ratID !== protagRat.ratID)
                .filter(obj => obj.sheltered == false)
                .filter(obj => obj.isAlive)

            if (localRats[0]) {
                let chanceFerocity = events.statChance(protagRat.ferocity)

                let antagRat = localRats[Math.floor(Math.random() * localRats.length)]
                let antagCopy = ratsDis[antagRat.num]

                txt = `<p>They approach <b>${antagRat.name}</b> with hungry eyes</p>`
                mthd = true
                addToPlot(txt, mthd)

                if(antagRat.speed > protagRat.speed && events.statChance(antagRat.speed)){
                    txt = `<img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                    <p><b>${antagRat.name}</b> is too fast! They <b>run away</b>!</p>`
                    mthd = true
                    addToPlot(txt, mthd)

                    events.emote.agitatedDumb(protagRat)
                }

                else{

                    if (chanceFerocity && protagRat.ferocity >= antagRat.ferocity) {
                        txt = `<p><b>${protagRat.name}</b> bites some flesh out of <b>${antagRat.name}</b>!</p>`
                        mthd = true
                        addToPlot(txt, mthd)

                        if (antagRat.condition == 'wounded') {
                            protagRat.hunger <= 1 ? '' : protagRat.hunger--;
                            antagRat.isAlive = false
                            txt = `
                            <img class="text-icon dead-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                            <p><b>${antagRat.name}</b> dies of their wounds..</p>`
                            mthd = ` 
                            ${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger--;
                            ${antagCopy.ratID}.isAlive = false;`
                            addToPlot(txt, mthd)


                        }

                        else {
                            protagRat.hunger <= 1 ? '' : protagRat.hunger--;
                            antagRat.condition = 'wounded'
                            txt = `<img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                            <p><b>${antagRat.name}</b> is wounded!</p>`
                            mthd = `${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger--;
                            ${antagCopy.ratID}.condition = 'wounded';`
                            addToPlot(txt, mthd)
                        }
                    }
                    else {
                        txt = `
                            <p><b>${protagRat.name}</b> attacks <b>${antagRat.name}</b> but fails..</p>
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
                .filter(obj => obj.isAlive)

            txt = ` <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
            <p><b>${protagRat.name}</b> cries out for help!</p>`
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

                    txt = `<p><b>${antagRat.name}</b> feels bad, and coughs up some food</p>`
                    mthd = `${antagCopy.ratID}.hunger++`
                    addToPlot(txt, mthd)

                    txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> happily gobbles it down!</p>`
                    mthd = `${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger--;`
                    addToPlot(txt, mthd)

                }
                else {
                    txt = `<p><b>${antagRat.name}</b> sees through their tears and turns away..</p>`
                    mthd = true
                    addToPlot(txt, mthd)

                    events.emote.agitatedDumb(protagRat)
                }
            }
            else {
                events.encounter.enemySpider(protagRat, protagCopy)
            }
        },
        foodTheft(protagRat, protagCopy, antagRat, antagCopy){
            let txt
            let mthd

            txt =`<img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
            <p><b>${antagRat.name}</b> quickly <b>swoops</b> in!</p>`
            mthd = true
            addToPlot(txt, mthd)

            if (antagRat.speed > protagRat.speed){
                antagRat.hunger--;
                txt =`<p>They gobble up <b>${protagRat.name}</b>'s food and scurries away!</p>`
                mthd = `${antagCopy.ratID}.hunger--;`
                addToPlot(txt, mthd)
                
                txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p><b>-Agh!?</b></p>`
                mthd = true
                addToPlot(txt, mthd)

                events.emote.happyDumb(antagRat)
            }

            else{
                protagRat.hunger <= 1 ? '' : protagRat.hunger--;

                txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p>But <b>${protagRat.name}</b> is too fast, they swallow it whole!</p>`
                mthd = `${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger--;`
                addToPlot(txt, mthd)

                txt =`<img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                <p><b>*Grumbles*..</b></p>`
                mthd = true
                addToPlot(txt, mthd)
            }
        }
    },

    moving: {
        movingPart1: (protagRat, protagCopy) => {
            let txt
            let mthd

            txt = `
                <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p><b>${protagRat.name}</b> is moving</p>`
            mthd = true
            addToPlot(txt, mthd)
            if (protagRat.location == 'vents') {
                events.moving.movingPart2(protagRat, protagCopy)
            }
            else if (protagRat.speed >= 7 && events.statChance(protagRat.speed)) {
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

            let locations = ['Laboratory', 'Trash Pits', 'Burn Room', 'Storage']
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

            txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
            <p>${protagRat.name} looks for the <b>${protagRat.location}</b> shelter</p>`
            mthd = true
            addToPlot(txt, mthd)
            events.shelter.shelterPart2(protagRat, protagCopy)
        },
        shelterPart2: (protagRat, protagCopy) => {
            let txt
            let mthd

            let shelter = locStatus.filter(obj => obj.name == protagRat.location)[0]

            if (shelter.occupant == 'empty') {
                protagRat.sheltered = true
                shelter.occupant = protagRat
                txt = `<p>${protagRat.name} settles into the empty shelter.</p>`

                mthd = `${protagCopy.ratID}.sheltered = true`
                addToPlot(txt, mthd)

                txt = ` <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p>${miscValues.acts.happyDumb()}</p>`
                mthd = true
                addToPlot(txt, mthd)

                events.shelter.shelterEncounter(protagRat, protagCopy, 3)
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
                txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p>${protagRat.name} growls fiercely at ${antagRat.name}!</p>`

                mthd = true
                addToPlot(txt, mthd)


                if (events.statChance(antagRat.ferocity)) {
                    txt = `<img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                    <p>${antagRat.name} bites at ${protagRat.name}! They will not move..</p>`

                    mthd = true
                    addToPlot(txt, mthd)

                    if (events.statChance(protagRat.ferocity) && protagRat.condition !== 'wounded' && protagRat.ferocity >= 7) {
                        events.shelter.shelterPart4(protagRat, protagCopy, antagRat, antagCopy, shelter)
                    }
                    else {
                        txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                        <p>${protagRat.name} flinches. They leave ${antagRat.name} alone..</p>`

                        mthd = true
                        addToPlot(txt, mthd)
                    }
                }

                else {
                    protagRat.sheltered = true
                    antagRat.sheltered = false
                    shelter.occupant = protagRat
                    txt = `<p><b>${antagRat.name}</b> was scared away..</p>`

                    mthd = true
                    addToPlot(txt, mthd)

                    txt = `<p>${protagRat.name} settles into the empty shelter.</p>`

                    mthd = `${protagCopy.ratID}.sheltered = true
                    ${antagCopy.ratID}.sheltered = false`
                    addToPlot(txt, mthd)

                    if (antagRat.wit >= 8) {
                        txt = `<p>But <b>${antagRat.name}</b> set a trap!</p>`
                        mthd = true
                        addToPlot(txt, mthd)

                        events.encounter.witTrap(protagRat, protagCopy)

                        events.emote.happyDumb(antagRat)
                    }
                    else{}

                }

            }
            else {
                txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p>${protagRat.name} leaves ${antagRat.name} be..</p>`

                mthd = true
                addToPlot(txt, mthd)
            }
        },

        shelterPart4: (protagRat, protagCopy, antagRat, antagCopy, shelter) => {
            let txt
            let mthd

            txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
            <p>${protagRat.name} Angrily jumps in with ${antagRat.name}</p>`
            mthd = true
            addToPlot(txt, mthd)

            txt = `<p>In a cloud of dust they claw and bite!</p>`
            mthd = true
            addToPlot(txt, mthd)

            if (antagRat.condition == 'wounded') {
                shelter.occupant = protagRat
                protagRat.sheltered = true
                protagRat.condition = 'wounded'
                antagRat.isAlive = false
                txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p><b>${protagRat.name}</b> bites hard into <b>${antagRat.name} one last time!</b></p>`
                mthd = true
                addToPlot(txt, mthd)

                txt = `<img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                <p><b>${antagRat.name} is dead..</b></p>`

                mthd = `${antagCopy.ratID}.isAlive = false`
                addToPlot(txt, mthd)

                txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p><b>${protagRat.name}</b> lick their wounds and settle into the shelter..</p>`

                mthd = `${protagCopy.ratID}.sheltered = true
                ${protagCopy.ratID}.condition = 'wounded'`
                addToPlot()
            }

            else {
                protagRat.sheltered = true
                antagRat.sheltered = false
                shelter.occupant = protagRat
                antagRat.condition = 'wounded'
                protagRat.condition = 'wounded'

                txt = `<img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                <p><b>${antagRat.name}</b> was scared away..</p>`

                mthd = `${antagCopy.ratID}.condition = 'wounded'
                ${antagCopy.ratID}.sheltered = false`
                addToPlot(txt, mthd)

                txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p><b>${protagRat.name}</b> licks their wounds and settles into the shelter..</p>`

                mthd = `${protagCopy.ratID}.condition = 'wounded'
                ${protagCopy.ratID}.sheltered = true`
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

            txt = `<img class="text-icon" src="misc-img/rat-trap.gif" alt="rat-trap">
            <p>Its a wad of cheese on a <b>mouse trap</b></p>`
            mthd = true
            addToPlot(txt, mthd)

            if (chanceWit) {
                protagRat.hunger <= 1 ? '' : protagRat.hunger--;
                txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p><b>${protagRat.name}</b> swats the cheese out of the trap! Free food..</p>`

                mthd = `${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger--;`
                addToPlot(txt, mthd)
            }
            else {
                let shelter = locStatus.filter(obj => obj.name == protagRat.location)[0]
                if (protagRat.condition == 'wounded') {
                    shelter.occupant = 'empty'
                    protagRat.sheltered = false
                    protagRat.isAlive = false
                    txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> bites the cheese and the trap snaps their head!</p>`

                    mthd = true
                    addToPlot(txt, mthd)

                    txt = `<img class="text-icon dead-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> is dead..</p>`

                    mthd = `${protagCopy.ratID}.sheltered = false
                    ${protagCopy.ratID}.isAlive = false`
                    addToPlot(txt, mthd)
                }

                else {
                    shelter.occupant = 'empty'
                    protagRat.sheltered = false
                    protagRat.condition = 'wounded'
                    txt = `<p><b>${protagRat.name}</b> bites the cheese and the trap snaps their nose!</p>`

                    mthd = `${protagCopy.ratID}.condition = 'wounded'
                            `
                    addToPlot(txt, mthd)

                    txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> quickly runs from shelter!</p>`

                    mthd = `${protagCopy.ratID}.sheltered = false
                    ${protagCopy.ratID}.condition = 'wounded'`
                    addToPlot(txt, mthd)
                }
            }
        },

        shelterBug: (protagRat, protagCopy) => {
            let txt
            let mthd
            let chanceFerocity = events.statChance(protagRat.ferocity)

            txt = `<img class="text-icon" src="misc-img/spider-1.gif" alt="spider">
            <p>A <b>Spider</b> has made their nest here!</p>`
            mthd = true
            addToPlot(txt, mthd)

            txt = ` <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
            <p>${miscValues.acts.agitatedDumb()}</p>`
            mthd = true
            addToPlot(txt, mthd)

            if (chanceFerocity) {
                protagRat.hunger <= 1 ? '' : protagRat.hunger--;
                txt = `<p><b>${protagRat.name}</b> bites the spider, killing it! Free food..</p>`

                mthd = `${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger--;`
                addToPlot(txt, mthd)
            }

            else {
                let shelter = locStatus.filter(obj => obj.name == protagRat.location)[0]
                if (protagRat.condition == 'wounded') {
                    shelter.occupant = 'empty'
                    protagRat.isAlive = false
                    protagRat.sheltered = false
                    txt = `<img class="text-icon" src="misc-img/spider-1.gif" alt="spider">
                    <p>The spider stabs <b>${protagRat.name}</b> with its fangs!</p>`

                    mthd = true
                    addToPlot(txt, mthd)

                    txt = `<img class="text-icon dead-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> is dead..</p>`

                    mthd = `${protagCopy.ratID}.sheltered = false
                    ${protagCopy.ratID}.isAlive = false`
                    addToPlot(txt, mthd)
                }

                else {
                    shelter.occupant = 'empty'
                    protagRat.condition = 'wounded'
                    protagRat.sheltered = false
                    txt = `<img class="text-icon" src="misc-img/spider-1.gif" alt="spider">
                    <p>The spider bites <b>${protagRat.name}</b> and they run from the shelter..</p>`

                    mthd = `${protagCopy.ratID}.sheltered = false
                    ${protagCopy.ratID}.condition = 'wounded'`
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
                let event = Math.floor(Math.random() * 2)
                event == 1 ? events.encounter.ratTrap(protagRat, protagCopy) : events.encounter.enemySpider(protagRat, protagCopy);
            }
            else { }
        },

        ratTrap: (protagRat, protagCopy) => {
            let txt
            let mthd
            let chanceWit = events.statChance(protagRat.wit)

            txt = `<img class="text-icon" src="misc-img/rat-trap.gif" alt="rat-trap">
            <p><b>${protagRat.name}</b> encounters a wad of cheese on a <b>mouse trap</b></p>`
            mthd = true
            addToPlot(txt, mthd)

            if (chanceWit) {
                protagRat.hunger <= 1 ? '' : protagRat.hunger--;
                txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p><b>${protagRat.name}</b> swats the cheese out of the trap! Free food..</p>`

                mthd = `${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger--;`
                addToPlot(txt, mthd)
            }

            else {

                if (protagRat.condition == 'wounded') {
                    protagRat.isAlive = false
                    txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> bites the cheese and the trap snaps their head!</p>`

                    mthd = true
                    addToPlot(txt, mthd)

                    txt = `<img class="text-icon dead-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                    <p><b>${protagRat.name}</b> is dead..</p>`

                    mthd = `${protagCopy.ratID}.isAlive = false`
                    addToPlot(txt, mthd)
                }

                else {
                    protagRat.condition = 'wounded'
                    txt = `<p><b>${protagRat.name}</b> bites the cheese and the trap snaps their nose!</p>`

                    mthd = `${protagCopy.ratID}.condition = 'wounded'`
                    addToPlot(txt, mthd)
                }
            }
        },

        enemySpider: (protagRat, protagCopy) => {
            let txt
            let mthd

            txt = `<img class="text-icon" src="misc-img/spider-1.gif" alt="spider">
            <p><b>${protagRat.name}</b> encounters a <b>spider</b>!</p>`
            mthd = true
            addToPlot(txt, mthd)

            txt = ` <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
            <p>${miscValues.acts.agitatedDumb()}</p>`
            mthd = true
            addToPlot(txt, mthd)

            if (events.statChance(protagRat.ferocity)) {
                protagRat.hunger <= 1 ? '' : protagRat.hunger--;
                txt = `<p><b>${protagRat.name}</b> bites the spider, killing it! Free food..</p>`

                mthd = `${protagCopy.ratID}.hunger <= 1 ? '' : ${protagCopy.ratID}.hunger--;`
                addToPlot(txt, mthd)
            }

            else if (events.statChance(protagRat.affection) && protagRat.affection >= 6) {
                events.encounter.affDefence(protagRat, protagCopy, 'spider')
            }

            else {
                events.encounter.enemySpiderPart2(protagRat, protagCopy)
            }
        },

        enemySpiderPart2: (protagRat, protagCopy) => {
            let txt
            let mthd
            if (protagRat.condition == 'wounded') {
                protagRat.isAlive = false
                txt = `<img class="text-icon" src="misc-img/spider-1.gif" alt="spider">
                <p>The spider stabs <b>${protagRat.name}</b> with its fangs!</p>`

                mthd = true
                addToPlot(txt, mthd)

                txt = `<img class="text-icon dead-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                <p><b>${protagRat.name}</b> is dead..</p>`

                mthd = `${protagCopy.ratID}.isAlive = false`
                addToPlot(txt, mthd)
            }

            else {
                protagRat.condition = 'wounded'
                txt = `<img class="text-icon" src="misc-img/spider-1.gif" alt="spider">
                <p>The spider bites <b>${protagRat.name}</b>, but they live..</p>`

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

            txt = `<img class="text-icon" src="misc-img/flexworm.gif" alt="flexworm">
            <p>Its a large <b>Flexworm</b>!</p>`
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
                        protagRat.isAlive = false
                        txt = `<img class="text-icon" src="misc-img/flexworm.gif" alt="flexworm">
                        <p>The flexworm melts <b>${protagRat.name}</b> with a spray of <b>acid</b>!</p>`

                        mthd = true
                        addToPlot(txt, mthd)

                        txt = `<img class="text-icon dead-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                        <p><b>${protagRat.name}</b> is dead..</p>`
                        mthd = `${protagCopy.ratID}.isAlive = false
                        ${protagCopy.ratID}.sheltered = false`
                        addToPlot(txt, mthd)

                        txt = `<img class="text-icon" src="misc-img/flexworm.gif" alt="flexworm">
                        <p>The flexworm crawls back from wence it came!</p>`
                        mthd = true
                        addToPlot(txt, mthd)
                    }

                    else {
                        protagRat.condition = 'wounded'
                        txt = `<img class="text-icon" src="misc-img/flexworm.gif" alt="flexworm">
                        <p>The flexworm sprays <b>acid</b> over <b>${protagRat.name}</b>, but they live..</p>`

                        mthd = `${protagCopy.ratID}.condition = 'wounded'`
                        addToPlot(txt, mthd)

                        txt = `<img class="text-icon" src="misc-img/flexworm.gif" alt="flexworm">
                        <p>The flexworm crawls back from wence it came!</p>`
                        mthd = true
                        addToPlot(txt, mthd)

                        events.emote.agitatedDumb(protagRat)
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

                    txt = `<img class="text-icon" src="misc-img/flexworm.gif" alt="flexworm">
                    <p>The flexworm crawls back from wence it came!</p>`
                    mthd = true
                    addToPlot(txt, mthd)

                    events.emote.agitatedDumb(protagRat)
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

                    txt = `<img class="text-icon" src="misc-img/flexworm.gif" alt="flexworm">
                    <p>The flexworm crawls back from wence it came..</p>`
                    mthd = true
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
                .filter(obj => obj.isAlive)

            txt = `<p><b>${protagRat.name}</b> cries for help!</p>`
            mthd = true
            addToPlot(txt, mthd)

            if (localRats[0]) {
                let antagRat = localRats[Math.floor(Math.random() * localRats.length)]
                let antagCopy = ratsDis[antagRat.num]

                txt = `<img class="text-icon" src="rat-img/rat-${antagRat.icon}.gif" alt="${antagRat.name}">
                <p> A curious <b>${antagRat.name}</b> arrives..`
                mthd = true
                addToPlot(txt, mthd)

                if (events.statChance(antagRat.ferocity)) {
                    antagRat.hunger <= 1 ? '' : antagRat.hunger--;
                    txt = `<p><b>${antagRat.name}</b> bites the ${bug}, killing it! Free food..</p>`

                    mthd = `${antagCopy.ratID}.hunger <= 1 ? '' : ${antagCopy.ratID}.hunger--;`
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

        witTrap: (protagRat, protagCopy) => {
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

                    txt = `<p><b>${protagRat.name}</b> throws up! They feel more empty..</p>`
                    mthd = `${protagCopy.ratID}.hunger >= 4 ? ${protagCopy.ratID}.hunger = 5 : ${protagCopy.ratID}.hunger += 2;`
                    addToPlot(txt, mthd)

                    break;
                case 'pit':

                    txt = `<p>The ground trembles..Its a <b>pit trap</b>!</p>`
                    mthd = true
                    addToPlot(txt, mthd)

                    if (protagRat.condition == 'wounded') {
                        protagRat.isAlive = false

                        txt = `<p><b>${protagRat.name}</b> tumbles and lands on a <b>spike</b>!</p>`
                        mthd = true
                        addToPlot(txt, mthd)

                        txt = `<img class="text-icon dead-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                        <p><b>${protagRat.name}</b> is dead..</p>`

                        mthd = `${protagCopy.ratID}.isAlive = false`
                        addToPlot(txt, mthd)
                    }

                    else {
                        protagRat.condition = 'wounded'
                        txt = `<p><b>${protagRat.name}</b> falls in and grazes a sharp <b>spike</b>! too close..</p>`
                        mthd = true
                        addToPlot(txt, mthd)

                        txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
                        <p><b>${protagRat.name}</b> is wounded</p>`
                        mthd = `${protagCopy.ratID}.condition = 'wounded'`
                        addToPlot(txt, mthd)
                    }
                    break;
            }
        }
    },

    emote: {
        loafing: (protagRat, protagCopy) => {
            let txt
            let mthd

            txt = `<img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
            <p><b>${protagRat.name}</b> if loafing about comfortably</p>`
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

            txt = ` <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
            <p>${miscValues.acts.happyDumb()}</p>`
            mthd = true
            addToPlot(txt, mthd)
        },

        agitatedDumb: (protagRat) => {
            let txt
            let mthd

            txt = ` <img class="text-icon" src="rat-img/rat-${protagRat.icon}.gif" alt="${protagRat.name}">
            <p>${miscValues.acts.agitatedDumb()}</p>`
            mthd = true
            addToPlot(txt, mthd)
        }
    },

    search: {

    }
}

quiteBtn.addEventListener('click', resetAll = () => {
    document.getElementById('cust-container').style.display = '';
    document.getElementById('game-container').style.display = 'none';

    ratDisplayTray.innerHTML = ''
    ratBox.innerHTML = ''
    textBox.innerHTML = ''
    startBtn.style.display = 'none'
    roundStart.style.visibility = 'hidden'
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
            name: 'Trash Pits',
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