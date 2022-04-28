const addFilesClass = "tool-button flex-row align-c justify-c";

export default function AddFilesButton(props) {

  const handelClick = (e) => { 
    if (props.disable) {
      e.preventDefault();
      return;
    }
    e.currentTarget.value = "" 
  }
  const handelOnInput = (e) => { props.onClick(e) }

  return (
    <label className={props.disable ? addFilesClass + " disable" : addFilesClass} >
      <input className="hidden" 
        type="file" 
        name="file" 
        accept="audio/*"
        multiple
        onInput={handelOnInput}
        onClick={handelClick}
      />
      <i className="tool-button_icon fs-text bi bi-file-earmark-music"></i>
      <h4 className="fs-text">Add</h4>
    </label>
  );
}