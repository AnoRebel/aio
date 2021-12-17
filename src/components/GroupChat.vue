<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Editor, EditorContent, VueNodeViewRenderer } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Highlight from "@tiptap/extension-highlight";
import HardBreak from "@tiptap/extension-hard-break";
import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// import FloatingMenu from "@tiptap/extension-floating-menu";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Mention from "@tiptap/extension-mention";

import lowlight from "lowlight";

import {
  CodeBlockComponent,
  MenuBar,
  sendMessage,
  customNewline,
  suggestion,
  ColorHighlighter,
  ExternalVideo,
  SmilieReplacer,
} from "@/components/TipTap";
import { GroupChatHeader, EmojiPicker, GroupMessage } from "@/components";
import { emitter } from "@/utils";
import { groupMessages } from "@/seed";

export default {
  components: { MenuBar, BubbleMenu, EditorContent, GroupChatHeader, GroupMessage, EmojiPicker },
  setup() {
    const editor = ref(null);
    onMounted(() => {
      const el = document.getElementById("messages");
      el.scrollTop = el.scrollHeight;
      const CustomHardBreak = HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            "Mod-Enter": () => this.editor.commands.setHardBreak(),
            "Shift-Enter": () => this.editor.commands.addNewline(),
          };
        },
      });
      editor.value = new Editor({
        autofocus: "end",
        extensions: [
          sendMessage,
          StarterKit.configure({
            hardBreak: false,
          }),
          customNewline,
          CustomHardBreak,
          TaskList,
          TaskItem.configure({
            nested: true,
          }),
          Image,
          Typography,
          Underline,
          Link,
          ExternalVideo,
          Highlight.configure({
            multicolor: true,
          }),
          TextAlign.configure({
            types: ["heading", "paragraph"],
          }),
          Mention.configure({
            HTMLAttributes: {
              class: "mention",
            },
            suggestion,
          }),
          CodeBlockLowlight.extend({
            addNodeView() {
              return VueNodeViewRenderer(CodeBlockComponent);
            },
          }).configure({ lowlight }),
          CharacterCount.configure({
            limit: 10000,
          }),
          Placeholder.configure({
            // emptyEditorClass: "text-gray-500",
            // emptyNodeClass: "text-gray-500",
            placeholder: "Write something …",
          }),
          ColorHighlighter,
          SmilieReplacer,
        ],
      });
    });

    const openEmoji = () => {
      emitter.emit("openEmoji", true);
    };
    const setEmoji = e => {
      console.log(e);
    };

    onBeforeUnmount(() => {
      editor.value.destroy();
    });

    return { editor, openEmoji, setEmoji, groupMessages };
  },
};
</script>

<template>
  <!-- component -->
  <div class="font-sans antialiased w-full h-[90%] justify-between flex-1 flex flex-col">
    <!-- <GroupChatHeader /> -->
    <main id="messages" class="px-6 py-4 flex-1 overflow-y-auto scrollbar scrolling-touch">
      <!-- A message -->
      <template v-for="message in groupMessages" :key="message.id">
        <GroupMessage :message="message" />
      </template>
    </main>
    <footer class="pl-6 pr-2 pb-2">
      <div
        class="flex flex-col max-h-100 bg-white text-gray-900 rounded-lg border-2 border-gray-900"
        v-if="editor"
      >
        <bubble-menu
          class="bubble-menu"
          :tippy-options="{ animation: false }"
          :editor="editor"
          v-if="editor"
          v-show="editor.isActive('image')"
        >
          <button
            @click="editor.chain().focus().setImage({ size: 'small' }).run()"
            :class="{
              'is-active': editor.isActive('image', {
                size: 'small',
              }),
            }"
          >
            Small
          </button>
          <button
            @click="editor.chain().focus().setImage({ size: 'medium' }).run()"
            :class="{
              'is-active': editor.isActive('image', {
                size: 'medium',
              }),
            }"
          >
            Medium
          </button>
          <button
            @click="editor.chain().focus().setImage({ size: 'large' }).run()"
            :class="{
              'is-active': editor.isActive('image', {
                size: 'large',
              }),
            }"
          >
            Large
          </button>
          <span style="color: #aaa">|</span>
          <button
            @click="editor.chain().focus().setImage({ float: 'left' }).run()"
            :class="{
              'is-active': editor.isActive('image', {
                float: 'left',
              }),
            }"
          >
            Left
          </button>
          <button
            @click="editor.chain().focus().setImage({ float: 'none' }).run()"
            :class="{
              'is-active': editor.isActive('image', {
                float: 'none',
              }),
            }"
          >
            No float
          </button>
          <button
            @click="editor.chain().focus().setImage({ float: 'right' }).run()"
            :class="{
              'is-active': editor.isActive('image', {
                float: 'right',
              }),
            }"
          >
            Right
          </button>
          <span style="color: #aaa">|</span>
          <button @click="addImage">Change</button>
        </bubble-menu>
        <editor-content
          class="w-full p-1 flex-auto overflow-x-hidden overflow-y-auto touch-scrolling"
          :editor="editor"
        />
        <div class="flex justify-between text-gray-700/50 text-xs px-2" v-if="editor">
          <div>
            <span>{{ editor.storage.characterCount.characters() }}/10000</span>
            <!-- <span>{{ editor.storage.characterCount.words() }} words</span> -->
          </div>
          &nbsp;

          <div class="space-x-2">
            <span>Return to send</span><span>Shift + Return to add a new line</span>
          </div>
        </div>
        <menu-bar class="border-t border-gray-900" :editor="editor" />
      </div>
      <!-- <div class="relative flex">
        <span class="absolute inset-y-0 flex items-center">
          <button
            type="button"
            class="
              inline-flex
              items-center
              justify-center
              rounded-full
              h-12
              w-12
              transition
              duration-500
              ease-in-out
              text-gray-500
              hover:bg-gray-300
              focus:outline-none
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-6 w-6 text-gray-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              ></path>
            </svg>
          </button>
        </span>
        <input
          type="text"
          placeholder="Write Something"
          class="
            w-full
            focus:(outline-none
            ring-0
            border-0
            placeholder-gray-400)
            text-gray-600
            placeholder-gray-600
            pl-12
            bg-gray-200
            rounded-full
            py-2
          "
        />
        <div class="absolute right-[1px] items-center inset-y-0 hidden sm:flex">
          <button
            type="button"
            class="
              inline-flex
              items-center
              justify-center
              rounded-full
              h-10
              w-10
              transition
              duration-500
              ease-in-out
              text-gray-500
              hover:bg-gray-300
              focus:outline-none
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-6 w-6 text-gray-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            class="
              inline-flex
              items-center
              justify-center
              rounded-full
              h-10
              w-10
              transition
              duration-500
              ease-in-out
              text-gray-500
              hover:bg-gray-300
              focus:outline-none
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-6 w-6 text-gray-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            class="
              relative
              inline-flex
              items-center
              justify-center
              rounded-full
              h-10
              w-10
              transition
              duration-500
              ease-in-out
              text-gray-500
              hover:bg-gray-300
              focus:outline-none
            "
            @click="openEmoji"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-6 w-6 text-gray-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <EmojiPicker @emoji-selected="setEmoji" />
          </button>
          <button
            type="button"
            class="
              inline-flex
              items-center
              justify-center
              rounded-full
              h-10
              w-10
              transition
              duration-500
              ease-in-out
              text-white
              bg-blue-500
              hover:bg-blue-400
              focus:outline-none
            "
          >
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
          </button>
        </div>
      </div> -->
    </footer>
    <!-- <div class="pb-4 px-4 flex-none">
      <div class="flex rounded-lg border-2 border-grey overflow-hidden">
        <span class="text-3xl text-grey border-r-2 border-grey p-2">
          <svg
            class="fill-current h-6 w-6 block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"
            />
          </svg>
        </span>
        <input type="text" class="w-full px-4" placeholder="Message #general" />
      </div>
    </div> -->
  </div>
</template>

<style lang="scss">
.ProseMirror {
  @apply min-h-6 focus:outline-none px-1;

  a {
    @apply text-blue-500 hover:(text-blue-400 cursor-pointer) underline;
  }

  code {
    font-size: 0.9rem;
    padding: 0.25em;
    border-radius: 0.25em;
    background-color: rgba(#616161, 0.1);
    color: #616161;
    box-decoration-break: clone;
  }
  /* Placeholder (at the top) */
  p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd;
    pointer-events: none;
    height: 0;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }

    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #fbbc88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #b9f18d;
    }

    .hljs-title,
    .hljs-section {
      color: #faf594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70cff8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }

  .mention {
    @apply inline-block bg-blue-300 text-blue-600 no-underline px-1 rounded;
  }

  mark {
    @apply rounded p-0.5;
    background-color: #ffe066;
    box-decoration-break: clone;
  }

  img {
    @apply max-w-full h-auto;
    &.ProseMirror-selectednode {
      outline: 2px solid #68cef8;
    }
  }
  .image-small {
    max-width: 200px;
  }
  .image-medium {
    max-width: 500px;
  }
  .image-large {
    max-width: 100%;
  }
  .image-float-none {
    float: none;
  }
  .image-float-left {
    float: left;
  }
  .image-float-right {
    float: right;
  }

  .video-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 10px;
    height: 0;
    overflow: hidden;
  }
  .video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  hr {
    @apply my-4 mx-0;
  }
  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }
  }
}
.bubble-menu {
  display: flex;
  background-color: #0d0d0d;
  padding: 0.2rem;
  border-radius: 0.5rem;
  button {
    border: none;
    background: none;
    color: #fff;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;
    &:hover,
    &.is-active {
      opacity: 1;
    }
    &.is-active {
      text-decoration: underline;
    }
  }
}
.editor {
  display: flex;
  flex-direction: column;
  max-height: 26rem;
  color: #141414;
  background-color: #fff;
  border: 0.15rem solid #141414;
  border-radius: 0.75rem;

  &__header {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
    border-bottom: 0.15rem solid #141414;
  }

  &__content {
    padding: 1.25rem 1rem;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
.touch-scrolling {
  -webkit-overflow-scrolling: touch;
}
</style>
