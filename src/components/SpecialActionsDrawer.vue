<template>
  <q-btn flat @click="drawerOpen = !drawerOpen" round dense icon="mdi-lightning-bolt" />

  <q-dialog v-model="drawerOpen" position="top">
    <q-card>

      <q-list>
        <template v-for="item in drawerItems" :key="item.id">
          <q-item clickable @click="item.function">
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>{{ item.name }}</q-item-section>
          </q-item>
          <q-separator />
        </template>
      </q-list>

    </q-card>
  </q-dialog>

  <DrawAndPick v-if="drawAndPick" v-model="drawAndPick" :quantity="5" :player="player"></DrawAndPick>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import Player from "./managers/player";
import DrawAndPick from "./DrawAndPick.vue";

const player = defineModel({
  type: Object as PropType<Player>, required: true
});

const drawerOpen = ref(false);
const drawAndPick = ref(false);

const drawerItems = [
  { id: 1, name: "Remove Last Chip", icon: "mdi-undo", function: removeLastChip },
  { id: 2, name: "Reset", icon: "mdi-autorenew", function: reset },
  { id: 3, name: "Draw 5 and pick one", icon: "mdi-poker-chip", function: drawFivePickOne },
  { id: 4, name: "Cancel", icon: "mdi-cancel", function: closeDrawer },
];

function removeLastChip() {
  player.value.returnLastChipToBag();
  closeDrawer()
}

function reset() {
  player.value.prepareForNewPhase();
  closeDrawer()
}

function drawFivePickOne() {
  drawAndPick.value = true;
  closeDrawer()
}

function closeDrawer() {
  drawerOpen.value = false;
}
</script>
