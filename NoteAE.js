import { useState } from "react";
import "./NoteAE.css";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";

const NoteAE = ({ close, noteList, currNote,setNoteList}) => {

    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedC, setIsFocusedC] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState(currNote == "-1" ? "New Note" :currNote);
    const [inputValueContent, setInputValueContent] = useState(currNote == "-1" ? "Click to add text" : (noteList[currNote])["inputValueContent"]);
    const handleChangeTitle = (event) => {
      setInputValue(event.target.value);
    };
    const handleChangeContent = (event) => {
      setInputValueContent(event.target.value);
    };

    

    function delNote() {
      let NL = noteList;
      delete NL[currNote];
      setNoteList(prevState => {
        const newState = { ...prevState };
      
        delete newState[currNote];
      
        return newState;});
      
      close()
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

  const clear = (event) => {
    if (event.target.value === "New Note" ) {
    event.target.value = "";
    }
    setIsFocused(true);
  };
  const clear2 = (event) => {
    if (event.target.value === "Click to add text") {
    event.target.value = "";
    }
    setIsFocusedC(true);
  };

  function openModal () {
    setIsModalOpen(!isModalOpen);
  }


  function goBack () {
    if (inputValue != "New Note"){
      setNoteList(prevState => ({
        ...prevState, // Spread the previous state
        [inputValue]: {inputValueContent}, // Update with new key-value pair, value is empty for now
      }));
    }
    
    close();
  }

  

  return (
    <motion.div
      className="fullNoteAE"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div onClick={goBack} className="back-containerProf">
        <svg
          width="2vw"
          height="5.1vw"
          className="triBack"
          viewBox="0 0 99 109"
          fill="none"
        >
          <path d="M0 54.5L98.25 0.373413L98.25 108.627L0 54.5Z" fill="black" />
        </svg>
        <div className="backTxtProf">Back</div>
      </div>

      <svg
        width="6vw"
        height="6vw"
        viewBox="0 0 18 18"
        fill="none"
        className="trash"
        onClick={openModal}
      >
        <path
          d="M5.73438 1.95312H5.5625C5.65703 1.95312 5.73438 1.87578 5.73438 1.78125V1.95312ZM5.73438 1.95312H12.2656V1.78125C12.2656 1.87578 12.343 1.95312 12.4375 1.95312H12.2656V3.5H13.8125V1.78125C13.8125 1.02285 13.1959 0.40625 12.4375 0.40625H5.5625C4.8041 0.40625 4.1875 1.02285 4.1875 1.78125V3.5H5.73438V1.95312ZM16.5625 3.5H1.4375C1.05723 3.5 0.75 3.80723 0.75 4.1875V4.875C0.75 4.96953 0.827344 5.04688 0.921875 5.04688H2.21953L2.7502 16.2832C2.78457 17.0158 3.39043 17.5938 4.12305 17.5938H13.877C14.6117 17.5938 15.2154 17.018 15.2498 16.2832L15.7805 5.04688H17.0781C17.1727 5.04688 17.25 4.96953 17.25 4.875V4.1875C17.25 3.80723 16.9428 3.5 16.5625 3.5ZM13.7115 16.0469H4.28848L3.76855 5.04688H14.2314L13.7115 16.0469Z"
          fill="#FE0909"
        />
      </svg>

      <div className="noteAECap">
        <input
          style={isFocused || currNote != "-1" ? { color: "#2d2d2d" } : { color: "#bcbcbc" }}
          className="newNoteTitle"
          type="text"
          defaultValue={inputValue}
          onClick={clear}
          onChange={handleChangeTitle}
        ></input>
        <textarea
          style={isFocusedC || currNote != "-1"? { color: "#2d2d2d" } : { color: "#bcbcbc" }}
          className="newNoteContent"
          defaultValue={inputValueContent}
          onClick={clear2}
          onChange={handleChangeContent}
        ></textarea>
        
      </div>

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {isModalOpen && <Modal del={delNote} close={openModal} OC={close}/>}
      </AnimatePresence>

    </motion.div>
  );
};

export default NoteAE;
