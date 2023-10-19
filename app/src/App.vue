<template>
  <div>
    <data-table :model="new AuthModel()"></data-table>
  </div>
</template>

<script lang="ts" setup>
  import dataTable from './components/data-table.vue';
  import { AuthModel } from './models/auth.model';
</script>
