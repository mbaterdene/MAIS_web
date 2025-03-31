import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";

const AdminPage = () => {

const editor = useEditor({
  extensions: [
    StarterKit,
    Heading.configure({
      levels: [1, 2, 3, 4, 5, 6], // Add support for H4, H5, H6
    }),
  ],
  content: "<h4>This is an H4 heading</h4>",
});
const setHeading = (level: number) => {
  if (editor) {
    editor.chain().focus().toggleHeading({ level: level as any }).run();
  }
};

return (
  <div>
    <button onClick={() => setHeading(4)}>H4</button>
    <button onClick={() => setHeading(5)}>H5</button>
    <button onClick={() => setHeading(6)}>H6</button>
    <EditorContent editor={editor} />
  </div>
);
}

export default AdminPage;