import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Attempt.css";
import Question from "./Question";
import Swiper from "swiper";
import Result from "./Result.js";
import "/node_modules/swiper/swiper.min.css";

const Attempt = ({ SAL, idd, handleClose, quiz, handlePrevPage }) => {
  // time for current question

  const [ansSheet, setANS] = useState(
    Array(quiz.correct_answers.length).fill(0)
  );

  const [PicURL, setPicURL] = useState(require(`./Plays/SL.jpg`));
  const [nextText, setNextText] = useState("Next");
  const [time, setTime] = useState(30);
  const swiperRef = useRef(null);
  const [qNum, setQNUM] = useState(1);
  const [isPic, setIsPic] = useState(false);
  const [toResult, setToResult] = useState(false);
  const circleLength = 2 * Math.PI * 110;
  const strokeDashoffset = (1 - time / 30) * circleLength;

  function OCresults() {
    SAL((prevState) => ({
      ...prevState,
      [idd]: ansSheet,
    }));
    setToResult(!toResult);
  }

  const goNext = () => {
    if (qNum < quiz.questions.length) {
      setQNUM(qNum + 1);
      setTime(30);
      if (qNum === quiz.questions.length - 1) {
        setNextText("Submit");
      }
      setPicURL(require(`${quiz.pics[qNum]}`));
    } else {
      OCresults();
    }
    setIsPic(false);
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  useEffect(() => {
    if (toResult) {
      return;
    }

    const timerInterval = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    if (time === 0) {
      goNext();
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [time]);

  function setPic() {
    setIsPic(!isPic);
  }

  useEffect(() => {
    if (swiperRef.current) {
      new Swiper(swiperRef.current, {
        direction: "horizontal",
        loop: false,
        slidesPerView: 1, 
        spaceBetween: "30vw",
        allowTouchMove: false,
      });
    }
  }, []);


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

  function closeAttempt() {
    handleClose();
    handlePrevPage();
  }

  return (
    <motion.div
      className="fullAttempt"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="attempt-Cap">
        
        <div className="attemptHead">{quiz.Title}</div>
        <div className="attemptSub">{`Question ${qNum}/${quiz.questions.length}`}</div>

        <div className="circleCapA">
          <svg
            width="19vw"
            height="21vw"
            viewBox="0 0 239 239"
            fill="none"
            className="blueCircleA"
            
          >
            <circle
              cx="119.5"
              cy="119.5"
              r="110"
              stroke="#0072E2"
              stroke-width="19"
              style={{
                strokeDasharray: circleLength,
                strokeDashoffset: strokeDashoffset
              }}
            />
          </svg>
          <div className="quizPTSA">{time}</div>
        </div>

        <div className="swiper-container" ref={swiperRef}>
          <div className="swiper-wrapper">
            {ansSheet.map((question, index) => (
              <div key={index} className="swiper-slide" id="questionSwiperItem">
                <Question
                  setPic={setPic}
                  setANS={setANS}
                  i={index}
                  aList={quiz.possible_answers[index]}
                  tit={quiz.questions[index]}
                  ans={ansSheet}
                  p={quiz.pics[index]}
                />
              </div>
            ))}
          </div>
        </div>

        <motion.div className="sOn" whileTap={{ scale: 0.9 }} onClick={goNext}>
          {nextText}
        </motion.div>

        <AnimatePresence
          initial={false}
          wait={true}
          onExitComplete={() => null}
        >
          {isPic && (
            <div className="playPicCapVar" onClick={setPic}>
              <img src={PicURL} className="playPicVar"></img>
            </div>
          )}
        </AnimatePresence>

        

        <AnimatePresence
          initial={false}
          wait={true}
          onExitComplete={() => null}
        >
          {toResult && (
            <Result
              close={closeAttempt}
              title={quiz.Title}
              sub={quiz.Subtitle}
              quizQuestions={quiz.questions}
              correctAnswers={quiz.correct_answers}
              userAnswers={ansSheet}
              pics={quiz.pics}
              ansList={quiz.possible_answers}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Attempt;
