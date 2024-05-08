<template>
  <div class="column items-center">
    <ChipsDisplay v-model="player.bag.chips as ChipQuantity[]"></ChipsDisplay>
    <DrawComponent v-if="isDrawPhase" v-model="player.bag.chips as ChipQuantity[]"></DrawComponent>
  </div>
</template>

<script setup lang="ts">
import DrawComponent from 'components/DrawComponent.vue'
import { ref, onMounted } from 'vue';
import Player from 'src/components/models/player';
import ChipsDisplay from 'src/components/ChipsDisplay.vue';
import ChipQuantity from 'src/components/models/Chip/chipQuantity';

const player = ref<Player>(new Player);
const round = ref(0);
const isDrawPhase = ref(true);

onMounted(() => {
  player.value = new Player();
  round.value++;
});

</script>

<style></style>
