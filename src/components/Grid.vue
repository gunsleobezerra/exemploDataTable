<script setup lang="ts">
import DataTable, { type DataTableProps } from "primevue/datatable";
import Column, { ColumnProps } from "primevue/column";
// import Paginator from "primevue/paginator";
import Button from "primevue/button";

export interface Col extends ColumnProps {
  field:string;
  action?: {
    label: string;
    function: (data: any) => void;
    class: string;
  };
  colClass?: string;
  img?: string;
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
  columns: Col[];
} & DataTableProps;


const props = defineProps<GridProps>();

// essa função gera um link para uma imagem, substituindo os $<var>$ por data[var]
function genImg(img: string, data: any,field:string = '') {
  // example 'https://api.dicebear.com/7.x/icons/svg?seed=$id$'
  // pegar todas as aparições de $<var>$ e substituir por data[var]
  
  if (data["imageLinks"]!= undefined) {
    debugger;
    if (data["imageLinks"][field]!= undefined) {
      return data["imageLinks"][field];
    }
  }
  let image = img.replace(/\$([a-zA-Z0-9]+)\$/g, (_, p1) => {
    return data[p1];
  });

  return image;
}
</script>
<template>
  <DataTable v-bind="props" :class="props.tableClass">
    <Column v-for="col in props.columns" v-bind="col">
      <template #body="slotProps" v-if="col.img">
        
        {{ slotProps.data[(typeof col.field==="string") ? col.field : 0] }}<img  :src="genImg(col.img, slotProps.data, col.field)" :class="col.imgClass" />
      </template>
      <template #body="slotProps" v-else-if="col.action">
        <Button
          :label="col.action.label"
          :class="col.action.class"
          @click="col.action.function(slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
</template>
