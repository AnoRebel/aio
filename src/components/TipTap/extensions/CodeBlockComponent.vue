<template>
  <node-view-wrapper>
    <pre><code><node-view-content /></code></pre>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from "@tiptap/vue-3";

export default {
  name: "CodeBlockComponent",
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  props: nodeViewProps,
  setup() {
    return {};
  },
};
</script>
