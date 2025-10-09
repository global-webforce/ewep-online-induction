import "./html-preview.scss";

interface HtmlPreviewProps {
  htmlContent: string;
}

// Display HTML without tailwind affecting the content
// https://stackoverflow.com/questions/61039259/disable-tailwind-on-a-div-or-component

export default function HtmlPreview({ htmlContent }: HtmlPreviewProps) {
  return (
    <div
      className="content-sandbox  "
      dangerouslySetInnerHTML={{
        __html: `
   
          ${htmlContent}
        `,
      }}
    />
  );
}
