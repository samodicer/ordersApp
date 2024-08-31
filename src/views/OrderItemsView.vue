<template>
  <div class="flex flex-col gap-2">
    <span class="text-3xl text-center">Order items</span>
    <div class="flex justify-between">
      <Button 
        icon="pi pi-angle-left"
        rounded
        outlined
        @click="router.push({ path: '/orders' })"
      />
      <Button 
        icon="pi pi-plus"
        label="Create"
        rounded
        @click="openCreateOrderItemModal" 
      />
    </div>
    <DataTable :value="orderItems" size="small">
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
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import OrderItemModal from '@/components/modals/OrderItemModal.vue';
import ConfirmationModal from '@/components/modals/ConfirmationModal.vue';
import router from '@/router';
import { apiDeleteOrderItem, apiGetOrderItems } from '@/api/order';
import { useModalStore } from '@/stores/modal';
import { ModalVariant } from '@/types/modal';
import type { OrderItem } from '@/types/order';
import { ref } from 'vue';

const modalStore = useModalStore();

const orderItems = ref<OrderItem[]>([]);

const props = defineProps<{ id: string }>();

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

const deleteOrderItem = (id: number, itemId: number) => { 
  apiDeleteOrderItem(id, itemId).then(() => { 
    getOrderItems();
  })
}

const getOrderItems = () => { 
  apiGetOrderItems(parseInt(props.id)).then((response) => { 
    orderItems.value = response.data.data;
  })
}

const onCreated = () => { 
  getOrderItems();
}

onCreated();
</script>
