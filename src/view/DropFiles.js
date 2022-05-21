import { memo, useEffect } from "react";

/**
 * @param {{ children: Function, render: Function, className?: string, style?: object}} props 
 * @returns 
 */
function DropFiles(props) {
  
  /**
   * @param {Event} e
   */
  const preventDefault = (e) => { e.preventDefault(); };

  useEffect(() => {
    window.addEventListener('dragover', preventDefault, false);
    window.addEventListener('drop', preventDefault, false);
    return (
      window.removeEventListener('dragover', preventDefault, false),
      window.removeEventListener('drop', preventDefault, false)
    );
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
    if ("onFileDrop" in props) {
      props.onFileDrop(e);
    }
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