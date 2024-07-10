import { motion} from "framer-motion";
import "./RFS.css";
import plays from "../JSON/Plays.json";

const RFS = ({ closeSearch, CRFS, head, currList, setCurrentPlays }) => {
  
  function SCP(plays) {
    if (plays.length !== 0) {
      setCurrentPlays(plays);
      closeSearch();
    }
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

  return (
    <motion.div
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="rfsFull"
    >
      <div onClick={CRFS} className="back-container">
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

      <div className="RFS-Cap">
        <div className="RFShead">{head}</div>

        <div className="viewAllRFS" onClick={() => SCP(currList)}>
          Study All Plays
        </div>

        <div className="RFSBottomCap">
          {currList.map((i, index) => {
            if ((index + 3) % 3 == 0) {
              if (currList.length - index > 2) {
                return (
                  <div className="playRowRFS">
                    <div
                      className="play"
                      onClick={() => SCP([currList[index]])}
                    >
                      <div className="playPicRFS">
                        <img src={require(`${plays[currList[index]].pic[0]}`)} className="playPicInRFS" />
                      </div>
                      <div className="playTitleB">
                        {plays[currList[index]].title.substring(0, 17)}
                      </div>
                    </div>
                    <div
                      className="play"
                      onClick={() => SCP([currList[index + 1]])}
                    >
                      <div className="playPicB">
                        <img src={require(`${plays[currList[index+1]].pic[0]}`)} className="playPicIn" />
                      </div>
                      <div className="playTitleB">
                        {plays[currList[index + 1]].title.substring(0, 17)}
                      </div>
                    </div>

                    <div
                      className="play"
                      onClick={() => SCP([currList[index + 2]])}
                    >
                      <div className="playPicB">
                        <img src={require(`${plays[currList[index+2]].pic[0]}`)} className="playPicIn" />
                      </div>
                      <div className="playTitleB">
                        {plays[currList[index + 2]].title.substring(0, 17)}
                      </div>
                    </div>
                  </div>
                );
              } else if (currList.length - index > 1) {
                return (
                  <div className="playRowRFS">
                    <div
                      className="play"
                      onClick={() => SCP([currList[index]])}
                    >
                      <div className="playPicRFS">
                        <img src={require(`${plays[currList[index]].pic[0]}`)} className="playPicInRFS" />
                      </div>
                      <div className="playTitleB">
                        {plays[currList[index]].title.substring(0, 17)}
                      </div>
                    </div>
                    <div
                      className="play"
                      onClick={() => SCP([currList[index + 1]])}
                    >
                      <div className="playPicB">
                        <img src={require(`${plays[currList[index+1]].pic[0]}`)} className="playPicIn" />
                      </div>
                      <div className="playTitleB">
                        {plays[currList[index + 1]].title.substring(0, 17)}
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="playRowRFS">
                    <div
                      className="play"
                      onClick={() => SCP([currList[index]])}
                    >
                      <div className="playPicRFS">
                        <img src={require(`${plays[currList[index]].pic[0]}`)} className="playPicInRFS" />
                      </div>
                      <div className="playTitleB">
                        {plays[currList[index]].title.substring(0, 17)}
                      </div>
                    </div>
                  </div>
                );
              }
            }
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default RFS;
