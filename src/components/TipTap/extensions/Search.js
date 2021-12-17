import { Extension } from "@tiptap/core";
import { Decoration, DecorationSet } from "prosemirror-view";
import { Plugin } from "prosemirror-state";

const Search = Extension.create({
  name: "search",
  addStorage() {
    return {
      results: [],
      searchTerm: null,
      _updating: false,
    };
  },
  addOptions() {
    return {
      autoSelectNext: true,
      findClass: "find",
      searching: false,
      caseSensitive: false,
      disableRegex: true,
      alwaysSearch: false,
    };
  },
  addCommands() {
    return {
      find:
        searchTerm =>
        ({ state, dispatch }) => {
          this.storage.searchTerm = this.options.disableRegex
            ? searchTerm.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
            : searchTerm;

          this.storage._updating = true;
          dispatch(state.tr);
          this.storage._updating = false;
        },
      replace:
        replace =>
        ({ state, dispatch, commands }) => {
          const firstResult = this.storage.results[0];

          if (!firstResult) {
            return;
          }

          const { from, to } = this.storage.results[0];
          dispatch(state.tr.insertText(replace, from, to));
          commands.find(this.storage.searchTerm);
        },
      replaceAll:
        replace =>
        ({ state, dispatch, commands }) => {
          let offset;
          const { tr } = state;

          if (!this.storage.results.length) {
            return;
          }

          this.storage.results.forEach(({ from, to }, index) => {
            tr.insertText(replace, from, to);
            // rebaseNextResult
            const nextIndex = index + 1;

            if (!this.storage.results[nextIndex]) {
              offset = null;
            }

            const { from: currentFrom, to: currentTo } = this.storage.results[index];
            let lastOffset = offset ?? 0;
            const offset_ = currentTo - currentFrom - replace.length + lastOffset;
            const { from, to } = this.storage.results[nextIndex];

            this.storage.results[nextIndex] = {
              to: to - offset_,
              from: from - offset_,
            };

            offset = offset_;
            //
          });

          dispatch(tr);

          commands.find(this.storage.searchTerm);
        },
      clear:
        () =>
        ({ state, dispatch }) => {
          this.storage.searchTerm = null;

          this.storage._updating = true;
          dispatch(state.tr);
          this.storage._updating = false;
        },
    };
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        state: {
          init() {
            return DecorationSet.empty;
          },
          apply: (tr, old) => {
            if (
              this.storage._updating ||
              this.options.searching ||
              (tr.docChanged && this.options.alwaysSearch)
            ) {
              // _search
              this.storage.results = [];
              const mergedTextNodes = [];
              let index = 0;

              if (!this.storage.searchTerm) {
                return;
              }

              tr.doc.descendants((node, pos) => {
                if (node.isText) {
                  if (mergedTextNodes[index]) {
                    mergedTextNodes[index] = {
                      text: mergedTextNodes[index].text + node.text,
                      pos: mergedTextNodes[index].pos,
                    };
                  } else {
                    mergedTextNodes[index] = {
                      text: node.text,
                      pos,
                    };
                  }
                } else {
                  index += 1;
                }
              });

              mergedTextNodes.forEach(({ text, pos }) => {
                const search = new RegExp(
                  this.storage.searchTerm,
                  !this.options.caseSensitive ? "gui" : "gu"
                );
                let m;
                // eslint-disable-next-line no-cond-assign
                while ((m = search.exec(text))) {
                  if (m[0] === "") {
                    break;
                  }

                  this.storage.results.push({
                    from: pos + m.index,
                    to: pos + m.index + m[0].length,
                  });
                }
              });
              //
              let decor = this.storage.results.map(deco =>
                Decoration.inline(deco.from, deco.to, { class: this.options.findClass })
              );
              return decor ? DecorationSet.create(tr.doc, decor) : [];
            }

            if (tr.docChanged) {
              return old.map(tr.mapping, tr.doc);
            }

            return old;
          },
        },
        props: {
          decorations(state) {
            return this.getState(state);
          },
        },
      }),
    ];
  },
});

// export default class Search extends Extension {
//   constructor(options = {}) {
//     super(options);

//     this.results = [];
//     this.searchTerm = null;
//     this._updating = false;
//   }

//   get name() {
//     return "search";
//   }

//   get defaultOptions() {
//     return {
//       autoSelectNext: true,
//       findClass: "find",
//       searching: false,
//       caseSensitive: false,
//       disableRegex: true,
//       alwaysSearch: false,
//     };
//   }

//   commands() {
//     return {
//       find: attrs => this.find(attrs),
//       replace: attrs => this.replace(attrs),
//       replaceAll: attrs => this.replaceAll(attrs),
//       clearSearch: () => this.clear(),
//     };
//   }

//   get findRegExp() {
//     return RegExp(this.searchTerm, !this.options.caseSensitive ? "gui" : "gu");
//   }

//   get decorations() {
//     return this.results.map(deco =>
//       Decoration.inline(deco.from, deco.to, { class: this.options.findClass })
//     );
//   }

//   _search(doc) {
//     this.results = [];
//     const mergedTextNodes = [];
//     let index = 0;

//     if (!this.searchTerm) {
//       return;
//     }

//     doc.descendants((node, pos) => {
//       if (node.isText) {
//         if (mergedTextNodes[index]) {
//           mergedTextNodes[index] = {
//             text: mergedTextNodes[index].text + node.text,
//             pos: mergedTextNodes[index].pos,
//           };
//         } else {
//           mergedTextNodes[index] = {
//             text: node.text,
//             pos,
//           };
//         }
//       } else {
//         index += 1;
//       }
//     });

//     mergedTextNodes.forEach(({ text, pos }) => {
//       const search = this.findRegExp;
//       let m;
//       // eslint-disable-next-line no-cond-assign
//       while ((m = search.exec(text))) {
//         if (m[0] === "") {
//           break;
//         }

//         this.results.push({
//           from: pos + m.index,
//           to: pos + m.index + m[0].length,
//         });
//       }
//     });
//   }

//   replace(replace) {
//     return (state, dispatch) => {
//       const firstResult = this.results[0];

//       if (!firstResult) {
//         return;
//       }

//       const { from, to } = this.results[0];
//       dispatch(state.tr.insertText(replace, from, to));
//       this.editor.commands.find(this.searchTerm);
//     };
//   }

//   rebaseNextResult(replace, index, lastOffset = 0) {
//     const nextIndex = index + 1;

//     if (!this.results[nextIndex]) {
//       return null;
//     }

//     const { from: currentFrom, to: currentTo } = this.results[index];
//     const offset = currentTo - currentFrom - replace.length + lastOffset;
//     const { from, to } = this.results[nextIndex];

//     this.results[nextIndex] = {
//       to: to - offset,
//       from: from - offset,
//     };

//     return offset;
//   }

//   replaceAll(replace) {
//     return ({ tr }, dispatch) => {
//       let offset;

//       if (!this.results.length) {
//         return;
//       }

//       this.results.forEach(({ from, to }, index) => {
//         tr.insertText(replace, from, to);
//         offset = this.rebaseNextResult(replace, index, offset);
//       });

//       dispatch(tr);

//       this.editor.commands.find(this.searchTerm);
//     };
//   }

//   find(searchTerm) {
//     return (state, dispatch) => {
//       this.searchTerm = this.options.disableRegex
//         ? searchTerm.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
//         : searchTerm;

//       this.updateView(state, dispatch);
//     };
//   }

//   clear() {
//     return (state, dispatch) => {
//       this.searchTerm = null;

//       this.updateView(state, dispatch);
//     };
//   }

//   updateView({ tr }, dispatch) {
//     this._updating = true;
//     dispatch(tr);
//     this._updating = false;
//   }

//   createDeco(doc) {
//     this._search(doc);
//     return this.decorations ? DecorationSet.create(doc, this.decorations) : [];
//   }

//   get plugins() {
//     return [
//       new Plugin({
//         state: {
//           init() {
//             return DecorationSet.empty;
//           },
//           apply: (tr, old) => {
//             if (
//               this._updating ||
//               this.options.searching ||
//               (tr.docChanged && this.options.alwaysSearch)
//             ) {
//               return this.createDeco(tr.doc);
//             }

//             if (tr.docChanged) {
//               return old.map(tr.mapping, tr.doc);
//             }

//             return old;
//           },
//         },
//         props: {
//           decorations(state) {
//             return this.getState(state);
//           },
//         },
//       }),
//     ];
//   }
// }
