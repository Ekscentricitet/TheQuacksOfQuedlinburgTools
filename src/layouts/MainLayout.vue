<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleDrawer" />

        <q-toolbar-title> The Quacks Of Quedlinburg Tools </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerOpen">
      <q-list>
        <template v-for="item in drawerItems" :key="item.id">
          <q-item clickable :active="currentRoute == item.route" @click="navigateToPage(item.route)">
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>{{ item.name }}</q-item-section>
          </q-item>
          <q-separator />
        </template>
        <q-item>
          <VariantOneToggle></VariantOneToggle>
        </q-item>
        <q-item>
          <ThemeToggle></ThemeToggle>
        </q-item>
        <q-item>
          <q-btn @click="game.resetGame" label="Restore initial state" />
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import VariantOneToggle from "components/toggles/VariantOneToggle.vue";
import ThemeToggle from "components/toggles/ThemeToggle.vue";
import { useGameStore } from "src/stores/gameStore";

const drawerOpen = ref(false);
const router = useRouter();
const currentRoute = ref("/game-mode");
const game = useGameStore();

onMounted(() => {
  router.push("/game-mode");
});

const drawerItems = [
  { id: 1, name: "Game Mode", route: "/game-mode", icon: "mdi-pot-mix" },
  {
    id: 2,
    name: "Free Mode",
    route: "/free-mode",
    icon: "mdi-archive-lock-open-outline",
  },
];

const navigateToPage = (route: string) => {
  drawerOpen.value = false;
  currentRoute.value = route;
  router.push(route);
};

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};
</script>
