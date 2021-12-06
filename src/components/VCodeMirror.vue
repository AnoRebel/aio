<script>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { basicSetup } from "@codemirror/basic-setup";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { indentOnInput } from "@codemirror/language";
// import {} from "@codemirror/legacy-modes";
import { language } from "@codemirror/language";
import { languages } from "@codemirror/language-data";
import { showPanel } from "@codemirror/panel";
import { indentWithTab } from "@codemirror/commands";
import { gutter, GutterMarker } from "@codemirror/gutter";

import { wordCountPanel } from "@/utils";

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

    const wordCounter = () => showPanel.of(wordCountPanel);

    const initialState = EditorState.create({
      doc: props.initialDoc,
      extensions: [
        basicSetup,
        indentOnInput(),
        EditorView.lineWrapping,
        EditorView.updateListener.of(update => {
          if (update.changes) {
            props.onChange && props.onChange(update.state);
          }
        }),
        wordCounter(),
      ],
    });

    onMounted(() => {
      cm.value = ref(
        new EditorView({
          parent: cmRef.value,
          state: initialState,
        })
      );
    });

    onBeforeUnmount(() => {});

    return { cmRef };
  },
};
</script>

<template>
  <div ref="cmRef" />
</template>
