<template>
  <div>
    <li
      v-for="(child, index) in node.children"
      :key="child.id"
      :data-index="index"
      draggable="true"
      @dragstart="onDragStart"
      @dragover="onDragOver"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @drop="onDrop"
      @dragend="onDragEnd"
    >
      <tree-node :node="child" />
      <button @click="removeChild(node.children, index)" class="remove-btn">
        X
      </button>
    </li>
  </div>
</template>

<script setup>
const props = defineProps({
  node: Object,
});

const node = props.node;

const draggedItem = ref(null);
const draggedItemIndex = ref(-1);

const onDragStart = (event) => {
  draggedItemIndex.value = parseInt(event.target.dataset.index);
  draggedItem.value = items[draggedItemIndex.value];

  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', JSON.stringify(draggedItem.value));
  event.target.classList.add('dragging');
};

const onDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

const onDragEnter = (event) => {
  event.target.classList.add('drag-over');
};

const onDragLeave = (event) => {
  event.target.classList.remove('drag-over');
};

const onDrop = (event) => {
  event.target.classList.remove('drag-over');
  const dropTargetIndex = parseInt(event.target.dataset.index);
  if (dropTargetIndex !== draggedItemIndex.value) {
    items.splice(draggedItemIndex.value, 1);
    items.splice(dropTargetIndex, 0, draggedItem.value);
  }
};

const onDragEnd = (event) => {
  event.target.classList.remove('dragging');
};
</script>

<style scoped>
li {
  list-style: none;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #eee;
  cursor: grab;
}

li.dragging {
  opacity: 0.5;
  cursor: grabbing;
}

li.drag-over {
  border-color: #007bff;
}
</style>
