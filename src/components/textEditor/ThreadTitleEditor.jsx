import React from 'react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';
import CharacterCount from '@tiptap/extension-character-count';
import Placeholder from '@tiptap/extension-placeholder';
import History from '@tiptap/extension-history';
import Bold from '@tiptap/extension-bold';
import PreventNewline from '../../tiptapCustomExtensions/PreventNewline';
import '../../styles/tiptapStyles.css';

const ThreadTitleEditor = ({ onChange }) => {
    const limit = 300;

    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            Bold,
            History,
            PreventNewline,
            Placeholder.configure({ placeholder: 'Add your title' }),
            CharacterCount.configure({ limit }),
        ],
        content: `<p></p>`,
        onUpdate: ({ editor }) => {
            //pass the content of the editor back to the parent
            if (onChange) {
                if(!editor.isEmpty){
                    const currentText = editor.getText();
                    onChange(`<p><strong>${currentText}</strong></p>`);
                } else {
                    onChange("");
                }
            }
        },
        editorProps: {
            attributes: {
                class: "flex items-center p-4 border border-neutral-500 rounded shadow-sm hover:cursor-text focus:border-white focus:bg-neutral-700 transition duration-200",
            },
        }
    });

    return (
        <div className="flex flex-col w-full mx-auto rounded text-white">
            <h1 className="pb-4 text-gray-50 font-semibold text-xl">Title</h1>
            <EditorContent
                editor={editor}
                onClick={() => editor.commands.focus()}
            />
            {editor && (
                <div className="flex self-end mt-2 mr-2 text-sm text-gray-200">
                    {editor.storage.characterCount.characters()}/{limit}
                </div>
            )}
        </div>
    );
};

export default ThreadTitleEditor;
