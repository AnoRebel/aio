<script>
import { onMounted, ref, onBeforeUnmount } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";
import { Editor, EditorContent } from "@tiptap/vue-3";
import { InformationCircleIcon } from "@heroicons/vue/outline";

import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Highlight from "@tiptap/extension-highlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Typography from "@tiptap/extension-typography";
import TextAlign from "@tiptap/extension-text-align";
import Mention from "@tiptap/extension-mention";

import lowlight from "lowlight";

import {
  CodeBlockComponent,
  ColorHighlighter,
  ExternalVideo,
  SmilieReplacer,
} from "@/components/TipTap";

import { EmojiPicker, VoicePlayer, VideoPlayer } from "@/components";

import { renderInfoSvg } from "@/utils";

export default {
  name: "GroupMessage",
  components: {
    EmojiPicker,
    InformationCircleIcon,
    VueEasyLightbox,
    VoicePlayer,
    VideoPlayer,
    EditorContent,
    BubbleMenu,
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const editor = ref(null);
    const showPopup = ref(false);
    const showImagePopup = ref(false);
    const imgSrc = ref("");
    // onMounted(() => {
      // let images = document.querySelectorAll(".ProseMirror img");
      // images.forEach(image => {
      //   image.classList.add("relative");
      //   renderInfoSvg(image, [
      //     "h-7",
      //     "w-7",
      //     "text-gray-500",
      //     "cursor-pointer",
      //     "absolute",
      //     "right-2",
      //     "top-2",
      //   ]);
      //   image.addEventListener("click", () => {
      //     imgSrc.value = image.src;
      //     showPopup.value = true;
      //   });
      // });
    // });
    const richMessage = content => {
      return new Editor({
        content: JSON.parse(content),
        editable: false,
        extensions: [
          StarterKit,
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
          }),
          CodeBlockLowlight.extend({
            addNodeView() {
              return VueNodeViewRenderer(CodeBlockComponent);
            },
          }).configure({ lowlight }),
          ColorHighlighter,
          SmilieReplacer,
        ],
      });
    };
    if (props.message.content) {
      editor.value = richMessage(props.message.content);
    }
    const setEmoji = e => {
      console.log(e);
    };

    onBeforeUnmount(() => {
      if (editor.value) editor.value.destroy();
    });
    return { editor, setEmoji, showPopup, showImagePopup, imgSrc };
  },
};
</script>

<template>
  <div class="group-message">
    <div class="flex items-start mb-4 text-sm">
      <img
        :src="message.profile"
        :alt="message.sender"
        class="w-10 h-10 rounded flex-shrink-0 mr-3 object-cover cursor-pointer"
        @click="showImagePopup = true"
      />
      <VueEasyLightbox
        :visible="showImagePopup"
        :imgs="message.profile"
        @hide="showImagePopup = false"
      />
      <div class="flex flex-col max-w-xs order-2 items-start">
        <div class="flex items-center">
          <app-link to="#">
            <span class="font-bold">{{ message.sender }}</span>
          </app-link>
          <span class="text-grey text-xs ml-1">11:46</span>
        </div>
        <p class="text-black leading-normal">
          <app-link
            v-if="message.linked_user != ''"
            to="#"
            class="inline-block bg-blue-300 text-blue-600 no-underline px-1 rounded"
          >
            @{{ message.linked_user }}
          </app-link>
          {{ message.text }}
        </p>
        <div
          v-if="message.type == 'rich'"
          class="relative block w-94 flex flex-shrink-0 max-w-xs lg:max-w-md"
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
          </bubble-menu>
          <editor-content
            class="w-full p-1 flex-auto overflow-x-hidden overflow-y-auto touch-scrolling"
            :editor="editor"
          />
          <VueEasyLightbox :visible="showPopup" :imgs="imgSrc" @hide="showPopup = false" />
        </div>
      </div>
    </div>
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
    @apply inline-block bg-blue-300 text-blue-600 no-underline px-1 my-1 rounded cursor-pointer;
  }

  mark {
    @apply rounded p-0.5;
    background-color: #ffe066;
    box-decoration-break: clone;
  }

  img {
    @apply max-w-full h-auto rounded-lg cursor-pointer;
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
