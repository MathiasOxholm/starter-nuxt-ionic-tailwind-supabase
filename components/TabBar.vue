<script setup lang="ts"></script>

<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet />
      <IonTabBar slot="bottom">
        <IonTabButton
          href="/home"
          tab="index">
          <IonIcon :icon="ioniconsImage" />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="about"
          href="/about">
          <IonIcon :icon="ioniconsImage" />
          <IonLabel>About</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>
