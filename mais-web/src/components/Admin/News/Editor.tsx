import { FaBold, FaItalic, FaStrikethrough  } from "react-icons/fa6";
import { MdFormatListBulleted, MdFormatUnderlined, MdOutlineImage } from "react-icons/md";
import { AiOutlineOrderedList } from "react-icons/ai";
import { RiMenu2Fill, RiMenu3Fill, RiMenu5Fill } from "react-icons/ri";
import { TbBallpenOff, TbLink, TbLinkOff } from "react-icons/tb";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import ImageResize from "tiptap-extension-resize-image";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import Gapcursor from "@tiptap/extension-gapcursor";
import TextStyle from "@tiptap/extension-text-style";
import { HexColorPicker } from "react-colorful";

import { useAtom } from "jotai";
import { isMenuOpen } from "../../ThemeAtom";

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

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      Gapcursor,
      
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false
            }

            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')

            if (disallowedProtocols.includes(protocol)) {
              return false
            }

            const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

            if (!allowedProtocols.includes(protocol)) {
              return false
            }

            const disallowedDomains = ['https://www.4chan.org']
            const domain = parsedUrl.hostname

            if (disallowedDomains.includes(domain)) {
              return false
            }

            return true
          } catch {
            return false
          }
        },
        shouldAutoLink: url => {
          try {
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

            const disallowedDomains = ['https://www.4chan.org']
            const domain = parsedUrl.hostname

            return !disallowedDomains.includes(domain)
          } catch {
            return false
          }
        },

      }),
      Document,
      Text,
      Paragraph,
      BulletList,
      OrderedList,
      ListItem,
      TextStyle,
      Underline,
      FontFamily,
      Highlight.configure({multicolor: true}),
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      ImageResize,
    ],
    content: "<p></p>",
  });

  const [highlightColor, setHighlightColor] = React.useState("#ff0000");
  const [showPicker, setShowPicker] = React.useState(false);

  const [ismenuOpen] = useAtom(isMenuOpen);

  const setLink = () => {
    const previousUrl = editor?.getAttributes("link").href; 
    const url = window.prompt("Enter the URL", previousUrl || "https://");
  
    if (url === null || url.trim() === "") return;
  
    const validUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
  
    editor?.chain().focus().extendMarkRange("link").setLink({ href: validUrl }).run();
  };
  
  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = event.target.value;
    if (selectedFont) {
      editor?.chain().focus().setFontFamily(selectedFont).run();
    }
  };

  if (!editor) {
    return null;
  }

  const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      editor?.chain().focus().setImage({ src: base64 }).run();
    };
    reader.readAsDataURL(file);
  };

  const jsonContent = editor.getJSON();
  console.log("Editor JSON Content:", jsonContent);

  return (
    <div className="border py-4 w-full">
      <div className={`fixed top-0 ml-auto mt-20 border-t border-b border-r z-30 mb-2 flex items-center justify-evenly w-[75%] bg-gray-100 py-1 px-2 ${ismenuOpen ? "hidden" : "block"}`}>
        <select
          onChange={(e) => {
            const level = parseInt(e.target.value);
            if (level) {
              editor.chain().focus().toggleHeading({ level: level as any }).run();
            }
          }}
          defaultValue=""
          className="hover:bg-white bg-inherit focus:outline-none rounded"
        >
          <option value="">Normal Text</option>
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
          <option value="4">H4</option>
          <option value="5">H5</option>
          <option value="6">H6</option>
        </select>
        <div className="px-2 border-r border-l">
          <link
            href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap"
            rel="stylesheet"
          />
          <div className="control-group">
            <select onChange={handleFontChange} defaultValue="" className="hover:bg-white bg-inherit rounded focus:outline-none">
              <option value="" disabled>Select Font</option>
              {fonts.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <FaBold />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <FaItalic />
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()}>
          <FaStrikethrough />
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="border-r pr-2">
          <MdFormatUnderlined fontSize={20}/>
        </button>
        <div style={{ position: "relative", display: "inline-block" }}>
          <button
            style={{
              backgroundColor: highlightColor,
              width: "20px", 
              height: "20px", 
              borderRadius: "50%", 
              border: "2px solid #ccc", 
              cursor: "pointer",
              marginTop: "2px",
            }}
            onClick={() => {
              setShowPicker(!showPicker); 
              editor.chain().focus().toggleHighlight({ color: highlightColor }).run()
            }}
            className={editor.isActive('highlight', { color: highlightColor }) ? 'is-active' : ''}
          >
          </button>
          {showPicker && (
            <div
              style={{
                position: "absolute",
                top: "100%", 
                left: "50%",
                transform: "translateX(-50%)", 
                zIndex: 1000, 
                marginTop: "8px", 
                background: "#fff",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <HexColorPicker color={highlightColor} onChange={setHighlightColor} />
            </div>
          )}
      </div>
      <button
        onClick={() => editor.chain().focus().unsetHighlight().run()}
        disabled={!editor.isActive('highlight')}
        className=""
      >
        <TbBallpenOff fontSize={20}/>
      </button>
      <label className="cursor-pointer">
          <MdOutlineImage fontSize={20}/>
          <input type="file" accept="image/*" onChange={addImage} className="hidden" />
        </label>
        <button onClick={setLink} className={editor.isActive("link") ? "is-active" : ""}>
          <TbLink fontSize={20}/>
        </button>
        <button onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive("link")} className="border-r pr-2">
          <TbLinkOff fontSize={20}/>
        </button>
        <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
          >
            <RiMenu2Fill fontSize={20}/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
          >
            <RiMenu5Fill fontSize={20}/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
          >
            <RiMenu3Fill fontSize={20}/>
          </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <MdFormatListBulleted fontSize={20}/>
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <AiOutlineOrderedList fontSize={20}/>
        </button>
      </div>
      <div className="py-2 px-8 pt-12">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
