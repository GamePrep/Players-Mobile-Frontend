import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Result.css";
import Swiper from "swiper";
import "/node_modules/swiper/swiper.min.css";
import ben from "./quizProf/ben.jpeg";
import griffin from "./quizProf/griff.jpeg";
import christian from "./quizProf/prof.webp";
import QuestionReview from "./QuestionReview";

const Result = ({
  close,
  quizQuestions,
  correctAnswers,
  userAnswers,
  pics,
  ansList,
  title,
}) => {
  const [underline, setUnderline] = useState(true);
  const [toQuestion, setToQuestion] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const swiperRef = useRef(null);
  const isCorrect = Array(correctAnswers.length).fill(false);
  const totalPTS = correctAnswers.length * 10;
  console.log(pics);
  console.log(ansList);
  let userPTS = 0;






  correctAnswers.map((num, index) => {
    if (num === userAnswers[index]) {
      isCorrect[index] = true;
      userPTS += 10;
    } else {
      isCorrect[index] = false;
    }
  });
  const PCT = (userPTS / totalPTS) * 100;

  const hslToRgb = (h, s, l) => {
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  };

  const calculateBorderColor = (PCT) => {
    const normalizedValue = Math.max(40, PCT); // Ensure the value is at least 40
    const adjustedValue = normalizedValue - 40; // Adjust the value to start from 0

    const hue = (adjustedValue / 60) * 120;

    const rgbColor = hslToRgb(hue / 360, 1, 0.5);
    return `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;
  };

  const borderColor = calculateBorderColor(PCT);

  useEffect(() => {
    if (swiperRef.current) {
      new Swiper(swiperRef.current, {
        // Swiper options
        direction: "horizontal",
        loop: false,
        slidesPerView: 1, // Show only one slide at a time
        spaceBetween: "30vw",
        allowTouchMove: false,

      });
    }
  }, []);

  const handlePrevSlide = () => {
    if (currentSlide === 1) {
      setUnderline(!underline);
      if (swiperRef.current) {
        swiperRef.current.swiper.slidePrev();
      }
      setCurrentSlide(0);
    }
  };

  const handleNextSlide = () => {
    if (currentSlide === 0) {
      setUnderline(!underline);
      if (swiperRef.current) {
        swiperRef.current.swiper.slideNext();
      }
      setCurrentSlide(1);
    }
  };

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

  function textSizeQuestion(txt) {
    if(txt.length > 30) {
      return "sTextQ";
    }
    else if (txt.length > 25){
      return "mTextQ";
    }
    else {
      return "lTextQ";
    }
  }



  function OQ(index){
    setCurrentQ(index)
    setToQuestion(true);
}
function CQ(){
    setToQuestion(false);
}




  return (
    <motion.div
      className="fullResult"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="Result-Cap">
        <div className="resultTitle">Quiz Results</div>
        <div className="resultSub">{title}</div>
        <div
          className="blueCircleResult"
          style={{
            borderColor: borderColor,
          }}
        >
          {`${PCT}%`}
        </div>

        <div className="swiperHeadFlex">
          <div className={underline ? "yr" : ""} onClick={handlePrevSlide}>
            Your Results
          </div>
          <div className={underline ? "" : "yr"} onClick={handleNextSlide}>
            Teammates
          </div>
        </div>

        <div className="swipeOverall">
          <div className="swiper-container" ref={swiperRef} >
            <div className="swiper-wrapper" >
              <div className="swiper-slide" style={{height:"120vw" ,overflow: "auto"}}>
                  {isCorrect.map((question, index) => (
                    <div className="questionWrapper" >
                    <div className="questionBoxCircle" onClick={() => OQ(index)}>
                      <div
                        className="questionCircle"
                        style={
                          isCorrect[index]
                            ? { borderColor: "green" }
                            : { borderColor: "red" }
                        }
                      >
                        {index+1}
                      </div>
                      <div
                        className="questionBox"
                        id={textSizeQuestion(quizQuestions[index])}
                        style={
                          isCorrect[index]
                            ? { borderColor: "green" }
                            : { borderColor: "red" }
                        }
                      >
                        {quizQuestions[index].length > 70 ? `${quizQuestions[index].substring(0, 70)}...`:quizQuestions[index] }
                      </div>
                    </div>
                    </div>
                  ))}
                </div>
              <div className="swiper-slide">
                <div className="teammatesWrapper">
                  <div className="teammateFlex">
                    <div className="teammateCircle">
                      <img src={griffin} className="teammatePic"></img>
                    </div>
                    <div className="teammateName">Griffin Speaks</div>
                    <div className="teammatePCT">98%</div>
                  </div>
                  <div className="teammateFlex">
                    <div className="teammateCircle">
                      <img src={ben} className="teammatePic"></img>
                    </div>
                    <div className="teammateName">Ben Hamilton</div>
                    <div className="teammatePCT">83%</div>
                  </div>
                  <div className="teammateFlex">
                    <div className="teammateCircle">
                      <img src={christian} className="teammatePic"></img>
                    </div>
                    <div className="teammateName">Christian Shimko</div>
                    <div className="teammatePCT">64%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="returnToHomeCap">
          <motion.div className="backToHome"  whileTap={{ scale: 0.9 }} onClick={close}>Return Home</motion.div>
        </div>

        <AnimatePresence
          initial={false}
          wait={true}
          onExitComplete={() => null}
        >
          {toQuestion && (
            <QuestionReview handleClose={CQ} correctIndex={correctAnswers[currentQ]} userIndex={userAnswers[currentQ]} tit={quizQuestions[currentQ]}  pic={pics[currentQ]} aList={ansList[currentQ]}/>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Result;
