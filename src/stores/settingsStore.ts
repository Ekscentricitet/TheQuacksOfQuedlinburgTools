import { defineStore } from 'pinia';

export const useSettingsStore = defineStore({
  id: 'settings',
  state: () => ({
    darkTheme: false,
  }),
  actions: {
    setTheme(isDark: boolean) {
      this.darkTheme = isDark;
      localStorage.setItem('darkTheme', JSON.stringify(isDark));
    },
    loadTheme() {
      this.darkTheme = JSON.parse(localStorage.getItem('darkTheme') ?? 'false');
    },
    toggleTheme() {
      this.setTheme(!this.darkTheme);
    },
  },
});
