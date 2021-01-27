<template>
  <rect
    :x="node.x"
    :y="node.y"
    :width="node.width"
    :height="node.height"
    fill="#444444"
  />
  <rect
    :x="node.x"
    :y="node.y"
    :width="20"
    :height="node.height"
    fill="rgb(143, 62, 209)"
  />
  <text
    :x="node.x + 25"
    :y="node.y + 5"
    dominant-baseline="hanging"
    :width="node.width"
    :height="node.height"
    fill="white"
  >
    {{ node.name }}</text
  >
  <template v-for="(child, i) in node.children" :key="i">
    <path
      stroke="black"
      fill="none"
      stroke-width="2"
      :d="connector(node, child)"
    />
    <Node :node="child" />
  </template>
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
    width: text.width + 30,
    height: text.height + 10,
  }
}
</script>

<script setup>
import { defineProps } from 'vue'

function connector(first, second) {
  const from_x = first.x + first.width
  const from_y = first.y + first.height / 2
  const to_x = second.x
  const to_y = second.y + second.height / 2

  const margin = to_x - from_x

  return `M ${from_x},${from_y} h ${margin / 2} V ${to_y} h ${margin / 2}`
}

const { node } = defineProps({
  node: Object,
})
</script>
