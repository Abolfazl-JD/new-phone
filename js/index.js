// ---------------------- data -------------------------------
let allUsers = [
    { name: "Reza", number: "+989381072254", matched: '' },
    { name: "Parsa", number: "+989101548653", matched: '' },
    { name: "Hassan", number: "+989125894761", matched: '' },
    { name: "Jafar", number: "+989012486248", matched: '' },
    { name: "Mammad", number: "+9890745615784", matched: '' },
    { name: "Sarah", number: "+989101522273", matched: '' },
    { name: "Emma watson", number: "+989154862124", matched: '' },
    { name: "Jenifer lopez", number: "+98939458716", matched: '' },
    { name: "Anjelina Jooly", number: "+989174589348", matched: '' },
    { name: " Amber heard", number: "+989872452555", matched: '' },
]

const numberButtons = [
    { number: 1, alphabets: "ABC" },
    { number: 2, alphabets: "DEF" },
    { number: 3, alphabets: "GHI" },
    { number: 4, alphabets: "JKL" },
    { number: 5, alphabets: "MNO" },
    { number: 6, alphabets: "PQR" },
    { number: 7, alphabets: "STU" },
    { number: 8, alphabets: "VWX" },
    { number: 9, alphabets: "YZ" }
]


// --------------------------- action functions --------------------------
const searchBarElem = document.getElementById('search')

let characterToSearch = [] //['abc']


function addAlphabetToSearchBar(number, alphabets) {
    characterToSearch.push(alphabets.toLowerCase())
    searchBarElem.value += number

    searchContacts()
}

let result = []
let firstSelectedIndexes = []

function searchContacts() {

    let lastIndex = characterToSearch.length - 1

    if (result.length === 0) {
        for (const user of allUsers) {
            for (const char of characterToSearch[lastIndex]) {
                if (user.name.toLowerCase().indexOf(char) === 0) {
                    let selectedIndex = user.name.toLowerCase().indexOf(char)
                    let newUser = {
                        name: user.name.slice(selectedIndex + 1),
                        number: user.number,
                        matched: user.name.slice(0, selectedIndex + 1)
                    }
                    firstSelectedIndexes.push({...newUser })
                    result.push(newUser)
                    ContactList(result)
                }
            }
        }
    }
}

// ------------------- element generators ---------------------------

// users argument is a allUsers of user object
function ContactList(users) {
    const usersItems = users.map(u => ContactItem(u))
    $('.phones').html(usersItems.join(''))
}

// generates a new contact element
function ContactItem({ name, number, matched }) {
    return (
        "<div class='informations'>" +
        `  <p class='people'>${name}</p >` +
        `  <p class='numbers'>${number}</p>` +
        "</div>"
    )
}

function keyboardButtonElem({ number, alphabets }) {
    return (
        `<div class="child" onclick="addAlphabetToSearchBar(${number},'${alphabets}')">` +
        `  <div class="num">${number}</div>` +
        `  <span id="s8">${alphabets}</span>` +
        '</div>'
    )
}

function keyboardGenElem() {
    const buttons = numberButtons.map(b => keyboardButtonElem(b))
    $('.keyboard').html(buttons.join(''))
}

// -------------------- initialize event listeners ---------------------

$(document).ready(() => {
    $('#search').focus(() => {
        $('.keyboard').slideDown(500)

        $('.informations').css('display', 'none')
        $('.phones').css('height', '230px')
        $('.phones').css('overflow', 'scroll')
    })

    keyboardGenElem()
    ContactList(allUsers)
})