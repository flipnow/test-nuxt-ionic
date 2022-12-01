<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 3</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 3</ion-title>
        </ion-toolbar>
      </ion-header>

      <IonInput placeholder="email" :value="email" type="email" @ion-input="email = $event.target.value" />
      <IonInput placeholder="password" :value="password" type="password" @ion-input="password = $event.target.value" />
      <IonButton @click="signIn(email, password)">Sign in</IonButton>
      <IonButton @click="signOut">Sign out</IonButton>

      <IonLabel>{{ user }}</IonLabel>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
const email = ref('');
const password = ref('');
const { user, signIn, signOut } = useAuth();
</script>
