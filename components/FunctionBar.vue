<script setup lang="ts">
import { UserComment, UserRating } from '@/types/index.d'

const props = defineProps<{
  ratings?: UserRating[]
  comments?: UserComment[]
  id: number | string
}>()

const averageRating = computed(() => {
  if (!props.ratings) return 0

  if (props.ratings.length > 0) {
    const total = props.ratings.reduce((acc, curr) => acc + curr.rating, 0)
    return Math.round(total / props.ratings.length)
  }

  return 0
})

const amountOfComments = computed(() => {
  if (props.comments) {
    return props.comments.length
  }

  return 0
})
</script>

<template>
  <div class="z-20 flex flex-col gap-6 pointer-events-auto">
    <RouterLink
      :to="`/post/${id}`"
      class="text-white">
      <IconText
        :icon="ioniconsStarOutline"
        :text="`${averageRating} / 10`" />
    </RouterLink>

    <RouterLink
      :to="`/post/${id}#comments`"
      class="text-white">
      <IconText
        :icon="ioniconsChatbubbleOutline"
        :text="amountOfComments" />
    </RouterLink>

    <IconText
      :icon="ioniconsShareOutline"
      text="Share" />
  </div>
</template>
