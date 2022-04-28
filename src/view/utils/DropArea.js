const DropArea = (props) => (
    <> 
      <div className={"dragfile flex-row align-c justify-c "}>
        {props.disable
          ? <i className="bi bi-file-earmark-excel" style={{fontSize: "100px"}}></i>
          : <i className="bi bi-file-earmark-music" style={{fontSize: "100px"}}></i>
        }
      </div>
      <div>
        <p className="fs-text">{props.disable? "Drop disable" : "Drop files"}</p>
      </div>
    </>
);
export default DropArea;