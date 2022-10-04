import React, { useRef, useEffect } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
  bundlingStatus: string;
}

const html = `
<html>
<head>
<style> html {background-color:white} </style>
</head>
<body>
<div id='root'></div>
<script>
const handleError = (err)=> {
  const root = document.querySelector('#root');
    root.innerHTML = '<div style="color:white; background-color:#f59c95">' + '<h4>Runtime error</h4>' + err + '</div>'
    console.log(err)
}
// to catch uncatched errors 
window.addEventListener('error',(event)=>{
  event.preventDefault();
  handleError(event.error);
})

window.addEventListener('message',(event)=>{
  try{
  eval(event.data);
  } catch(err) {
    handleError(err);
  }
},false)

</script>
</body>
</html>


`;

//{} - destructure of PreviewProps
const Preview: React.FC<PreviewProps> = ({ code, bundlingStatus }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    //timeout to make sure that our browser is have enough time to update source document and set up event listener that will come 50s latter
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper grow ">
      <iframe
        className="bg-stone-100 w-full"
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {bundlingStatus && (
        <div className="bg-red-300 text-white absolute top-3 left-3">
          {bundlingStatus}
        </div>
      )}
    </div>
  );
};

export default Preview;
