<template>
  <ParentNode
    :node="node"
    :x="x"
    :y="y"
    :path="path"
    :horizontal="true"
    :status="status"
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
  status: Object,
})

const emit = defineEmit(['size'])
</script>
