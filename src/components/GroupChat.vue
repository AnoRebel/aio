<script>
import { ref, onMounted } from "vue";
import { Editor, EditorContent, VueNodeViewRenderer } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Highlight from "@tiptap/extension-highlight";
import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

import lowlight from "lowlight";

import { CodeBlockComponent } from "@/components/TipTap";
import { GroupChatHeader, EmojiPicker, GroupMessage } from "@/components";
import { emitter } from "@/utils";
import { groupMessages } from "@/seed";

export default {
  components: { GroupChatHeader, GroupMessage, EmojiPicker },
  setup() {
    const editor = ref(null);
    onMounted(() => {
      const el = document.getElementById("messages");
      el.scrollTop = el.scrollHeight;
      editor.value = new Editor({
        extensions: [
          StarterKit.configure({
            history: true,
          }),
          Highlight,
          TaskList,
          TaskItem,
          CodeBlockLowlight.extend({
            addNodeView() {
              return VueNodeViewRenderer(CodeBlockComponent);
            },
          }).configure({ lowlight }),
          CharacterCount.configure({
            limit: 10000,
          }),
        ],
      });
    });
    const openEmoji = () => {
      emitter.emit("openEmoji", true);
    };
    const setEmoji = e => {
      console.log(e);
    };
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
    <footer class="px-4 pt-3 pb-2">
      <menu-bar class="editor__header" :editor="editor" />
      <editor-content class="editor__content" :editor="editor" />
      <div class="relative flex">
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
      </div>
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

<style lang="scss" scoped>
.scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(236, 236, 236, var(--tw-bg-opacity)) rgba(17, 24, 39, var(--tw-bg-opacity));
}
.scrollbar::-webkit-scrollbar {
  cursor: pointer;
  width: 0.65rem;
  height: 0.65rem;
}

.scrollbar::-webkit-scrollbar-track {
  cursor: pointer;
  background-color: #111827;
  background-color: rgba(17, 24, 39, var(--tw-bg-opacity));
}

.scrollbar::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 0.5rem;
  background-color: #ececec;
  background-color: rgba(236, 236, 236, var(--tw-bg-opacity));
}

.ProseMirror {
  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
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

  mark {
    background-color: #faf594;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  hr {
    margin: 1rem 0;
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
.editor {
  display: flex;
  flex-direction: column;
  max-height: 26rem;
  color: #0d0d0d;
  background-color: #fff;
  border: 3px solid #0d0d0d;
  border-radius: 0.75rem;

  &__header {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
    border-bottom: 3px solid #0d0d0d;
  }

  &__content {
    padding: 1.25rem 1rem;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
