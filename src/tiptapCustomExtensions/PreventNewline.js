import { Extension } from '@tiptap/core';

const PreventNewline = Extension.create({
  name: 'preventNewline',

  addKeyboardShortcuts() {
    return {
      Enter: () => true, // Prevent default behavior (newline insertion)
    };
  },
});

export default PreventNewline;
