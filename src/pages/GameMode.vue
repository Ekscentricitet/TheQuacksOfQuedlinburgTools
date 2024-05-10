<template>
  <div class="column items-center">
    <div class="text-subtitle1 q-ma-sm">Round: {{ round }}</div>
    <div></div>
    <q-btn color="primary" @click="confirmAdvancement">{{
      phaseButtonText
    }}</q-btn>
    <ShopComponent v-if="isBuyPhase" :round="round" v-model="player as unknown as Player" />
    <ShopComponent v-if="isCardPhase" :limit-buying="false" :round="round" v-model="player as unknown as Player" />
    <DrawComponent v-if="isDrawPhase" v-model="player as unknown as Player" :is-reset-allowed="false">
    </DrawComponent>
  </div>
</template>

<script setup lang="ts">
import DrawComponent from "components/DrawComponent.vue";
import { ref, onMounted, computed } from "vue";
import Player from "src/components/managers/player";
import GameData from "src/components/managers/gameData";
import ShopComponent from "src/components/ShopComponent.vue";
import { useQuasar } from "quasar";

const player = ref<Player>(new Player());
const round = ref(0);
const isBuyPhase = ref(false);
const isCardPhase = ref(false);
const isDrawPhase = ref(true);
const $q = useQuasar();

onMounted(() => {
  round.value++;
});

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
  if (round.value == GameData.lastRound) return;

  if (isBuyPhase.value) {
    isBuyPhase.value = false;
    isCardPhase.value = true;
  } else if (isCardPhase.value) {
    isCardPhase.value = false;
    isDrawPhase.value = true;
  } else {
    isDrawPhase.value = false;
    isBuyPhase.value = true;
  }

  if (isCardPhase.value) {
    round.value++;
    if (round.value == GameData.addOneWhiteRound)
      player.value.bag.addOneWhite();
  }
}

const phaseButtonText = computed(() => {
  if (isBuyPhase.value) return "Resolve the die and cards";
  if (isCardPhase.value) return "Draw Phase";
  return "Buy chips";
});
</script>

<style></style>
