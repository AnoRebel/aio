import { defineStore, acceptHMRUpdate } from "pinia";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
const useCodeStore = defineStore("code", {
  state: () => ({
    data: "",
    filename: "Untitled",
    theme: "One Dark",
    tabSize: 4,
    language: "Javascript/TypeScript",
  }),
  actions: {
    setCode(code) {
        this.data = code;
    },
    setTheme(theme) {
      this.theme = theme;
    },
    setLanguage(language) {
      this.language = language;
    },
    setFilename(name) {
      this.filename = name;
    },
    setTabsize(size) {
        this.tabSize = size
    },
  },
  getters: {
    getCode: state => state.data,
    getTheme: state => state.theme,
    getLanguage: state => state.language,
    getTabsize: state => state.tabSize,
    getFilename: state => state.filename,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCodeStore, import.meta.hot));
}

export default useCodeStore;
