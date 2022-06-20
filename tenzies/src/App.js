import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
// import DieFace from './DieFace'

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rollCount, setRollCount] = React.useState(0)

    const [second, setSecond] = React.useState(0);
    const [minute, setMinute] = React.useState(0);
    const [bestTime, setBestTime] = React.useState(() => JSON.parse(localStorage.getItem("bestTime")))

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])
    // localStorage.setItem("bestTime", JSON.stringify('10:00'))

    React.useEffect(() => {
        var timer
        if (!tenzies) {
             timer = setInterval(() => {
                if (second === 59) {
                    setMinute(minute + 1)
                    setSecond(0)
                }
                else {
                    setSecond(second + 1)
                }
            }
                , 1000)
        }
        else{
            clearInterval(timer)
        }
        return () => clearInterval(timer)
    },[second])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function rollDice() {
        if (!tenzies) {
            setRollCount(oldCount => oldCount + 1)
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }))
        } else {
            changeBestTime(time)
            setTenzies(false)
            setDice(allNewDice())
            setRollCount(0)
            setSecond(0)
            setMinute(0)

        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        }))
    }
    const changeBestTime = (time) => {
        const prevTimeArr = bestTime.split(":")
        const newTime = String(time)
        const newTimeArr = newTime.split(":")
        console.log(parseInt(prevTimeArr[0]) + "val: " + parseInt(newTimeArr[0]))
        console.log(parseInt(prevTimeArr[1]) + "val-1: " + parseInt(newTimeArr[1]))
        if (parseInt(prevTimeArr[0]) >= parseInt(newTimeArr[0])) {
            if (parseInt(prevTimeArr[0]) === parseInt(newTimeArr[0])) {
                if ((parseInt(prevTimeArr[1]) <= parseInt(newTimeArr[1]))) {
                   return
                }    
            }
            else{
                setBestTime(time)
                console.log(time)
                console.log("new best second")
                console.log(bestTime)
                localStorage.setItem("bestTime", JSON.stringify(time))
            }
        }

    }


    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ))
    var time = (minute < 10 ? "0" + minute : minute) + " : " + (second < 10 ? "0" + second : second)
    return (
        <>
            {/* <DieFace/> */}
            <main>
                {tenzies && <Confetti />}
                <h2>Best Time: {bestTime}</h2>
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same.
                    Click each die to freeze it at its current value between rolls.</p>
                <div className="dice-container">
                    {diceElements}
                </div>
                <div className="footer">
                    <h2>Time:{time}</h2>
                    <button
                        className="roll-dice"
                        onClick={rollDice}
                    >
                        {tenzies ? "New Game" : "Roll"}
                    </button>
                    <h2>Roll Count: {rollCount}</h2>
                </div>
            </main>
        </>
    )
}