<template>
  <main class="w-full flex flex-col justify-center items-center">
    <div class="flex flex-col items-center my-4 text-green-400">
      <Logo class="w-32 h-32" />
      <h1 class="font-bold text-4xl">Arborist</h1>
      <span class="text-yellow-900">A behavior tree editor</span>
    </div>
    <ul class="flex flex-col items-center">
      <li class="my-4">
        <router-link
          class="
            bg-green-500
            hover:bg-green-700
            text-white text-bold
            py-2
            px-4
            rounded
          "
          :to="`/${encodeURIComponent('/test.json')}`"
          >Test File</router-link
        >
      </li>
      <li class="my-4">
        <form
          class="flex items-center"
          @submit.prevent="router.push(`${encodeURIComponent(custom)}`)"
        >
          <label class="text-gray-500 font-bold" for="custom">Custom URL</label>
          <input
            class="
              bg-gray-200
              appearance-none
              border-2 border-gray-200
              rounded
              w-full
              py-2
              px-4
              text-gray-700
              leading-tight
              focus:outline-none focus:bg-white focus:border-green-400
            "
            id="custom"
            v-model="custom"
          />
        </form>
      </li>
    </ul>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import Logo from '../components/Logo.vue'

const custom = ref('')
const router = useRouter()
</script>
