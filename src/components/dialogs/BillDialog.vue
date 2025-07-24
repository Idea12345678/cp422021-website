<script setup>
import { useTableStore } from "@/store/table";

const tableStore = useTableStore();

const emit = defineEmits(["submit"]);

const dialogVisible = defineModel();

const props = defineProps({
  table: Object,
});
const total = computed(() => {
  return props.table.foods.reduce((acc, item) => acc + item.price * item.quantity, 0);
});
const onBill = () => {
  let tobesave = {
    ...props.table,    
    total: total.value,    
  };
  emit("submit", tobesave);  
};
</script>

<template>
  <VDialog
    v-model="dialogVisible"
    max-width="600px"
  >
    <VCard>      
      <VCardTitle class="d-flex align-center">
        รายการเมนูอาหารในร้านทั้งหมด   
        <VSpacer></VSpacer>     
        <VBtn
          color="error"
          icon="mdi-close"
          @click="dialogVisible = false"
        />
      </VCardTitle>      
      <VCardText>
        <VRow>
          <VCol cols="12 text-center">
            <div class="text-h4"> {{ props.table.name }} </div>
            <div class="text-h6"> รายการอาหารที่สั่ง </div>
          </VCol>          
        </VRow>
        <VTable class="mt-5" density="comfortable">
          <thead>
            <tr>
              <th class="text-left">รายการ</th>
              <th class="text-right">ราคารวม</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in props.table?.foods">
              <td>{{item.name}} x {{ item.quantity }}</td>
              <td class="text-right">{{item.price * item.quantity}} บาท</td>
            </tr>                         
          </tbody>
        </VTable>
        <VDivider :thickness="5"></VDivider>
        <VTable>
          <tbody>
            <tr>
              <td class="text-h6">รายการทั้งหทด</td><td class="text-right">{{props.table.foods.length}} รายการ</td>
            </tr>
            <tr class="text-h5">
              <td>ยอดรวมทั้งหมด</td><td class="text-right">{{total}} บาท</td>
            </tr>
          </tbody>
        </VTable>
        <VDivider :thickness="5"></VDivider>
      </VCardText>
      <VCardActions class="justify-center mb-5">
        <VBtn 
          @click="dialogVisible = false" 
          class="mx-2 px-2" 
          variant="elevated" 
          color="error"
        >
          ยกเลิก
        </VBtn>
        <VBtn 
          @click="onBill" 
          class="mx-2 px-2" 
          variant="elevated" 
          color="primary"
        >
          ชำระเงิน
        </VBtn>                
      </VCardActions>
    </VCard>
  </VDialog>
</template>
