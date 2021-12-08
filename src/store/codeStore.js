import { defineStore, acceptHMRUpdate } from "pinia";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
const useCodeStore = defineStore("code", {
  state: () => ({
    data: "",
    filename: "Untitled",
    theme: "One Dark",
    language: "Javascript/TypeScript",
  }),
  actions: {
    setTheme(theme) {
      this.theme = theme;
    },
    setLanguage(language) {
      this.language = language;
    },
    setFilename(name) {
      this.filename = name;
    },
  },
  getters: {
    getCode: state => state.data,
    getTheme: state => state.theme,
    getLanguage: state => state.language,
    getFilename: state => state.filename,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCodeStore, import.meta.hot));
}

export default useCodeStore;
