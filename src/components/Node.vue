<template>
  <g @click="select">
    <rect
      :x="node.x"
      :y="node.y"
      :width="node.width"
      :height="node.height"
      :class="`fill-current ${
        node.selected ? 'text-gray-300' : 'text-gray-200'
      }`"
    />
    <rect
      :x="node.x"
      :y="node.y"
      :width="25"
      :height="node.height"
      :class="`fill-current ${
        node.status ? STATUS_COLORS[node.status] : color
      }`"
    />
    <rect
      :x="node.x"
      :y="node.y"
      :width="node.width"
      :height="29"
      :class="`fill-current ${
        node.status ? STATUS_COLORS[node.status] : color
      }`"
    />
    <g
      :transform="`translate(${0.5 + node.x} ${node.y + (29 - 24) / 2})`"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke="white"
      fill="none"
    >
      <template v-if="node.status === 'SUCCESS'">
        <path d="M5 13l4 4L19 7" />
      </template>
      <template v-else-if="node.status === 'RUNNING'">
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
      <template v-else-if="node.status === 'FAILURE'">
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
      :x="node.x + 30"
      :y="node.y + 5"
      dominant-baseline="hanging"
      :width="node.width"
      :height="node.height"
      fill="white"
    >
      {{ node.name }}
    </text>
    <text
      v-for="[i, [name, value]] in (node.attributes || []).entries()"
      :key="name"
      :x="node.x + 30"
      :y="node.y + 29 + i * 19"
      dominant-baseline="hanging"
      fill="black"
    >
      {{ name }}: {{ value }}
    </text>
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

export function dimensions({ name, attributes }) {
  console.log(attributes)
  const text = textDimensions(name)
  const attributesWidth = attributes
    .map(([name, value]) => {
      return textDimensions(`${name}: ${value}`).width
    })
    .reduce((current, value) => Math.max(current, value), 0)

  return {
    width: Math.max(text.width, attributesWidth) + 25 + 10,
    height: text.height + text.height * attributes.length + 10,
  }
}
</script>

<script setup>
import { computed, defineProps, defineEmit } from 'vue'

const STATUS_COLORS = {
  SUCCESS: 'text-green-400',
  RUNNING: 'text-yellow-400',
  FAILURE: 'text-red-400',
}

const props = defineProps({
  node: Object,
  path: Array,
})

function string_hash(str) {
  return str
    .split('')
    .reduce((hash, c) => ((hash << 5) - hash + c.charCodeAt(0)) | 0, 0)
}

const color = computed(() => {
  if (props.node.children.length > 0) return 'text-blue-500'
  else return 'text-purple-500'
})

const emit = defineEmit(['select'])

function select() {
  emit('select', props.path)
}
</script>
