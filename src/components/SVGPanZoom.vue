<template>
  <svg
    ref="svg"
    :viewBox="transformedViewBox.join(' ')"
    v-bind="$attrs"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
    @selectstart="onSelectStart"
    @wheel="onWheel"
  >
    <slot></slot>
  </svg>
</template>

<script setup>
import { defineProps, computed, ref, reactive } from 'vue'

const SCALE_FACTOR = 1.2

const { viewBox } = defineProps({
  viewBox: String,
})

const translation = reactive({
  x: 0,
  y: 0,
})

const scale = reactive({
  x: 1,
  y: 1,
})

const svg = ref(null)

const dragging = reactive({
  active: false,
  started: false,
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
})

const transformedViewBox = computed(() => {
  const [x, y, width, height] = viewBox.split(' ').map((v) => parseFloat(v))

  return [
    x + translation.x + dragging.x,
    y + translation.y + dragging.y,
    width * scale.x,
    height * scale.y,
  ]
})

function onMouseDown(event) {
  dragging.active = true
  dragging.startX = event.clientX
  dragging.startY = event.clientY
}

function screenToSvg(x, y) {
  const point = svg.value.createSVGPoint()
  point.x = x
  point.y = y
  return point.matrixTransform(svg.value.getScreenCTM().inverse())
}

function onMouseMove(event) {
  if (!dragging.active) return

  dragging.started = true

  const from = screenToSvg(dragging.startX, dragging.startY)
  const to = screenToSvg(event.clientX, event.clientY)

  dragging.x = -(to.x - from.x)
  dragging.y = -(to.y - from.y)
}

function onMouseUp(event) {
  dragging.active = false
  dragging.started = false
  translation.x += dragging.x
  translation.y += dragging.y
  dragging.x = 0
  dragging.y = 0
}

function onSelectStart(event) {
  if (dragging.started) event.preventDefault()
}

function onWheel(event) {
  console.log(event)

  const delta = event.deltaY > 0 ? SCALE_FACTOR : 1 / SCALE_FACTOR

  console.log(delta)

  const point = screenToSvg(event.clientX, event.clientY)

  const [x, y] = transformedViewBox.value

  translation.x -= (point.x - x) * (delta - 1)
  translation.y -= (point.y - y) * (delta - 1)

  scale.x *= delta
  scale.y *= delta
}
</script>

<style scoped>
svg {
  cursor: move;
}
</style>
