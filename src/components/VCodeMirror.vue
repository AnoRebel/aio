<script>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { basicSetup } from "@codemirror/basic-setup";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState, StateField, StateEffect, Compartment } from "@codemirror/state";
import { indentOnInput, language } from "@codemirror/language";
// import { languages } from "@codemirror/language-data";
import { showPanel } from "@codemirror/panel";
import { indentWithTab } from "@codemirror/commands";
import { RangeSet } from "@codemirror/rangeset";
import { gutter, GutterMarker } from "@codemirror/gutter";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { findIndex } from "lodash-es";

import { themeOptions, languageOptions } from "@/assets/js/options";
import { filenamePanel, wordCountPanel } from "@/utils";

export default {
  name: "VCodeMirror",
  props: {
    initialDoc: {
      type: String,
      required: true,
    },
    onChange: {
      type: Function,
    },
  },
  setup(props) {
    const cmRef = ref(null);
    const cm = ref(null);
    let languageConf = new Compartment(),
      tabSize = new Compartment(),
      themeConf = new Compartment();

    const wordCounter = () => showPanel.of(wordCountPanel);
    const filename = () => showPanel.of(filenamePanel);

    onMounted(() => {
      cm.value = new EditorView({
        parent: cmRef.value,
        state: initialState,
      });
    });

    const emptyMarker = new (class extends GutterMarker {
      toDOM() {
        return document.createTextNode("ø");
      }
    })();

    const breakpointMarker = new (class extends GutterMarker {
      toDOM() {
        return document.createTextNode("💔");
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

    const initialState = EditorState.create({
      doc: props.initialDoc,
      extensions: [
        basicSetup,
        EditorView.theme({
          ".cm-scroller": { minHeight: "80vh" },
        }),
        tabSize.of(EditorState.tabSize.of(4)),
        languageConf.of(javascript()),
        themeConf.of(oneDark),
        indentOnInput(),
        keymap.of([indentWithTab]),
        EditorView.lineWrapping,
        EditorView.updateListener.of(update => {
          if (update.changes) {
            props.onChange && props.onChange(update.state);
          }
        }),
        filename(),
        wordCounter(),
        breakpointGutter,
        emptyLineGutter,
      ],
    });

    const setTheme = ev => {
      let el = ev.target;
      let index = findIndex(themeOptions, o => o.label == el.options[el.selectedIndex].value);
      let theme = themeOptions[index].value;

      cm.value.dispatch({
        effects: themeConf.reconfigure(theme),
      });
    };

    const setLanguage = ev => {
      let el = ev.target;
      let index = findIndex(languageOptions, o => o.label == el.options[el.selectedIndex].value);
      let language = languageOptions[index].value;

      cm.value.dispatch({
        effects: languageConf.reconfigure(typeof language == "object" ? language : language()),
      });
    };

    onBeforeUnmount(() => {
      cm.value.destroy();
    });

    return { cmRef, setTheme, setLanguage, themeOptions, languageOptions };
  },
};
</script>

<template>
  <div class="flex justify-between">
    <select class="bg-gray-900 text-white px-4 py-1 rounded-sm" @change="setTheme">
      <option class="p-1 text-base" value="One Dark">One Dark</option>
      <option
        class="p-1 text-base"
        v-for="theme in themeOptions"
        :value="theme.label"
        :key="theme.label"
      >
        {{ theme.label }}
      </option>
    </select>
    <select class="bg-gray-900 text-white px-4 py-1 rounded-sm" @change="setLanguage">
      <option class="p-1 text-base" value="Javascript/TypeScript">Javascript/TypeScript</option>
      <option
        class="p-1 text-base"
        v-for="lang in languageOptions"
        :value="lang.label"
        :key="lang.label"
      >
        {{ lang.label }}
      </option>
    </select>
  </div>

  <div ref="cmRef" />
</template>

<style lang="scss">
// .cm-scroller {
//   // @apply rounded;
//   min-height: 40vh;
// }
</style>
