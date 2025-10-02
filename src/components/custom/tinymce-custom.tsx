"use client";

import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";

/* interface TinyMECEditorProps {
  id: string;
  value?: string;
  initialValue?: string;
  onBlur: (newValue: string) => void;
  onChange: (newValue: string) => void;
}
 */
export function wrapIfPlainText(input?: string): string | undefined {
  if (input === undefined) return undefined;

  // Check if string contains any HTML tags
  const hasHTML = /<\/?[a-z][\s\S]*>/i.test(input.trim());

  if (hasHTML) {
    return input; // already HTML, no wrapping
  }

  return `<p>${input}</p>`;
}

export default function TinyMECEditor(tinyMECEditorProps: IAllProps) {
  const [loading, setLoading] = useState(true);
  const height = 600;

  const editorRef = useRef(null);

  //Very Important! The onchange triggers when value is given with plain text!!!!

  return (
    <div style={{ position: "relative", width: "100%", height: height }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: height,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F5F5F5",
            zIndex: 1000,
            borderRadius: "10px",
          }}
        >
          <Loader />
        </div>
      )}

      <Editor
        {...tinyMECEditorProps}
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        apiKey="nh02gna9iklugsf1ygr50mi8ra9tmeswjj9u7cpo6jin8veq"
        licenseKey="gpl"
        onInit={(editor) => {
          setLoading(false);
          editorRef.current = editor;
        }}
        init={{
          extended_valid_elements:
            "iframe[src|frameborder|style|scrolling|class|width|height|name|align]",
          sandbox_iframes: false,
          sandbox_iframes_exclusions: [
            "youtube.com",
            "youtu.be",
            "vimeo.com",
            "player.vimeo.com",
            "dailymotion.com",
            "embed.music.apple.com",
            "open.spotify.com",
            "giphy.com",
            "dai.ly",
            "codepen.io",
          ],
          content_style:
            "img {max-width: 100%; height: auto} .mce-object-iframe, iframe, table {max-width: 100%;}",

          paste_as_text: false, // Disable this to allow images
          paste_data_images: true, // Allow pasting images
          menubar: false,
          body_id: "mamaloan",

          /*  editor.ui.registry.addButton("customInsertButton", {
              text: "My Button",
              onAction: (_) =>
                editor.insertContent(
                  `&nbsp;<strong>It's my button!</strong>&nbsp;`
                ),
            }); 
          }, */
          link_default_target: "_blank",
          promotion: false,
          skin: "oxide",
          icons: "default",
          content_css: "default",
          body_class: "all-initial",
          icons_url: "/tinymce/icons/default/icons.min.js",
          height: height,
          relative_urls: false,
          statusbar: false,

          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "autolink",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "wordcount",
          ],
          toolbar: `blocks | bold italic forecolor |  alignleft aligncenter alignright alignjustify | removeformat |
        | bullist numlist | table | hr link image media | fullscreen | `,
          /*   toolbar: `undo redo | blocks | bold italic forecolor 
        | alignleft aligncenter alignright alignjustify 
        | bullist numlist outdent indent 
        | removeformat | help | customInsertButton`, */
        }}
      />
    </div>
  );
}

function Loader() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-black mr-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}
