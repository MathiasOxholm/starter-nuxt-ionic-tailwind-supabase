<script setup lang="ts">
useHead({
  title: 'Nuxt Ionic',
})
</script>

<template>
  <IonPage>
    <IonContent>
      <IonTabs>
        <IonRouterOutlet />

        <IonTabBar slot="bottom">
          <IonTabButton
            tab="home"
            href="/tabs/home">
            <IonIcon :icon="ioniconsHomeOutline" />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton
            tab="search"
            href="/tabs/search">
            <IonIcon :icon="ioniconsSearchOutline" />
            <IonLabel>Search</IonLabel>
          </IonTabButton>

          <IonTabButton
            tab="profile"
            href="/tabs/profile">
            <IonIcon :icon="ioniconsPersonOutline" />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonContent>
  </IonPage>
</template>
