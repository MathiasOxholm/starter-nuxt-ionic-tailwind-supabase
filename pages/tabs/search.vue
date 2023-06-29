<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  alias: ['/search'],
})
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Search</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <IonSearchbar
        placeholder="Search"
        show-clear-button="focus" />
    </IonContent>
  </IonPage>
</template>
