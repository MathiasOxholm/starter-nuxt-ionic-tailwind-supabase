<script setup lang="ts">
defineProps<{
  icon: string
  text: string | number
}>()
</script>

<template>
  <button
    role="button"
    class="grid place-items-center gap-2">
    <div class="rounded-full h-10 w-10 flex justify-center items-center bg-white/10">
      <IonIcon
        :icon="icon"
        class="text-2xl" />
    </div>
    <p class="text-sm">{{ text }}</p>
  </button>
</template>
