// ---------------------- data -------------------------------

let input = document.getElementById('search')


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
    { name: "Amber heard", number: "+989872452555", matched: '' },
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
let first_matched_indexes = []

function searchContacts() {
    let word = characterToSearch.length - 1
    if (result.length === 0) {
        for (let i = 0; i < allUsers.length; i++) {
            const element = allUsers[i];
            for (const chars of characterToSearch[word]) {
                if (element.name.toLowerCase().indexOf(chars) === 0 && result.indexOf(element) === -1) {
                    let selected_index = element.name.toLowerCase().indexOf(chars)
                    let new_element = []
                    new_element.name = element.name.slice(selected_index + 1).toLowerCase()
                    new_element.number = element.number
                    new_element.matched = element.name.slice(0, selected_index + 1).toLowerCase()
                    result.push(new_element)
                    first_matched_indexes.push(new_element)
                    ContactList(result)
                }
            }
        }
    } else if (result.length !== 0) {
        for (let i = 0; i < result.length; i++) {
            const element = result[i];

            for (const chars of characterToSearch[word]) {
                if (element.name.toLowerCase().indexOf(chars) === 0) {

                    let selected_index = element.name.toLowerCase().indexOf(chars)
                    element.matched += element.name.slice(0, selected_index + 1).toLowerCase()
                    element.name = element.name.slice(selected_index + 1).toLowerCase()
                    result = result.filter(e => e === element)

                    ContactList(result)
                }
            }
        }
    }

}
input.onkeydown = function() {
    var key = event.keyCode || event.charCode;
    if (key == 8) {

        for (let i = 0; i < result.length; i++) {
            const element = result[i];
            let clearing_word = element.matched.slice(element.matched.length - 1, element.matched.length)
            element.matched = element.matched.slice(0, element.matched.length - 1)
            element.name = clearing_word.concat(element.name)
            if (element.matched === '') {
                result = result.filter(e => e !== element)
            }
            if (input.value.length === 2) {
                console.log(result)
            }
        }
    }
};


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
        `<span style = "background-color:aqua;display:inline-block;font-size:17px;color:#000;margin-right:-4px;margin-top:11px;">${matched}</span>` +
        `  <span style = "display : inline-block;color:black;" class='people'>${name}</span >` +
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
    $('.keyboard').html(buttons.join(''))
}

// -------------------- initialize event listeners ---------------------

$(document).ready(() => {
    $('#search').focus(() => {
        $('.keyboard').slideDown(500)

        $('.informations').css('display', 'none')
        $('.phones').css('height', '230px')
        $('.phones').css('overflow', 'scroll')


        keyboardGenElem()
    })

    ContactList(allUsers)
})