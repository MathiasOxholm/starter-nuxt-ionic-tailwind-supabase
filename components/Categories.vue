<script setup lang="ts">
import { Category } from '~~/types'

defineProps<{ categories: Category[] }>()
</script>

<template>
  <div class="w-full mr-4 overflow-y-scroll bg-black no-scrollbar">
    <ul class="flex w-auto gap-5 px-6 text-sm">
      <li class="text-white/50">
        <NuxtLink
          to="/"
          class="flex items-center h-12 transition-all duration-300"
          >Home</NuxtLink
        >
      </li>
      <li
        v-for="category in categories"
        :key="category.id"
        class="text-white/50 last:pr-6"
      >
        <NuxtLink
          :to="`/category/${category.slug}`"
          class="flex items-center h-12 transition-all duration-300"
        >
          {{ category.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.router-link-active {
  color: var(--color-primary);
}
</style>
