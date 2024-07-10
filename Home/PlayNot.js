import Smith from "../Profiles/male1.jpeg"
import Johnson from "../Profiles/male2.jpeg"
import Brown from "../Profiles/male3.jpeg"
import "./PlayNot.css";
import { motion} from "framer-motion";

const PlayNot = ({ play, duration }) => {

    const playName = play.title;
    const folderName = play.parentFolder;
    let face = Smith;

    if (play.coach === "Coach Johnson"){
      face = Johnson;
    }
    if (play.coach === "Coach Brown"){
      face = Brown;
    }

  return (
    <motion.div className="PlayNot" whileTap={{ scale: 0.9 }}>
        <div className="coachNotPic">
            <img src={face} className="pic" />
        </div>
        <div className="playNotItem1">{playName} was added to {folderName} </div>
        <div className="playNotItem2">{duration} ago</div>

    </motion.div>
  );
};

export default PlayNot;