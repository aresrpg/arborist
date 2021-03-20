<template>
  <main class="w-full flex flex-row">
    <Sidebar
      class="w-2/12"
      :items="trees"
      :selected="selectedTree.id"
      @select="(id) => router.push({ params: { tree: id } })"
    />
    <div class="w-full flex flex-col">
      <Toolbar
        :instances="selectedTree.instances"
        @debug="(instance) => (debuggedInstance = instance)"
      />
      <Tree
        class="w-full h-full tree bg-green-700"
        :root="tree"
        @select="select"
        :selected="selected"
        :status="status"
      />
    </div>
  </main>
</template>

<script setup>
import { computed, defineProps, ref, watch, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import equal from 'fast-deep-equal'

import Tree from '../components/Tree.vue'
import Sidebar from '../components/Sidebar.vue'
import Toolbar from '../components/Toolbar.vue'

const router = useRouter()
const route = useRoute()

const url = computed(() => decodeURIComponent(route.params.url))

const trees = await fetch(url.value).then((res) => res.json())

function parseNode(node) {
  return {
    name: node.tagName,
    attributes: Array.from(node.attributes).map(({ nodeName, nodeValue }) => [
      nodeName,
      nodeValue,
    ]),
    children: Array.from(node.childNodes)
      .filter((child) => child.nodeType === Node.ELEMENT_NODE)
      .map(parseNode),
  }
}

const selectedTree = computed(
  () => trees.find(({ id }) => id === route.params.tree) || trees[0]
)
router.push({ params: { tree: selectedTree.value.id } })

const tree = computed(() =>
  parseNode(
    new DOMParser().parseFromString(selectedTree.value.tree, 'text/xml')
      .documentElement
  )
)

const selected = ref(null)

function select(path) {
  if (equal(selected.value, path)) selected.value = null
  else selected.value = path
}

const status = ref({})

const debuggedInstance = ref(null)

let eventSource = null
watchEffect(() => {
  if (eventSource) {
    console.log('Closing', eventSource.url)
    eventSource.close()
    eventSource = null
  }

  if (debuggedInstance.value) {
    eventSource = new EventSource(`${url.value}/${debuggedInstance.value}`)

    status.value = {}
    console.log('Opened', eventSource.url)

    eventSource.addEventListener('message', (event) => {
      const [path, value] = JSON.parse(event.data)

      status.value[path] = value
    })
  }
})
</script>

<style scoped>
.tree {
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5) 2px,
      transparent 2px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.5) 2px, transparent 2px),
    linear-gradient(rgba(255, 255, 255, 0.28) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.28) 1px, transparent 1px);
  background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
  background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
}
</style>
