<template>
  <SimpleNode
    :node="node"
    :x="x"
    :y="y"
    :path="path"
    @size="(value) => (size = value)"
  />

  <template v-for="(child, i) in childrens" :key="i">
    <path
      stroke="black"
      fill="none"
      stroke-width="2"
      :d="connector({ x, y }, size, child, sizes[i])"
    />

    <Node
      :node="child.node"
      :x="child.x"
      :y="child.y"
      :path="[...path, i]"
      @size="(value) => (sizes[i] = value)"
    />
  </template>
</template>

<script setup>
import { nextTick, ref, computed, watch } from 'vue'

import SimpleNode from './SimpleNode.vue'
import Node from './Node.vue'

const MARGIN = 20

const props = defineProps({
  node: Object,
  path: Array,
  x: Number,
  y: Number,
  horizontal: Boolean,
})

const sizes = ref([])
watch([() => props.node, () => props.horizontal], () => {
  // Force rerender
  sizes.value = []
  nextTick(
    () =>
      (sizes.value = props.node.children.map(() => ({
        height: 0,
        width: 0,
      })))
  )
})

function sum(i = sizes.value.length) {
  const key = `${props.horizontal ? 'height' : 'width'}WithChilds`

  return sizes.value
    .slice(0, i)
    .filter((value) => value)
    .reduce((acc, { [key]: value }) => acc + value + MARGIN, 0)
}

function max(i = sizes.value.length) {
  const key = `${props.horizontal ? 'width' : 'height'}WithChilds`

  return sizes.value
    .filter((value) => value)
    .reduce((acc, { [key]: value }) => Math.max(acc, value), 0)
}

const size = ref({ width: 0, height: 0 })

const childrens = computed(() =>
  props.node.children.map((node, i) => ({
    node,
    x: props.x + size.value.width + MARGIN + (props.horizontal ? 0 : sum(i)),
    y: props.y + (props.horizontal ? sum(i) : MARGIN),
  }))
)
const emit = defineEmit(['size'])

watch(
  [size, sizes],
  () => {
    emit('size', {
      width: size.value.width,
      height: size.value.height,
      heightWithChilds: Math.max(
        size.value.height,
        props.horizontal ? sum() : max()
      ),
      widthWithChilds:
        size.value.width + (props.horizontal ? max() + MARGIN / 2 : sum()),
    })
  },
  { deep: true }
)

function connector(
  first,
  firstSize,
  second,
  secondSize = { width: 1, height: 1 }
) {
  const from_x = first.x + firstSize.width
  const from_y = first.y + firstSize.height / 2

  if (props.horizontal) {
    const to_x = second.x
    const to_y = second.y + secondSize.height / 2
    const margin = to_x - from_x

    return `M ${from_x},${from_y} h ${margin / 2} V ${to_y} h ${margin / 2}`
  } else {
    const to_x = second.x + secondSize.width / 2
    const to_y = second.y
    return `M ${from_x},${from_y} H ${to_x} V ${to_y}`
  }
}
</script>
