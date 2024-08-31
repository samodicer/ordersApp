<template>
  <div class="flex flex-col gap-2">
    <span class="text-3xl text-center">Order items</span>
    <div class="flex justify-between">
      <Button 
        icon="pi pi-angle-left"
        rounded
        outlined
        @click="router.push({ name: 'Orders' })"
      />
      <Button 
        icon="pi pi-plus"
        label="Create"
        rounded
        @click="openCreateOrderItemModal" 
      />
    </div>
    <DataTable v-if="orderItems.length" :value="orderItems" size="small">
      <Column field="id" header="#"/>
      <Column field="name" header="Name"/>
      <Column field="count" header="Count"/>
      <Column field="cost" header="Cost"/>
      <Column field="vat" header="Vat"/>
      <Column field="cost_with_vat" header="Cost with vat"/>
      <Column>
        <template #body="slotProps">
          <div class="flex justify-end gap-1">
            <Button 
              icon="pi pi-pencil"
              rounded
              outlined
              @click="openUpdateOrderItemModal(slotProps.data)" 
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
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import OrderItemModal from '@/components/modals/OrderItemModal.vue';
import ConfirmationModal from '@/components/modals/ConfirmationModal.vue';
import NoData from '@/components/NoData.vue';
import TheLoader from '@/components/TheLoader.vue';
import router from '@/router';
import { apiDeleteOrderItem, apiGetOrderItems } from '@/api/order';
import { useModalStore } from '@/stores/modal';
import { ModalVariant } from '@/types/modal';
import type { OrderItem } from '@/types/order';
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const modalStore = useModalStore();
const toast = useToast();

const orderItems = ref<OrderItem[]>([]);
const itemsLoading = ref(true);

const props = defineProps<{ id: string }>();

// Open create modal
const openCreateOrderItemModal = () => {
  modalStore.open({
    component: OrderItemModal,
    props: {
      orderId: parseInt(props.id),
      variant: ModalVariant.CREATE,
      title: 'Create order item',
      successCallback: () => { 
        getOrderItems();
      }
    }
  })
}

// Open update modal
const openUpdateOrderItemModal = (item: OrderItem) => {
  modalStore.open({
    component: OrderItemModal,
    props: {
      orderId: parseInt(props.id),
      variant: ModalVariant.UPDATE,
      title: 'Update order item',
      orderItem: item,
      successCallback: () => { 
        getOrderItems();
      }
    }
  })
}

// Open confirmation modal
const openConfirmationModal = (item: OrderItem) => {
  modalStore.open({
    component: ConfirmationModal,
    props: {
      title: `Delete order item "${item.name}"`,
      body: 'Are you sure you want to delete this order item?',
      successCallback: () => { 
        deleteOrderItem(parseInt(props.id), item.id);
      }
    }
  })
}

// Delete order item API call
const deleteOrderItem = (id: number, itemId: number) => { 
  apiDeleteOrderItem(id, itemId).then(() => { 
    getOrderItems();
    toast.add({
      severity: 'success',
      summary: 'SUCCESS',
      detail: 'Order item has been successfully deleted.',
      life: 3000
    });
  }).catch((err) => { 
    toast.add({
      severity: 'error',
      summary: 'ERROR',
      detail: err.response.data.message,
      life: 3000
    });
  })
}

// Get order items API call
const getOrderItems = () => { 
  itemsLoading.value = true;

  apiGetOrderItems(parseInt(props.id)).then((response) => { 
    orderItems.value = response.data.data;
  }).finally(() => { 
    itemsLoading.value = false;
  })
}

const onCreated = () => { 
  getOrderItems();
}

onCreated();
</script>
