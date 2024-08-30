<template>
  <div class="flex flex-col gap-2">
    <span class="text-3xl text-center">Categories</span>
    <div class="flex justify-end">
      <Button 
        icon="pi pi-plus"
        label="Create"
        rounded
        @click="createCategory" 
      />
    </div>
    <DataTable :value="categories">
      <Column field="id" header="#"></Column>
      <Column field="name" header="Name"></Column>
      <Column>
        <template #body>
          <div class="flex justify-end gap-1">
            <Button 
              icon="pi pi-pencil"
              rounded
              outlined
            />
            <Button 
              icon="pi pi-trash"
              rounded
              outlined
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { apiCreateCategory, apiGetCategories } from '@/api/category';
import type { Category } from '@/types/category';
import { ref } from 'vue';

const categories = ref<Category[]>([]);


const createCategory = () => { 
  apiCreateCategory({name: 'Cat3'}).then((response) => { 
    console.log(response.data.data)
  })
}

const getCategories = () => { 
  apiGetCategories().then((response) => { 
    categories.value = response.data.data;
  })
}

const onCreated = () => { 
  getCategories();
}

onCreated();
</script>

<style scoped>

</style>