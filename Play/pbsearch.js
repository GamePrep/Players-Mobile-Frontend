import { motion, AnimatePresence } from "framer-motion";
import {useState } from "react";
import "./PBsearch.css";
import RFS from "./RFS";
import plays from "../JSON/Plays.json";

const Pbsearch = ({ CS, favoritePlays, starred, titles, recent, setCurrentPlays }) => {
  const [currList, setCurrList] = useState();
  const [currHead, setCurrHead] = useState("Recent");
  const [openRFS, setOpenRFS] = useState(false);
  const [SoRFS, setSORFS] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [resultList, setResultList] = useState([]);


  function SCP(p) {
    setCurrentPlays([p]);
    CS();
  }



  const filterResults = (query) => {
    let newR = [];
    if (!query) {
      setFilteredResults([]);
    } else {
      const filtered = titles.filter((item, index) => {
        if(item.toLowerCase().includes(query.toLowerCase())){
          newR.push(starred[index]);
        }
        return(item.toLowerCase().includes(query.toLowerCase()))
      }
      )
      setFilteredResults(filtered);
    }

    setResultList(newR);
  };


  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterResults(query);
  };

  function CRFS(name, list) {
    setCurrList(list);
    setCurrHead(name);
    setOpenRFS(!openRFS);
  }

  const clear = (event) => {
    if (event.target.value === "Search") {
      event.target.value = "";
    }
    setSORFS(true);
  };

  const reset1 = (event) => {
    if (event.target.value === "") {
      event.target.value = "Search";
      setSORFS(false);
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

  return (
    <motion.div
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="searchFull"
    >
      <div onClick={CS} className="back-container">
        <svg
          width="2vw"
          height="5vw"
          className="triBack"
          viewBox="0 0 99 109"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 54.5L98.25 0.373413L98.25 108.627L0 54.5Z" fill="black" />
        </svg>

        <div className="backTxt">Back</div>
      </div>

      <div className="search-Cap">
        <div className="search-box">
          <svg
            className="s-icon"
            width="10vw"
            height="10vw"
            viewBox="0 0 250 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M164 107.5C164 138.176 139.351 163 109 163C78.6486 163 54 138.176 54 107.5C54 76.8239 78.6486 52 109 52C139.351 52 164 76.8239 164 107.5Z"
              stroke="black"
              strokeWidth="6"
            />
            <path
              d="M198.749 201.97L144.503 146.499"
              stroke="black"
              strokeWidth="12"
            />
          </svg>
          <input
            onClick={clear}
            className="pbSearchbar"
            type="text"
            defaultValue="Search"
            onBlur={reset1}
            onChange={handleInputChange}
          ></input>
        </div>

        {SoRFS && (
          <div className="RFSBottomCap">
            {filteredResults.map((item, index) => {
              if ((index + 3) % 3 == 0) {
                if (filteredResults.length - index > 2) {
                  return (
                    <div className="playRowRFS">
                      <div className="play" onClick={() => SCP(resultList[index])}>
                        <div className="playPicRFS" >
                          <img src={require(`${plays[resultList[index]].pic[0]}`)} className="playPicInRFS" />
                        </div>
                        <div className="playTitleB">
                          {filteredResults[index]}
                        </div>
                      </div>
                      <div className="play" onClick={() => SCP(resultList[index+1])}>
                        <div className="playPicRFS">
                          <img src={require(`${plays[resultList[index+1]].pic[0]}`)} className="playPicInRFS" />
                        </div>
                        <div className="playTitleB">
                          {filteredResults[index + 1]}
                        </div>
                      </div>
                      <div className="play" onClick={() => SCP(resultList[index+2])}>
                        <div className="playPicRFS">
                          <img src={require(`${plays[resultList[index+2]].pic[0]}`)} className="playPicInRFS" />
                        </div>
                        <div className="playTitleB">
                          {filteredResults[index + 2]}
                        </div>
                      </div>
                    </div>
                  );
                } else if (filteredResults.length - index > 1) {
                  return (
                    <div className="playRowRFS">
                      <div className="play" onClick={() => SCP(resultList[index])}>
                        <div className="playPicRFS">
                          <img src={require(`${plays[resultList[index]].pic[0]}`)} className="playPicInRFS" />
                        </div>
                        <div className="playTitleB">
                          {filteredResults[index]}
                        </div>
                      </div>
                      <div className="play" onClick={() => SCP(resultList[index+1])}>
                        <div className="playPicRFS">
                          <img src={require(`${plays[resultList[index+1]].pic[0]}`)} className="playPicInRFS" />
                        </div>
                        <div className="playTitleB">
                          {filteredResults[index + 1]}
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="playRowRFS">
                      <div className="play" onClick={() => SCP(resultList[index])}>
                        <div className="playPicRFS">
                          <img src={require(`${plays[resultList[index]].pic[0]}`)} className="playPicInRFS" />
                        </div>
                        <div className="playTitleB">
                          {filteredResults[index]}
                        </div>
                      </div>
                    </div>
                  );
                }
              }
            })}
          </div>
        )}

        {!SoRFS && (
          <div className="ptype-flex">
            <div
              className="ptype-itemFlex"
              onClick={() => CRFS("Recent", recent)}
            >
              <div className="ptype-item">Recent</div>
              <svg
                className="arrowSearch"
                width="4vw"
                height="4vw"
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
            <div
              className="ptype-itemFlex"
              onClick={() => CRFS("Favorites", favoritePlays)}
            >
              <div className="ptype-item">Favorites</div>
              <svg
                className="arrowSearch"
                width="4vw"
                height="4vw"
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
            <div
              className="ptype-itemFlex"
              onClick={() => CRFS("Starred by Coach", starred)}
            >
              <div className="ptype-item">Starred by Coach</div>
              <svg
                className="arrowSearch"
                width="4vw"
                height="4vw"
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
          </div>
        )}
      </div>

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {openRFS && (
          <RFS
            CRFS={CRFS}
            head={currHead}
            closeSearch={CS}
            setCurrentPlays={setCurrentPlays}
            currList={currList}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Pbsearch;
