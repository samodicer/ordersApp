<template>
  <Dialog 
    visible 
    modal 
    :header="props.title" 
    :style="{ width: '30rem' }" 
    @update:visible="$event ? undefined : emit('close')"
  >
    <div class="flex flex-col mb-2">
      <label for="name" class="font-semibold">Customer name</label>
      <InputText 
        v-model="customerName" 
        id="name" 
        class="flex-auto" 
        autocomplete="off" 
        placeholder="Customer name"
      />
    </div>
    <div class="flex flex-col mb-2">
      <label for="address" class="font-semibold">Customer address</label>
      <InputText 
        v-model="customerAddress" 
        id="address" 
        class="flex-auto" 
        autocomplete="off" 
        placeholder="Customer address"
      />
    </div>
    <div class="flex flex-col mb-2">
      <label for="dueDate" class="font-semibold">Due date</label>
      <InputText 
        v-model="dueDate" 
        id="dueDate" 
        class="flex-auto" 
        autocomplete="off" 
        placeholder="Due date"
      />
    </div>
    <div v-if="props.variant === ModalVariant.UPDATE" class="flex flex-col mb-2">
      <label for="paymentDate" class="font-semibold">Payment date</label>
      <InputText 
        v-model="paymentDate" 
        id="paymentDate" 
        class="flex-auto" 
        autocomplete="off" 
        placeholder="Payment date"
      />
    </div>
    <div v-if="props.variant === ModalVariant.UPDATE" class="flex flex-col mb-2">
      <label for="createdAt" class="font-semibold">Created at</label>
      <InputText 
        v-model="createdAt" 
        id="createdAt" 
        class="flex-auto" 
        autocomplete="off" 
        placeholder="Created at"
      />
    </div>
    <div class="flex flex-col mb-2">
      <label for="category" class="font-semibold">Category</label>
      <Select 
        v-model="activeCategory" 
        :options="categories" 
        optionLabel="name" 
        placeholder="Select category" 
      />
    </div>
    <div class="flex flex-col mb-2">
      <label for="category" class="font-semibold">User</label>
      <MultiSelect 
        v-model="activeUsers" 
        display="chip" 
        :options="users" 
        optionLabel="fullName" 
        filter 
        placeholder="Select users"
      />
    </div>
    <div v-if="props.variant === ModalVariant.UPDATE" class="flex flex-col mb-2">
      <label for="category" class="font-semibold">Status</label>
      <Select 
        v-model="activeStatus" 
        :options="statuses"
        optionLabel="name" 
        placeholder="Select status" 
       />
    </div>
    <div class="flex justify-end gap-2 mt-8">
      <Button 
        type="button" 
        label="Cancel" 
        severity="secondary" 
        @click="emit('close')"
      />
      <Button 
        type="button" 
        :label="props.variant === ModalVariant.CREATE ? 'Create' : 'Update'" 
        @click="confirmModal"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import MultiSelect from 'primevue/multiselect';
import { apiGetCategories } from '@/api/category';
import { apiCreateOrder, apiUpdateOrder } from '@/api/order';
import type { Category } from '@/types/category';
import { ref } from 'vue';
import { apiGetUsers } from '@/api/user';
import type { User } from '@/types/user';
import type { Order } from '@/types/order';
import { ModalVariant } from '@/types/modal';
import { apiGetOrderStatuses } from '@/api/status';
import type { OrderStatus } from '@/types/status';
import { useToast } from 'primevue/usetoast';

const props = defineProps<{
  variant: ModalVariant;
  title: string;
  successCallback: Function;
  order?: Order;
}>()

const emit = defineEmits<{
  (e: 'close'): void;
}>()

const toast = useToast();

const customerName = ref(props.order ? props.order.customer_name : '');
const customerAddress = ref(props.order ? props.order.customer_address: '');
const dueDate = ref(props.order ? props.order.due_date : '');
const paymentDate = ref(props.order ? props.order.payment_date : null);
const createdAt = ref(props.order ? props.order.created_at : '');
const activeCategory = ref<Category | null>(props.order ? props.order.category : null);
const activeUsers = ref<User[] | null>(props.order ? props.order.order_users : null);
const activeStatus = ref<OrderStatus | null>(props.order ? props.order.current_status : null);

const categories = ref<Category[]>([]);
const users = ref<User[]>([]);
const statuses = ref<OrderStatus[]>([]);

// Create order API call
const createOrder = () => { 
  const data = {
    customer_name: customerName.value,
    customer_address: customerAddress.value,
    due_date: dueDate.value,
    category_id: activeCategory.value ? activeCategory.value.id : null,
    order_users: activeUsers.value ? activeUsers.value.map(item => item.id) : null,
  }

  apiCreateOrder(data).then(() => { 
    emit('close');
    props.successCallback();
    toast.add({
      severity: 'success',
      summary: 'SUCCESS',
      detail: 'Order has been successfully created.',
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

// Update order API call
const updateOrder = () => { 
  if (!props.order) { 
    return;
  }

  const data = {
    customer_name: customerName.value,
    customer_address: customerAddress.value,
    due_date: dueDate.value,
    payment_date: paymentDate.value,
    created_at: createdAt.value,
    category_id: activeCategory.value ? activeCategory.value.id : null,
    order_users: activeUsers.value ? activeUsers.value.map(item => item.id) : null,
    status: activeStatus.value? activeStatus.value.value : null,
  }

  apiUpdateOrder(props.order.id, data).then(() => { 
    emit('close');
    props.successCallback();
    toast.add({
      severity: 'success',
      summary: 'SUCCESS',
      detail: 'Order has been successfully updated.',
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

// Action based on modal variant
const confirmModal = () => {
  if (props.variant === ModalVariant.CREATE) { 
    createOrder();
    return;
  }
  updateOrder();
}

// Get categories API call
const getCategories = () => { 
  apiGetCategories().then((response) => { 
    categories.value = response.data.data;
  })
}

// Get users API call
const getUsers = () => { 
  apiGetUsers().then((response) => { 
    users.value = response.data.data;
  })
}

// Get statuses API call
const getOrderStatuses = () => { 
  apiGetOrderStatuses().then((response) => { 
    statuses.value = response.data.data;
  })
}

const onCreated = () => {
  // Get data for Select components
  if (props.variant === ModalVariant.UPDATE) { 
    getOrderStatuses();
  }
  getCategories();
  getUsers();
}

onCreated();
</script>
