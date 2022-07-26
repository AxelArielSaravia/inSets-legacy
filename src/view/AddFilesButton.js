import { memo } from "react";
import useAddFiles from "../core/useAddFiles.js" 

export default memo(function AddFilesButton() {
  const addFiles = useAddFiles();

  const handelClick = (e) => { 
    e.currentTarget.value = "" 
  }

  const handelOnInput = (e) => {
    addFiles(e.currentTarget.files);
  }
  
  return (
    <label className="fileInput-contain">
      <input className="fileInput" 
        type="file" 
        onInput={handelOnInput}
        onClick={handelClick}
        name="file" 
        accept="audio/*"
        multiple
      />
      <div className="tool-button flex-row align-c justify-c">
        <i className="tool-button_icon fs-text bi bi-file-earmark-music"></i>
        <h4 className="fs-text">Add</h4>
      </div>
    </label>
  );
})