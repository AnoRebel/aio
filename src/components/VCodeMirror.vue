<template>
  <div ref="cmRef" />
</template>

<script>
import { ref, onBeforeUnmount } from "vue";
import { EditorView } from "@codemirror/view";
import { EditorState, keymap } from "@codemirror/state";
import { indentOnInput } from "@codemirror/language";
import { defaultKeymap } from "@codemirror/commands";
import { history, historyKeymap } from "@codemirror/history";
import {} from "@codemirror/lint";
import {} from "@codemirror/comment";
import {} from "@codemirror/legacy-modes";
import { lineNumbers, highlightActiveLineGutter } from "@codemirror/gutter";
import { bracketMatching } from "@codemirror/matchbrackets";
import { defaultHighlightStyle } from "@codemirror/highlight";
import { languages } from "@codemirror/language-data";
import { Panel, ShowPanel } from "@codemirror/panel";

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

    const wordCounter = () => showPanel.of(wordCountPanel());

    const initialState = EditorState.create({
      doc: props.initialDoc,
      extensions: [
        keymap.of([...defaultKeymap, ...historyKeymap]),
        lineNumbers(),
        history(),
        indentOnInput(),
        bracketMatching(),
        defaultHighlightStyle.fallback,
        highlightActiveLineGutter(),
        EditorView.lineWrapping,
        EditorView.updateListener.of(update => {
          if (update.changes) {
            onChange && onChange(update.state);
          }
        }),
      ],
    });

    const cm = ref(
      new EditorView({
        parent: cmRef.value,
        state: initialState,
      })
    );

    onBeforeUnmount(() => {});

    return { cmRef };
  },
};
</script>
