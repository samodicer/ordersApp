<template>
  <div class="flex flex-col gap-2">
    <span class="text-3xl text-center">Categories</span>
    <div class="flex justify-end">
      <Button 
        icon="pi pi-plus"
        label="Create"
        rounded
        @click="openCreateCategoryModal" 
      />
    </div>
    <DataTable :value="categories" size="small">
      <Column field="id" header="#"></Column>
      <Column field="name" header="Name"></Column>
      <Column>
        <template #body="slotProps">
          <div class="flex justify-end gap-1">
            <Button 
              icon="pi pi-pencil"
              rounded
              outlined
              @click="openUpdateCategoryModal(slotProps.data)"
            />
            <Button 
              icon="pi pi-trash"
              rounded
              outlined
              @click="openConfirmationModal(slotProps.data)" 
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
import CategoryModal from '@/components/modals/CategoryModal.vue';
import { apiDeleteCategory, apiGetCategories } from '@/api/category';
import type { Category } from '@/types/category';
import { ref } from 'vue';
import { useModalStore } from '@/stores/modal';
import { ModalVariant } from '@/types/modal';
import ConfirmationModal from '@/components/modals/ConfirmationModal.vue';

const categories = ref<Category[]>([]);

const modalStore = useModalStore();

const openCreateCategoryModal = () => {
  modalStore.open({
    component: CategoryModal,
    props: {
      variant: ModalVariant.CREATE,
      title: 'Create category',
      successCallback: () => { 
        getCategories();
      }
    }
  })
}

const openUpdateCategoryModal = (item: Category) => {
  modalStore.open({
    component: CategoryModal,
    props: {
      variant: ModalVariant.UPDATE,
      title: 'Update category',
      category: item,
      successCallback: () => { 
        getCategories();
      }
    }
  })
}

const openConfirmationModal = (item: Category) => {
  modalStore.open({
    component: ConfirmationModal,
    props: {
      title: `Delete category "${item.name}"`,
      body: 'Are you sure you want to delete this category?',
      successCallback: () => { 
        deleteCategory(item.id);
      }
    }
  })
}

const deleteCategory = (id: number) => { 
  apiDeleteCategory(id).then(() => { 
    getCategories();
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