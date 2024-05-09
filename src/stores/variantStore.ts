import { defineStore } from 'pinia';

export const useGameVariantStore = defineStore('gameVariant', {
  state: () => ({
    isVariantOne: false,
  }),
  actions: {
    toggle() {
      this.isVariantOne = !this.isVariantOne;
    },
  },
});
