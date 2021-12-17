import { Extension } from "@tiptap/vue-3";

export const sendMessage = Extension.create({
  name: "sendMessage",
  addCommands() {
    return {
      sendMessage:
        () =>
        ({ commands }) => {
          let html = this.editor.getHTML();
          let json = this.editor.getJSON();
          commands.clearContent(true);
          console.log(html, json);
          return true;
        },
    };
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.sendMessage(),
    };
  },
});
