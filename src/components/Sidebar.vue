<template>
  <ul class="px-2 flex flex-col">
    <li
      class="flex-shrink-0 h-12 flex flex-row items-center justify-center text-green-400"
    >
      <Logo class="w-8 h-8" />
      <span class="mx-2 text-2xl font-bold">Arborist</span>
    </li>
    <li class="overflow-y-scroll">
      <ul>
        <li
          v-for="item in items"
          :key="item.id"
          :class="`p-2 m-2 text-xl rounded-lg hover:bg-green-200 cursor-pointer ${
            selected === item.id ? 'bg-green-400' : ''
          }`"
          @click="emit('select', item.id)"
        >
          {{ item.name }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup>
import { defineProps, defineEmit } from 'vue'
import Logo from './Logo.vue'

defineProps({
  items: Array,
  selected: String,
})

const emit = defineEmit(['select'])
</script>
