<template>
  <div class="column items-center">
    <div class="text-subtitle1 q-ma-sm">
      {{ roundText }}
      <SpecialActionsDrawer v-if="game.isDrawPhase"></SpecialActionsDrawer>
    </div>
    <q-btn color="primary" @click="confirmAdvancement">{{
      phaseButtonText
    }}</q-btn>
    <ShopComponent v-if="game.isBuyPhase" />
    <ShopComponent v-if="game.isCardPhase" :limit-buying="false" />
    <DrawComponent v-if="game.isDrawPhase" :is-reset-allowed="false" />
    <MultipleView v-if="game.isCardPhase" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ShopComponent from "src/components/ShopComponent.vue";
import { useQuasar } from "quasar";
import { useGameStore } from "src/stores/gameStore";
import { usePlayerStore } from "src/stores/playerStore";
import SpecialActionsDrawer from "src/components/specialActions/SpecialActionsDrawer.vue";
import DrawComponent from "src/components/DrawComponent.vue";
import MultipleView from "src/components/specialActions/MultipleView.vue";
import GameData from "src/managers/gameData";

const $q = useQuasar();

const game = useGameStore();
const player = usePlayerStore();

function confirmAdvancement() {
  $q.dialog({
    title: "Confirm advancement",
    message: "Please make sure you are done with the current phase.",
    ok: {
      label: "I am done!",
      color: "negative",
    },
    cancel: {
      label: "Let me think...",
      color: "primary",
    },
  }).onOk(() => {
    changeRound();
  });
}

function changeRound() {
  if (game.round == GameData.lastRound) return;
  game.advanceState();

  if (game.isCardPhase) {
    game.round++;
    if (game.round == GameData.addOneWhiteRound) player.bag.addOneWhite();
  }
}

const phaseButtonText = computed(() => {
  if (game.isBuyPhase) return "Resolve the die and cards";
  if (game.isCardPhase) return "Draw Phase";
  return "Buy chips";
});

const roundText = computed(() => {
  if (game.isBuyPhase) return "Buy up to two chips from different colors.";
  if (game.isCardPhase) return "Resolve cards and die effects";
  return "Round: " + game.round;
});
</script>

<style></style>
