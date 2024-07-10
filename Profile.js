import "./Profile.css";
import { motion } from "framer-motion";

const Profile = ({ close, name, num, group, pic }) => {
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
      className="fullProf"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div onClick={close} className="back-containerProf">
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
        <div className="backTxtProf">Back</div>
      </div>

      <div className="profCap">
        <div className="mainComponent">
          <div className="profPicProf" >
            <img src={pic} className="picProf" />
          </div>
          <div className="nameProf">{name}</div>
          <div className="groupProf">{`${group} #${num}`}</div>
          <div className="flexRect">
            <div className="innerSquare">
              <div className="ISheader">Quiz</div>
              <div className="ISscore" style={{ color: "#66B600" }}>
                88
              </div>
            </div>
            <div className="innerSquare">
              <div className="ISheader">Attendance</div>
              <div className="ISscore" style={{ color: "#00BB13" }}>
                92
              </div>
            </div>
            <div className="innerSquare">
              <div className="ISheader">GamePrep</div>
              <div className="ISscore" style={{ color: "#07D11B" }}>
                96
              </div>
            </div>
          </div>
        </div>
        <motion.div whileTap={{ scale: 0.9 }} className="LO"> Log Out</motion.div>
      </div>

        

    </motion.div>
  );
};

export default Profile;
