import React from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Document from '@tiptap/extension-document';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Code from '@tiptap/extension-code';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Underline from '@tiptap/extension-underline';
import CharacterCount from '@tiptap/extension-character-count';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import FileHandler from '@tiptap-pro/extension-file-handler';
import Mathematics from '@tiptap-pro/extension-mathematics';
import DragHandle from '@tiptap-pro/extension-drag-handle-react';
import { all, createLowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import html from 'highlight.js/lib/languages/xml'

const lowlight = createLowlight(all)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)

const PostThreadEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Blockquote,
      BulletList,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Document,
      HardBreak,
      Heading,
      Image,
      Paragraph,
      Text,
      Bold,
      Code,
      Italic,
      Link,
      Subscript,
      Superscript,
      Underline,
      CharacterCount,
      Dropcursor,
      Gapcursor,
      Mathematics,
      FileHandler,
    ],
    content: '<p>Hello, world!</p>',
  });

  return (
    <div className="max-w-2xl mx-auto my-8 p-4 border rounded shadow">
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <button
            className="px-2 py-1 border rounded hover:bg-gray-200"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            Bold
          </button>
          <button
            className="px-2 py-1 border rounded hover:bg-gray-200"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            Italic
          </button>
          <button
            className="px-2 py-1 border rounded hover:bg-gray-200"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            Underline
          </button>
          <button
            className="px-2 py-1 border rounded hover:bg-gray-200"
            onClick={() => editor.chain().focus().toggleLink({ href: 'https://example.com' }).run()}
          >
            Link
          </button>
          {/* Add more buttons for other marks and nodes as needed */}
        </BubbleMenu>
      )}
      <EditorContent editor={editor} className="p-4 border rounded shadow-sm focus:outline-none" />
      {editor && (
        <div className="mt-2 text-sm text-gray-600">
          Character Count: {editor.storage.characterCount.characters()}
        </div>
      )}
    </div>
  );
};

export default PostThreadEditor;
