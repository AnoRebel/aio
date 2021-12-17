import { Extension } from "@tiptap/vue-3";

export const customNewline = Extension.create({
  name: "newline",
  priority: 1000,
  addCommands() {
    return {
      addNewline:
        () =>
        ({ state, dispatch }) => {
          const { schema, tr } = state;
          const paragraph = schema.nodes.paragraph;

          //   console.log(tr.storedMarks);
          const transaction = tr
            .deleteSelection()
            .replaceSelectionWith(paragraph.create(), true)
            .scrollIntoView();
          if (dispatch) dispatch(transaction);
          return true;
        },
    };
  },
  addKeyboardShortcuts() {
    return {
      "Shift-Enter": () => this.editor.commands.addNewline(),
    };
  },
});
