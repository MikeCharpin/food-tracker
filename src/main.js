// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVywBYr_Ada1wctslnnCbAO7246zrcIYU",
  authDomain: "food-tracker-7d40d.firebaseapp.com",
  projectId: "food-tracker-7d40d",
  storageBucket: "food-tracker-7d40d.appspot.com",
  messagingSenderId: "290009802916",
  appId: "1:290009802916:web:ca812551098901927b5e31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



import FetchWrapper from "./fetch-wrapper.js"
import snackbar from "snackbar"
import AppData from "./app-data.js"
import 'chart.js';

snackbar.duration = 5000
snackbar.gap = 250

const API = new FetchWrapper("https://food-tracker-7d40d-default-rtdb.firebaseio.com/")

// Connect HTML to JS
const form = document.querySelector("#create-form")
const foodName = document.querySelector("#create-name")
const carbs = document.querySelector("#create-carbs")
const protein = document.querySelector("#create-protein")
const fat = document.querySelector("#create-fat")
const total = document.querySelector("#total-calories")
const list = document.querySelector("#food-list")
const context = document.querySelector("#app-chart").getContext("2d")

const appData = new AppData()


const clearForm = () => {
    foodName.value = ""
    carbs.value = "",
    protein.value = "",
    fat.value = ""
}

const capitalize = (word) => {
    return word[0].toUpperCase() + word.substring(1).toLowerCase()
}

const calculateCalories = (carbs, protein, fat) => {
    return ((carbs * 4 ) + (protein * 4) + (fat * 9))
}

let chartInstance = null

console.log(appData.getTotalCarbs())

const renderChart = () => {
    chartInstance?.destroy()
    chartInstance = new Chart(context, {
        type: 'bar',
    data: {
      labels: ["Carbs", "Protein", "Fat"],
      datasets: [
        {
          label: "Macronutrients",
          data: [`${appData.getTotalCarbs()}`, `${appData.getTotalProteins()}`, `${appData.getTotalFat()}`],
          backgroundColor: ["#222222", "#FFFFFF", "#444555"],
        },
      ],
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    })
}

const displayEntry = (foodName, carbs, protein, fat) => {
    appData.addFood(carbs, protein, fat)
    const totalCalories = appData.getTotalCalories()
    total.textContent = totalCalories
    list.insertAdjacentHTML("beforeend", 
    `<li class="card">
    <div>
        <h3 class="name">${capitalize(foodName)}</h3>
        <div class="calories">${calculateCalories(carbs, protein, fat)} calories</div>
        <ul class="macros">
            <li class="carbs"><div>Carbs</div><div class="value">${carbs}g</div></li>
            <li class="protein"><div>Protein</div><div class="value">${protein}g</div></li>    
            <li class="fat"><div>Fat</div><div class="value">${fat}g</div></li>

        </ul>
    </div>
    </li> 
    `)
}




const init = () => { API.get("/")
    .then(data => {   
        data.documents?.forEach(entry => {
            displayEntry(
                entry.fields.name.stringValue,
                entry.fields.carbs.integerValue,
                entry.fields.protein.integerValue,
                entry.fields.fat.integerValue
            )            
        })
        renderChart()
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
    
    displayEntry(
        foodName.value, 
        carbs.value, 
        protein.value, 
        fat.value
    )

    appData.foodStatus()
    clearForm()
    renderChart()
    
})



init()









