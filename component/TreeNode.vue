<template>
  <button v-if="node.children.length > 0" @click="showChilren = !showChilren">
    {{ showChilren ? '-' : '+' }}
  </button>
  <textarea v-model="node.text" class="node-input" />
  <button @click="addChild(node.children)" class="add-btn">Thêm ý con</button>
  <ol v-if="node.children.length > 0 && showChilren">
    <li v-for="(child, index) in node.children" :key="child.id">
      <tree-node :node="child" />
      <button @click="removeChild(node.children, index)" class="remove-btn">
        Bỏ ý
      </button>
    </li>
  </ol>
</template>

<script setup>
const props = defineProps({
  node: Object,
});

const showChilren = ref(true);

function addChild(node) {
  const childCount = node.length;
  if (childCount < 7) {
    const newId = Date.now();
    node.push({ id: newId, text: '', children: [] });
  }
}

function removeChild(children, index) {
  children.splice(index, 1);
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
