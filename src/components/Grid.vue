<script setup lang="ts">
import DataTable, {
  type DataTableProps,
  DataTableFilterMeta,
} from "primevue/datatable";
import Column, { ColumnProps } from "primevue/column";
// import Paginator from "primevue/paginator";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { ref } from "vue";

export interface Col extends ColumnProps {
  field: string;
  actions?: [
    {
      actionButtonClass?: string;
      label: string;
      function: {
        class: string;
        name: string;
      };
    }
  ];
  colClass?: string;
  img?: string | boolean;
  imgClass?: string;
}
type GridFunctions = {
  functions: {
    [key: string]: Function;
  };

  actionLabel: {
    [key: string]: string;
  };
};

export interface GridProps extends DataTableProps {
  emptyMessage?: string;
  loadingMessage?: string;
  searchBar?: boolean;
  searchBarClass?: string;
  columns: Col[];
  filters?: DataTableFilterMeta;
  gridFunctions: GridFunctions;
  actionsHeader?: [
    {
      actionButtonClass: string;
      label: string;
      function: {
        class: string;
        name: string;
      };
    }
  ];
}

/**  
 * A estrutura `gridFunctions` é um objeto que contém duas propriedades: `functions` e `actionLabel`.

- `functions` é um objeto que contém várias funções que são chamadas para realizar ações específicas. Cada função tem um nome que descreve a ação que realiza:

  - `addItem`: Esta função é chamada para adicionar um item. Atualmente, ela apenas imprime "Adicionar" no console.
  - `updateItem`: Esta função é chamada para atualizar um item. Atualmente, ela apenas imprime "Editar" no console.
  - `deleteItem`: Esta função é chamada para deletar um item. Ela aceita um argumento `data` que é o item a ser deletado. Atualmente, ela imprime "Deletar" e o item no console.
  - `viewItem`: Esta função é chamada para visualizar um item. Atualmente, ela apenas imprime "Visualizar" no console.
  - `onRowEditSave`: Esta função é chamada quando as alterações em uma linha são salvas. Atualmente, ela apenas imprime "onRowEditSave" no console.

- `actionLabel` é um objeto que contém várias strings que são usadas como rótulos para as ações. Cada rótulo tem um nome que corresponde a uma das funções em `functions`.

Para alterar o comportamento de `gridFunctions`, um desenvolvedor pode substituir qualquer uma das funções em `functions` por uma função que realiza a ação desejada. Por exemplo, para fazer `addItem` realmente adicionar um item a algum tipo de estrutura de dados, o desenvolvedor poderia substituir a função `addItem` por uma função que faz isso.

Da mesma forma, um desenvolvedor pode alterar os rótulos das ações substituindo as strings em `actionLabel` pelas strings desejadas.
 * **/

const props = defineProps<GridProps>();

const filters =
  props.filters ?? ref({ global: { value: null, matchMode: "contains" } });

// essa função gera um link para uma imagem, substituindo os $<var>$ por data[var]
function genImg(img: string | boolean, data: any, field: string = "") {
  // example 'https://api.dicebear.com/7.x/icons/svg?seed=$id$'
  // pegar todas as aparições de $<var>$ e substituir por data[var]

  if (data.imageLinks != undefined) {
    if (data.imageLinks[field] != undefined) {
      return data.imageLinks[field];
    } else {
      img = "";
      return 'https://api.dicebear.com/7.x/icons/svg?seed="undef"';
    }
  }
}
const editingRows = ref([]);
</script>
<template>
  <DataTable
    v-bind="props"
    v-model:editingRows="editingRows"
    @row-edit-save="props.gridFunctions.functions.onRowEditSave"
    :pt="{
      table: { style: 'min-width: 50rem' },
      column: {
        bodycell: ({ state }) => ({
          style:
            state['d_editing'] && 'padding-top: 0.6rem; padding-bottom: 0.6rem',
        }),
      },
    }"
  >
    <template #header>
      <InputText
        v-if="props.searchBar"
        v-model="filters['global'].value"
        placeholder="Global Search"
        :class="props.searchBarClass"
      />
      <div v-if="props.actionsHeader" class="flex items-center space-x-1 mt-3">
        <Button
          v-for="action in props.actionsHeader"
          :label="action.label"
          :class="action.actionButtonClass"
          @click="props.gridFunctions.functions[action.function.name]"
        ></Button>
      </div>
    </template>
    <template #empty> {{ props.emptyMessage }} </template>
    <template #loading> {{ props.loadingMessage }} </template>
    <Column v-for="col in props.columns" v-bind="col">
      <template #editor="{ data, field }" v-if="!col.img">
        <InputText v-model="data[field]" />
      </template>
      <template #body="slotProps" v-if="col.img">
        <div class="flex items-center space-x-1">
          {{ slotProps.data[typeof col.field === "string" ? col.field : 0]
          }}<img
            :src="genImg(col.img, slotProps.data, col.field)"
            :class="col.imgClass"
          />
        </div>
      </template>
      <template #body="slotProps" v-if="col.actions">
        <Button
          v-for="action in col.actions"
          :label="props.gridFunctions.actionLabel[action.function.name]"
          :severity="action.actionButtonClass"
          @click="
            props.gridFunctions.functions[action.function.name](slotProps.data)
          "
        ></Button>
      </template>
    </Column>
    <Column
      :rowEditor="true"
      style="width: 10%; min-width: 8rem"
      bodyStyle="text-align:center"
    ></Column>
  </DataTable>
</template>
