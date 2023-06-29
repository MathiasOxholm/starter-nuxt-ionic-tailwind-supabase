<script setup lang="ts">
definePageMeta({
  alias: ['/index', '/', '/home'],
  middleware: ['auth'],
})

const client = useSupabaseClient()
const supaPosts = ref<any[]>([])
const rangeStart = ref<number>(0)
const rangeEnd = ref<number>(1)
const noMorePosts = ref<boolean>(false)
const amountOfPosts = ref<number>(0)
const incrementBy = ref<number>(2)

const incrementRange = () => {
  rangeStart.value += incrementBy.value

  if (rangeEnd.value + incrementBy.value >= amountOfPosts.value) {
    rangeEnd.value = amountOfPosts.value
    noMorePosts.value = true
  } else {
    rangeEnd.value += incrementBy.value
  }
}

const countPosts = async () => {
  const { count, error } = await client.from('posts').select('*', { count: 'exact', head: true })

  if (error) {
    console.error('Error counting posts: ', error)
    return
  }

  if (count) {
    amountOfPosts.value = count
  }
}

const getPosts = async () => {
  const { data, error } = await client
    .from('posts')
    .select(
      `
      *, 
      comments (id), 
      ratings (post, rating), 
      users (
        username, 
        avatar
      )
    `
    )
    .range(rangeStart.value, rangeEnd.value)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error getting posts: ', error)
  }

  if (data) {
    data.map((post: any) => {
      supaPosts.value.push(post)
    })
  } else {
    console.error('No data returned from getPosts')
    noMorePosts.value = true
  }
}

const ionInfinite = async (ev: any) => {
  incrementRange()

  await getPosts()
  ev.target.complete()
}

onMounted(async () => {
  await countPosts()
  await getPosts()
})
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Rate My</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <div class="grid gap-10">
        <Post
          v-for="(post, index) in supaPosts"
          :key="`post-${index}`"
          v-bind="post"
          :show-dots="true"
          :eagerLoadImage="index === 0" />
      </div>

      <IonInfiniteScroll
        v-if="!noMorePosts"
        @ionInfinite="ionInfinite">
        <IonInfiniteScrollContent> </IonInfiniteScrollContent>
      </IonInfiniteScroll>

      <p
        class="text-center opacity-50 py-10"
        v-else>
        No more posts, check back later!
      </p>
    </IonContent>

    <IonFab
      vertical="bottom"
      horizontal="end"
      slot="fixed"
      router-link="/new-post">
      <ion-fab-button>
        <ion-icon :icon="ioniconsAddOutline" />
      </ion-fab-button>
    </IonFab>
  </IonPage>
</template>
