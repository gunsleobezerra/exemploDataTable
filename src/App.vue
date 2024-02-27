
<template>
  <Grid v-bind="jsonConfig" :value="jsonData" />
</template>

<script setup lang="ts">
import Grid, { GridProps } from './components/Grid.vue';

const jsonConfig: GridProps = {

  tableClass: 'table-auto',
  paginator: true,
  
  rows: 5,
  rowsPerPageOptions: [5, 10, 20, 50],
  alwaysShowPaginator: true,
  
  sortField: 'email',
  sortOrder:-1,
  columns: [
    {
      field: 'id',
      header: 'ID',
      
      action: {
        label: 'Alerta',
        function: (msg:string) => {
         alert(msg)
        },
        class: 'p-button-info'
      },
      colClass: 'col-1',
    },
    {
      field: 'name',
      header: 'Nome',
      colClass: 'col-2',
      img:"true",
      imgClass: 'img-circle rounded-full border-2 border-yellow-500',
    },
    {
      sortable: true,
      field: 'email',
      header: 'Email',
      colClass: 'col-3',
      
    },
    {
      field: 'country',
      header: 'Country',
      colClass: 'col-4',
      
    },
    {
      field: 'Renda',
      header: 'Country',
      colClass: 'col-2'
    }
  ],
}

const jsonData = [{
    id: 1, 
    name: 'John',
    email: 'john@example.com',
    country: 'USA',
    imageLinks:{
      id: 'https://api.dicebear.com/7.x/icons/svg?seed=$id$',
      name: 'https://upload.wikimedia.org/wikipedia/pt/thumb/d/d4/Mickey_Mouse.png/250px-Mickey_Mouse.png'
    }
    
    
  },
  {
    id: 2, 
    name: 'Doe',
    email: 'doe@example.com',
    country: 'BR',
    imageLinks:{
      id: 'https://api.dicebear.com/7.x/icons/svg?seed=$id$',
      name: 'https://upload.wikimedia.org/wikipedia/pt/thumb/d/d4/Mickey_Mouse.png/250px-Mickey_Mouse.png'
    }
  },
  { id: 3,
    name: 'Maria',
    email: 'maria@example.com',
    imageLinks:{
      id: 'https://api.dicebear.com/7.x/icons/svg?seed=$id$',
      name: 'https://upload.wikimedia.org/wikipedia/pt/thumb/d/d4/Mickey_Mouse.png/250px-Mickey_Mouse.png'
    }
  }]





</script>
