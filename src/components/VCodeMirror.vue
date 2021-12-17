<script>
import { onMounted, ref, reactive, computed, onBeforeUnmount } from "vue";
import { basicSetup } from "@codemirror/basic-setup";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState, StateField, StateEffect, Compartment } from "@codemirror/state";
import { indentOnInput, language } from "@codemirror/language";
import { showPanel } from "@codemirror/panel";
import { indentWithTab } from "@codemirror/commands";
import { RangeSet } from "@codemirror/rangeset";
import { gutter, GutterMarker } from "@codemirror/gutter";
import VueSelect from "vue-select";
import { findIndex } from "lodash-es";

import { themeOptions, languageOptions } from "@/assets/js/options";
import { countWords } from "@/utils";
import { useCodeStore } from "@/store";
import { BaseCenterModal, BaseTopModal } from "@/components";

export default {
  name: "VCodeMirror",
  components: { VueSelect, BaseCenterModal, BaseTopModal },
  props: {
    initialDoc: {
      type: String,
      required: true,
    },
    onChange: {
      type: Function,
      required: true,
    },
    height: {
      type: String,
      default: "80vh",
    },
  },
  setup(props) {
    const cmRef = ref(null);
    const cm = ref(null);
    const codeStore = useCodeStore();
    const code = reactive({
      data: "",
      theme: computed({
        get: () => codeStore.getTheme,
        set: val => setTheme(val),
      }),
      language: computed({
        get: () => codeStore.getLanguage,
        set: val => setLanguage(val),
      }),
      tabSize: computed({
        get: () => codeStore.getTabsize,
        set: val => setTabsize(val),
      }),
      filename: computed({
        get: () => codeStore.getFilename,
        set: val => setFilename(val),
      }),
    });
    const modals = reactive({
      name: false,
      tabs: false,
      language: false,
      theme: false,
    });

    onMounted(() => {
      cm.value = new EditorView({
        parent: cmRef.value,
        state: initialState,
      });
    });

    const bottomPanelMaker = view => {
      let dom = document.createElement("div");
      // Flex divs
      let ldiv = document.createElement("div");
      let rdiv = document.createElement("div");
      // Language element
      let lng = document.createElement("div");
      // Word Count element
      let wc = document.createElement("div");
      // Theme element
      let tm = document.createElement("div");
      // Tab Size element
      let tab = document.createElement("div");
      // Adding classes
      ldiv.classList.add("flex", "flex-row", "flex-shrink-0");
      rdiv.classList.add("flex", "flex-row", "flex-shrink-0");
      dom.classList.add("flex", "flex-row", "justify-between", "items-center");
      wc.classList.add("text-sm", "p-1", "cursor-default");
      lng.classList.add("text-sm", "cursor-pointer", "hover:bg-gray-500", "p-1");
      tab.classList.add("text-sm", "cursor-pointer", "hover:bg-gray-500", "p-1", "mx-2");
      tm.classList.add("text-sm", "cursor-pointer", "hover:bg-gray-500", "p-1", "mx-2");
      // Adding content
      wc.textContent = countWords(view.state.doc);
      tab.textContent = `Spaces: ${view.state.tabSize}`;
      lng.textContent = code.language;
      tm.textContent = code.theme;
      // Adding Event listeners
      tab.onclick = () => (modals.tabs = true);
      tm.onclick = () => (modals.theme = true);
      lng.onclick = () => (modals.language = true);
      // Appending to DOM
      ldiv.appendChild(wc);
      ldiv.appendChild(tab);
      rdiv.appendChild(tm);
      rdiv.appendChild(lng);
      dom.appendChild(ldiv);
      dom.appendChild(rdiv);
      return {
        dom,
        update(update) {
          if (update.docChanged) {
            wc.textContent = countWords(update.state.doc);
            tab.textContent = `Spaces: ${update.state.tabSize}`;
            lng.textContent = code.language;
            tm.textContent = code.theme;
          }
        },
      };
    };

    const topPanelMaker = view => {
      let dom = document.createElement("div");
      dom.classList.add(
        "text-sm",
        "italic",
        "px-2",
        "py-1",
        "cursor-pointer",
        "bg-gray-900",
        "w-30"
      );
      dom.textContent = code.filename;
      dom.onclick = () => (modals.name = true);
      return {
        top: true,
        dom,
        update(update) {
          if (update.docChanged) dom.textContent = code.filename;
        },
      };
    };

    const topPanel = () => showPanel.of(topPanelMaker);
    const bottomPanel = () => showPanel.of(bottomPanelMaker);

    const emptyMarker = new (class extends GutterMarker {
      toDOM() {
        return document.createTextNode("ø");
      }
    })();

    const breakpointMarker = new (class extends GutterMarker {
      toDOM() {
        // return document.createTextNode("💔");
        // return document.createTextNode("★");
        return document.createTextNode("●");
      }
    })();

    const emptyLineGutter = gutter({
      lineMarker(view, line) {
        return line.from == line.to ? emptyMarker : null;
      },
      initialSpacer: () => emptyMarker,
    });

    const breakpointEffect = StateEffect.define({
      map: (val, mapping) => ({ pos: mapping.mapPos(val.pos), on: val.on }),
    });

    const breakpointState = StateField.define({
      create() {
        return RangeSet.empty;
      },
      update(set, transaction) {
        set = set.map(transaction.changes);
        for (let e of transaction.effects) {
          if (e.is(breakpointEffect)) {
            if (e.value.on) set = set.update({ add: [breakpointMarker.range(e.value.pos)] });
            else set = set.update({ filter: from => from != e.value.pos });
          }
        }
        return set;
      },
    });

    const toggleBreakpoint = (view, pos) => {
      let breakpoints = view.state.field(breakpointState);
      let hasBreakpoint = false;
      breakpoints.between(pos, pos, () => {
        hasBreakpoint = true;
      });
      view.dispatch({
        effects: breakpointEffect.of({ pos, on: !hasBreakpoint }),
      });
    };

    const breakpointGutter = [
      breakpointState,
      gutter({
        class: "cm-breakpoint-gutter",
        markers: v => v.state.field(breakpointState),
        initialSpacer: () => breakpointMarker,
        domEventHandlers: {
          mousedown(view, line) {
            toggleBreakpoint(view, line.from);
            return true;
          },
        },
      }),
      EditorView.baseTheme({
        ".cm-breakpoint-gutter .cm-gutterElement": {
          color: "red",
          paddingLeft: "0.5rem",
          cursor: "pointer",
        },
      }),
    ];

    let languageConf = new Compartment(),
      tabSize = new Compartment(),
      themeConf = new Compartment(),
      initTheme = themeOptions[findIndex(themeOptions, o => o.label == codeStore.getTheme)].value,
      initLanguage =
        typeof languageOptions[findIndex(languageOptions, o => o.label == codeStore.getLanguage)]
          .value == "object"
          ? languageOptions[findIndex(languageOptions, o => o.label == codeStore.getLanguage)].value
          : languageOptions[
              findIndex(languageOptions, o => o.label == codeStore.getLanguage)
            ].value();
    const initialState = EditorState.create({
      doc: props.initialDoc,
      extensions: [
        basicSetup,
        EditorView.theme({
          ".cm-scroller": { minHeight: props.height },
        }),
        tabSize.of(EditorState.tabSize.of(4)),
        languageConf.of(initLanguage),
        themeConf.of(initTheme),
        indentOnInput(),
        keymap.of([indentWithTab]),
        EditorView.lineWrapping,
        breakpointGutter,
        emptyLineGutter,
        topPanel(),
        bottomPanel(),
        EditorView.updateListener.of(update => {
          if (update.changes) {
            props.onChange && props.onChange(update.state);
            codeStore.setCode(update.state.doc.text);
          }
        }),
      ],
    });

    const setTheme = label => {
      let index = findIndex(themeOptions, o => o.label == label);
      let theme = themeOptions[index].value;
      codeStore.setTheme(label);

      cm.value.dispatch({
        effects: themeConf.reconfigure(theme),
      });
    };

    const setLanguage = label => {
      let index = findIndex(languageOptions, o => o.label == label);
      let language = languageOptions[index].value;
      codeStore.setLanguage(label);

      cm.value.dispatch({
        effects: languageConf.reconfigure(typeof language == "object" ? language : language()),
      });
    };

    const setTabsize = size => {
      cm.value.dispatch({
        effects: tabSize.reconfigure(EditorState.tabSize.of(size)),
      });
      codeStore.setTabsize(size);
    };

    const setFilename = name => {
      codeStore.setFilename(name);
    };

    const log = ev => console.log(ev);

    // watch(code, (newCode, oldCode) => {
    //   // if (newCode.data != oldCode.data) {
    //   //   cm.value.dispatch({
    //   //     changes: { from: 0, to: cm.value.state.doc.length, insert: newCode.data },
    //   //   });
    //   // };
    // });

    onBeforeUnmount(() => {
      cm.value.destroy();
    });

    return { cmRef, setTheme, setLanguage, themeOptions, languageOptions, code, modals };
  },
};
</script>

<template>
  <!-- <div class="flex justify-between">
    <VueSelect
      v-model="code.language"
      :options="languageOptions"
      :reduce="lang => lang.label"
      :getOptionKey="lang => lang.label"
    />
    <VueSelect
      v-model="code.theme"
      :options="themeOptions"
      :reduce="theme => theme.label"
      :getOptionKey="theme => theme.label"
    />
  </div> -->

  <div ref="cmRef" />
  <div v-if="modals.name">
    <BaseTopModal @close="modals.name = false">
      <form class="flex flex-col items-start" @submit.prevent="modals.name = false">
        <label for="filename" class="text-sm text-white">Filename:</label>
        <input
          v-model="code.filename"
          class="form-control rounded p-1"
          type="text"
          name="filename"
        />
      </form>
    </BaseTopModal>
  </div>
  <div v-if="modals.tabs">
    <BaseTopModal @close="modals.tabs = false">
      <form class="flex flex-col items-start" @submit.prevent="modals.tabs = false">
        <label for="tab" class="text-sm text-white">Tab Size:</label>
        <input
          v-model="code.tabSize"
          class="form-control rounded px-2 py-1"
          type="number"
          name="tab"
        />
      </form>
    </BaseTopModal>
  </div>
  <div v-if="modals.theme">
    <BaseTopModal @close="modals.theme = false">
      <VueSelect
        v-model="code.theme"
        :options="themeOptions"
        :reduce="theme => theme.label"
        :getOptionKey="theme => theme.label"
      />
    </BaseTopModal>
  </div>
  <div v-if="modals.language">
    <BaseTopModal @close="modals.language = false">
      <VueSelect
        v-model="code.language"
        :options="languageOptions"
        :reduce="lang => lang.label"
        :getOptionKey="lang => lang.label"
      />
    </BaseTopModal>
  </div>
</template>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
// .cm-scroller {
//   // @apply rounded;
//   min-height: 40vh;
// }
.vs__search {
  @apply py-1 px-2 bg-transparent border-none !important;
}
.vs__dropdown-toggle {
  @apply min-w-[12rem];
}

.vs__search::placeholder,
.vs__dropdown-toggle,
.vs__dropdown-menu {
  background: #dfe5fb;
  border: none;
  color: #394066;
  text-transform: lowercase;
  font-variant: small-caps;
}
.vs__open-indicator {
  @apply cursor-pointer;
}
.vs__clear,
.vs__open-indicator {
  fill: #394066;
}
</style>
