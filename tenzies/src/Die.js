import React from "react"
import DieFace from "./DieFace"
export default function Die(props) {
    
    const dieFaceIndex = props.value - 1; 

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white",
        borderRadius: "10px"
    }
    
    
    return (
        <div 
            className= "die"
            style={styles}
            onClick={props.holdDice}
        >
            {DieFace[dieFaceIndex]}
            {/* <h2 className="die-num">{props.value}</h2> */}

    </div> 
    
    )
}