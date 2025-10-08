import IframeResizer from "@iframe-resizer/react";
import React, { useEffect, useRef } from "react";

// Define the types for the props
interface IframeWithHtmlProps {
  htmlContent: string; // Raw HTML content to inject
}

const IframeWithHtml: React.FC<IframeWithHtmlProps> = ({ htmlContent }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    console.log(iframeRef.current?.height);
  });

  return (
    <>
      <IframeResizer
        checkOrigin={false}
        onReady={() => {}}
        forwardRef={iframeRef}
        license="GPLv3"
        scrolling={iframeRef.current?.height ? true : false}
        srcDoc={`<!DOCTYPE html>
          <html>
            <head>
             <link rel="stylesheet" href="/tinymce/skins/content/default/content.min.css" />
              <style>
  
          img {
            max-width: 100%;  
            height: auto;    
          
          }

           iframe, table {
            max-width: 100%;  
        
           
          }
        </style>
            </head>
            <body style="margin-inline:0"
            
            >
              ${htmlContent}
            </body>
            <script type='text/javascript' src='/tinymce/skins/content/default/iframeResizer.contentWindow.js'></script></html>
          </html>`}
        style={{
          padding: 0,
          width: "100%",
          height: iframeRef.current?.height || "100vh",
        }}
      />
    </>
  );
};

export default IframeWithHtml;
