<template>
  <ChipsDisplay v-model="player.bag.chips as ChipQuantity[]"></ChipsDisplay>
  <DrawComponent v-model="player.bag.chips as ChipQuantity[]"></DrawComponent>
</template>

<script setup lang="ts">
import DrawComponent from 'components/DrawComponent.vue'
import { ref, onMounted } from 'vue';
import Player from 'src/components/models/player';
import ChipsDisplay from 'src/components/ChipsDisplay.vue';
import ChipQuantity from 'src/components/models/Chip/chipQuantity';

const player = ref<Player>(new Player);

onMounted(() => {
  player.value = new Player();
});

</script>

<style></style>
