import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Home.css";
import QuizNot from  "./QuizNot.js";
import plays from "../JSON/Plays.json"
import PlayNot from "./PlayNot.js";
import StartQuiz from "../Quiz/StartQuiz.js";
import Result from "../Quiz/Result.js";


const Home = ({ name, groups, QuizzesInfo, setAnswerList, answerList, Onote, OPB }) => {

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

  function Cresult() {
    setToResult(false);
  }

    //establish list of all plays
    const PlaysInfo = [];
    for (const [playId, playData] of Object.entries(plays)) {
      if (groups.includes(playData.group)) {
        PlaysInfo.push(playData);
      }
    }


    let alKeys = Object.keys(answerList);


    const [QuizList, setQuizList] = useState(QuizzesInfo.map((item, index) => {
      return <QuizNot Ostart={Ostart} quiz={item} time={`${index*2 + 3} hours left`}/>
    }));

    useEffect(() => {
      alKeys = Object.keys(answerList);
      const updatedQuizList = QuizzesInfo
        .filter((item) => !alKeys.includes(item.id.toString()))
        .map((item, index) => (
          <QuizNot
            quiz={item}
            idd={item.id}
            quizName={item.Title}
            sub={item.Subtitle}
            time={`${index * 2 + 3} hours left`}
            Ostart={Ostart}
          />
        ));
  
      setQuizList(updatedQuizList)
    }, [answerList]);



  return (
    <div className="Home" >
      {/* header */}
      <div className="greeting">Welcome Back, {name}.</div>

      {/* Notes and playbook flex */}
      <div className="NPFlex">
        <motion.div className="NPFlexItem" onClick={Onote} whileTap={{ scale: 0.9 }}>
          <div className="NPInnerFlex" >
            <svg
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              width="5vw"
              height=""
            >
              <path
                fill="currentColor"
                d="M904 512h-56c-4.4 0-8 3.6-8 8v320H184V184h320c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V520c0-4.4-3.6-8-8-8"
              ></path>
              <path
                fill="currentColor"
                d="M355.9 534.9L354 653.8c-.1 8.9 7.1 16.2 16 16.2h.4l118-2.9c2-.1 4-.9 5.4-2.3l415.9-415c3.1-3.1 3.1-8.2 0-11.3L785.4 114.3c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1.8-5.7 2.3l-415.8 415a8.3 8.3 0 0 0-2.3 5.6m63.5 23.6L779.7 199l45.2 45.1l-360.5 359.7l-45.7 1.1z"
              ></path>
            </svg>
            <div className="NPInnerFlexItem">Notes</div>
          </div>
        </motion.div>
        <motion.div className="NPFlexItem" onClick={() => OPB()} whileTap={{ scale: 0.9 }}>
          <div className="NPInnerFlex" >
            <svg
              width="6vw"
              height="4vw"
              viewBox="0 0 19 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.3214 6.34146H16.0312V3.57073C16.0312 3.13902 15.728 2.79024 15.3527 2.79024H8.67299L6.1856 0.0536585C6.15395 0.0195799 6.11232 0.000427553 6.06897 0H0.678571C0.303237 0 0 0.34878 0 0.780488V15.2195C0 15.6512 0.303237 16 0.678571 16H15.4799C15.7556 16 16.0058 15.8073 16.1097 15.5122L18.9512 7.41463C18.983 7.32195 19 7.22195 19 7.12195C19 6.69024 18.6968 6.34146 18.3214 6.34146ZM1.52679 1.7561H5.524L8.06016 4.54634H14.5045V6.34146H3.68973C3.41406 6.34146 3.16384 6.53415 3.05993 6.82927L1.52679 11.2V1.7561ZM14.9985 14.2439H2.01451L4.20502 8H17.1912L14.9985 14.2439Z"
                fill="black"
              />
            </svg>
            <div className="NPInnerFlexItem">Playbook</div>
          </div>
        </motion.div>
      </div>

      {/* Notifications */}
      <div className="notifications">
        <div className="notHeader">Notifications</div>
        <div className="notCap">
            {QuizList}
            {/* Map each play to a component */}
            {PlaysInfo.map((item, index) => {
                return <PlayNot play={item} duration={`${index*2 - 1 + 4} hours`}/>
            })}
        </div>
      </div>


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

export default Home;
