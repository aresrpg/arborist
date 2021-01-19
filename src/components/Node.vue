<template>
  <template v-for="(child, i) in node.children" :key="i">
    <line
      stroke="black"
      :x1="node.x + node.width"
      :y1="node.y + node.height / 2"
      :x2="child.x"
      :y2="child.y + child.height / 2"
    />
    <Node :node="child" />
  </template>

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
</template>

<script setup>
import { defineProps } from 'vue'

const { node } = defineProps({
  node: Object,
})
</script>

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
