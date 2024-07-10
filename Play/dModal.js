import { motion } from "framer-motion";
import "./dModal.css";

const Modal = ({close, del, currText}) => {

    const headText = "Delete Comment";
    const subText = "Are you sure you want to delete this comment? This action can not be undone.";
    const mainButton = "Delete";
    const subButton = "Cancel"

  const fadeIn = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 0.6,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 30,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const dropIn = {
    hidden2: {
      y: "-150vh",
      opacity: 1,
    },
    visible2: {
      y: "-55vh",
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 30,
        stiffness: 300,
      },
    },
    exit2: {
      y: "-150vh",
      opacity: 1,
    },
  };

  return (
    <div>
      <motion.div
        className="exitCommentModal-Cap"
        variants={dropIn}
        initial="hidden2"
        animate="visible2"
        exit="exit2"
        
      >
        <div className="modalHeadText">{headText}</div>
        <div className="modalSubText">{subText}</div>
        <motion.div className="modalMainButton" whileTap={{ scale: 0.9 }} onClick={() => del(currText)}>{mainButton}</motion.div>
        <div className="modalSubButton" onClick={close}>{subButton}</div>
      </motion.div>
      <motion.div
        className="exitCommentModal"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={close}
      ></motion.div>
    </div>
  );
};

export default Modal;
