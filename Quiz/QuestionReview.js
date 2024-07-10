import { motion } from "framer-motion";
import "./QuestionReview.css";

const QuestionReview = ({
  handleClose,
  correctIndex,
  userIndex,
  tit,
  pic,
  aList,
}) => {
  const QP = require(`${pic}`);

  const borderList = ["#CACACA", "#CACACA", "#CACACA", "#CACACA"]

  if(userIndex === correctIndex){
    borderList[userIndex] = "green";
  }
  else {
    borderList[userIndex] = "red";
    borderList[correctIndex] = "green";

  }
  

  function textSize(txt) {
    if (txt.length > 130) {
      return "xsText";
    } else if (txt.length > 115) {
      return "sText";
    } else if (txt.length > 80) {
      return "mText";
    } else if (txt.length > 50) {
      return "lText";
    } else {
      return "xlText";
    }
  }

  function textSizeAnswer(txt) {
    if (txt.length > 50) {
      return "sTextA";
    } else if (txt.length > 40) {
      return "mTextA";
    } else {
      return "lTextA";
    }
  }

  const dropIn = {
    hidden: {
      x: "100vw",
      opacity: 1,
    },
    visible: {
      x: "0vw",
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 30,
        stiffness: 300,
      },
    },
    exit: {
      x: "100vw",
      opacity: 1,
    },
  };


  return (
    <motion.div
      className="fullQuestion"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div onClick={handleClose} className="back-containerResult">
        <svg
          width="2vw"
          height="5.1vw"
          className="triBack"
          viewBox="0 0 99 109"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 54.5L98.25 0.373413L98.25 108.627L0 54.5Z" fill="black" />
        </svg>
        <div className="backTxtResult">Back</div>
      </div>
      <div className="QuestionReview">
        <div className="PnQ">
          <div className="inP">
            <div className="questionText" id={textSize(tit)}>
              {tit}
            </div>
          </div>
          <div className="inP">
            <div className="playPicCap">
              <img src={QP} className="playPic"></img>
            </div>
          </div>
        </div>

        <div className="answers">
          <div className={borderList[0] === "red" | borderList[0] === "green" ? "unAnswerResult" : "answerResult"} style={{ borderColor: borderList[0] }}>
            <div className="innerA" id={textSizeAnswer(aList[0])}>
              {aList[0]}
            </div>
          </div>
          <div className={borderList[1] === "red" | borderList[1] === "green" ? "unAnswerResult" : "answerResult"}  style={{ borderColor: borderList[1] }}>
            <div className="innerA"  id={textSizeAnswer(aList[1])}>
              {aList[1]}
            </div>
          </div>
          <div className={borderList[2] === "red" | borderList[2] === "green" ? "unAnswerResult" : "answerResult"}  style={{ borderColor: borderList[2] }}>
            <div className="innerA" id={textSizeAnswer(aList[2])}>
              {aList[2]}
            </div>
          </div>
          <div className={borderList[3] === "red" | borderList[3] === "green" ? "unAnswerResult" : "answerResult"}  style={{ borderColor: borderList[3] }}>
            <div className="innerA" id={textSizeAnswer(aList[3])}>
              {aList[3]}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionReview;
