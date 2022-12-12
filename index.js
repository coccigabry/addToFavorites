let myLinks = []
const inputEl = document.getElementById('input-el')
const saveBtn = document.getElementById('save-btn')
const chromeBtn = document.getElementById('chrome-btn')
const deleteAllBtn = document.getElementById('delete-all-btn')
const renderEl = document.getElementById('render-el')

let idxItemToAddOnLocalStorage
let listItems

const storedLinks = JSON.parse(localStorage.getItem("myLinks"))

if (storedLinks) {
    myLinks = storedLinks
    renderLinks(myLinks)
}

saveBtn.addEventListener("click", function () {
    myLinks.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLinks", JSON.stringify(myLinks))
    renderLinks(myLinks)
})

chromeBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks))
        renderLinks(myLinks)
    })
})

deleteAllBtn.addEventListener("click", function () {
    localStorage.clear()
    myLinks = []
    renderLinks(myLinks)
})

function deleteItem(i) {
    const idxItemToDelete = i
    myLinks.splice(idxItemToDelete, 1)
    localStorage.clear()
    localStorage.setItem("myLinks", JSON.stringify(myLinks))
    renderLinks(myLinks)
}

function renderLinks(arr) {
    listItems = ""
    for (let i = 0; i < arr.length; i++) {
        listItems += `
                    <li id="${i}">
                        <a href="http://${arr[i]}" target="_blank">${arr[i]}</a>
                        <img id="delete-btn" src="trash.png" onclick="deleteItem(${i})"/>
                    </li>
                    `
        //const li = document.createElement("li")
        //li.textContent = myLinks[i]
        //renderEl.append(li) 
    }
    renderEl.innerHTML = listItems
} 

