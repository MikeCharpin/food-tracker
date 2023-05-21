export default class AppData {
    constructor() {
        this.foodStats = []
    }

    addFood(carbs, protein, fat) {
       this.foodStats.push({
            carbs: Number.parseInt(carbs),
            protein: Number.parseInt(protein),
            fat:Number.parseInt(fat)
        })
    }

    getTotalCarbs() {

    }

    getTotalProteins() {

    }

    getTotalFat() {

    }

    foodStatus() {
        return console.log(this.foodStats)
    }
}
