<script setup lang="ts">
import DataTable, { type DataTableProps,DataTableFilterMeta } from "primevue/datatable";
import Column, { ColumnProps } from "primevue/column";
// import Paginator from "primevue/paginator";
import Button from "primevue/button";
import InputText from "primevue/inputtext";




const gridFunctions = {
  addItem: (data: any) => {
    console.log("add", data);
  },
  updateItem: (data: any) => {
    console.log("update", data);
  },
  deleteItem: (data: any) => {
    console.log("delete", data);
  },
  viewItem: (data: any) => {
    console.log("view", data);
  },
};

 const actionLabel = {
  addItem: "Adicionar",
  updateItem: "Editar",
  deleteItem: "Deletar",
  viewItem: "Visualizar",
};

export interface Col extends ColumnProps {
  field:string;
  action?: {
    label: keyof typeof actionLabel;
    function: {
      class: string;
      name: keyof typeof gridFunctions;
    }
  };
  colClass?: string;
  img?: string | boolean;
  imgClass?: string;
  routerLink?: {
    label: string;
    to:
      | string
      | {
          name: string;
          params?: Array<{ name: string; dataKey: string }>;
        };
    rotaName: string;
    class: string;
    icon?: string;
  };
}

export type GridProps = {
  emptyMessage: string;
  loadingMessage: string;
  columns: Col[];
  filters: DataTableFilterMeta;
} & DataTableProps;


const props = defineProps<GridProps>();

// essa função gera um link para uma imagem, substituindo os $<var>$ por data[var]
function genImg(img: string, data: any,field:string = '') {
  // example 'https://api.dicebear.com/7.x/icons/svg?seed=$id$'
  // pegar todas as aparições de $<var>$ e substituir por data[var]
  
  if (data.imageLinks != undefined) {
    if (data.imageLinks[field] != undefined) {
      return data.imageLinks[field];
    } else {
      return 'https://api.dicebear.com/7.x/icons/svg?seed="undef"';
    }
  }
  let image = img.replace(/\$([a-zA-Z0-9]+)\$/g, (_, p1) => {
    return data[p1];
  });

  return image;
}
</script>
<template>
  <DataTable v-bind="props" >
    <template #header>
        {{ props.filters }}
      <InputText  v-model="props.filters['global'].value" placeholder="Global Search" class="p-mr-2" />
                    
                
      </template>
    <template #empty> {{props.emptyMessage}} </template>
    <template #loading> {{props.loadingMessage}} </template>
    <Column v-for="col in props.columns" v-bind="col">
      <template #body="slotProps" v-if="col.img">
        <div class="flex items-center space-x-1">
        {{ slotProps.data[(typeof col.field==="string") ? col.field : 0] }}<img  :src="genImg(col.img, slotProps.data, col.field)" :class="col.imgClass" />
        </div>
      </template>
      
      <template #body="slotProps" v-else-if="col.action">
        <Button
          :label="actionLabel[col.action.label]"
          :class="col.action.class"
          @click="gridFunctions[col.action.function.name](slotProps.data)"
        />

        
      </template>
    </Column>
  </DataTable>
</template>
