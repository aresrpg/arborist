<template>
  <SVGPanZoom :viewBox="`0 0 ${node.max_x} ${node.max_y}`">
    <ConnectedNode :node="node" :path="[]" v-bind="$attrs" />
  </SVGPanZoom>
</template>

<script setup>
import { defineProps, computed } from 'vue'

import ConnectedNode from './ConnectedNode.vue'
import Node, { dimensions } from './Node.vue'
import SVGPanZoom from './SVGPanZoom.vue'

import equal from 'fast-deep-equal'

const props = defineProps({
  root: Object,
  status: Object,
  selected: Array,
})

const MARGIN = 10

function convert(
  node,
  x = 0,
  y = 0,
  { width, height } = dimensions(node),
  max_width = width,
  path = []
) {
  const children_dimensions = node.children.map((child) => dimensions(child))
  const children_width = children_dimensions.map(({ width }) => width)

  const next_max_width = Math.max(...children_width, 0)
  const child_x = x + max_width + MARGIN

  const selected = equal(props.selected, path)

  const { children, child_y } = node.children.reduce(
    ({ child_y, children }, child, i) => {
      const node = convert(
        child,
        child_x,
        child_y,
        children_dimensions[i],
        next_max_width,
        [...path, i]
      )

      const [last_child] = node.children.slice(-1)

      const last_element = last_child || node

      return {
        children: [...children, node],
        child_y: last_element.y + last_element.height + MARGIN,
      }
    },
    {
      child_y: y,
      children: [],
    }
  )

  const { name, attributes } = node

  return {
    name,
    attributes,
    width,
    height,
    x,
    y: y,
    children,
    status: props.status[path.join('.')],
    max_y: Math.max(child_y, y + height),
    max_x:
      Math.max(...children.map(({ max_x }) => MARGIN + max_x), 0) + max_width,
    component: Node,
    selected,
  }
}

const node = computed(() => convert(props.root))
</script>
