<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  alias: ['/new-post'],
})

useHead({
  title: 'Add new post',
  meta: [
    {
      name: 'description',
      content: 'Add new post',
    },
  ],
})

// Supabase
const client = useSupabaseClient()
const user = useSupabaseUser()

// Refs
const title = ref<string>('')
const file = ref<File>()
const filePublicUrl = ref<string>('')

const onFileChange = (fileChangeEvent: any) => {
  const photo = fileChangeEvent.target.files[0]
  file.value = photo
}

// Upload file to storage
const uploadFile = async (id: number) => {
  if (!file.value) return

  const { error } = await client.storage.from('blob').upload(`users/images/${file.value.name}-${id}`, file.value)

  if (error) {
    console.error(error)
    return
  }
}

// Get file public url
const getFileUrl = (id: number) => {
  if (!file.value) return

  const { data } = client.storage.from('blob').getPublicUrl(`users/images/${file.value.name}-${id}`)

  filePublicUrl.value = data.publicUrl
}

// Create post in Supabase
const createPost = async () => {
  if (!filePublicUrl.value) return
  if (!user.value) return

  const { data, error } = await client
    .from('posts')
    .insert({
      title: title.value,
      image: filePublicUrl.value,
      user_id: user.value.id,
    })
    .select()
    .single()

  if (error) {
    console.error(error)
    return
  }

  console.log('Post created successfully', data)
  navigateTo(`/post/${data.id}`)
}

// Handle form submit
const handleSubmit = async () => {
  const date = new Date().getTime()

  if (!title.value) {
    console.error('Title is required')
    useToast('top', 'Title is required')
    return
  }

  if (!file.value) {
    console.error('File is required')
    useToast('top', 'Image is required')
    return
  }

  try {
    console.log('Uploading file...')
    await uploadFile(date)
  } catch (error) {
    console.error(error)
  }

  try {
    console.log('Getting file url...')
    getFileUrl(date)
  } catch (error) {
    console.error(error)
  }

  try {
    console.log('Creating post...')
    await createPost()
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton> </IonBackButton>
        </IonButtons>
        <IonTitle>Create new post</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <form
        @submit.prevent="handleSubmit"
        class="h-full flex flex-col justify-between"
        method="post"
        enctype="multipart/form-data">
        <IonList class="grid gap-4 bg-transparent">
          <IonItem>
            <IonInput
              label="Enter title"
              labelPlacement="floating"
              type="text"
              v-model="title" />
          </IonItem>

          <IonItem>
            <input
              type="file"
              name="photo"
              @change="onFileChange" />
          </IonItem>
        </IonList>

        <IonButton
          type="submit"
          expand="full"
          class="mt-8"
          >Submit
        </IonButton>
      </form>
    </IonContent>
  </IonPage>
</template>
