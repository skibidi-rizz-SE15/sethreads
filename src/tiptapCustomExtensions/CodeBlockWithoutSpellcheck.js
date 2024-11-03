import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { mergeAttributes } from '@tiptap/core';

export const CodeBlockWithoutSpellcheck = CodeBlockLowlight.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      spellcheck: {
        default: 'false',
        parseHTML: () => 'false',
        renderHTML: attributes => {
          return {
            spellcheck: attributes.spellcheck,
          };
        },
      },
    };
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      'pre',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { spellcheck: 'false' }),
      ['code', {}, 0],
    ];
  },
});
