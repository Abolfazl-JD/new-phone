// ---------------------- data -------------------------------


let allUsers = [
    { name: "Reza", number: "+989381072254" },
    { name: "Parsa", number: "+989101548653" },
    { name: "Hassan", number: "+989125894761" },
    { name: "Jafar", number: "+989012486248" },
    { name: "Mammad", number: "+9890745615784" },
    { name: "Sarah", number: "+989101522273" },
    { name: "Emma watson lozano", number: "+989154862124" },
    { name: "Jenifer lopez", number: "+98939458716" },
    { name: "Anjelina jooly lol", number: "+989174589348" },
    { name: "Amber heard", number: "+989872445255" },
    { name: "Leonardo dicaprio gonzales", number: "+989851249374" },
    { name: "Hamid bloorin js mollasadra", number: "+98909410846" },
    { name: "Agha shahrabi dinee", number: "+989897923657" },
    { name: "Siavash qhomeishee my favorite singer", number: "+98976482315" },
    { name: "Ebi theking of voice in the world", number: "+98929750452" },
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
let editableAllUsers = []
let firstSelectedIndexes = []
let newUser = []

function is_char_matched_with(char, chars2match) {
    return chars2match.indexOf(char) !== -1
}
var word_index = 0
var char_index = 0

function searchContacts() {


    let lastIndex = characterToSearch.length - 1
    let is_matched = false

    if (result.length === 0) {
        word_index = 0
        editableAllUsers = JSON.parse(JSON.stringify(allUsers))
        for (let i = 0; i < editableAllUsers.length; i++) {
            const user = editableAllUsers[i]
            user.name = user.name.split(' ')
            user.matched = Array(user.name.length).fill('')
            while (true) {
                let wordSelected = user.name[word_index][char_index].toLowerCase()
                if (characterToSearch[lastIndex].indexOf(wordSelected) !== -1) {
                    is_matched = true
                }
                if (is_matched) {
                    let selectedIndex = user.name[word_index].indexOf(user.name[word_index][char_index])


                    user.matched[word_index] = user.name[word_index].slice(0, selectedIndex + 1)
                    user.name[word_index] = user.name[word_index].slice(selectedIndex + 1)


                    let newUser2 = JSON.parse(JSON.stringify(user))
                    firstSelectedIndexes.push({...newUser2 })
                    result.push(user)
                    is_matched = false
                    ContactList(result)
                    word_index = 0
                    break
                } else {
                    if (word_index === user.name.length - 1) {
                        word_index = 0
                        break
                    } else {
                        word_index += 1
                        char_index = 0
                    }
                }
            }

        }
    } else if (result.length !== 0) {

        newUser = []
        for (let i = 0; i < result.length; i++) {
            const user = result[i]
            if (user.name.length < 2 && user.matched[0].length === searchBarElem.value.length - 1) {
                word_index = 0
                while (true) {
                    let wordSelected = user.name[word_index][char_index].toLowerCase()
                    if (characterToSearch[lastIndex].indexOf(wordSelected) !== -1) {
                        is_matched = true
                    }
                    if (is_matched) {
                        let selectedIndex = user.name[word_index].indexOf(user.name[word_index][char_index])

                        user.matched[word_index] += user.name[word_index].slice(0, selectedIndex + 1)
                        user.name[word_index] = user.name[word_index].slice(selectedIndex + 1)


                        newUser.push(user)
                        is_matched = false
                        break
                    } else {
                        if (word_index === user.name.length - 1) {
                            word_index = 0
                            break
                        } else {
                            word_index += 1
                            char_index = 0
                        }
                    }
                }

            } else if (user.name.length > 1 && user.matched.join('') !== '' && user.matched.join('').length === searchBarElem.value.length - 1) {
                let emptyIndex_matched = user.matched.indexOf('')
                if (emptyIndex_matched === -1) {
                    word_index = user.matched.length - 1
                } else if (emptyIndex_matched === 0) {
                    let priviousSelectedWord = user.matched.map(e => e !== "")
                    let emptyIndex_name = user.name.lastIndexOf("")
                    let x = priviousSelectedWord.lastIndexOf(true)
                    x === emptyIndex_name ? word_index = x + 1 : word_index = x
                } else {
                    let priviousSelectedWord = user.matched.map(e => e !== "")
                    let emptyIndex_name = user.name.lastIndexOf("")
                    let x = priviousSelectedWord.lastIndexOf(true)
                    x === emptyIndex_name ? word_index = x + 1 : word_index = emptyIndex_matched - 1
                }
                if (word_index !== -1) {
                    while (true) {
                        let wordSelected = user.name[word_index][char_index].toLowerCase()
                        if (characterToSearch[lastIndex].indexOf(wordSelected) !== -1) {
                            is_matched = true
                        }
                        if (is_matched) {
                            let selectedIndex = user.name[word_index].indexOf(user.name[word_index][char_index])

                            user.matched[word_index] += user.name[word_index].slice(0, selectedIndex + 1)
                            user.name[word_index] = user.name[word_index].slice(selectedIndex + 1)


                            newUser.push(user)
                            is_matched = false
                            break
                        } else {
                            if (emptyIndex_matched !== -1 && emptyIndex_matched !== 0 && word_index === emptyIndex_matched) {
                                word_index = 0
                                break
                            } else if (word_index === user.name.length - 1) {
                                word_index = 0
                                break
                            } else {
                                word_index += 1
                                char_index = 0
                            }
                        }
                    }
                }

            }
            if (newUser.length !== 0) {
                ContactList(newUser)
            }
        }
    }
}
var indexToClear
searchBarElem.onkeydown = function() {
    var key = event.keyCode || event.charCode
    if (key === 8) {
        if (searchBarElem.value.length === 1) {
            result = []
            firstSelectedIndexes = []
            newUser = []
            ContactList(result)
        } else if (searchBarElem.value.length === 2) {
            result = JSON.parse(JSON.stringify(firstSelectedIndexes))

            ContactList(result)
        } else if (searchBarElem.value.length === 0) {
            result = []
            firstSelectedIndexes = []
            newUser = []
            ContactList(result)
        } else if (searchBarElem.value.length !== 2 && searchBarElem.value.length !== 1) {
            for (let i = 0; i < newUser.length; i++) {
                const user = newUser[i];
                let indexToClear = user.matched.indexOf('')
                if (indexToClear === -1 || user.matched.lastIndexOf('') === 0) {
                    indexToClear = user.matched.length - 1
                } else if (indexToClear === 0 && user.matched.lastIndexOf('') !== 0) {
                    let y = user.matched.map(e => e !== '')
                    indexToClear = y.lastIndexOf(true)
                } else {
                    indexToClear -= 1
                }
                let clearingWord = user.matched[indexToClear].slice(user.matched[indexToClear].length - 1, user.matched[indexToClear].length)
                user.matched[indexToClear] = user.matched[indexToClear].slice(0, user.matched[indexToClear].length - 1)
                user.name[indexToClear] = clearingWord.concat(user.name[indexToClear])
                ContactList(newUser)

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
    let sum = []
    if (typeof name === "object") {
        for (let i = 0; i < name.length; i++) {
            const element = name[i];
            sum.push(`  <span class='matched'>${matched[i]}</span>` + `  <span splay : inline-block;color:black;" class='people'>${name[i]}</span >`)
        }
        return (
            "<div class='informations'>" +
            `${sum.join('')}` +
            `  <p class='numbers'>${number}</p>` +
            "</div >"
        )
    } else {
        return (
            "<div class='informations'>" +
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
        $('.keyboard').css('display', 'flex')

        $('.informations').css('display', 'none')
        $('.phones').css('height', '230px')
        $('.phones').css('overflow', 'scroll')
    })

    keyboardGenElem()
    ContactList(allUsers)
})