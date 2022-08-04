import { memo, useEffect, useState} from "react";
/**
 * @param {{ children: Function, render: Function, className?: string, style?: object}} props 
 * @returns 
 */
function DragFiles(props) {
  const [isDragActive, setIsDragActive] = useState(false);
  const start = props.start;
  let counter = 1;

  const handleDragEnter = () => {
    if (start) {
      counter++;
      setIsDragActive((state) => !state ? !state : state);
    }
  };

  const handleDragLeave = () => {
    if (start) {
      counter--;
      if (counter === 0) {
        setIsDragActive((state) => state? !state : state);
      }
    }
  };

  const handleDrop = () => {
    if (start) {
      counter = 0;
      setIsDragActive(() => false);
    }
  };

  useEffect(() => {
    if (start) {
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
    }
  }, [isDragActive, start]);
  

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