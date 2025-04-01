import Document from "@tiptap/extension-document";
import FontFamily from "@tiptap/extension-font-family";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";

const fonts = [
  { label: "Inter", value: "Inter" },
  { label: "Comic Sans", value: '"Comic Sans MS", "Comic Sans"' },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "monospace" },
  { label: "Cursive", value: "cursive" },
  { label: "CSS Variable", value: "var(--title-font-family)" },
  { label: "Exo 2", value: '"Exo 2"' },
  { label: "Arial", value: "Arial" },
  { label: "Helvetica", value: "Helvetica" },
  { label: "Verdana", value: "Verdana" },
  { label: "Tahoma", value: "Tahoma" },
  { label: "Trebuchet MS", value: "Trebuchet MS" },
  { label: "Geneva", value: "Geneva" },
  { label: "Times New Roman", value: '"Times New Roman", Times, serif' },
  { label: "Georgia", value: "Georgia" },
  { label: "Garamond", value: "Garamond" },
  { label: "Palatino", value: "Palatino" },
  { label: "Bookman", value: "Bookman" },
  { label: "Courier New", value: '"Courier New", Courier, monospace' },
  { label: "Lucida Console", value: "Lucida Console, Monaco, monospace" },
  { label: "Monaco", value: "Monaco" },
  { label: "Consolas", value: "Consolas" },
  { label: "Brush Script", value: '"Brush Script MT", cursive' },
  { label: "Impact", value: "Impact, fantasy" },
];


export default function TiptapWithFontSelector() {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, TextStyle, FontFamily],
    content: "<p>Select a font from the dropdown!</p>",
  });

  if (!editor) {
    return null;
  }

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = event.target.value;
    if (selectedFont) {
      editor.chain().focus().setFontFamily(selectedFont).run();
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />
      <div className="control-group">
        <select onChange={handleFontChange} defaultValue="">
          <option value="" disabled>Select Font</option>
          {fonts.map((font) => (
            <option key={font.value} value={font.value}>
              {font.label}
            </option>
          ))}
        </select>
        <button onClick={() => editor.chain().focus().unsetFontFamily().run()}>
          Reset Font
        </button>
      </div>
      <EditorContent editor={editor} />
    </>
  );
}
