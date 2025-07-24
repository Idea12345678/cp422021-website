<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  stats: {
    type: [String,Number],
    required : true,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
    default: 'red',
  },
  unit: {
    type: String,
    required: false,
    default: null,
  },
})
</script>

<template>
  <VCard class="d-flex align-center pa-3">
    <VAvatar
      :color="props.color"
      rounded
      variant="tonal"
      size="52"
      class="me-3"
    >
      <VIcon
        size="38"
        :icon="props.icon"
      />
    </VAvatar>

    <div class="d-flex flex-column">
      <span class="text-base text-subtitle-1">
        {{ props.title }}
      </span>
      <h6 class="text-h5">
        {{ props.stats }}
        <span class="text-caption">{{ props.unit }}</span>
      </h6>
    </div>
  </VCard>
</template>
