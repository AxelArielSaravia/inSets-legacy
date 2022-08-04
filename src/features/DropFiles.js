import { memo, useEffect } from "react";
import { useAddFiles } from "../app/Globals.js";

/**
 * @param {{ children: Function, render: Function, className?: string, style?: object}} props 
 * @returns 
 */
function DropFiles(props) {
  const addFiles = useAddFiles();
  /**
   * @param {Event} e
   */
  const preventDefault = (e) => { e.preventDefault(); };

  useEffect(() => {
    window.addEventListener('dragover', preventDefault, false);
    window.addEventListener('drop', preventDefault, false);
    return () => {
      window.removeEventListener('dragover', preventDefault, false);
      window.removeEventListener('drop', preventDefault, false);
    };
  });

  /**
   * @param {DragEvent} e
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

   /**
   * @param {DragEvent} e
   */
  const handleFileDrop = (e) => {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  };

  return (
    <div
      style={props.style}
      onDragOver={handleDragOver}
      onDrop={handleFileDrop}
      className={props.className}
    >
      {props.children}
    </div>
  );
}

export default memo(DropFiles);