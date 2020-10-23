// ---------------------- data -------------------------------
let allUsers = [
    { name: "Reza", number: "+989381072254" },
    { name: "Parsa", number: "+989101548653", },
    { name: "Hassan", number: "+989125894761", },
    { name: "Jafar", number: "+989012486248", },
    { name: "Mammad", number: "+9890745615784", },
    { name: "Sarah", number: "+989101522273", },
    { name: "Emma watson", number: "+989154862124", },
    { name: "Jenifer lopez", number: "+98939458716", },
    { name: "Anjelina Jooly", number: "+989174589348", },
    { name: " Amber heard", number: "+989872452555", },
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

function searchContacts() {
    let word = characterToSearch.length - 1

    for (let i = 0; i < allUsers.length; i++) {
        const element = allUsers[i];
        for (const chars of characterToSearch[word]) {
            if (element.name.toLowerCase().indexOf(chars) === word) {
                allUsers = allUsers.filter(e => e === element)
                ContactList()

            }
        }
    }
}

// ------------------- element generators ---------------------------

// users argument is a allUsers of user object
function ContactList(users) {
    const usersItems = users.map(u => ContactItem(u))
    return usersItems.join('')
}

// generates a new contact element
function ContactItem({ name, number }) {
    return (
        "<div class='informations'>" +
        `  <p class='people'>${name}</p >` +
        `  <p class='numbers'>${number}</p>` +
        "</div >"
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
    return buttons.join('')
}

// -------------------- initialize event listeners ---------------------

$(document).ready(() => {
    $('#search').focus(() => {
        $('.keyboard').slideDown(500)

        $('.informations').css('display', 'none')
        $('.phones').css('height', '230px')
        $('.phones').css('overflow', 'scroll')

        $('.phones').html(ContactList(allUsers))
        $('.keyboard').html(keyboardGenElem())
    })
})