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

//test code below

// let obj = [{ name: 'clary', ID: 'obj[0]' }, { name: 'henry', ID: 'obj[01]' }]
// let testarr = []
// testFunc()
// console.log(testarr[0].event)
// eval(testarr[0].method)
// function testFunc() {
//     let x = { event: '' }
//     x.event = `${obj[0].name}`
//     x.method = testObjMethod(obj[0].ID)
//     testarr.push(x)
// }

// function testObjMethod(x) {
//     let method = `${x}.condition = 'starved'`
//     return method

// }