import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CommentModal.css";
import coachDemo from "../Quiz/Profiles/male3.jpeg";
import Modal from "./dModal";

const CommentModal = ({ close, comments, setComments, currID }) => {
  const newComRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [pCommentList, setPCommentList] = useState();
  const [isModalOpen, setIsModalOpen] = useState();
  const [currText, setCurrText] = useState("");

  const clear = (event) => {
    setIsFocused(true);
    if (event.target.value === "Comment") {
      event.target.value = "";
    }
  };

  const fadeIn = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 2,
        type: "spring",
        damping: 30,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const riseIn = {
    hidden: {
      y: "250vw",
    },
    visible: {
      y: "105vw",
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 30,
        stiffness: 500,
      },
    },
    exit: {
      y: "250vw",
    },
  };

  function add() {
    let newComs = comments[currID];

    if (Array.isArray(newComs)) {
      newComs.push(newComRef.current.value);
    } else {
      newComs = [newComRef.current.value];
    }
    setComments((prevState) => ({
      ...prevState,
      [currID]: newComs,
    }));
    newComRef.current.value = "";
  }

  function OModal(item) {
    setCurrText(item);
    setIsModalOpen(!isModalOpen);
  }

  function delet(text) {
    let newComs = comments[currID];

    const index = newComs.indexOf(text);
    if (index > -1) {
      newComs.splice(index, 1);
    }


    setComments((prevState) => ({
      ...prevState,
      [currID]: newComs,
    }));

    OModal();
  }

  useEffect(() => {
    if (Array.isArray(comments[currID])) {
      const updatedComList = comments[currID].map((item, index) => (
        <div className="coachCommentBox" onClick={() => OModal(item)}>
          <div className="playerCommentText">{item}</div>
        </div>
      ));

      setPCommentList(updatedComList);
    }
  }, [comments]);

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="capBackdrop"
    >
      <motion.div
        variants={riseIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="commentsModal"
      >
        <div className="commentTopFlex">
          <svg
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            width="7vw"
            height="7vw"
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
          <svg
            onClick={close}
            className="arrowComments"
            width="5vw"
            height="5vw"
            viewBox="0 0 11 19"
            fill="none"
          >
            <path
              d="M9.5 1L1 9.5L9.5 18"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div className="commentsText">
          <div className="coachCommentBox">
            <div className="coachCommentText">
              Make sure the mike and will give a “strong right” or “strong left”
              call before the snap. Keep your eyes on the open man on the line
            </div>
            <div className="coachCommentPicCap">
              {" "}
              <img src={coachDemo} className="coachPlayPic" />
            </div>
          </div>

          <div className="pCommentsArea">{pCommentList}</div>
        </div>

        <div className="commentAddFlex">
          <input
            className={isFocused ? "addComment2" : "addComment"}
            onClick={clear}
            ref={newComRef}
            type="text"
            defaultValue="Comment"
          ></input>
          <motion.div whileTap={{ scale: 0.9 }} onClick={add} className="add">
            Add
          </motion.div>
        </div>

        <AnimatePresence
          initial={false}
          wait={true}
          onExitComplete={() => null}
        >
          {isModalOpen && <Modal del={delet} close={OModal} currText={currText} />}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default CommentModal;
