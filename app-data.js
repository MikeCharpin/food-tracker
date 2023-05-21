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
    return this.foodStats.reduce((total, current) => {
        return total + current.carbs
       }, 0)
    }

    getTotalProteins() {
        return this.foodStats.reduce((total, current) => {
            return total + current.protein
        },0)
    }

    getTotalFat() {
        return this.foodStats.reduce((total, current) => {
            return total + current.fat
        },0)
    }

    getTotalCalories() {
        return ((this.getTotalCarbs() * 4) + (this.getTotalProteins() * 4) + (this.getTotalFat() * 9))
    }

    foodStatus() {
        return console.log(this.foodStats)
    }
}
