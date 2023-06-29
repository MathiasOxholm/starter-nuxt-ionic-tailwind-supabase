<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  alias: ['/profile'],
})

const router = useRouter()

const { auth } = useSupabaseAuthClient()
const { data, error } = await auth.getUser()
if (error) alert('Error ' + error.message)

const doUserLogout = () => {
  auth.signOut()
  router.replace('/login')
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Profile</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <button
        class="bg-green-500 py-2 px-4 rounded-md"
        @click="doUserLogout">
        LOGOUT USER
      </button>
      <p>
        {{ data?.user?.email }}
      </p>
    </IonContent>
  </IonPage>
</template>
