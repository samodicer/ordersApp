<template>
  <div class="flex flex-col gap-2">
    <span class="text-3xl text-center">Orders</span>
    <div class="flex justify-end">
      <Button 
        icon="pi pi-plus"
        label="Create"
        rounded
        @click="openCreateOrderModal" 
      />
    </div>
    <DataTable :value="orders">
      <Column field="id" header="#"/>
      <Column field="order_number" header="Order number"/>
      <Column field="customer_name" header="Customer name"/>
      <Column field="customer_address" header="Customer address"/>
      <Column field="created_at" header="Created at">
        <template #body="slotProps">
          <span>
            {{ useDateFormat(slotProps.data.created_at, 'DD MMM YYYY') }}
          </span>
        </template>
      </Column>
      <Column field="due_date" header="Due date">
        <template #body="slotProps">
          <span>
            {{ useDateFormat(slotProps.data.due_date, 'DD MMM YYYY') }}
          </span>
        </template>
      </Column>
      <Column field="payment_date" header="Payment date">
        <template #body="slotProps">
          <span v-if="slotProps.data.payment_date">
            {{ useDateFormat(slotProps.data.payment_date, 'DD MMM YYYY') }}
          </span>
        </template>
      </Column>
      <Column field="category" header="Category">
        <template #body="slotProps">
          <span v-if="slotProps.data.category">
            {{ slotProps.data.category.name }}
          </span>
        </template>
      </Column>
      <Column header="Status">
        <template #body="slotProps">
          <Tag 
            :style="{background: slotProps.data.current_status.color, color: 'white'}"
            :value="slotProps.data.current_status.name" 
          />
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <div class="flex gap-1">
            <Button 
              icon="pi pi-pencil"
              rounded
              outlined
              @click="openUpdateOrderModal(slotProps.data)" 
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
import Tag from 'primevue/tag';
import OrderModal from '@/components/modals/OrderModal.vue';
import { apiDeleteOrder, apiGetOrder } from '@/api/order';
import type { Order } from '@/types/order';
import { ref } from 'vue';
import { useDateFormat } from '@vueuse/core';
import { useModalStore } from '@/stores/modal';
import { OrderModalVariant } from '@/types/modal';
import ConfirmationModal from '@/components/modals/ConfirmationModal.vue';

const modalStore = useModalStore();

const orders = ref<Order[]>([]);

const openCreateOrderModal = () => {
  modalStore.open({
    component: OrderModal,
    props: {
      variant: OrderModalVariant.CREATE,
      title: 'Create order',
      successCallback: () => { 
        getOrders();
      }
    }
  })
}

const openUpdateOrderModal = (item: Order) => {
  modalStore.open({
    component: OrderModal,
    props: {
      variant: OrderModalVariant.UPDATE,
      title: 'Update order',
      order: item,
      successCallback: () => { 
        getOrders();
      }
    }
  })
}

const  openConfirmationModal = (item: Order) => {
  modalStore.open({
    component: ConfirmationModal,
    props: {
      title: `Delete order #${item.order_number}`,
      body: 'Are you sure you want to delete this order?',
      successCallback: async () => { 
        deleteOrder(item.id);
      }
    }
  })
}

const deleteOrder = (id: number) => { 
  apiDeleteOrder(id).then(() => { 
    getOrders();
  })
}

const getOrders = () => { 
  apiGetOrder().then((response) => { 
    orders.value = response.data.data;
  })
}

const onCreated = () => { 
  getOrders();
}

onCreated();
</script>