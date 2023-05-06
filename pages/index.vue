<template>
  <div>
    <ul>
      <tree-node v-for="node in tree" :key="node.id" :node="node" />
    </ul>
    <button @click="addChild(tree)">Add child</button>
    <button @click="removeChild(tree)">Remove child</button>
    <button @click="generateCSV()">Export to CSV</button>
  </div>
</template>

<script setup>
import TreeNode from '~/component/TreeNode.vue';

const tree = ref([
  {
    id: 1,
    text: '',
    children: [],
  },
]);

function addChild(node) {
  const childCount = node.length;
  if (childCount < 7) {
    const newId = Date.now();
    node.push({ id: newId, text: '', children: [] });
  }
}

function removeChild(node) {
  if (node.length > 3) {
    node.pop();
  }
}

function generateCSV() {
  // Conversion logic
}
</script>
