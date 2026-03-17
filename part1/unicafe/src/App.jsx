import { useState } from 'react'


const Button = ({handleClick, text, backgroundColor}) => <button style={{"backgroundColor": backgroundColor, "color": "white"}} onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value}) => <tr><td style={{"fontWeight": "bold", "padding": "5px"}}>{text}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
    return <>
        <h1>statistics</h1>
        {good + neutral + bad === 0 ? (
            <p>No feedback given</p>
        ) : (
            <table>
                <tbody>
                <StatisticLine text="good" value={good} />
                <StatisticLine text="neutral" value={neutral} />
                <StatisticLine text="bad" value={bad} />
                <StatisticLine text="all" value={good + neutral + bad} />
                <StatisticLine text="average" value={(good - bad) / (good + neutral + bad) || 0} />
                <StatisticLine text="positive" value={good / (good + neutral + bad) * 100 || 0} />
                </tbody>
            </table>
        )}      
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
        <Button handleClick={() => setGood(good + 1)} text="good" backgroundColor="blue" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" backgroundColor="gray" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" backgroundColor="red" />
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App