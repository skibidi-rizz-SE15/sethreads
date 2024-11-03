import { Code } from '@tiptap/extension-code';
import { mergeAttributes } from '@tiptap/core';

export const CodeWithoutSpellcheck = Code.extend({
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
      'code',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { spellcheck: 'false' }),
      0,
    ];
  },
});
