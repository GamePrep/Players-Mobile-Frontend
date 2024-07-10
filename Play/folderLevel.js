import { useState, useEffect } from "react";
import "./Playbook.css";

const FolderLevel = ({ names, folderClicked, zzz, level }) => {
    
  const [styleList, setStyleList] = useState(Array.isArray(zzz) ? zzz : new Array(names.length).fill(false));
  const [key, setKey] = useState(0);


  useEffect(() => {
    setKey(prevkey => prevkey + 1);

  }, [setStyleList])
  

  function folderClickedNew(id, item) {
    let newList = new Array(names.length).fill(false);
    newList[id] = true;

    
    setStyleList(newList);

    folderClicked(level, item, newList);
  }


  return (
    
      <div className="folderLevel" key={key}>
        {names.map((item, index) => (
          <div className="folder"  key={key+index} style={styleList[index] ? {backgroundColor:"#0072E2", borderColor:"#0072E2"} : {backgroundColor:"white", borderColor:"white"} } onClick={() => folderClickedNew(index, item, styleList)}>
            <div className="folderName" style={styleList[index] ? {color:"white"} : {color:"black"}}>{item.name}</div>
            <svg width="2.7vw" height="2.7vw" viewBox="0 0 8 9" fill="none">
              <path
                d="M7.34642 3.31001C7.54282 3.42055 7.70799 3.59041 7.82342 3.80059C7.93886 4.01076 8 4.25294 8 4.5C8 4.74706 7.93886 4.98924 7.82342 5.19941C7.70799 5.40959 7.54282 5.57945 7.34642 5.68999L1.71182 8.85945C1.53154 8.96089 1.33119 9.00882 1.12981 8.99867C0.928428 8.98852 0.732695 8.92063 0.561191 8.80145C0.389688 8.68228 0.248106 8.51576 0.149888 8.31772C0.0516693 8.11968 7.40371e-05 7.89668 0 7.6699L0 1.33099C-6.03694e-05 1.10413 0.0514368 0.881023 0.1496 0.682861C0.247762 0.484698 0.38933 0.318062 0.560855 0.19878C0.73238 0.0794989 0.928166 0.0115344 1.12961 0.00134347C1.33106 -0.00884752 1.53148 0.0390734 1.71182 0.140554L7.34642 3.31001Z"
                fill={styleList[index] ? "white" : "black"}
              />
            </svg>
          </div>
        ))}
      </div>
    
  );
};

export default FolderLevel;
