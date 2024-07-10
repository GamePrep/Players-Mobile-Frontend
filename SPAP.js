import { useState, useEffect, useRef } from "react";
import Foot from "./Foot/foot.js";
import quizzes from "./JSON/Quiz.json";
import Profs from "./JSON/profiles.json";
import Plays from "./JSON/Plays.json";
import Home from "./Home/Home.js";
import { motion, AnimatePresence } from "framer-motion";
import BGlogo from "./BGlogo/BGlogo.js";
import Quiz from "./Quiz/Quiz.js";
import "./SPA.css";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import "/node_modules/swiper/swiper.min.css";
import Profile from "./Profile.js";
import Notes from "./Notes.js";
import PlayView from "./Play/PlayView.js";
import Playbook from "./Play/Playbook.js";

const SPAP = ({ name }) => {
  const playerInfo = Profs[name];
  const [whichPage, setPage] = useState(1);
  const nameDB = name.charAt(0).toLowerCase() + name.slice(1);
  const firstName = playerInfo.name.split(" ")[0];
  const num = playerInfo.num;
  const pos = playerInfo.pos;
  const picName = playerInfo.pic;
  const groups = playerInfo.groups;
  const [answerList, setAnswerList] = useState({});
  const QuizzesInfo = [];
  const pic = require(`${picName}`);
  const [right, setRight] = useState("-30vw");
  const [openProf, setOpenProf] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [openPB, setOpenPB] = useState(false);
  const [noteList, setNoteList] = useState({});
  const [moveProf, setMoveProf] = useState(false);

  const [currentPlays, setCurrentPlays] = useState(playerInfo.Splays);
  const [favoritePlays, setFavoritePlays] = useState([1,6,7,10]);
  const [recentPlays, setRecentPlays] = useState((playerInfo.Splays).slice(0,6));
  const [coachPlays, setCoachPlays] = useState(playerInfo.Splays);


  const [comments, setComments] = useState({})

  const [group, setGroup] = useState(groups[0])
  const [groupTF, setGroupTF] = useState(new Array(groups.length).fill(false))
  let grouptf = groupTF
  grouptf[0] = true;



  

  let t = [];
  let p = [];




  coachPlays.map((value, index) => {
    t.push(Plays[value].title);
  });

  coachPlays.map((value, index) => {
    p.push(Plays[value].parentFolder);
  });




  

  for (const [quizId, quizData] of Object.entries(quizzes)) {
    if (groups.includes(quizData.Group)) {
      QuizzesInfo.push(quizData);
    }
  }

  function OProf() {
    setOpenProf(!openProf);
  }

  function Onote() {
    setOpenNote(!openNote);
  }

  function CPB(gs) {
    if(gs){
      goToSlide(2);
      setPage(2);
    }
    setOpenPB(false);
  }


  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      new Swiper(swiperRef.current, {
        initialSlide: 1,
        direction: "horizontal",
        loop: false,
        slidesPerView: 1,
        spaceBetween: "30vw",
        allowTouchMove: false,
      });
    }
  }, []);

  function goToSlide (index) {
    if(index == 2){
      setMoveProf(true);
    }
    else {
      setMoveProf(false);
    }
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index, 300); // 300 is the speed in milliseconds
    }
  };


  function OPB() {
    setOpenPB(!openPB);
  }

  return (
    <div className="appSPA">
      {/* Background Logo */}
      <BGlogo right={right} />

      {/*Profile Pic*/}
      <motion.div className={moveProf ? "profPic2": "profPic"} style={{transition:".22s ease-out"}} onClick={OProf} whileTap={{ scale: 0.9 }}>
        <img src={pic} className="pic"  />
      </motion.div>

      

      {/* Main Content */}
      <div className="swiper-container" ref={swiperRef}>
        <div className="swiper-wrapper">
          <div key={0} className="swiper-slide" id="questionSwiperItem">
            <Quiz
              name={firstName}
              setAnswerList={setAnswerList}
              answerList={answerList}
              groups={groups}
              quizzes={QuizzesInfo}
            />
          </div>
          <div key={1} className="swiper-slide" id="questionSwiperItem">
            <Home
            OPB={OPB}
              Onote={Onote}
              name={firstName}
              QuizzesInfo={QuizzesInfo}
              answerList={answerList}
              setAnswerList={setAnswerList}
              groups={groups}
            />
          </div>
          <div key={2} className="swiper-slide" id="questionSwiperItem">
            <PlayView   comments={comments} titles={t} setComments={setComments} setFavoritePlays={setFavoritePlays} OPB={OPB} favoritePlays={favoritePlays} recent={recentPlays} currentPlays={currentPlays} setCurrentPlays={setCurrentPlays} starred={coachPlays} />
          </div>
        </div>
      </div>

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {openProf && (
          <Profile
            close={OProf}
            pic={pic}
            num={num}
            name={playerInfo.name}
            group={groups[0]}
          />
        )}
      </AnimatePresence>

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {openNote && (
          <Notes close={Onote} noteList={noteList} setNoteList={setNoteList} />
        )}
      </AnimatePresence>

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {openPB && (
          <Playbook CPB={CPB} p={p} group={group} groupTF={groupTF} setGroupTF={setGroupTF} setGroup={setGroup} setCurrentPlays={setCurrentPlays} starred={coachPlays} groupList={groups}/>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Foot
        i={whichPage}
        setPage={setPage}
        goToSlide={goToSlide}
        setRight={setRight}
      />
    </div>
  );
};

export default SPAP;
