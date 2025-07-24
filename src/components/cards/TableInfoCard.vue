<script setup>
import { useTableStore } from '@/store/table';
import { useTransactionStore } from '@/store/transaction';

import AddMenuDialog from '@/components/dialogs/AddMenuDialog.vue';
import BillDialog from "@/components/dialogs/BillDialog.vue";

const tableStore = useTableStore();
const transactionStore = useTransactionStore();

const showMenuDialog = ref(false);
const showBillDialog = ref(false);

const props = defineProps({
  table: Object,
});

const onBill = (table)=>{
  transactionStore.addTransaction({
    table : table.name,
    foods : table.foods,
    total : table.total,
    type : 'income',
    category : 'food',
  });
  tableStore.clearTable(table.name);
  showBillDialog.value = false;
}
const onAddFood = (menu)=>{
  tableStore.addFood(props.table.name, menu);
  showMenuDialog.value = false;
}
</script>
<template>
  <VCard class="w-100 h-100">
    <VToolbar flat density="compact" :color="offline? 'grey':'primary'" dark>
      <VIcon class="ml-3">mdi-chip</VIcon>
      <VToolbarTitle>
        {{ props.table.name }}      
      </VToolbarTitle>      
      <VSpacer></VSpacer>      
    </VToolbar>
    <VCardText class="pa-3">
      <div class="d-flex justify-space-between">        
        <span><VIcon>mdi-clock</VIcon> เวลาเริ่ม:</span>
        <span>{{props.table.checkin}} น.</span>
      </div>
      <div class="d-flex justify-space-between">
        <span><VIcon>mdi-food</VIcon> รายการอาหาร:</span>
        <span>{{ props.table.foods.length }} รายการ</span>
      </div>
      <div class="d-flex justify-space-between">
        <span><VIcon>mdi-cash</VIcon> ยอดรวม:</span>
        <span>{{props.table.total}} บาท</span>
      </div>
    </VCardText>
    <VCardActions class="d-flex align-center justify-center">
      <VBtn @click="showMenuDialog = true" color="primary">เพิ่มรายการอาหาร</VBtn>
      <VBtn :disabled="props.table.foods.length == 0" @click="showBillDialog = true" color="success">ชำระเงิน</VBtn>
    </VCardActions>    
  </VCard>
  <AddMenuDialog v-model="showMenuDialog" @selectedMenu="onAddFood" />
  <BillDialog v-model="showBillDialog" @submit="onBill" :table="props.table" />
</template>
