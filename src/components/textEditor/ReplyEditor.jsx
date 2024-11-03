import React, {useEffect} from 'react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';
import CharacterCount from '@tiptap/extension-character-count';
import Placeholder from '@tiptap/extension-placeholder';
import History from '@tiptap/extension-history';
import PreventNewline from '../../tiptapCustomExtensions/PreventNewline';
import '../../styles/tiptapStyles.css';

const ReplyEditor = React.forwardRef(({ onChange }, ref) => {
    const limit = 500;

    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            History,
            PreventNewline,
            Placeholder.configure({ placeholder: 'Add a reply' }),
            CharacterCount.configure({ limit }),
        ],
        content: `<p></p>`,
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

    useEffect(() => {
        if (ref) {
          ref.current = {
            clearContent: () => {
              editor.commands.clearContent();
            },
          };
        }
      }, [editor, ref]);

    return (
        <div className="relative flex flex-1 items-center text-white">
            <EditorContent
                editor={editor}
                className="flex flex-1 items-center p-4 rounded-3xl border border-neutral-700 hover:bg-neutral-700 shadow-sm focus:outline-none"
                onClick={() => editor.commands.focus()}
            />
            {editor && (
                <div className="absolute top-full right-0 flex mr-2 text-sm text-gray-200">
                    {editor.storage.characterCount.characters()}/{limit}
                </div>
            )}
        </div>
    );
});

export default ReplyEditor;
