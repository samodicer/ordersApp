<template>
  <div class="flex flex-col">
    <span class="text-3xl text-center">Orders</span>
    <div class="flex justify-end">
      <Button 
        icon="pi pi-plus"
        label="Create"
        rounded
        outlined
        @click="createOrder" 
      />
    </div>
    <DataTable class="overflow-x-auto" :value="orders">
      <Column field="id" header="#"></Column>
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
      <Column header="Status">
        <template #body="slotProps">
          <Tag :value="slotProps.data.current_status.name"/>
        </template>
      </Column>
      <Column header="Actions">
        <template #body>
          <div class="flex items-center gap-1">
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
import { apiCreateOrder, apiGetOrder } from '@/api/order';
import type { Order } from '@/types/order';
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import { useDateFormat } from '@vueuse/core';

const orders = ref<Order[]>([]);

// const orderColumns = [
//   { field: 'id', header: '#' },
//   { field: 'order_number', header: 'Order number' },
//   { field: 'due_date', header: 'Due date' },
//   { field: 'payment_date', header: 'Payment date' },
//   { field: 'created_at', header: 'Created at' },
//   { field: 'customer_name', header: 'Customer name' },
//   { field: 'customer_address', header: 'Customer addres' },
// ];

const createOrder = () => {
  /*apiCreateOrder(
    {
      due_date: '2025-01-15',
      order_users: null,
      customer_name: 'J Kovac',
      customer_address: 'Nitra, Hlavna 5445',
      category_id: null
    }
  ).then((response) => { 
    console.log(response.data.data)
  })*/
}

const created = () => { 
  apiGetOrder().then((response) => { 
    console.log(response.data.data)
    orders.value = response.data.data;
  })
}

created();
</script>

<style scoped>


</style>