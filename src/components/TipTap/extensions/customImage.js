import { Node, nodeInputRule, mergeAttributes } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";

export const dropImagePlugin = upload => {
  return new Plugin({
    props: {
      handlePaste(view, event, slice) {
        const items = Array.from(event.clipboardData?.items || []);
        const { schema } = view.state;

        items.forEach(item => {
          const image = item.getAsFile();

          if (item.type.indexOf("image") === 0) {
            event.preventDefault();

            if (upload && image) {
              upload(image).then(src => {
                const node = schema.nodes.image.create({
                  src: src,
                });
                const transaction = view.state.tr.replaceSelectionWith(node);
                view.dispatch(transaction);
              });
            }
          } else {
            const reader = new FileReader();
            reader.onload = readerEvent => {
              const node = schema.nodes.image.create({
                src: readerEvent.target?.result,
              });
              const transaction = view.state.tr.replaceSelectionWith(node);
              view.dispatch(transaction);
            };
            if (!image) return;
            reader.readAsDataURL(image);
          }
        });

        return false;
      },
      handleDOMEvents: {
        drop: (view, event) => {
          const hasFiles =
            event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length;

          if (!hasFiles) {
            return false;
          }

          const images = Array.from(event.dataTransfer?.files ?? []).filter(file =>
            /image/i.test(file.type)
          );

          if (images.length === 0) {
            return false;
          }

          event.preventDefault();

          const { schema } = view.state;
          const coordinates = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          });
          if (!coordinates) return false;

          images.forEach(async image => {
            const reader = new FileReader();

            if (upload) {
              const node = schema.nodes.image.create({
                src: await upload(image),
              });
              const transaction = view.state.tr.insert(coordinates.pos, node);
              view.dispatch(transaction);
            } else {
              reader.onload = readerEvent => {
                const node = schema.nodes.image.create({
                  src: readerEvent.target?.result,
                });
                const transaction = view.state.tr.insert(coordinates.pos, node);
                view.dispatch(transaction);
              };
              reader.readAsDataURL(image);
            }
          });

          return true;
        },
      },
    },
  });
};

/**
 * * Tiptap Extension to upload images
 * @see  https://gist.github.com/slava-vishnyakov/16076dff1a77ddaca93c4bccd4ec4521#gistcomment-3744392
 * @since 7th July 2021
 *
 * Matches following attributes in Markdown-typed image: [, alt, src, title]
 *
 * Example:
 * ![Lorem](image.jpg) -> [, "Lorem", "image.jpg"]
 * ![](image.jpg "Ipsum") -> [, "", "image.jpg", "Ipsum"]
 * ![Lorem](image.jpg "Ipsum") -> [, "Lorem", "image.jpg", "Ipsum"]
 */
const IMAGE_INPUT_REGEX = /!\[(.+|:?)\]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

export const createImageExtension = uploadFn => {
  return Node.create({
    name: "image",
    draggable: true,
    addOptions() {
      return {
        inline: false,
        HTMLAttributes: {},
        //   sizes: ['small', 'medium', 'large'],
      };
    },
    inline() {
      return this.options.inline;
    },

    group() {
      return this.options.inline ? "inline" : "block";
    },
    addAttributes: () => ({
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      size: {
        default: "small",
        rendered: false,
      },
      float: {
        default: "none",
        rendered: false,
      },
    }),
    parseHTML: () => [
      {
        tag: "img[src]",
        getAttrs: dom => {
          if (typeof dom === "string") return {};
          const element = dom;

          return {
            src: element.getAttribute("src"),
            title: element.getAttribute("title"),
            alt: element.getAttribute("alt"),
          };
        },
      },
    ],
    renderHTML: ({ node, HTMLAttributes }) => {
      const size = node.attrs.size;
      HTMLAttributes.class = " image-" + size;
      HTMLAttributes.class += " image-float-" + node.attrs.float;
      return ["img", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
    },

    // @ts-ignore
    addCommands() {
      return {
        // setImage:
        //   attrs =>
        //   ({ state, dispatch }) => {
        //     const { selection } = state;
        //     const position = selection.$head ? selection.$head.pos : selection.$to.pos;

        //     const node = this.type.create(attrs);
        //     const transaction = state.tr.insert(position, node);
        //     return dispatch?.(transaction);
        //   },
        setImage:
          options =>
          ({ tr, commands }) => {
            if (tr.selection?.node?.type?.name == "image") {
              return commands.updateAttributes("image", options);
            } else {
              return commands.insertContent({
                type: this.name,
                attrs: options,
              });
            }
          },
      };
    },
    addInputRules() {
      return [
        nodeInputRule({
          find: inputRegex,
          type: this.type,
          getAttributes: match => {
            const [, , alt, src, title] = match;

            return { src, alt, title };
          },
        }),
      ];
    },
    addProseMirrorPlugins() {
      return [dropImagePlugin(uploadFn)];
    },
  });
};

async function upload(file) {
  let formData = new FormData();
  formData.append("file", file);
  const headers = { "Content-Type": "multipart/form-data" };
  const response = await axios.post("/upload", formData, { headers: headers });
  return response.data.src;
}

// new Editor({
//   extensions: [
//     new Image(null, null, upload),
//   ],
// });
