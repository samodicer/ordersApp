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
    <DataTable v-if="categories.length" :value="categories" size="small">
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
    <NoData v-else-if="!itemsLoading" />
    <TheLoader v-else />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import CategoryModal from '@/components/modals/CategoryModal.vue';
import NoData from '@/components/NoData.vue';
import TheLoader from '@/components/TheLoader.vue';
import ConfirmationModal from '@/components/modals/ConfirmationModal.vue';
import { apiDeleteCategory, apiGetCategories } from '@/api/category';
import type { Category } from '@/types/category';
import { ref } from 'vue';
import { useModalStore } from '@/stores/modal';
import { ModalVariant } from '@/types/modal';
import { useToast } from 'primevue/usetoast';

const modalStore = useModalStore();
const toast = useToast();

const categories = ref<Category[]>([]);
const itemsLoading = ref(true);
  
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
    toast.add({
      severity: 'success',
      summary: 'SUCCESS',
      detail: 'Category has been successfully deleted.',
      life: 3000
    });
  })
}

const getCategories = () => { 
  itemsLoading.value = true;
  apiGetCategories().then((response) => { 
    categories.value = response.data.data;
  }).finally(() => { 
    itemsLoading.value = false;
  })
}

const onCreated = () => { 
  getCategories();
}

onCreated();
</script>

<style scoped>

</style>