import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./StartQuiz.css";
import Attempt from "./Attempt";

const StartQuiz = ({ SAL, idd, handleClose, quiz }) => {
  const quizPTS = quiz.questions.length * 10;
  const CPname = quiz.coachesPic;
  const QPname = quiz.coverPlay;
  const CP = require(`${CPname}`);
  const QP = require(`${QPname}`);

  const [attemptOpen, setAttemptOpen] = useState(false);

  function OCattempt(){
    setAttemptOpen(!attemptOpen);
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
      className="fullStart"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="start-Cap">
        <div onClick={handleClose} className="back-container">
          <svg
            width="2vw"
            height="5.1vw"
            className="triBack"
            viewBox="0 0 99 109"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 54.5L98.25 0.373413L98.25 108.627L0 54.5Z"
              fill="black"
            />
          </svg>
          <div className="backTxt">Back</div>
        </div>

        <div className="QuizTitle">{quiz.Title}</div>
        <div className="QuizSub">{quiz.Subtitle}</div>
        <div className="QuizGroup">{quiz.Group}</div>

        <div className="questions">{`${quiz.questions.length} Questions`}</div>
        <div className="disclaimer">
          As soon as the quiz starts you must finish all questions in order to
          receive full credit. Exiting the quiz with unanswered questions will
          result in zero for the respective questions.
        </div>
        <div className="circleCap">
          <svg
            width="25vw"
            height="25vw"
            viewBox="0 0 239 239"
            fill="none"
            className="blueCircle"
          >
            <circle
              cx="119.5"
              cy="119.5"
              r="110"
              stroke="#0072E2"
              stroke-width="19"
            />
          </svg>
          <div className="quizPTS">{quizPTS}</div>
          <div className="PTS">Pts</div>
        </div>

        <div className="previewCap">
          <div className="coachPrevPic">
            <img src={CP} className="pic" />
          </div>
          <div className="coachName">{quiz.Coach_name}</div>
          <div className="timeLeftPrev">11 Hours Left</div>
            <img src={QP} className="QP" />
          <motion.button className="startButton" whileTap={{ scale: 0.9 }} onClick={OCattempt}>Start</motion.button>
        </div>
      </motion.div>
      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {attemptOpen && (
          <Attempt SAL={SAL} handleClose={OCattempt} idd={idd} handlePrevPage={handleClose} quiz={quiz} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StartQuiz;
