<template>
  <Dialog 
    visible 
    modal 
    :header="props.title" 
    :style="{ width: '30rem' }" 
    @update:visible="$event ? undefined : emit('close')"
  >
    <div class="flex flex-col mb-2">
      <label for="name" class="font-semibold">Name</label>
      <InputText 
        v-model="name" 
        id="name" 
        class="flex-auto" 
        autocomplete="off" 
        placeholder="Name"
      />
    </div>
    <div class="flex flex-col mb-2">
      <label for="count" class="font-semibold">Count</label>
      <InputText 
        v-model="count" 
        id="address" 
        class="flex-auto" 
        type="number"
        autocomplete="off" 
        placeholder="Count"
      />
    </div>
    <div class="flex flex-col mb-2">
      <label for="cost" class="font-semibold">Cost</label>
      <InputText 
        v-model="cost" 
        id="cost" 
        class="flex-auto"
        autocomplete="off" 
        placeholder="Cost"
      />
    </div>
    <div class="flex flex-col mb-2">
      <label for="category" class="font-semibold">Vat rates</label>
      <Select 
        v-model="activeVat" 
        :options="vatRates"
        placeholder="Select vat rate" 
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
import { apiCreateOrderItem, apiGetVatRates, apiUpdateOrderItem } from '@/api/order';
import { ref } from 'vue';
import type { OrderItem} from '@/types/order';
import { ModalVariant } from '@/types/modal';
import { useToast } from 'primevue/usetoast';

const props = defineProps<{
  variant: ModalVariant;
  title: string;
  successCallback: Function;
  orderItem?: OrderItem;
  orderId: number;
}>()

const emit = defineEmits<{
  (e: 'close'): void;
}>()

const toast = useToast();

const name = ref(props.orderItem ? props.orderItem.name : '');
const count = ref(props.orderItem ? props.orderItem.count : 0);
const cost = ref(props.orderItem ? props.orderItem.cost : '');
const activeVat = ref(props.orderItem ? props.orderItem.vat : '');

const vatRates = ref<string[]>([]);

const createOrderItem = () => { 
  const data = {
    name: name.value,
    count: count.value,
    cost: cost.value,
    vat: activeVat.value,
  }

  apiCreateOrderItem(props.orderId, data).then(() => { 
    emit('close');
    props.successCallback();
    toast.add({
      severity: 'success',
      summary: 'SUCCESS',
      detail: 'Order item has been successfully created.',
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

const updateOrderItem = () => { 
  if (!props.orderItem) { 
    return;
  }

  const data = {
    name: name.value,
    count: count.value,
    cost: cost.value,
    vat: activeVat.value,
  }

  apiUpdateOrderItem(props.orderId, props.orderItem.id, data).then(() => { 
    emit('close');
    props.successCallback();
    toast.add({
      severity: 'success',
      summary: 'SUCCESS',
      detail: 'Order item has been successfully updated.',
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
    createOrderItem();
    return;
  }
  updateOrderItem();
}

// Get vat rates API call
const getVatRates = () => {
  apiGetVatRates().then((response) => { 
    vatRates.value = response.data.data.map(item => item.toFixed(2))
  })
}

const onCreated = () => {
  getVatRates();
}

onCreated();
</script>
