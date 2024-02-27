<template>
  <Grid v-bind="jsonConfig" :value="jsonData" />
</template>

<script setup lang="ts">

import { reactive } from "vue";
import Grid, { GridProps } from "./components/Grid.vue";
import { FilterMatchMode } from "primevue/api";

const jsonConfig: GridProps = reactive({
  emptyMessage: "Nenhum registro encontrado",
  loadingMessage: "Carregando...",
  tableClass: "w-full",
  paginator: true,
  editMode: "cell",
  globalFilterFields: ["name", "email", "country"],
  filters: {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  },

  rows: 5,
  rowsPerPageOptions: [5, 10, 20, 50],
  alwaysShowPaginator: true,
  resizableColumns: true,
  sortField: "email",
  sortOrder: -1,
  columns: [
    {
      field: "id",
      header: "ID",

      action: {
        label: "addItem",
        function: {
          name: "addItem",
          class: "p-button-info",
        },
      },
      colClass: "col-1",
    },
    {
      field: "name",
      header: "Nome",

      colClass: "col-2",
      img: true,
      imgClass: "w-10 h-10 rounded-full",
      sortable: true,
    },
    {
      sortable: true,
      field: "email",
      header: "Email",
      colClass: "col-3",
      img: true,
      imgClass: "w-10 h-10  ",
    },
    {
      sortable: true,
      field: "country",
      header: "Country",
      colClass: "col-4",
    },
    {
      field: "Renda",
      header: "Country",
      colClass: "col-2",
    },
  ],
});

const jsonData = [
  {
    id: 1,
    name: "John",
    email: "john@example.com",
    country: "USA",
    imageLinks: {
      id: "https://api.dicebear.com/7.x/icons/svg?seed=$id$",
      name: "https://upload.wikimedia.org/wikipedia/pt/thumb/d/d4/Mickey_Mouse.png/250px-Mickey_Mouse.png",
      email:
        "https://upload.wikimedia.org/wikipedia/pt/thumb/d/d4/Mickey_Mouse.png/250px-Mickey_Mouse.png",
    },
  },
  {
    id: 2,
    name: "Doe",
    email: "doe@example.com",
    country: "BR",
    imageLinks: {
      id: "https://api.dicebear.com/7.x/icons/svg?seed=$id$",
      name: "https://s2.glbimg.com/3auOxS3cG2mc_H5jFXDpxC7ol-w=/e.glbimg.com/og/ed/f/original/2016/09/12/dr-alan-turing-2956483.jpg",
      email:
        "https://upload.wikimedia.org/wikipedia/pt/thumb/d/d4/Mickey_Mouse.png/250px-Mickey_Mouse.png",
    },
  },
  {
    id: 3,
    name: "Maria",
    email: "maria@example.com",
    imageLinks: {
      id: "https://api.dicebear.com/7.x/icons/svg?seed=$id$",
      name: "https://upload.wikimedia.org/wikipedia/pt/thumb/d/d4/Mickey_Mouse.png/250px-Mickey_Mouse.png",
      email:
        "https://upload.wikimedia.org/wikipedia/pt/thumb/d/d4/Mickey_Mouse.png/250px-Mickey_Mouse.png",
    },
  },
];
</script>
