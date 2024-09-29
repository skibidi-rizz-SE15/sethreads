import React from 'react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import CharacterCount from '@tiptap/extension-character-count';
import '../../styles/tiptapStyles.css'

const ThreadTitleEditor = () => {
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            CharacterCount,
        ],
        content: `<p>Hello World!</p>`,
    })

    return (
        <div className="w-[60rem] mx-auto my-8 p-4 border rounded shadow-lg bg-white">
            <EditorContent editor={editor} />
            {editor && (
                <div className="mt-2 text-sm text-gray-600">
                    Character Count: {editor.storage.characterCount.characters()}
                </div>
            )}
        </div>
    )
}
export default ThreadTitleEditor