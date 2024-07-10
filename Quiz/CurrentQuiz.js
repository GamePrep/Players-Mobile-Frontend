import { motion} from "framer-motion";

import "./CurrentQuiz.css";

const CurrentQuiz = ({ quiz, idd, Ostart, quizName, sub, timeLeft }) => {
  

  function OS (){
    console.log("hi")
    Ostart(quiz, idd);
  }



  ////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="CurrentQuiz">
      <div className="quizNameCurrent">{quizName}</div>
      <div className="quizSubCurrent">{sub}</div>
      <div className="timeLeftCurrent">{timeLeft}</div>
      <motion.button whileTap={{ scale: 0.9 }} className="GoQuiz" onClick={OS}>
        <svg
          width="10vw"
          height=""
          viewBox="0 0 72 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M71.4142 16.9142C72.1953 16.1332 72.1953 14.8668 71.4142 14.0858L58.6863 1.35786C57.9053 0.576815 56.6389 0.576815 55.8579 1.35786C55.0768 2.13891 55.0768 3.40524 55.8579 4.18629L67.1716 15.5L55.8579 26.8137C55.0768 27.5948 55.0768 28.8611 55.8579 29.6421C56.6389 30.4232 57.9053 30.4232 58.6863 29.6421L71.4142 16.9142ZM2.00001 13.5C0.895442 13.5 1.20401e-05 14.3954 1.20401e-05 15.5C1.20401e-05 16.6046 0.895442 17.5 2.00001 17.5V13.5ZM70 13.5L36 13.5V17.5L70 17.5V13.5ZM36 13.5L2.00001 13.5V17.5L36 17.5V13.5Z"
            fill="white"
          />
        </svg>
      </motion.button>

      
    </div>
  );
};

export default CurrentQuiz;

