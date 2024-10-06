import React, { useCallback } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import Document from '@tiptap/extension-document';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Underline from '@tiptap/extension-underline';
import CharacterCount from '@tiptap/extension-character-count';
import Dropcursor from '@tiptap/extension-dropcursor';
import FileHandler from '@tiptap-pro/extension-file-handler';
import Mathematics from '@tiptap-pro/extension-mathematics';
import { all, createLowlight } from 'lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import 'katex/dist/katex.min.css'
import '../../styles/tiptapStyles.css';
import { CodeWithoutSpellcheck } from '../../tiptapCustomExtensions/CodeWithoutSpellcheck';
import { CodeBlockWithoutSpellcheck } from '../../tiptapCustomExtensions/CodeBlockWithoutSpellcheck';
import { RxFontBold, RxFontItalic, RxUnderline, RxLink2, RxLinkBreak2, RxListBullet, RxHeading, RxImage } from "react-icons/rx";
import { FaHeading, FaCode, FaSubscript, FaSuperscript } from "react-icons/fa6";
import { BiCodeBlock } from "react-icons/bi";
import { GrBlockQuote } from "react-icons/gr";
import { BsTextParagraph } from "react-icons/bs";
import PostCommentBtn from '../button/createComment/PostCommentBtn';

const CommentEditor = ({ onChange, fromHome, threadId, body, studentId, isValid }) => {
  const lowlight = createLowlight(all)
  const limit = 1500;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Blockquote,
      BulletList,
      CodeBlockWithoutSpellcheck.configure({
        lowlight,
        defaultLanguage: 'js',
      }),
      Document,
      HardBreak,
      Heading,
      Image.configure({
        allowBase64: true,
      }),
      Paragraph,
      Text,
      Bold,
      CodeWithoutSpellcheck,
      Italic,
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Subscript,
      Superscript,
      Underline,
      CharacterCount.configure({ limit }),
      Dropcursor,
      Mathematics,
      Placeholder.configure({ placeholder: 'Add a comment' }),
      FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        onDrop: (currentEditor, files, pos) => {
          files.forEach(file => {
            const fileReader = new FileReader()

            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor.chain().insertContentAt(pos, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              }).focus().run()
            }
          })
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach(file => {
            if (htmlContent) {
              // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
              // you could extract the pasted file from this url string and upload it to a server for example
              console.log(htmlContent) // eslint-disable-line no-console
              return false
            }

            const fileReader = new FileReader()

            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              }).focus().run()
            }
          })
        },
      }),
    ],
    content: '<p></p>',
    onUpdate: ({ editor }) => {
      const currentContent = editor.getHTML();
      if (onChange) {
        if(!editor.isEmpty){
            onChange(currentContent);
        } else {
            onChange("");
        }
      }
    },
  });

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor]);
  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const buttons = [
    {
      command: () => editor.chain().focus().setParagraph().run(),
      icon: <BsTextParagraph />,
      label: 'Paragraph',
      styles: ''
    },
    {
      command: () => editor.chain().focus().toggleBold().run(),
      icon: <RxFontBold />,
      label: 'Bold',
      styles: '',
    },
    {
      command: () => editor.chain().focus().toggleItalic().run(),
      icon: <RxFontItalic />,
      label: 'Italic',
      styles: ''
    },
    {
      command: () => editor.chain().focus().toggleUnderline().run(),
      icon: <RxUnderline />,
      label: 'Underline',
      styles: ''
    },
    {
      command: () => editor.chain().focus().toggleBulletList().run(),
      icon: <RxListBullet />,
      label: 'Bullet List',
      styles: ''
    },
    {
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      icon: <FaHeading />,
      label: 'Heading',
      styles: editor.isActive('heading', { level: 1 }) ? 'bg-gray-700' : ''
    },
    {
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      icon: <RxHeading />,
      label: 'Sub-Heading',
      styles: editor.isActive('heading', { level: 2 }) ? 'bg-gray-700' : ''
    },
    {
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      icon: <BiCodeBlock />,
      label: 'Code Block',
      styles: ''
    },
    {
      command: () => editor.chain().focus().toggleCode().run(),
      icon: <FaCode />,
      label: 'Code',
      styles: ''
    },
    {
      command: () => editor.chain().focus().toggleBlockquote().run(),
      icon: <GrBlockQuote />,
      label: 'Blockquote',
      styles: ''
    },
    {
      command: () => editor.chain().focus().toggleSubscript().run(),
      icon: <FaSubscript />,
      label: 'Subscript',
      styles: ''
    },
    {
      command: () => editor.chain().focus().toggleSuperscript().run(),
      icon: <FaSuperscript />,
      label: 'Superscript',
      styles: ''
    },
    {
      command: addImage,
      icon: <RxImage />,
      label: 'Image',
      styles: ''
    },
    {
      command: setLink,
      icon: <RxLink2 />,
      label: 'Link',
      styles: ''
    },
    {
      command: () => editor.chain().focus().unsetLink().run(),
      icon: <RxLinkBreak2 />,
      label: 'Unlink',
      styles: ''
    }
  ];

  return (
    <div className="flex flex-col w-full mx-auto text-white">
      {editor && (
        <div className={`flex flex-wrap mb-4 gap-2 p-2 rounded ${editor.isFocused ? "" : "hidden"}`}>
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`px-2 py-1 border rounded hover:bg-gray-600 focus:outline-none flex items-center gap-2 ${
                (editor.isActive(button.label.toLowerCase()) && button.label !== "Heading" && button.label !== "Sub-Heading") 
                ? 'bg-gray-700' 
                : ''
              } ${button.styles}`}
              onClick={button.command}
              title={button.label}
            >
              {button.icon && (
                button.icon ? button.icon : <span className="pb-0.5">{button.label}</span>
              )}
            </button>
          ))}

        </div>
      )}
      <EditorContent
        editor={editor}
        className="p-4 rounded-3xl border border-neutral-700 hover:bg-neutral-700 shadow-sm focus:outline-none"
        onClick={() => editor.commands.focus()}
      />
      {editor && (
        <div className={`flex w-full ${editor.isFocused ? "" : "hidden"}`}>
            <div className={`flex mt-1 ml-4 mr-auto text-sm text-gray-200`}>
                {editor.storage.characterCount.characters()}/{limit}
            </div>
            <PostCommentBtn className='mt-2 mr-2' fromHome={fromHome} threadId={threadId} body={body} studentId={studentId} isValid={isValid} />
        </div>
      )}
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className='flex gap-1 p-2 rounded-lg bg-black'
          shouldShow={({ editor }) => {
            const { state } = editor;
            const { $from, empty } = state.selection;
            const parentName = $from.parent.type.name;
            return !empty && !['codeBlock', 'code', 'image'].includes(parentName);
          }}
        >
          <button
            className="px-2 py-1 border rounded hover:bg-gray-400"
            onClick={buttons.find((button) => button.label === "Bold").command}
            title='Bold'
          >
            <RxFontBold />
          </button>
          <button
            className="px-2 py-1 border rounded hover:bg-gray-400"
            onClick={buttons.find((button) => button.label === "Italic").command}
            title='Italic'
          >
            <RxFontItalic />
          </button>
          <button
            className="px-2 py-1 border rounded hover:bg-gray-400"
            onClick={buttons.find((button) => button.label === "Underline").command}
            title='Underline'
          >
            <RxUnderline />
          </button>
          <button
            className="px-2 py-1 border rounded hover:bg-gray-400"
            onClick={setLink}
            title='Link'
          >
            <RxLink2 />
          </button>
          <button
            className="px-2 py-1 border rounded hover:bg-gray-400"
            onClick={buttons.find((button) => button.label === "Unlink").command}
            title='Unlink'
          >
            <RxLinkBreak2 />
          </button>
        </BubbleMenu>
      )}
    </div>
  );
};

export default CommentEditor;