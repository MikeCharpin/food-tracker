import FetchWrapper from "./fetch-wrapper.js"

const API = new FetchWrapper("https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/deadchanneldice")

// Connect HTML to JS
const form = document.querySelector("#create-form")
const foodName = document.querySelector("#create-name")
const carbs = document.querySelector("#create-carbs")
const protien = document.querySelector("#create-protein")
const fat = document.querySelector("#create-fat")
const submit = document.querySelector("#create-submit")

const total = document.querySelector("total-calories")
const list = document.querySelector("food-list")

const clearForm = () => {
    foodName.value = ""
    carbs.value = "",
    protien.value = "",
    fat.value = ""
}


// Step 1: Add food
// Create POST request with user ender food info.
// Clear form when submitted.

form.addEventListener("submit", e => {
    e.preventDefault()
    API.post("/", {
        fields: {
            foodName: {stringvalue: foodName.value},
            carbs: {integervalue: carbs.value},
            protein: {integervalue: protien.value},
            fat: {integervalue: fat.value}
        }
    })
    console.log("API Post Sent")
    clearForm()
})










