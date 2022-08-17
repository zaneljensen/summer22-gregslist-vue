<template>
  <div class="cars-page">
    <div class="container">
      <div class="row">
        <div class="col-md-4" v-for="c in cars" :key="c.id">
          <CarCard :car="c" />
        </div>
      </div>
    </div>
  </div>
  <Modal id="car-form">
    <CarForm />
  </Modal>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { carsService } from '../services/CarsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    async function getCars() {
      try {
        await carsService.getCars()
      } catch (error) {
        logger.error('[Getting Cars]', error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getCars()
    })

    return {
      cars: computed(() => AppState.cars)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
