<template>
  <form @submit.prevent="handleSubmit">
    <label for="name">Name:</label>
    <input type="text" v-model="editable.name" required minlength="2">

    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>


<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { accountService } from '../services/AccountService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {

    const editable = ref({})

    watchEffect(() => {
      if (!AppState.account) { return }
      editable.value = { ...AppState.account }
    })

    return {
      editable,
      handleSubmit() {
        try {
          accountService.editAccount(editable.value)
        } catch (error) {
          logger.error('[Editing Account]', error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
