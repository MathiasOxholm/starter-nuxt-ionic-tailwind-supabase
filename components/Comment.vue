<script setup lang="ts">
import { UserComment } from '~~/types'

defineProps<{
  comment: UserComment
}>()
</script>

<template>
  <div class="grid gap-2">
    <div class="flex items-center gap-2">
      <NuxtImg
        v-if="comment.users"
        :src="comment.users.avatar"
        :alt="comment.users.username"
        height="20"
        width="20"
        format="webp"
        class="w-6 h-6 rounded-full"
      />

      <p v-if="comment.users" class="text-xs font-medium">
        @{{ comment.users.username }}
      </p>
    </div>

    <p>
      {{ comment.text }}
    </p>
  </div>
</template>
