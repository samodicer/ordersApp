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
    <DataTable v-if="orders.length" :value="orders" size="small" >
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
      <Column header="Users">
        <template #body="slotProps">
          <AvatarGroup>
            <Avatar 
              v-for="user in slotProps.data.order_users" 
              :key="user.id" shape="circle" 
              :label="!user.avatar ? getInitials(user.fullName) : undefined"
              :image="user.avatar ? `${API}/${user.avatar.image}` : undefined "
              style="background-color: #ece9fc; color: #2a1261" 
            />
          </AvatarGroup>
        </template>
      </Column>
      <Column header="Status" class="cursor-pointer">
        <template #body="slotProps">
          <Tag 
            :style="{background: slotProps.data.current_status.color, color: 'white'}"
            :value="slotProps.data.current_status.name" 
            @click="openStatusHistoryModal(slotProps.data)"
          />
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <div class="flex justify-end gap-1">
            <Button 
              icon="pi pi-list"
              rounded
              outlined
              @click="redirectToOrderItems(slotProps.data.id)" 
            />
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
    <NoData v-else-if="!itemsLoading" />
    <TheLoader v-else />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import AvatarGroup from 'primevue/avatargroup';
import Avatar from 'primevue/avatar';
import Tag from 'primevue/tag';
import OrderModal from '@/components/modals/OrderModal.vue';
import ConfirmationModal from '@/components/modals/ConfirmationModal.vue';
import StatusHistoryModal from '@/components/modals/StatusHistoryModal.vue';
import NoData from '@/components/NoData.vue';
import TheLoader from '@/components/TheLoader.vue';
import router from '@/router';
import { apiDeleteOrder, apiGetOrder } from '@/api/order';
import type { Order } from '@/types/order';
import { ref } from 'vue';
import { useDateFormat } from '@vueuse/core';
import { useModalStore } from '@/stores/modal';
import { ModalVariant } from '@/types/modal';
import { getInitials } from '@/utils/user';
import { API } from '@/api/api';
import { useToast } from 'primevue/usetoast';

const modalStore = useModalStore();
const toast = useToast();

const orders = ref<Order[]>([]);
const itemsLoading = ref(true);

const redirectToOrderItems = (id: number) => {
  router.push({ name: 'OrderItems', params: { id } })
}

const openCreateOrderModal = () => {
  modalStore.open({
    component: OrderModal,
    props: {
      variant: ModalVariant.CREATE,
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
      variant: ModalVariant.UPDATE,
      title: 'Update order',
      order: item,
      successCallback: () => { 
        getOrders();
      }
    }
  })
}

const openConfirmationModal = (item: Order) => {
  modalStore.open({
    component: ConfirmationModal,
    props: {
      title: `Delete order #${item.order_number}`,
      body: 'Are you sure you want to delete this order?',
      successCallback: () => { 
        deleteOrder(item.id);
      }
    }
  })
}

const openStatusHistoryModal = (item: Order) => {
  modalStore.open({
    component: StatusHistoryModal,
    props: {
      title: 'Status history',
      order: item,
    }
  })
}


const deleteOrder = (id: number) => { 
  apiDeleteOrder(id).then(() => { 
    getOrders();
    toast.add({
      severity: 'success',
      summary: 'SUCCESS',
      detail: 'Order has been successfully deleted.',
      life: 3000
    });
  })
}

const getOrders = () => { 
  itemsLoading.value = true;
  apiGetOrder().then((response) => { 
    orders.value = response.data.data;
  }).finally(() => { 
    itemsLoading.value = false;
  })
}

const onCreated = () => { 
  getOrders();
}

onCreated();
</script>