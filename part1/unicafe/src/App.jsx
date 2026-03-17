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
  /*const [good, setGood] = useState(0)
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
  )*/

   
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  return (
    <div>
        <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p> has {votes[selected]} votes</p>
      <button style={{"backgroundColor":"lightblue"}}
      onClick={() => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
      }}>vote</button>
      <button style={{"backgroundColor": "lightgray"}} onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
        <p> has {Math.max(...votes)} votes</p>
    </div>
  )


}

export default App