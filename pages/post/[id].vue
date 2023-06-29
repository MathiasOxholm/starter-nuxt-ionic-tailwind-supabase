<script setup lang="ts">
// Composables
const client = useSupabaseClient()
const router = useRouter()

// Refs
const isDeleting = ref<boolean>(false)
const showToast = ref<boolean>(false)

// Computed
const postId = computed(() => router.currentRoute.value.params.id)

const { data: post } = await useAsyncData('post', async () => {
  const { data } = await client.from('posts').select('*, ratings (*), users (username, avatar)').eq('id', postId.value).single()
  return data
})

const { data: comments } = await useAsyncData('comments', async () => {
  const { data } = await client.from('comments').select('*, users (username, avatar)').eq('post', postId.value)
  return data
})

const actionSheetButtons = [
  {
    text: 'Delete',
    role: 'destructive',
    data: {
      action: 'delete',
    },
  },
  {
    text: 'Cancel',
    role: 'cancel',
    data: {
      action: 'cancel',
    },
  },
]

const deletePost = async () => {
  try {
    isDeleting.value = true
    const { error } = await client.from('posts').delete().eq('id', postId.value)
    if (error) throw error
  } catch (error) {
    console.error('Error deleting post: ', error)
    useToast('top', 'Error deleting post')
    isDeleting.value = false
    return
  } finally {
    isDeleting.value = false
    useToast('top', 'Post deleted')
  }
}

const handleCloseActionSheet = async (ev: CustomEvent) => {
  if (ev.detail.data.action === 'delete') {
    await deletePost()
    showToast.value = true
  }
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/home"></ion-back-button>
        </ion-buttons>

        <ion-buttons slot="end">
          <IonButton id="open-action-sheet">
            <IonIcon
              :icon="ioniconsEllipsisHorizontal"
              slot="icon-only" />
          </IonButton>
        </ion-buttons>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <Post
        v-bind="post"
        :eagerLoadImage="true"
        :show-dots="false" />

      <div
        id="comments"
        class="container py-6">
        <IonItem class="mb-6">
          <IonInput
            aria-label="Write a comment"
            type="text"
            name="text"
            placeholder="Write a comment..." />
        </IonItem>

        <ul
          v-if="post && comments && comments.length"
          class="grid gap-6">
          <li
            v-for="comment in comments"
            :key="comment.id">
            <Comment :comment="comment" />
          </li>
        </ul>

        <p
          v-else
          class="text-xs opacity-50">
          No comments yet
        </p>
      </div>
    </IonContent>

    <IonActionSheet
      trigger="open-action-sheet"
      header="Actions"
      :buttons="actionSheetButtons"
      @didDismiss="handleCloseActionSheet($event)" />
  </IonPage>
</template>
