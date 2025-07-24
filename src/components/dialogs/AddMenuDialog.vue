<script setup>
import { useFoodStore } from "@/store/food";
const foodStore = useFoodStore();

const dialogVisible = defineModel();
const emit = defineEmits(['selectedMenu']);

const filterMenu = ref('all');
const headers = [
  { text: 'รูปภาพ', value: 'image', align: 'center' },
  { text: 'ชื่อเมนู', value: 'name' },
  { text: 'ราคา', value: 'price' },
  { text: 'จัดการ', value: 'actions', align: 'center', width: '300'},
];
const filteredMenu = computed(() => {
  if (filterMenu.value === 'all' || !filterMenu.value) {
    return foodStore.foods.map((menu) => {
      return {
        ...menu,
        quantity: 1,
      };
    });
  }
  let filtered = foodStore.foods.filter((menu) => menu.type === filterMenu.value) || [];    
  return filtered.map((menu) => {
    return {
      ...menu,
      quantity: 1,
    };
  });
});
const addMenu = (item) => {
  //clone object item
  let cloneItem = {...item};
  emit('selectedMenu', cloneItem);
  item.quantity = 1;
}
</script>
<template>
  <VDialog
    v-model="dialogVisible"
    max-width="80%"
  >
  <VCard>
    <VCardItem>
      <VCardTitle class="d-flex align-center">
        รายการเมนูอาหารในร้านทั้งหมด   
        <VSpacer></VSpacer>     
        <VBtn
          color="error"
          icon="mdi-close"
          @click="dialogVisible = false"
        />
      </VCardTitle>
    </VCardItem>
    <VCardItem>
      <VRow>
        <VCol cols="3">
          <VBtn @click="filterMenu = 'all'" color="primary" prepend-icon="mdi-list-box" block height="50">ทั้งหมด</VBtn>  
        </VCol>
        <VCol cols="3">
          <VBtn @click="filterMenu = 'food'" color="purple" prepend-icon="mdi-food" block height="50">เมนูบุฟเฟต์ / อาหาร</VBtn>  
        </VCol>
        <VCol cols="3">
          <VBtn @click="filterMenu = 'sauce'" color="green" prepend-icon="mdi-pot" block height="50">น้ำจิ้ม / น้ำซุป</VBtn>  
        </VCol>
        <VCol cols="3">
          <VBtn @click="filterMenu = 'drink'" color="red" prepend-icon="mdi-beer" block height="50">เครื่องดื่ม / อื่น ๆ</VBtn>  
        </VCol>
      </VRow>          
    </VCardItem>
    <VCardItem>
      <VDataTable :items="filteredMenu" :headers="headers">
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
        <template v-slot:item.actions="{ item }">          
          <div class="d-flex">
            <VTextField         
              type="number"
              label="จำนวน"
              class="me-2"
              v-model="item.quantity"              
              append-icon="mdi-plus"
              prepend-icon="mdi-minus"
              @click:append="item.quantity++"
              @click:prepend="item.quantity--"
            ></VTextField>
            <VBtn color="primary" @click="addMenu(item)">
              <VIcon
                class="me-2"
                size="small"
              >
                mdi-plus
              </VIcon>
              เพิ่ม
            </VBtn>
          </div>  
        </template>
      </VDataTable>  
    </VCardItem>
  </VCard>
  </VDialog>
</template>
