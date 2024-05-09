<template>
  <div class="column items-center">
    <ChipsDisplay v-model="player.bag as Bag"></ChipsDisplay>
    <DrawComponent v-model="player.bag as Bag"></DrawComponent>
  </div>
</template>

<script setup lang="ts">
import DrawComponent from 'components/DrawComponent.vue'
import { ref, onMounted } from 'vue';
import Player from 'src/components/models/player';
import ChipsDisplay from 'src/components/ChipsDisplay.vue';
import Bag from 'src/components/models/bag';

const player = ref<Player>(new Player);

onMounted(() => {
  player.value = new Player();
});

</script>

<style></style>
