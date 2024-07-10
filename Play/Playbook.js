import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Playbook.css";
import folders from "../JSON/Folders.json";
import FolderLevel from "./folderLevel";
import Plays from "../JSON/Plays.json";
import Filter from "../pFilter";

const Playbook = ({ CPB, p, setCurrentPlays, starred, groupList, group,setGroup, setGroupTF, groupTF}) => {

  const [openFilter, setOpenFilter] = useState(false);
  function SOF (){
    setOpenFilter(!openFilter);
  }


  const [keyn, setKeyn] = useState(0);

  const [resultList, setResultList] = useState([]);

  const filterResults = (fName) => {
    let newR = [];
    
    p.forEach((element, index) => {
      if (element === fName.name) {
        newR.push(Plays[starred[index]]);
      }
    });
    setResultList(newR);
  };

  function SCP(p) {
    let pList = [];
    
    if (Array.isArray(p)){
      if (resultList.length > 0){
        resultList.map((i, index)=>{
          pList.push(i.id);
        })
      }
      if (resultList.length > 0) {
        setCurrentPlays(pList);
        CPB(true);
      }
      
    }
    else{
      setCurrentPlays([p]);
      CPB(true);
    }
    
    
  }

  /////////////////////////////////////////////recursive tree
  class node {
    constructor(name, childNodes, parentNode, ii) {
      this.name = name;
      this.childNodes = childNodes;
      this.parentNode = parentNode;
      this.ii = ii;
    }
  }
  let names = [];
  let parents = [];
  for (const [quizId, quizData] of Object.entries(folders)) {
    names.push(quizId);
    parents.push(quizData);
  }
  function recurseTree(name, parent, ii) {
    if (parents.includes(name)) {
      let childNodes = [];
      let i = 0;
      while (parents.includes(name)) {
        const index = parents.indexOf(name);
        childNodes.push(recurseTree(names[index], name, i));
        names.splice(index, 1);
        parents.splice(index, 1);
        i++;
      }
      return new node(name, childNodes, parent, ii);
    } else {
      return new node(name, [], parent, 0);
    }
  }
  const tree = recurseTree("Running Backs");

  ////////////////////////////////////////////recursive tree

  const [highestLevel, setHighestLevel] = useState(tree);
  const [highestLevel2, setHighestLevel2] = useState(tree);
  const [zzz, setZZZ] = useState([false, false, false]);
  const [isFirstRender, setIsFirstRender] = useState(false);
  const [nodeList, setNodeList] = useState([tree]);
  const [bof, setBof] = useState(true);
  let NLkey = 0;

  const [folderComponent, setFolderComponent] = useState(
    <FolderLevel
      folderClicked={folderClicked}
      names={highestLevel.childNodes}
    ></FolderLevel>
  );

  useEffect(() => {
    if (isFirstRender) {
      setFolderComponent(() => {
        let newFC = [];
        let newZZZ = new Array(highestLevel2.childNodes.length).fill(false);
        newZZZ[highestLevel.ii] = true;
        newFC.push(
          <FolderLevel
            folderClicked={folderClicked}
            names={highestLevel2.childNodes}
            keyn={keyn}
            zzz={bof ? zzz : newZZZ}
            level={1}
          ></FolderLevel>
        );
        newFC.push(
          <FolderLevel
            folderClicked={folderClicked}
            names={highestLevel.childNodes}
            keyn={keyn}
            level={2}
          ></FolderLevel>
        );
        return newFC;
      });
    }
    setIsFirstRender(true);
    filterResults(highestLevel);
    setKeyn((prevKey) => prevKey + 1);
  }, [highestLevel]);

  useEffect(() => {
    NLkey = nodeList.length;
  }, [nodeList]);

  function back() {
    if (nodeList.length > 2) {
      setBof(false);
      let nn = nodeList.slice();
      nn.pop();
      setNodeList(nn);

      setHighestLevel(highestLevel2);
      setHighestLevel2(nn[nn.length - 2]);
    }
  }

  function folderClicked(level, name, zzz) {
    setBof(true);
    if (level > 1) {
      let nn = nodeList.slice();

      nn.push(name);
      setNodeList(nn);

      setZZZ(zzz);
      setHighestLevel2(highestLevel);
      setHighestLevel(name);
    } else {
      let nn = nodeList.slice();
      if (NLkey > 1) {
        nn.splice(-1, 2);
      }

      nn.push(name);
      setNodeList(nn);

      setZZZ(zzz);
      setHighestLevel(name);
    }
  }

  function createLevel() {}

  function deleteLevel() {}

  function slideLevel() {}

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
      className="PlaybookFull"
    >
      <div onClick={() => CPB(false)} className="back-container">
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
        <div className="backTxt">Back</div>
      </div>

      <div className="pb-Cap">
        <div className="pbHead">
          <div className="pbHeadFlexFlex" onClick={SOF}>
            <div className="pbHeahGroup">{group}</div>
            <svg
              className="tri"
              width="4vw"
              height="4vw"
              viewBox="0 0 181 99"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M90.5 99L0.866364 0.75L180.134 0.75L90.5 99Z"
                fill="black"
              />
            </svg>
          </div>
        </div>

        <div className="pbTopCap" key={keyn}>
          <svg
            width="5.5vw"
            height="5.5vw"
            onClick={back}
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

          <div className="folderCap" key={keyn}>
            {folderComponent}
          </div>
        </div>

        <div className="pbLine"></div>

        <div className="viewAll" onClick={()=>SCP([])}>Study All Plays</div>

        <div className="pbBottomCap">
          {resultList.map((item, index) => {
            if ((index + 3) % 3 == 0) {
              if (resultList.length - index > 2) {
                return (
                  <div className="playRowRFS">
                    <div
                      className="play"
                      onClick={() => SCP(resultList[index].id)}
                    >
                      <div className="playPicRFS">
                        <img
                          src={require(`${resultList[index].pic[0]}`)}
                          className="playPicInRFS"
                        />
                      </div>
                      <div className="playTitleB">
                        {resultList[index].title}
                      </div>
                    </div>
                    <div
                      className="play"
                      onClick={() => SCP(resultList[index+1].id)}
                    >
                      <div className="playPicRFS">
                        <img
                          src={require(`${resultList[index+1].pic[0]}`)}
                          className="playPicInRFS"
                        />
                      </div>
                      <div className="playTitleB">
                      {resultList[index+1].title}
                      </div>
                    </div>
                    <div
                      className="play"
                      onClick={() => SCP(resultList[index+2].id)}
                    >
                      <div className="playPicRFS">
                        <img
                          src={require(`${resultList[index+2].pic[0]}`)}

                          className="playPicInRFS"
                        />
                      </div>
                      <div className="playTitleB">
                      {resultList[index+2].title}
                      </div>
                    </div>
                  </div>
                );
              } else if (resultList.length - index > 1) {
                return (
                  <div className="playRowRFS">
                    <div
                      className="play"
                      onClick={() => SCP(resultList[index].id)}
                    >
                      <div className="playPicRFS">
                        <img
                          src={require(`${resultList[index].pic[0]}`)}
                          className="playPicInRFS"
                        />
                      </div>
                      <div className="playTitleB">
                      {resultList[index].title}
                      </div>
                    </div>
                    <div
                      className="play"
                      onClick={() => SCP(resultList[index+1].id)}
                    >
                      <div className="playPicRFS">
                        <img
                          src={require(`${resultList[index+1].pic[0]}`)}
                          className="playPicInRFS"
                        />
                      </div>
                      <div className="playTitleB">
                      {resultList[index+1].title}
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="playRowRFS">
                    <div
                      className="play"
                      onClick={() => SCP(resultList[index].id)}
                    >
                      <div className="playPicRFS">
                        <img
                          src={require(`${resultList[index].pic[0]}`)}
                          className="playPicInRFS"
                        />
                      </div>
                      <div className="playTitleB">
                      {resultList[index].title}
                      </div>
                    </div>
                  </div>
                );
              }
            }
          })}
        </div>

      </div>

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {openFilter && (
          <Filter handleClose={SOF} groupTF={groupTF} setGroup={setGroup} setGroupTF={setGroupTF} group={group} groupList={groupList} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Playbook;

// groups={} groupList={} groupListB={} setGLB={}