<template>
  <SVGPanZoom :viewBox="`0 0 ${initialSize.width} ${initialSize.height}`">
    <Node :node="root" :x="0" :y="0" :path="[]" @size="onSize" />
  </SVGPanZoom>
</template>

<script setup>
import { reactive } from 'vue'

import Node from './Node.vue'
import SVGPanZoom from './SVGPanZoom.vue'

defineProps({
  root: Object,
  status: Object,
  selected: Array,
})

const initialSize = reactive({
  width: 0,
  height: 0,
})

function onSize({ widthWithChilds, heightWithChilds }) {
  initialSize.width = widthWithChilds
  initialSize.height = heightWithChilds
}
</script>
