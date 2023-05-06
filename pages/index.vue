<template>
  <div>
    <p>{{ rows }}</p>
  </div>
  <div>
    <ol>
      <tree-node v-for="node in tree" :key="node.id" :node="node" />
    </ol>
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
    text: 'A',
    children: [
      {
        id: 2,
        text: 'A1',
        children: [
          {
            id: 3,
            text: 'A1a',
            children: [
              {
                id: 4,
                text: 'A1a1',
                children: [],
              },
            ],
          },
          {
            id: 5,
            text: 'A1b',
            children: [],
          },
        ],
      },
      {
        id: 6,
        text: 'A2',
        children: [],
      },
    ],
  },
  {
    id: 7,
    text: 'B',
    children: [
      {
        id: 8,
        text: 'B1',
        children: [
          {
            id: 9,
            text: 'B1a',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 10,
    text: 'C',
    children: [
      {
        id: 11,
        text: 'C1',
        children: [],
      },
      {
        id: 12,
        text: 'C2',
        children: [
          {
            id: 13,
            text: 'C2a',
            children: [],
          },
          {
            id: 14,
            text: 'C2b',
            children: [
              {
                id: 15,
                text: 'C2b1',
                children: [],
              },
            ],
          },
        ],
      },
    ],
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

let _rows = ref([]);

function generateCSV() {
  function processNode(node, depth) {
    const row = Array(depth).fill('').concat(node.text);

    const childRows = node.children.flatMap((child) =>
      processNode(child, depth + 1)
    );

    return [row].concat(childRows);
  }

  const rows = tree.value.flatMap((node) => processNode(node, 0));
  const csvContent = rows.map((row) => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'tree.csv');
  link.click();
}
</script>
