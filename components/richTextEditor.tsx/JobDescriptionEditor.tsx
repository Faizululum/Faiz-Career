import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { ControllerRenderProps } from "react-hook-form";

interface iAppProps {
  field: ControllerRenderProps;
}

const JobDescriptionEditor = ({ field }: iAppProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
              types: ["heading", "paragraph"],
            }),
            Typography,
        ],
        immediatelyRender: false,
        editorProps: {
          attributes: {
            class: "min-h-[300px] max-w-none p-4 focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert",
          }
        },
        onUpdate: ({editor}) => {
          field.onChange(JSON.stringify(editor.getJSON()));
        },
        content: field.value ? JSON.parse(field.value) : "",
    });
  return (
    <div className="w-full border rounded-lg bg-card overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default JobDescriptionEditor