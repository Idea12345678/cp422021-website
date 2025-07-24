<script setup>
import { useTransactionStore } from '@/store/transaction';

const transactionStore = useTransactionStore();

const headers = [
  { title: 'ID', key: 'id'},
  { title: 'ประเภท', align: 'center', key: 'type' },
  { title: 'วันที่', key: 'created' },
  { title: 'ราคา', key: 'total' },
  { title: 'แหล่งที่มา', key: 'category', align: 'center' },  
];
</script>
<template>
  <VCard>
    <VCardItem>
      <VCardTitle>
        รายรับรายจ่ายทั้งหมด
      </VCardTitle>
    </VCardItem>
    <VCardItem>
      <VDataTable :items="transactionStore.transactions" :headers="headers">
        <template v-slot:item.image="{ item }">
          <VCard class="my-2" elevation="2" rounded>
            <VImg :src="item.image" height="64"></VImg>
          </VCard>
        </template>
        <template v-slot:item.name="{ item }">
          <h4>{{ item.name }}</h4>
        </template>
        <template v-slot:item.price="{ item }">
          <h4>{{ item.price }} บาท</h4>
        </template>
      </VDataTable>  
    </VCardItem>
  </VCard>
</template>
