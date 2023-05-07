<template>
  <Draggable v-model="node.children">
    <li v-for="(child, index) in node.children" :key="child.id">
      <tree-node :node="child" />
      <button @click="removeChild(node.children, index)" class="remove-btn">
        X
      </button>
    </li>
  </Draggable>
</template>
<script setup></script>
<style></style>
