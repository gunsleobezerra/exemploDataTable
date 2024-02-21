
<template>
  <Grid v-bind="jsonConfig" :value="jsonData" />
</template>

<script setup lang="ts">
import Grid, { GridProps } from './components/Grid.vue';

const jsonConfig: GridProps = {

  tableClass: 'table table-striped table-hover table-bordered table-sm',
  paginator: false,
  rows: 10,
  rowsPerPageOptions: [5, 10, 20, 50],
  columns: [
    {
      field: 'id',
      header: 'ID',
      action: {
        label: 'Ver',
        function: (data: any) => {
          console.log(data);
        },
        class: 'p-button-success'
      },
      colClass: 'col-1'
    },
    {
      field: 'name',
      header: 'Nome',
      colClass: 'col-2'
    },
    {
      field: 'email',
      header: 'Email',
      colClass: 'col-3'
    },
    {
      field: 'country',
      header: 'Country',
      colClass: 'col-4'
    }
  ],
}

const jsonData = [
  {
    id: 1, name: 'John',
    email: 'john@example.com',
    country: 'USA'
  },
  {
    id: 2, name: 'Doe',

    email: 'doe@example.com',
    country: 'BR'
  },
  { id: 3,
    name: 'Maria',
    email: 'maria@example.com'
  }]





</script>
