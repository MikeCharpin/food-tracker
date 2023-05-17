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

const logFood = () => {
    
}


// Step 1: Add food
// Create POST request with user ender food info.
// Clear form when submitted.

form.addEventListener("submit", e => {
    e.preventDefault()
    API.post("/", {
        fields: {
            name: {stringValue: foodName.value},
            carbs: {integerValue: carbs.value},
            protein: {integerValue: protien.value},
            fat: {integerValue: fat.value},
        },
    }).then((data) => {
        console.log(data)
    })
    console.log("API Post Sent")
    clearForm()
    API.get("/").then((data) => {
        console.log("Getting API")
        console.log(data)
    })
})

// Log entered food











