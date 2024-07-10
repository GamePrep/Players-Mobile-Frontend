import { useState, useEffect } from "react";
import "./Notes.css";
import { motion, AnimatePresence } from "framer-motion";
import NoteAE from "./NoteAE";

const Notes = ({ close, noteList, setNoteList }) => {

  const [openAE , setOpenAE]= useState(false);
  const [noteListCurrent, setNoteListCurrent] = useState([]);
  const [currNote, setCurrNote] = useState("-1");

  const [isNote, setIsNote] = useState(false);


function OAE (i) {
  setCurrNote(i);
  setOpenAE(!openAE)
}



useEffect(() => {
  setIsNote(true);
  console.log("hi")
  const updatedNoteList =Object.keys(noteList).map((item, index) => (
      <div onClick={() => OAE(item)} className="iNote">{item}</div>
    ));
  setNoteListCurrent(updatedNoteList);
}, [noteList]);




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
      className="fullNote"
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

     

      <div className="noteCap">

      <div className="headFlexNote">
        <div className="headTextNote">Notes</div>
        <svg
          width="9vw"
          height="9vw"
          viewBox="0 0 41 30"
          fill="none"
          indexNote={-1}
          className="addNote"
          onClick={() => OAE("-1")}
        >
          <rect
            x="0.5"
            y="0.5"
            width="40"
            height="29"
            rx="14.5"
            stroke="black"
          />
          <path
            d="M13.5432 20.8281C13.5939 20.8281 13.6447 20.8229 13.6955 20.8149L17.9662 20.0371C18.017 20.0266 18.0652 20.0028 18.1008 19.9633L28.8639 8.78623C28.8874 8.76184 28.9061 8.73286 28.9188 8.70097C28.9316 8.66907 28.9381 8.63487 28.9381 8.60034C28.9381 8.56581 28.9316 8.53161 28.9188 8.49972C28.9061 8.46782 28.8874 8.43885 28.8639 8.41445L24.6439 4.02959C24.5957 3.97949 24.5322 3.95312 24.4637 3.95312C24.3951 3.95312 24.3316 3.97949 24.2834 4.02959L13.5203 15.2066C13.4822 15.2462 13.4594 15.2937 13.4492 15.3464L12.7002 19.7813C12.6755 19.9226 12.6843 20.068 12.7259 20.2049C12.7675 20.3418 12.8406 20.4661 12.9389 20.5671C13.1064 20.7358 13.3172 20.8281 13.5432 20.8281ZM15.2545 16.2297L24.4637 6.66895L26.3248 8.60166L17.1156 18.1624L14.8584 18.5764L15.2545 16.2297ZM29.3438 23.043H10.6562C10.2068 23.043 9.84375 23.42 9.84375 23.8867V24.8359C9.84375 24.952 9.93516 25.0469 10.0469 25.0469H29.9531C30.0648 25.0469 30.1562 24.952 30.1562 24.8359V23.8867C30.1562 23.42 29.7932 23.043 29.3438 23.043Z"
            fill="black"
          />
        </svg>
      </div>

      <div className="today">Today</div>
      {Object.keys(noteList).length === 0 && <div className="nothing">No Notes</div>}
      {Object.keys(noteList).length > 0 && <div className="allNotes">
      {noteListCurrent}
    </div>}
      

      
      
      
      </div>



      

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {openAE && <NoteAE close={OAE} noteList={noteList} setNoteList={setNoteList} currNote={currNote} isNote={isNote}  />}
      </AnimatePresence>
        
    </motion.div>
  );
};

export default Notes;
