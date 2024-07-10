import {motion} from "framer-motion";
import "./pFilter.css"
import Backdrop from "./drop";

const Filter = ({handleClose, groupList, group, groupTF, setGroup}) => {
    console.log(groupList);
    console.log(groupTF);
    console.log(group);
      
    const gClick = (e) => {
        if(e.target.className == "groupText" || e.target.className == "groupText2" ){
            if(groupTF[e.target.parentElement.id] == true){
            
                if (groupList.length > 1)
                {
                    e.target.style.color = "#000000";
                    e.target.parentElement.style.border = "1.5px solid #707070";
                    let groupListBCopy = groupTF;
                    groupListBCopy[e.target.parentElement.id] = false;
                }
            
            }else{
            
                e.target.style.color = "#5259FB";
                e.target.parentElement.style.border = "1.5px solid #5259FB";
                let groupListBCopy = groupTF;
                groupListBCopy[e.target.parentElement.id] = true;
            
            }
        }
        
    }

    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity:0
        },
        visible: {
            y: "0",
            opacity:1,
            transition: {
                duration:0.1,
                type: "spring",
                damping: 22,
                stiffness: 400
            }
        },
        exit: {
            y: "100vh",
            opacity:0
        }
    }


    return(
        <Backdrop onClick={handleClose}>
            <motion.div
            onClick={(e) => {e.stopPropagation()}}
            variants={dropIn}
            initial="hidden"
            animate = "visible"
            exit="exit"
            className="pFilter"
            >
                <div className="pfHead">Personnel Filter</div>
                <div className="pfCap">
                    <div className="pfSub">Select Personnel:</div>
                        <div className="groups">
                            {groupList.map((item, index) => (
                                <motion.div  key={index} id={index} onClick={gClick} style={groupTF[index] ? {border : "1.5px solid #5259FB"} : {border : "1.5px solid #707070"}} className="group"><div style={groupTF[index] ? {color : "#5259FB"} : {color : "#000000"}}  className="groupText">{item}</div></motion.div>
                            ))}
                        </div>
                </div>
                <div className="flexButton">
                    <motion.button className="goBut" whileTap={{scale:.9, color:"#8186FF"}}onClick={handleClose}>Go</motion.button>
                </div>
            </motion.div> 
        </Backdrop>
    )
}

export default Filter;