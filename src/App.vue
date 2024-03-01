<template>
  <Grid v-bind="jsonConfig" :value="jsonData"></Grid>

  <Dialog
    v-model:visible="visible"
    modal
    header="Edit Profile"
    :style="{ width: '25rem' }"
  >
    <span class="p-text-secondary block mb-5">Update your information.</span>

    <div class="p-fluid">
      <div class="p-field">
        <label for="name">Name</label>
        <InputText id="name" v-model="newData.name" />
      </div>
      <div class="p-field">
        <label for="email">Email</label>
        <InputText id="email" v-model="newData.email" />
      </div>
      <div class="p-field">
        <label for="country">Country</label>
        <InputText id="country" v-model="newData.country" />
      </div>
      <div>ImageLinks</div>
      <div v-for="field in jsonConfig.columns">
        <label v-if="field.img" for="imageLinks">{{ field.field }}</label>
        <InputText
          v-if="field.img"
          id="imageLinks"
          v-model="newData.imageLinks[field.field]"
        />
      </div>
    </div>

    <div class="p-mt-4">
      <Button label="Save" icon="pi pi-check" @click="addJsonData(newData)" />
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-secondary p-ml-2"
        @click="visible = false"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import Grid, { GridProps } from "./components/Grid.vue";
import { FilterMatchMode } from "primevue/api";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

const newData = reactive({
  id: 0,
  name: "",
  email: "",
  country: "",
  imageLinks: Object,
});

type dataColumn = {
  id: number;
  name: string;
  email: string;
  country: string;
  imageLinks: Object;
};

const jsonData = reactive([
  {
    id: 1,
    name: "John ",
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
]);

function addJsonData(data: dataColumn) {
  visible.value = false;
  data.id = jsonData.length + 1;
  jsonData.push(data);
}

const visible = ref(false);

const jsonConfig: GridProps = reactive({
  emptyMessage: "Nenhum registro encontrado",
  loadingMessage: "Carregando...",
  tableClass: "w-full",
  paginator: true,
  editMode: "row",
  actionsHeader: [
    {
      label: "Adicionar Item",
      actionButtonClass: "p-button-info bg-green-500",
      function: {
        name: "addItem",
        class: "p-button-info",
      },
    },
  ],
  gridFunctions: {
    functions: {
      addItem: () => {
        visible.value = true;
      },
      updateItem: () => {
        console.log("Editar");
      },
      deleteItem: (data: object) => {
        //remove primeiro item com id 1

        jsonData.find((item, index) => {
          if (item.id === data.id) {
            jsonData.splice(index, 1);
            return true;
          }
        });
      },
      viewItem: () => {
        console.log("Visualizar");
      },
      onRowEditSave: (event:any) => {
        //search for the item and update it
        console.log(event);
        jsonData.find((item, index) => {
          console.log(item);
          if (item.id === event.newData.id) {
            jsonData[index] = event.newData;
            return true;
          }
        });
      },
    },
    actionLabel: {
      addItem: "Adicionar",
      updateItem: "Editar",
      deleteItem: "Deletar",
      viewItem: "Visualizar",
    },
  },
  globalFilterFields: ["name", "email", "country"],
  filters: {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  },
  searchBar: true,
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
      field: "actions",
      header: "Ações",
      colClass: "col-2",

      actions: [
        {
          label: "deleteItem",
          actionButtonClass: "p-button-danger bg-red-500 mr-2",
          function: {
            name: "deleteItem",
            class: "",
          },
        },
      ],
    },
  ],
});
</script>
