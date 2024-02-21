<script setup lang="ts">
import DataTable, { type DataTableProps } from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from 'primevue/paginator';
import Button from 'primevue/button';

export type Col = {
    field: string;
    header: string;
    
    
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
        to: string | {
            name: string;
            params?: Array<{ name: string, dataKey: string }>
        }
        rotaName: string;
        class: string;
        icon?: string;


    }
}
export type GridProps = {
    columns: Col[]
} & DataTableProps

const props = defineProps<GridProps>();

// essa função gera um link para uma imagem, substituindo os $<var>$ por data[var]
function genImg(img: string, data: any) {
    // example 'https://api.dicebear.com/7.x/icons/svg?seed=$id$'
    // pegar todas as aparições de $<var>$ e substituir por data[var]

    return img.replace(/\$([a-zA-Z0-9]+)\$/g, (_, p1) => {

        return data[p1]
    })
}

// const gridConfig = ref<PrimeVueTableProps>()
// watch(gridConfig,()=>{
//     options.value = {
//         ...options.value??{},
//         ...gridConfig.value
//     }
// },{deep:true})
// debugger
// TODO - ver troca de linha arrasta e solta;
//     - linha editave
//     - 
</script>
<template>
    <!-- <pre>{{ props.size }}</pre> -->
    <DataTable v-bind="props" >
        <Paginator :rows="rows" :totalRecords="totalRecords" :rowsPerPageOptions="rowsPerPageOptions">
            <template #start="slotProps">
                Page: {{ slotProps.state.page }}
                First: {{ slotProps.state.first }}
                Rows: {{ slotProps.state.rows }}
            </template>
            <template #end>
                <Button type="button" class="btn">
                    <i class="bi bi-search"></i>
                </Button>
            </template>
        </Paginator>
        <div v-for="{
            field,
            header,
            action, img, colClass
        } of props.columns" :key="field">


            <Column v-if="action" :field="field" :header="header" :class="colClass">
                <template #body="slotProps">
                    <Button type="button" :class="action.class" @click="() => action.function(slotProps.data)">
                        {{ action.label }}
                    </Button>
                </template>
            </Column>

            <Column v-else-if="img" :field="field" :header="header" :class="colClass">
                <template #body="slotProps">
                    <img :src="genImg(img!, slotProps.data)" alt="col image" class="placeholder rounded-circle me-3"
                        width="48" height="48" />
                </template>
            </Column>
            <Column v-else :field="field" :header="header" :class="colClass"></Column>
        </div>
    </DataTable>
</template>
<style></style>