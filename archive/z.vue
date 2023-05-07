<template>
  <MyTree v-model="data" ref="tree" virtualization style="height: 500px">
    <template #default="{ node, stat }">
      <span v-if="stat.children.length" @click="stat.open = !stat.open">
        {{ stat.open ? '-' : '+' }}
      </span>
      <!-- <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <input type="checkbox" v-model="stat.checked" /> -->
      {{ node.text }}
    </template>
  </MyTree>
</template>
<script setup>
import { BaseTree, Draggable } from '@he-tree/vue';
import '@he-tree/vue/style/default.css';
let MyTree = Draggable;
const data = ref([
  {
    text: 'Projects',
    children: [
      {
        text: 'Frontend',
        children: [
          {
            text: 'Vue',
            children: [
              {
                text: 'Nuxt',
              },
            ],
          },
          {
            text: 'React',
            children: [
              {
                text: 'Next',
              },
            ],
          },
          {
            text: 'Angular',
          },
        ],
      },
      {
        text: 'Backend',
      },
    ],
  },
  {
    text: 'Videos',
    children: [
      {
        text: 'Movie',
        children: [
          {
            text: 'The Godfather',
          },
          {
            text: 'La Dolce Vita',
          },
          {
            text: 'In the Mood for Love',
          },
        ],
      },
      {
        text: 'AD',
      },
      {
        text: 'Shorts',
      },
    ],
  },
  {
    text: 'Photos',
    children: [
      {
        text: 'Animals',
      },
      {
        text: 'Buildings',
      },
      {
        text: 'Sky',
      },
      {
        text: 'Sea',
      },
    ],
  },
  {
    text: 'Music',
    children: [
      {
        text: 'My Happy Melodies.',
      },
      {
        text: 'Hello Summer.',
      },
      {
        text: 'An Overture To Happiness.',
      },
      {
        text: 'Sunny Days.',
      },
      {
        text: 'Every One Need Adventure.',
      },
      {
        text: 'Happy, Chill Radio.',
      },
      {
        text: 'I Found My Way.',
      },
      {
        text: 'Early, Early Morning.',
      },
    ],
  },
  {
    text: 'Games',
    children: [
      {
        text: 'swimming',
      },
      {
        text: 'cycling',
      },
      {
        text: 'tennis',
      },
      {
        text: 'boxing',
      },
    ],
  },
  {
    text: 'Download',
  },
]);
</script>
<style></style>
