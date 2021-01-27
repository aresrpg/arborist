<template>
  <g @click="select">
    <rect
      :x="node.x"
      :y="node.y"
      :width="node.width"
      :height="node.height"
      :fill="node.selected ? 'red' : '#444444'"
    />
    <rect
      :x="node.x"
      :y="node.y"
      :width="25"
      :height="node.height"
      fill="rgb(143, 62, 209)"
    />
    <text
      :x="node.x + 30"
      :y="node.y + 5"
      dominant-baseline="hanging"
      :width="node.width"
      :height="node.height"
      fill="white"
    >
      {{ node.name }}</text
    >
  </g>
</template>

<script>
function textDimensions(text) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 0 0')
  svg.style.visibility = 'hidden'

  const node = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  node.appendChild(document.createTextNode(text))

  svg.appendChild(node)

  document.body.appendChild(svg)
  const { width, height } = node.getBBox()
  document.body.removeChild(svg)

  return { width, height }
}

export function dimensions({ name }) {
  const text = textDimensions(name)
  return {
    width: text.width + 35,
    height: text.height + 10,
  }
}
</script>

<script setup>
import { defineProps, defineEmit } from 'vue'

const props = defineProps({
  node: Object,
  path: Array,
})

const emit = defineEmit(['select'])

function select() {
  emit('select', props.path)
}
</script>
