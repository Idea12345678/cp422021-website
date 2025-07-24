<script setup>
import InfoCard from "@/components/cards/InfoCard.vue";
import TableInfoCard from "@/components/cards/TableInfoCard.vue";
import AddDialog from "@/components/dialogs/AddDialog.vue";

import { useTableStore } from "@/store/table";
const tableStore = useTableStore();
const showAddTableDialog = ref(false);
const tableInitData = ref({
  name : "",
  checkin : "",
  checkout : "",
  total : 0,
  status : "ready",
  foods : []
});
const formats = [
  {md: 12, datatype: 'text', target: 'name', validation: ['required'], props: { label: 'ชื่อโต๊ะ *', clearable: true } },  
]

const reserveTable = async (table) => {
  await tableStore.reserveTable(table);
};
const availableTable = computed(() => {
  return tableStore.tables.filter((table) => table.status == 'ready');
});
const reservedTable = computed(() => {
  return tableStore.tables.filter((table) => table.status == 'reserve');
});
const addTable = async (data) => {
  await tableStore.addTable(data);
  showAddTableDialog.value = false;
};
</script>
<template>
  <VCard :loading="tableStore.loading" :disabled="tableStore.loading">
    <VCardItem>
      <VCardTitle>โต๊ะในร้าน</VCardTitle>
    </VCardItem>
    <VCardText>
      <VRow>
        <VCol cols="3">
          <InfoCard
            title="โต๊ะทั้งหมด"
            :stats="tableStore.tables.length"
            unit="ตัว"
            icon="mdi-table"
            color="primary"
          />
        </VCol>
        <VCol cols="3">
          <InfoCard
            title="โต๊ะว่าง"
            :stats="availableTable.length"
            unit="ตัว"
            icon="mdi-table-plus"
            color="success"
          />
        </VCol>
        <VCol cols="3">
          <InfoCard
            title="ใช้งานอยู่"
            :stats="reservedTable.length"
            unit="ตัว"
            icon="mdi-table-account"
            color="warning"
          />
        </VCol>
        <VCol cols="3">
          <VCard class="align-center justify-center d-flex fill-height">
            <VBtn                
              class="fill-height"
              variant="text"
              block              
              @click="showAddTableDialog = true"
            >
              <VIcon>mdi-plus</VIcon>
              เพิมโต๊ะใหม่
            </VBtn>
          </VCard>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
  <VCard class="mt-8">
    <VCardText>
      <VRow>
        <VCol v-for="table in tableStore.tables" cols="3" class="d-flex align-center justify-center">
          <v-btn v-if="table.status=='ready'" @click="reserveTable(table)" size="x-large" block prepend-icon="mdi-table" height="200">            
            {{ table.name }} - {{ table.status }}
          </v-btn>
          <TableInfoCard v-else :table="table"/>
        </VCol>          
      </VRow>
    </VCardText>
  </VCard>
  <AddDialog 
    v-model:isDialogVisible="showAddTableDialog"     
    :data="tableInitData"
    title="เพิ่มโต๊ะใหม่" 
    :format="formats" 
    @submit="addTable"
  />
</template>
