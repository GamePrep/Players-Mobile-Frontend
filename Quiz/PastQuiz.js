import { motion} from "framer-motion";

import "./PastQuiz.css";

const PastQuiz = ({ quiz, answers, OCR}) => {

  const quizName = quiz.Title;

  const totalPTS = quiz.correct_answers.length * 10;
  let userPTS = 0;
  quiz.correct_answers.map((num, index) => {
    if (num === answers[index]) {
      userPTS += 10;
    }
  });
  const PCT = (userPTS / totalPTS) * 100;

  function OS (){
    OCR(quiz);
  }


  return (
    <motion.div className="PastQuiz" onClick={OS} whileTap={{ scale: 0.9 }}>
      <svg
        className="check"
        width="5.5vw"
        height=""
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" rx="12" fill="#0072E2" />
        <line
          y1="-0.5"
          x2="7.06771"
          y2="-0.5"
          transform="matrix(0.684031 0.729453 -0.709187 0.705021 6.21582 11.9111)"
          stroke="white"
        />
        <line
          y1="-0.5"
          x2="14.3545"
          y2="-0.5"
          transform="matrix(0.625477 -0.780243 0.761995 0.647583 11.0503 17.0667)"
          stroke="white"
        />
      </svg>
      <div className="PastQuizName">{quizName}</div>
        <div className="PastQuizScore">{`${PCT}%`}</div>
    </motion.div>
  );
};

export default PastQuiz;
