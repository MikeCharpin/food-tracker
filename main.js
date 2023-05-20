
import FetchWrapper from "./fetch-wrapper.js"

import snackbar from "snackbar"

snackbar.duration = 5000
snackbar.gap = 250

const API = new FetchWrapper("https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/deadchanneldice")

// Connect HTML to JS
const form = document.querySelector("#create-form")
const foodName = document.querySelector("#create-name")
const carbs = document.querySelector("#create-carbs")
const protein = document.querySelector("#create-protein")
const fat = document.querySelector("#create-fat")


const total = document.querySelector("#total-calories")
const list = document.querySelector("#food-list")

const clearForm = () => {
    foodName.value = ""
    carbs.value = "",
    protein.value = "",
    fat.value = ""
}

const clearLog = () => {
    list.innerHTML = ""
}

const clearCalorieCount = () => {
    calorieTotal = 0
}

const capitalize = (word) => {
    return word[0].toUpperCase() + word.substring(1).toLowerCase()
}

let calorieTotal = 0

const callAPI = () => { API.get("/")
    .then(data => {
        console.log("Getting API")
      
        data.documents.forEach(entry => {
            const foodTitle = capitalize(entry.fields.name.stringValue)
            const carbValue = entry.fields.carbs.integerValue
            const protienValue = entry.fields.protein.integerValue
            const fatValue = entry.fields.fat.integerValue

            const calorieValue = ((carbValue * 4) + (protienValue * 4) + (fatValue * 9))

            calorieTotal += calorieValue

            list.insertAdjacentHTML("beforeend", 
            `<li class="card">
            <div>
                <h3 class="name">${foodTitle}</h3>
                <div class="calories">${calorieValue} calories</div>
                <ul class="macros">
                    <li class="carbs"><div>Carbs</div><div class="value">${carbValue}g</div></li>
                    <li class="protein"><div>Protein</div><div class="value">${protienValue}g</div></li>    
                    <li class="fat"><div>Fat</div><div class="value">${fatValue}g</div></li>

                </ul>
            </div>
            </li> 
            `)

            total.textContent = parseInt(calorieTotal)
        })
})
}


form.addEventListener("submit", e => {
    e.preventDefault()
    API.post("/", {
        fields: {
            name: {stringValue: foodName.value},
            carbs: {integerValue: carbs.value},
            protein: {integerValue: protein.value},
            fat: {integerValue: fat.value},
        },
    }).then((data) => {
        const foodEntry = capitalize(data.fields.name.stringValue)
        console.log("API Post Sent")
        if (data.error) {
          snackbar.show(`Food failed to be logged.`)
          return
        }
        snackbar.show(`${foodEntry} successfully logged!`)
    })
    
    clearForm()
    clearLog()
    clearCalorieCount()
    callAPI()
})

callAPI()









