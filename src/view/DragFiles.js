import { memo, useEffect, useState } from "react";
/**
 * @param {{ children: Function, render: Function, className?: string, style?: object}} props 
 * @returns 
 */
function DragFiles( props) {
  const [isDragActive, setIsDragActive] = useState(false);

  let counter = 1;

  const handleDragEnter = () => {
    counter++;
    setIsDragActive((state) => !state ? !state : state);
  };

  const handleDragLeave = () => {
    counter--;
    if (counter === 0) {
      setIsDragActive((state) => state? !state : state);
    }
  };

  const handleDrop = () => {
    counter = 0;
    setIsDragActive(() => false);
  };

  useEffect(() => {
    if (!isDragActive) {
      document.addEventListener('dragenter', handleDragEnter);
      document.addEventListener('dragleave', handleDragLeave);
      document.addEventListener('drop', handleDrop);
    }
    return () => {
      document.removeEventListener('dragenter', handleDragEnter);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('drop', handleDrop);
    };
  }, [isDragActive]);
  

  return (
    <div
      className={props.className}
      style={props.style}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
    { props.children(isDragActive) }
    </div>
  );
}

export default memo(DragFiles);