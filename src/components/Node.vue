<template>
  <ParentNode
    :node="node"
    :x="x"
    :y="y"
    :path="path"
    :horizontal="true"
    @size="(value) => emit('size', value)"
  />
</template>
<script setup>
import ParentNode from './ParentNode.vue'

defineProps({
  node: Object,
  path: Array,
  x: Number,
  y: Number,
})

const emit = defineEmit(['size'])
</script>
