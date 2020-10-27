// ---------------------- data -------------------------------
let input = document.getElementById('search')
let char_index = 0
    //7 rpsh
let allUsers = [
    { name: "Reza", number: "+989381072254" },
    { name: "Parsa", number: "+989101548653" },
    { name: "Hassan", number: "+989125894761" },
    { name: "Jafar", number: "+989012486248" },
    { name: "Mammad", number: "+9890745615784" },
    { name: "Sarah", number: "+989101522273" },
    { name: "Emma watson", number: "+989154862124", },
    { name: "Jenifer lopez", number: "+98939458716", },
    { name: "Anjelina Jooly", number: "+989174589348", },
    { name: "Amber heard", number: "+989872452555", },
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

function is_char_matched_with(char, chars2match) {
    return chars2match.indexOf(char) !== -1
}

function searchContacts() {
    // 1: abc, 6: rsq
    // characterToSearch.length = 2
    let chars_i = characterToSearch.length - 1 // 1

    if (result.length === 0) {
        result = JSON.parse(JSON.stringify(allUsers))
    }

    const new_result = []
        //1:abc
    for (const i in result) { // [] <= {}
        const user = result[i]

        // "Emma Winstom"  => ["emma", "wastom"]
        const user_names = user.name.toLowerCase().split(' ') //['ali','reza']


        user.word_index // which words of user_name
        user.char_index // char index of user_name

        user.matched_indexes = Array(user_names.length).fill(0) // [0,0]

        //['ali', 'reza'],  1:'abc' 6: 'rsq'
        while (true) {
            const is_matched = is_char_matched_with(
                    user_names[word_index][char_index], characterToSearch[chars_i]
                )
                // *(a)*(l)(i)[r]eza 
                // (e)(m)ma (w)[a]tson 1 6 6 

            // [H]uawei [h]ealth [c]are

            // while for [] =< {} array.fill ,...

            char_index = 0

            if (is_matched) {
                user.matched_indexes[word_index] = char_index + 1
                char_index += 1
                break
            } else {
                if (word_index === user_names.length - 1) break
                else {
                    word_index += 1
                    char_index = 0
                }
            }
        }

        // 
        // user.matched_indexes = [1,0]
        if (user.matched_indexes[word_index] !== 0)
            new_result.push(user)

    }

    result = new_result
    ContactList(result)
}


input.onkeydown = function() {
    var key = event.keyCode || event.charCode;
    if (key == 8) {
        for (let i = 0; i < result.length; i++) {
            if (input.value.length !== 2 && input.value.length !== 1) {
                // الان بیا مشکل رو حل کنیم
                let clearing_word = result[i].matched.slice(result[i].matched.length - 1, result[i].matched.length)
                result[i].matched = result[i].matched.slice(0, result[i].matched.length - 1)
                result[i].name = clearing_word.concat(result[i].name)

            } else if (input.value.length === 2) {
                result = JSON.parse(JSON.stringify(first_matched_indexes))
            } else if (input.value.length === 1) {
                result = []
                first_matched_indexes = []
            }
        }
        ContactList(result)
    }
}




// ------------------- element generators ---------------------------

// users argument is a allUsers of user object
function ContactList(users) {
    const usersItems = users.map(u => ContactItem(u))
    $('.phones').html(usersItems.join(''))
}

// generates a new contact element
function ContactItem({ name, number, matched_indexes = [] }) {
    if (matched_indexes.length !== 0) return ''

    else {
        return (
            "<div class='informations'>" +
            `  <span class='matched'>${matched}</span>` +
            `  <span splay : inline-block;color:black;" class='people'>${name}</span >` +
            `  <p class='numbers'>${number}</p>` +
            "</div >"
        )
    }

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