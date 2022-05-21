import { memo } from "react";

export default memo(function AddFilesButton(props) {
  const handelClick = (e) => { 
    e.currentTarget.value = "" 
  }

  const handelOnInput = (e) => {
    props.onClick(e.currentTarget.files) 
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