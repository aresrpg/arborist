<template>
  <g ref="g" @click="select" :transform="`translate(${x} ${y})`">
    <rect
      :width="width"
      :height="height"
      :class="`fill-current ${
        node.selected ? 'text-gray-300' : 'text-gray-200'
      }`"
    />
    <rect
      :width="25"
      :height="height"
      :class="`fill-current ${status ? STATUS_COLORS[status] : color}`"
    />
    <rect
      :width="width"
      :height="BASE_HEIGHT"
      :class="`fill-current ${status ? STATUS_COLORS[status] : color}`"
    />
    <g
      :transform="`translate(${0.5} ${(BASE_HEIGHT - 24) / 2})`"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke="white"
      fill="none"
    >
      <template v-if="status === 'SUCCESS'">
        <path d="M5 13l4 4L19 7" />
      </template>
      <template v-else-if="status === 'RUNNING'">
        <g>
          <path
            d="M6.569 19.127a8.96 8.96 0 01-3.223-4.805A8.96 8.96 0 019.682 3.347a8.96 8.96 0 014.312-.08m3.361 1.553a8.96 8.96 0 013.299 4.863v0a8.96 8.96 0 01-6.335 10.973 8.96 8.96 0 01-4.329.077"
          />
          <path
            d="M17.355 7.17V4.819h2.365v.015M6.57 16.777v2.35H4.204v-.014"
          />
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="360 12 12"
            to="0 12 12"
            dur="2s"
            repeatCount="indefinite"
          />
        </g>
      </template>
      <template v-else-if="status === 'FAILURE'">
        <path
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </template>
      <template v-else>
        <path
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        ></path>
      </template>
    </g>
    <text
      x="30"
      y="5"
      dominant-baseline="hanging"
      :width="width"
      :height="height"
      fill="white"
    >
      {{ node.name }}
    </text>
    <text
      v-for="[i, [name, value]] in (node.attributes || []).entries()"
      :key="name"
      :x="30"
      :y="BASE_HEIGHT + i * 19"
      dominant-baseline="hanging"
      fill="black"
    >
      {{ name }}: {{ value }}
    </text>
  </g>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const BASE_HEIGHT = 30

const STATUS_COLORS = {
  SUCCESS: 'text-green-400',
  RUNNING: 'text-yellow-400',
  FAILURE: 'text-red-400',
}

const props = defineProps({
  node: Object,
  x: Number,
  y: Number,
  path: Array,
  status: String,
})

const color = computed(() => {
  if (props.node.children.length > 0) return 'text-blue-500'
  else return 'text-purple-500'
})

const emit = defineEmit(['select', 'size'])

function select() {
  emit('select', props.path)
}

const width = ref(0)
const height = ref(0)
const g = ref(null)

onMounted(() => {
  const bbox = g.value.getBBox()
  width.value = bbox.width + 25 + 10
  height.value = bbox.height + 10

  emit('size', {
    width: width.value,
    height: height.value,
  })
})
</script>
