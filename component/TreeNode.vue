<template>
  <li>
    <input
      v-model="node.text"
      :placeholder="'Node ' + node.id"
      class="node-input"
    />
    <button @click="addChild(node.children)" class="add-btn">Add child</button>
    <button @click="removeChild(node.children)" class="remove-btn">
      Remove child
    </button>
    <ol v-if="node.children.length > 0">
      <tree-node v-for="child in node.children" :key="child.id" :node="child" />
    </ol>
  </li>
</template>

<script setup>
const props = defineProps({
  node: Object,
});

function addChild(node) {
  const childCount = node.length;
  if (childCount < 7) {
    const newId = Date.now();
    node.push({ id: newId, text: '', children: [] });
  }
}

function removeChild(node) {
  if (node.length > 3 || true) {
    node.pop();
  }
}
</script>

<style scoped>
.node-input {
  /* Add desired input styles */
  margin: 0 8px;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-btn,
.remove-btn {
  margin: 0 4px;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f9fa;
  cursor: pointer;
}

.add-btn:hover,
.remove-btn:hover {
  background-color: #e9ecef;
}
</style>
