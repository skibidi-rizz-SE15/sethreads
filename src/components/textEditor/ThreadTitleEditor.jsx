import React from 'react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import CharacterCount from '@tiptap/extension-character-count';
import '../../styles/tiptapStyles.css'
import Placeholder from '@tiptap/extension-placeholder'
import History from '@tiptap/extension-history'
import PreventNewline from '../../tiptapCustomExtensions/PreventNewline'

const ThreadTitleEditor = () => {
    const limit = 300;
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            History,
            PreventNewline,
            Placeholder.configure({ placeholder: 'Add your title' }),
            CharacterCount.configure({ limit }),
        ],
        content: `<p></p>`,
    })

    return (
        <div className="flex flex-col w-[60rem] mx-auto my-8 p-4 border rounded shadow-lg text-white">
            <h1 className="pb-4 text-gray-50 font-semibold text-xl">Title</h1>
            <EditorContent
                editor={editor} 
                className="flex items-center p-4 border border-neutral-700 rounded shadow-sm focus:outline-none hover:border-neutral-500 hover:bg-neutral-700" 
                onClick={() => editor.commands.focus()}
            />
            {editor && (
                <div className="flex self-end mt-2 mr-2 text-sm text-gray-200">
                    {editor.storage.characterCount.characters()}/{limit}
                </div>
            )}
        </div>
    )
}
export default ThreadTitleEditor