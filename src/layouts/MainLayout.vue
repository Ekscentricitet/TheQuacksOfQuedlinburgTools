<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>

      <q-toolbar>

        <q-btn dense flat round icon="menu" @click="toggleDrawer" />

        <q-toolbar-title>
          The Quacks Of Quedlinburg Tools
        </q-toolbar-title>

      </q-toolbar>

    </q-header>

    <q-drawer v-model="drawerOpen">
      <q-list>
        <q-item clickable v-for="item in drawerItems" :key="item.id" @click="navigateToPage(item.route)">
          <q-item-section>{{ item.name }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const drawerOpen = ref(false);
const router = useRouter();

onMounted(() => {
  router.push('/game-mode')
})

const drawerItems = [
  { id: 1, name: 'Game Mode', route: '/game-mode' },
  { id: 2, name: 'Free Mode', route: '/free-mode' },
];

const navigateToPage = (route: string) => {
  router.push(route);
};

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};
</script>
