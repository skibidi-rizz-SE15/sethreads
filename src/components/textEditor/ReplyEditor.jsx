import React from 'react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';
import CharacterCount from '@tiptap/extension-character-count';
import Placeholder from '@tiptap/extension-placeholder';
import History from '@tiptap/extension-history';
import PreventNewline from '../../tiptapCustomExtensions/PreventNewline';
import '../../styles/tiptapStyles.css';

const ReplyEditor = ({ onChange }) => {
    const limit = 200;

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

    return (
        <div className="flex items-center text-white">
            <EditorContent
                editor={editor}
                className="flex items-center p-4 border border-neutral-700 rounded-3xl shadow-sm focus:outline-none hover:border-neutral-500 hover:bg-neutral-700"
                onClick={() => editor.commands.focus()}
            />
            {editor && (
                <div className="flex mt-2 mr-2 text-sm text-gray-200">
                    {editor.storage.characterCount.characters()}/{limit}
                </div>
            )}
        </div>
    );
};

export default ReplyEditor;
