import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js";
import { api } from "./AxiosService.js";

class CarsService {
  async editCar(carData) {
    let res = await api.put(`api/cars/${carData.id}`, carData)
    let car = new Car(res.data)
    let carIndex = AppState.cars.findIndex(c => c.id == carData.id)
    AppState.cars.splice(carIndex, 1, car)
  }

  async getCars() {
    let res = await api.get('api/cars')
    AppState.cars = res.data.map(c => new Car(c))
  }

  // Example for making a POST request
  async createCar(carFormData) {

    let res = await api.post('api/cars', carFormData)
    // ALWAYS LOOK AT YOUR RESPONSE
    let car = new Car(res.data)
    AppState.cars = [...AppState.cars, car]
  }

  async deleteCar(carId) {
    let url = `api/cars/${carId}` // string interpolation
    await api.delete(url)
    AppState.cars = AppState.cars.filter(c => c.id != carId)
  }

  setActiveCar(car){
    AppState.activeCar = car
  }


}

export const carsService = new CarsService()




/**
 *
 * GET http://base.com/api/resource -> List of that type of item might have pagination through query
 * POST http://base.com/api/resource -> creating that type of item
 *
 * GET http://base.com/api/resource/:id -> one item
 * DELETE                               -> delete that item
 * PUT                                  -> edit that item
 *
 *
 * coming down the road
 * http://base.com/api/trips/:tripId/reservations/:reservationId
 *
 *
 */










