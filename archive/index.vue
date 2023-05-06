<template>
  <div>
    <vue-draggable-nested-tree :tree="tree" draggable :max-depth="maxDepth">
      <template #node="{ data }">
        <input
          v-model="data.text"
          @input="updateText(data)"
          :placeholder="'Node ' + data.id"
          class="node-input"
        />
      </template>
    </vue-draggable-nested-tree>
    <button @click="addChild(tree)">Add child</button>
    <button @click="removeChild(tree)">Remove child</button>
    <button @click="generateCSV()">Export to CSV</button>
  </div>
</template>

<script setup>
import { VueDraggableNestedTree } from 'vue-draggable-nested-tree';

const maxDepth = Infinity;
const tree = ref([
  {
    id: 1,
    text: '',
    children: [],
  },
]);

function updateText(node) {
  // Force a re-render
  tree.value = JSON.parse(JSON.stringify(tree.value));
}

function addChild(node) {
  const childCount = node.children.length;
  if (childCount < 7) {
    const newId = Date.now();
    node.children.push({ id: newId, text: '', children: [] });
  }
}

function removeChild(node) {
  if (node.children.length > 3) {
    node.children.pop();
  }
}

function generateCSV() {
  // Conversion logic
}
</script>

<style scoped>
.node-input {
  /* Add desired input styles */
}
</style>
