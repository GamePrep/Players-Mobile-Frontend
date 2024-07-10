import { useState, useEffect } from "react";
import "./Quiz.css";
import Result from "./Result.js";
import CurrentQuiz from "./CurrentQuiz.js";
import PastQuiz from "./PastQuiz.js";
import StartQuiz from "./StartQuiz.js";
import { AnimatePresence} from "framer-motion";

const Quiz = ({ quizzes, answerList, setAnswerList }) => {
  const [startOpen, setStartOpen] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState({});
  const [activeID, setActiveID] = useState(0);
  const [toResult, setToResult] = useState(false);

  function Ostart(quizz, id) {
    setActiveID(id);
    setActiveQuiz(quizz);
    setStartOpen(true);
  }
  function Cstart() {
    setStartOpen(false);
  }

  function Oresult(quizz) {
    setActiveQuiz(quizz);
    setToResult(true);
  }
  function Cresult() {
    setToResult(false);
  }

  let alKeys = Object.keys(answerList);

  const [QuizListCurrent, setQuizListCurrent] = useState();

  const [QuizListPast, setQuizListPast] = useState();

  useEffect(() => {
    alKeys = Object.keys(answerList);
    const updatedQuizList = quizzes
      .filter((item) => !alKeys.includes(item.id.toString()))
      .map((item, index) => (
        <CurrentQuiz
          quiz={item}
          idd={item.id}
          quizName={item.Title}
          sub={item.Subtitle}
          timeLeft={`${index * 2 + 3} hours left`}
          Ostart={Ostart}
        />
      ));

    const updatedQuizListPast = quizzes
      .filter((item) => alKeys.includes(item.id.toString()))
      .map((item, index) => (
        <PastQuiz
          whileTap={{ scale: 0.9 }}
          quiz={item}
          answers={answerList[item.id]}
          OCR={Oresult}
        />
      ));
    setQuizListPast(updatedQuizListPast);
    setQuizListCurrent(updatedQuizList);
  }, [answerList]);

  return (
    <div className="Quiz">
      {/* header */}
      <div className="currentQuiz">Current Quizzes</div>
      {QuizListCurrent}
      <div className="pastQuiz">Past Quizzes</div>
      {QuizListPast}

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {startOpen && (
          <StartQuiz
            SAL={setAnswerList}
            idd={activeID}
            quiz={activeQuiz}
            handleClose={Cstart}
          />
        )}
      </AnimatePresence>

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {toResult && (
          <Result
            close={Cresult}
            title={activeQuiz.Title}
            sub={activeQuiz.Subtitle}
            quizQuestions={activeQuiz.questions}
            correctAnswers={activeQuiz.correct_answers}
            pics={activeQuiz.pics}
            ansList={activeQuiz.possible_answers}
            userAnswers={answerList[activeQuiz.id]}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
