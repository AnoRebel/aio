<script>
import { ref } from "vue";

import { EmojiPicker } from "@/components";
import { MenuItem } from "@/components/TipTap";

import { emitter } from "@/utils";

export default {
  name: "MenuBar",
  components: {
    MenuItem,
    EmojiPicker,
  },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const toggleLink = () => {
      const previousUrl = props.editor.getAttributes("link").href;
      const currentUrl = props.editor.view.state.selection;
      // If there is a link, remove it
      // https://prosemirror.net/docs/ref/#state.Selection
      // https://prosemirror.net/docs/ref/#model.Slice
      // https://prosemirror.net/docs/ref/#model.Fragment
      console.log(previousUrl, currentUrl);
      console.log(props.editor.chain().focus().toggleLink().run());
      // if (previousUrl === "" || previousUrl === null) {
      //   props.editor.chain().focus().extendMarkRange("link").setLink({ href: "url" }).run();
      //   return;
      // } else {
      //   return;
      // }
      // props.editor.toggleMark("link");
    };

    const items = ref([
      {
        icon: "bold",
        title: "Bold",
        action: () => props.editor.chain().focus().toggleBold().run(),
        isActive: () => props.editor.isActive("bold"),
      },
      {
        icon: "italic",
        title: "Italic",
        action: () => props.editor.chain().focus().toggleItalic().run(),
        isActive: () => props.editor.isActive("italic"),
      },
      {
        icon: "strikethrough",
        title: "Strike",
        action: () => props.editor.chain().focus().toggleStrike().run(),
        isActive: () => props.editor.isActive("strike"),
      },
      {
        icon: "underline",
        title: "Underline",
        action: () => props.editor.chain().focus().toggleUnderline().run(),
        isActive: () => props.editor.isActive("underline"),
      },
      {
        icon: "code-view",
        title: "Code",
        action: () => props.editor.chain().focus().toggleCode().run(),
        isActive: () => props.editor.isActive("code"),
      },
      {
        icon: "mark-pen-line",
        title: "Highlight",
        action: () => props.editor.chain().focus().toggleHighlight().run(),
        isActive: () => props.editor.isActive("highlight"),
      },
      {
        type: "divider",
      },
      {
        icon: "paragraph",
        title: "Paragraph",
        action: () => props.editor.chain().focus().setParagraph().run(),
        isActive: () => props.editor.isActive("paragraph"),
      },
      {
        icon: "list-unordered",
        title: "Bullet List",
        action: () => props.editor.chain().focus().toggleBulletList().run(),
        isActive: () => props.editor.isActive("bulletList"),
      },
      {
        icon: "list-ordered",
        title: "Ordered List",
        action: () => props.editor.chain().focus().toggleOrderedList().run(),
        isActive: () => props.editor.isActive("orderedList"),
      },
      {
        icon: "list-check-2",
        title: "Task List",
        action: () => props.editor.chain().focus().toggleTaskList().run(),
        isActive: () => props.editor.isActive("taskList"),
      },
      {
        icon: "code-box-line",
        title: "Code Block",
        action: () => props.editor.chain().focus().toggleCodeBlock().run(),
        isActive: () => props.editor.isActive("codeBlock"),
      },
      {
        type: "divider",
      },
      {
        icon: "align-left",
        title: "Align Left",
        action: () => props.editor.chain().focus().setTextAlign("left").run(),
        isActive: () => props.editor.isActive({ textAlign: "left" }),
      },
      {
        icon: "align-center",
        title: "Align Center",
        action: () => props.editor.chain().focus().setTextAlign("center").run(),
        isActive: () => props.editor.isActive({ textAlign: "center" }),
      },
      {
        icon: "align-right",
        title: "Align Right",
        action: () => props.editor.chain().focus().setTextAlign("right").run(),
        isActive: () => props.editor.isActive({ textAlign: "right" }),
      },
      {
        icon: "align-justify",
        title: "Justify",
        action: () => props.editor.chain().focus().setTextAlign("justify").run(),
        isActive: () => props.editor.isActive({ textAlign: "justify" }),
      },
      {
        type: "divider",
      },
      {
        icon: "double-quotes-l",
        title: "Blockquote",
        action: () => props.editor.chain().focus().toggleBlockquote().run(),
        isActive: () => props.editor.isActive("blockquote"),
      },
      {
        icon: "separator",
        title: "Horizontal Rule",
        action: () => props.editor.chain().focus().setHorizontalRule().run(),
      },
      {
        icon: "link",
        title: "Link",
        action: toggleLink,
        isActive: () => props.editor.isActive("link"),
      },
      {
        type: "divider",
      },
      {
        icon: "text-wrap",
        title: "Hard Break",
        action: () => props.editor.chain().focus().setHardBreak().run(),
      },
      {
        icon: "format-clear",
        title: "Clear Format",
        action: () => props.editor.chain().focus().clearNodes().unsetAllMarks().run(),
      },
      {
        type: "divider",
      },
      {
        icon: "arrow-go-back-line",
        title: "Undo",
        action: () => props.editor.chain().focus().undo().run(),
      },
      {
        icon: "arrow-go-forward-line",
        title: "Redo",
        action: () => props.editor.chain().focus().redo().run(),
      },
      {
        icon: "font-size",
        title: "Toggle Formatting",
        action: () => props.editor.chain().focus().redo().run(),
      },
    ]);

    const openEmoji = () => {
      emitter.emit("openEmoji", true);
    };

    const setEmoji = e => {
      console.log(e);
    };

    return { items, openEmoji, setEmoji };
  },
};
</script>

<template>
  <div class="flex flex-row items-end flex-[0_0_auto] p-1 justify-between">
    <div class="flex flex-wrap">
      <template v-for="(item, index) in items">
        <div
          class="w-1px h-5 bg-gray-900/10 ml-2 mr-3"
          v-if="item.type === 'divider'"
          :key="`divider${index}`"
        />
        <menu-item v-else :key="index" v-bind="item" />
      </template>
    </div>
    <div class="flex flex-row">
      <div class="hover:(bg-gray-900 text-white) rounded p-1 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <EmojiPicker @emoji-selected="setEmoji" />
      </div>
      <div class="hover:(bg-gray-900 text-white) rounded p-1 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-6 w-6 transform rotate-90"
        >
          <path
            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.divider {
  width: 2px;
  height: 1.25rem;
  background-color: rgba(#000, 0.1);
  margin-left: 0.5rem;
  margin-right: 0.75rem;
}
</style>
