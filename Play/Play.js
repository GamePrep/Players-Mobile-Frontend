import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Play.css";
import m1 from "../Profiles/male1.jpeg";
import m2 from "../Profiles/male2.jpeg";
import m3 from "../Profiles/male3.jpeg";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const Play = ({setCap, currID, setFavoritePlays, favoritePlays, play, setPic, isFavv }) => {

  

  const images = [];
  let coachFace = m1;

  const divRef = useRef(null);

  let isFav = isFavv;


  (play.pic).map((i) => {
    const pic = require(`${i}`);
    images.push(pic);
  })

  switch(play.coach) {
    
    case "Coach Smith":
      coachFace = m3;
      break;

    case "Coach Brown":
      coachFace = m1;
      break;

    case "Coach Johnson":
      coachFace = m2;
      break;

    default:
    
  }

  



  function setfav(i) {
    if (isFav){
      let newFavs = favoritePlays;

      const index = newFavs.indexOf(i);
      
      const x = newFavs.splice(index, 1);

      setFavoritePlays(newFavs);

      divRef.current.style.backgroundColor = "rgb(255, 255, 255)";

      
      isFav = false;

      
    }
    else {

      let newFavs = favoritePlays;

      newFavs.push(i);

      setFavoritePlays(newFavs);
      
      
      divRef.current.style.backgroundColor = "rgb(0, 114, 226)";
      isFav = true;
    }
    
  }

  function setCapp () {
    setCap(currID);
  }
  



  return (
    <div className="playCap">
      <div className="PlayTitleFlex">
        <div className="playNameHead">{play.title}</div>
        <div className="playFolderHead">{play.parentFolder}</div>
      </div>

      <Swiper
        // install Swiper modules
        modules={[Pagination]}
        spaceBetween={"10vw"}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
        style={{ width: "90vw", position: "relative", marginTop: "4vw" }}
      >
        {images.map((img, index) => (
          
          <SwiperSlide
            style={{
              paddingBottom: "10vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vw",
            }}
          >
            <img
              src={img}
              onClick={() => setPic(img)}
              className="playPic2"
            ></img>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="BottomFlex">
        <motion.div
          className="captionBox"
          whileTap={{ scale: 0.9 }}
          onClick={setCapp}
        >
          <div className="coachPicPlayCap">
            <img src={coachFace} className="coachPlayPic" />
          </div>
          <div className="captionBoxTopFlex">
            <div className="captionName">{play.coach}</div>
            <div className="captionDate">2 Weeks ago</div>
          </div>
          <div className="captionText">
            {play.caption}
          </div>
        </motion.div>

        <div className="flexColumn">
          <motion.div
            className="box"
            onClick={() => setfav(currID)}
            ref={divRef}
            style={isFav ? {backgroundColor:"rgb(0, 114, 226)"} : {backgroundColor:"rgb(255, 255, 255)"}}
          >
            <svg
              width="5vw"
              height="5vw"
              className="star"
              viewBox="0 0 20 18"
              fill="none"
            >
              <path
                d="M10 1L7.5 7H1L6.5 11L4.5 17.5L10 13.5L15.5 17.5L13.5 11L19 7H12.5L10 1Z"
                fill="black"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </motion.div>
          <motion.div
            className="box"
            whileTap={{ scale: 0.9 }}
            onClick={setCapp}
          >
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
          </motion.div>
        </div>
      </div>

      
      
    </div>
  );
};

export default Play;
