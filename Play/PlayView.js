import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./PlayView.css";
import plays from "../JSON/Plays.json";
import Pbsearch from "./pbsearch";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Play from "./Play";
import CommentModal from "./CommentModal";

const PlayView = ({
  setFavoritePlays,
  OPB,
  currentPlays,
  starred,
  favoritePlays,
  recent,
  setCurrentPlays,
  comments,
  titles,
  setComments
}) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [isCap, setIsCap] = useState(false);
  const [isPic, setIsPic] = useState(false);
  const [playList, setPlayList] = useState();
  const [key, setKey] = useState(0);
  const [PicURL, setPicURL] = useState(require(`../Quiz/Plays/SL.jpg`));
  const [currID, setCurrID] = useState(0);


  

  function setPic(img) {
    setPicURL(img);
    setIsPic(!isPic); 
  }

  useEffect(() => {
    const updatedPlayList = currentPlays.map((currID, index) => {
      let fr3 = favoritePlays.includes(currID);
      return (
        <SwiperSlide
        key={index}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          
          <Play
            key={index}
            setCap={setCap}
            currID={currID}
            favoritePlays={favoritePlays}
            setPic={setPic}
            isFavv={fr3}
            setFavoritePlays={setFavoritePlays}
            play={plays[currID]}
          >
          </Play>
        </SwiperSlide>
      );
    });
    
    setKey(key+1);
    setPlayList(updatedPlayList);
  }, [currentPlays]);

  function CS() {
    setOpenSearch(!openSearch);
  }


  function setCap(id) {
    setCurrID(id);
    setIsCap(!isCap);
  }

  return (
    <div className="PlayViewFull">
      <div className="playHeadFlex">
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="playHeadFlexItem"
          onClick={() => OPB()}
        >
          <svg width="5vw" height="5vw" viewBox="0 0 17 14" fill="none">
            <path
              d="M16.3929 5.54878H14.3438V3.12439C14.3438 2.74665 14.0724 2.44146 13.7366 2.44146H7.76004L5.53449 0.0469512C5.50617 0.0171324 5.46892 0.000374109 5.43013 0H0.607143C0.271317 0 0 0.305183 0 0.682927V13.3171C0 13.6948 0.271317 14 0.607143 14H13.8504C14.0971 14 14.321 13.8314 14.414 13.5732L16.9564 6.4878C16.9848 6.40671 17 6.31921 17 6.23171C17 5.85396 16.7287 5.54878 16.3929 5.54878ZM1.36607 1.53659H4.94252L7.21172 3.97805H12.9777V5.54878H3.30134C3.05469 5.54878 2.8308 5.71738 2.73783 5.97561L1.36607 9.8V1.53659ZM13.4198 12.4634H1.80246L3.76239 7H15.3816L13.4198 12.4634Z"
              fill="black"
            />
          </svg>
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="playHeadFlexItem"
          onClick={CS}
        >
          <svg
            width="8vw"
            height="8vw"
            viewBox="0 0 250 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="250" height="250" rx="78" fill="white" />
            <path
              d="M164 107.5C164 138.176 139.351 163 109 163C78.6486 163 54 138.176 54 107.5C54 76.8239 78.6486 52 109 52C139.351 52 164 76.8239 164 107.5Z"
              stroke="black"
              stroke-width="6"
            />
            <path
              d="M198.749 201.97L144.503 146.499"
              stroke="black"
              stroke-width="12"
            />
          </svg>
        </motion.div>
      </div>

      <Swiper
      key={key}
        spaceBetween={"20vw"}
        slidesPerView={1}
        direction="vertical"
        style={{ height: "156vw", position: "relative", top: "24vw" }}
      >
        {playList }
      </Swiper>

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {openSearch && (
          <Pbsearch
            titles={titles}
            setCurrentPlays={setCurrentPlays}
            CS={CS}
            starred={starred}
            recent={recent}
            favoritePlays={favoritePlays}
          />
        )}
      </AnimatePresence>

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {isCap && <CommentModal comments={comments} currID={currID} setComments={setComments} close={setCap} />}
      </AnimatePresence>

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {isPic && (
          <div className="playPicCapVar" onClick={setPic}>
            <img src={PicURL} className="playPicVar"></img>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlayView;
