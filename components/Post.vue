<script setup lang="ts">
import { User, UserComment, UserRating } from '@/types/index.d'

const props = defineProps<{
  id: number | string
  title: string
  image?: string | null
  hashtags?: string[]
  users: User
  eagerLoadImage: boolean
  comments?: UserComment[]
  ratings?: UserRating[]
  video?: string | null
  single?: boolean
  showDots?: boolean
}>()

const hashTagString = computed(() => {
  if (props.hashtags) {
    return props.hashtags.join(' ')
  }
  return ''
})

const imageLoadingMethod = computed(() => {
  if (props.eagerLoadImage) {
    return 'eager'
  }
  return 'lazy'
})

const videoPlayer = ref<HTMLVideoElement>()
const { playing, currentTime, duration } = useMediaControls(videoPlayer)

const togglePlay = () => {
  if (!videoPlayer.value) return

  if (playing.value) {
    videoPlayer.value.pause()
  } else {
    videoPlayer.value.play()
  }
}

const onRangeChange = (event: CustomEvent) => {
  console.log(event.detail.value)
  useRating(event.detail.value, props.id)
}
</script>

<template>
  <article
    :id="`post-${id}`"
    class="relative overflow-hidden">
    <div>
      <div class="container relative z-10 pb-4">
        <div class="flex flex-col">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <NuxtImg
                v-if="users"
                :loading="imageLoadingMethod"
                :src="users.avatar"
                :alt="users.username"
                height="20"
                width="20"
                format="webp"
                class="w-6 h-6 rounded-full" />

              <p
                v-if="users"
                class="text-xs font-medium">
                @{{ users.username }}
              </p>
            </div>

            <ul class="flex items-center gap-3">
              <li>
                <IonIcon
                  v-if="showDots"
                  :icon="ioniconsEllipsisHorizontal"
                  class="w-6 h-6 opacity-50" />
              </li>
            </ul>
          </div>

          <h2 class="my-0 text-lg">
            <RouterLink
              :to="`/post/${id}`"
              class="text-white">
              {{ title }}
            </RouterLink>
            <strong v-if="hashtags">{{ hashTagString }}</strong>
          </h2>
        </div>
      </div>
    </div>

    <figure class="relative rounded-xl overflow-hidden">
      <NuxtImg
        v-if="image"
        :src="image"
        :alt="title"
        :loading="imageLoadingMethod"
        format="webp"
        quality="80"
        class="object-cover w-full h-full pointer-events-none user-select-none max-screen min-h-[390px]"
        placeholder
        sizes="sm:100vw md:50vw lg:576px" />

      <div
        v-if="video && !image"
        class="relative">
        <video
          ref="videoPlayer"
          :src="video"
          class="min-h-[390px] object-cover relative flex"
          autoplay
          loop
          muted
          loading="lazy"
          preload="metadata"
          @click="togglePlay()" />
      </div>

      <div class="absolute bottom-0 w-full opacity-25 pointer-events-none h-1/2 bg-gradient-to-t from-black/100 to-black/0" />

      <div class="container px-4 absolute bottom-0 z-50 flex flex-col items-end pb-6 pointer-events-none">
        <FunctionBar
          :comments="comments"
          :ratings="ratings"
          :id="id" />
      </div>
    </figure>

    <div class="flex-1 w-full">
      <IonRange
        aria-label="Range"
        :ticks="true"
        :snaps="true"
        :min="1"
        :max="10"
        :pin="true"
        @ionChange="onRangeChange">
        <div slot="start">1</div>
        <div slot="end">10</div>
      </IonRange>
    </div>
  </article>
</template>
