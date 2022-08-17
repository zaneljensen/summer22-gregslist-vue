<template>
  <div class="car-page" v-if="car">
    <div class="my-3" :title="car.make">
      <img class="img-fluid" :src="car.img" alt="">
      <div class="p-2">
        <h4 class="text-center">{{ car.make }} | {{ car.model }} | {{ car.year }}</h4>
        <p>{{ car.description }}</p>
        <p class="text-end text-success m-0">$<b>{{ car.price }}</b></p>
        <button class="btn btn-info" @click="adjustCar(car)" data-bs-toggle="modal" data-bs-target="#car-form">Adjust
          Car Settings</button>
        <button class="btn btn-danger" @click="deleteCar(car)">delete me</button>
      </div>
    </div>
    <Modal id="car-form">
      <CarForm />
    </Modal>
  </div>
  <div v-else>
    loading...
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import { carsService } from '../services/CarsService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'

export default {
  setup() {
    const route = useRoute()


    async function getCarById() {
      try {
        //                                        v magic string
        await carsService.getCarById(route.params.carId)
      } catch (error) {
        logger.error('[Get Car By Id]', error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getCarById()
    })

    return {
      car: computed(() => AppState.activeCar),
      adjustCar(car) {
        carsService.setActiveCar(car)
      },
      async deleteCar(car) {
        try {
          const yes = await Pop.confirm('Delete the car?')
          if (!yes) { return }
          await carsService.deleteCar(car.id)
        } catch (error) {
          logger.error('[Deleting Car]', error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
