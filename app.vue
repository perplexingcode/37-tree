<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
import { getById, upsert } from '~/static/db';
const cloudTree = await getById('management_var', '37tree');
console.log(cloudTree);
// provide('tree', cloudTree);
</script>
