<template>
  <div id="main-wrap">
    <div class="header">
      <h1>Xây dựng cây 37</h1>
      <button @click="generateCSV()" class="btn-download">
        Tải xuống cây 37
      </button>
    </div>
    <div>
      <button @click="addChild(tree)">Thêm ý</button>
      <ol>
        <li v-for="(node, index) in tree" :key="node.id">
          <tree-node :node="node" />
          <button @click="removeChild(tree, index)" class="remove-btn">
            Bỏ ý
          </button>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import TreeNode from '~/component/TreeNode.vue';
import { getById, upsert } from '~/static/db';
import debounce from 'lodash.debounce';
import { nextTick } from 'process';

const tree = ref([
  {
    id: 1,
    text: 'A',
    children: [
      {
        id: 2,
        text: 'A1',
        children: [],
      },
      {
        id: 3,
        text: 'A2',
        children: [],
      },
      {
        id: 4,
        text: 'A3',
        children: [],
      },
      {
        id: 5,
        text: 'A4',
        children: [],
      },
      {
        id: 6,
        text: 'A5',
        children: [],
      },
      {
        id: 7,
        text: 'A6',
        children: [],
      },
      {
        id: 7,
        text: 'A7',
        children: [],
      },
    ],
  },
  {
    id: 8,
    text: 'B',
    children: [],
  },
  {
    id: 9,
    text: 'C',
    children: [],
  },
]);

onMounted(async () => {
  //fetch tree from aws dynamodb
  const bruh = await getById('management_var', '37tree');
  console.log('bruh', bruh);
  nextTick(() => {
    if (tree.data?._rawValue.value) {
      console.log('dung');
      tree.value = JSON.parse(bruh);
    }
  });
});

watch(
  tree,
  debounce(async (tree) => {
    console.log('chat');
    // save tree to aws dynamodb
    console.log(tree.value);
    await upsert('management_var', { id: '37tree', value: tree });
  }, 500),
  { deep: true }
);

function addChild(node) {
  const childCount = node.length;
  if (childCount < 7) {
    const newId = Date.now();
    node.push({ id: newId, text: '', children: [] });
  }
}

function removeChild(tree, index) {
  tree.splice(index, 1);
}

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
