import { useState } from "react";
import "./Question.css";


const Question = ({ setPic, tit, aList, p, setANS, ans, i }) => {

  const QP = require(`${p}`);

  const [isClicked, setIsClicked] = useState([false,false,false,false])

  function selectedAnswer(id){
    let num = parseInt(id);
    let Alist = [false,false,false,false];
    Alist[num] = true;
    setIsClicked(Alist);
    const newANS = ans;
    newANS[i] = num;
    setANS(newANS);
  }

  function textSize(txt) {
    if(txt.length > 130) {
      return "xsText";
    }
    else if(txt.length > 115) {
      return "sText";
    }
    else if(txt.length > 80) {
      return "mText";
    }
    else if(txt.length > 50) {
      return "lText";
    }
    else {
      return "xlText";
    }
  }

  function textSizeAnswer(txt) {
    if(txt.length > 50) {
      return "sTextA";
    }
    else if (txt.length > 40){
      return "mTextA";
    }
    else {
      return "lTextA";
    }
  }

  return (
    <div className="Question">
        <div className="PnQ">
          <div className="inP">
            <div className="questionText" id={textSize(tit)}> {tit}  </div>
          </div>
          <div className="inP">
            <div className="playPicCap">
              <img src={QP} className="playPic" onClick={setPic}></img>
            </div>
          </div>
          
        </div>

        <div className="answers">
          <div className={isClicked[0] == true ? "unAnswer" : "answer"} onClick={() => selectedAnswer("0")}> <div className="innerA" id={textSizeAnswer(aList[0])}>{aList[0]}</div></div>
          <div className={isClicked[1] == true ? "unAnswer" : "answer"} onClick={() => selectedAnswer("1")}> <div className="innerA" id={textSizeAnswer(aList[1])}>{aList[1]}</div></div>
          <div className={isClicked[2] == true ? "unAnswer" : "answer"} onClick={() => selectedAnswer("2")}> <div className="innerA" id={textSizeAnswer(aList[2])}>{aList[2]}</div></div>
          <div className={isClicked[3] == true ? "unAnswer" : "answer"} onClick={() => selectedAnswer("3")}> <div className="innerA" id={textSizeAnswer(aList[3])}>{aList[3]}</div></div>
        </div>

        
    </div>
  );
};

export default Question;