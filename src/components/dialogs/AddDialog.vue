<script setup>
import { computed, onMounted, toRaw, watch } from "vue"
import computeValidation from "@/apis/ComputeValidation";
const props = defineProps({
  format: {
    type: Array,
    required: true
  },
  data: {
    type: Object,
    required: false,
    default: {}
  },
  title: {
    type: String,
    required: false,
  },
  subtitle: {
    type: String,
    required: false,
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  closeWhenSubmit: {
    type: Boolean,
    required: false,
    default: true,
  }
})
const data = ref({});
const refVForm = ref();
const colorMenu = ref(false);
const color = ref('#1976D2FF');

const emit = defineEmits(['update:isDialogVisible','submit', 'cancel'])

const resetForm = () => {
  emit('update:isDialogVisible', false)
}
const onColorChanged = (selectedColor) => {
  console.log(selectedColor);
}
const swatchStyle = computed(() => {
  return {
    backgroundColor: color.value,
    cursor: 'pointer',
    height: '25px',
    width: '25px',
    borderRadius: colorMenu.value ? '50%' : '4px',
    transition: 'border-radius 200ms ease-in-out'
  }
})

const onFormSubmit = async() => {
  let { valid: isValid } = await refVForm.value?.validate()
  if (isValid) {
    emit('submit', data.value, props.data);
    if (props.closeWhenSubmit){
      emit('update:isDialogVisible', false)
    }    
  }
}

watch(() => props.isDialogVisible, (isOpen) => {
  emit('update:isDialogVisible', isOpen);
  if (isOpen) {
    console.log("dialog opened");
    data.value = structuredClone(toRaw(props.data));
  }
});

</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 800"
    :model-value="props.isDialogVisible"
    persistent
  >
    <VCard class="pa-sm-8 pa-5">
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="resetForm"
      />

      <VCardItem>
        <VCardTitle class="text-h5 text-center">
          {{ props.title || (props.data && props.data.id ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล" )}}
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-3">
        <VCardSubtitle v-if="props.subtitle" class="text-center mb-8">
          {{ props.subtitle }}
        </VCardSubtitle>

        <VForm
          ref="refVForm"
          class="mt-4"
          :disabled="props.loading"
          @submit.prevent="onFormSubmit"
        >
          <VRow>
            <VCol v-for="(item,i) in props.format" :key="i" cols="12" :md="item.md || 12" class="d-flex align-center">
              <VTextField v-if="item.datatype == 'text' && item.props && item.props.type == 'number'" v-model.number="data[item.target]" v-bind="item.props" :rules="item.validation ? computeValidation(item.validation, data[item.target]) : []"/>
              <VTextField v-if="item.datatype == 'text' && item.props && item.props.type != 'number'" v-model="data[item.target]" v-bind="item.props" :rules="item.validation ? computeValidation(item.validation, data[item.target]) : []"/>
              <VTextarea v-if="item.datatype == 'textarea'" v-model="data[item.target]" v-bind="item.props" :rules="item.validation ? computeValidation(item.validation, data[item.target]) : []"/>
              <VCheckbox v-if="item.datatype == 'checkbox'" v-model="data[item.target]" v-bind="item.props"/>
              <CustomRadiosWithImageIcon v-if="item.datatype == 'radio-image'" v-model:selected-radio="data[item.target]"/>
              <VCombobox v-if="item.datatype == 'combobox'" v-model="data[item.target]" v-bind="item.props"/>
              <VRadioGroup v-if="item.datatype == 'radio'" v-model="data[item.target]" v-bind="item.props">
                <VRadio v-for="(el,j) in item.item" :key="j" v-bind="el.props"/>
              </VRadioGroup>
              <VSelect v-if="item.datatype == 'select'" v-model="data[item.target]" v-bind="item.props"/>
              <VSwitch v-if="item.datatype == 'switch'" v-model="data[item.target]" v-bind="item.props"/>
              <VTextField v-if="item.datatype =='color'" v-model="data[item.target]" hide-details class="ma-0 pa-0" solo v-bind="item.props">
                <template v-slot:append-inner>
                  <VMenu v-model="colorMenu" top :close-on-content-click="false">
                    <template v-slot:activator="{ props }">
                      <div :style="swatchStyle" v-bind="props"></div>
                    </template>
                    <v-card class="mt-2 ml-2" >
                      <v-card-text class="pa-0">
                        <v-color-picker v-model="color" flat mode="hex" show-swatches swatches-max-height="100px" @update:modelValue="(v)=>data[item.target]=v"/>
                      </v-card-text>
                    </v-card>
                  </VMenu>
                </template>
              </VTextField>
            </VCol>

            <VCol cols="12" class="text-center">
              <VBtn :loading="props.loading" type="submit" class="me-3" :disabled="props.loading">
                บันทึก
              </VBtn>
              <VBtn :loading="props.loading" variant="tonal" color="secondary" :disabled="props.loading" @click="resetForm">
                ยกเลิก
              </VBtn>
            </VCol>

          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
