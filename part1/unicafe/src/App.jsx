import { useState } from 'react'


const Statistics = ({good, neutral, bad}) => {
    return <>
        <h1>statistics</h1>
        <p>good: {good}</p>
        <p>neutral: {neutral}</p>
        <p>bad: {bad}</p>
        <p>all: {good + neutral + bad}</p>
        <p>average: {(good - bad) / (good + neutral + bad) || 0} </p>
        <p>positive: {good / (good + neutral + bad) * 100 || 0} % </p>
   </>
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <h1>Give feedback</h1>
        <button style={{"backgroundColor":"blue", "color": "white"}}onClick={() => setGood(good + 1)}>good</button>
        <button style={{"backgroundColor":"gray", "color": "white"}} onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button style={{"backgroundColor":"red", "color": "white"}}  onClick={() => setBad(bad + 1)}>bad</button>
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App