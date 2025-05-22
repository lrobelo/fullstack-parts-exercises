import { useState } from 'react'

const Header = (props) => {
    return (
        <h1>{props.text}</h1>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>{props.text}</button>
    )
}

const StatisticLine = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    if (props.good + props.neutral + props.bad === 0) {
        return (
            <div>
                No feedback given
            </div>
        )
    }
    const average = ((props.good - props.bad) / (props.good + props.neutral + props.bad)).toFixed(1)
    const positive = ((props.good / (props.good + props.neutral + props.bad)) * 100).toFixed(1) + ' %'

    return (
        <table>
            <tbody>
                <StatisticLine text="good" value={props.good} />
                <StatisticLine text="neutral" value={props.neutral} />
                <StatisticLine text="bad" value={props.bad} />
                <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
                <StatisticLine text="average" value={average} />
                <StatisticLine text="positive" value={positive} />
            </tbody>
        </table>
    )
}
const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header text="give feedback" />
            <Button handleClick={() => setGood(good + 1)} text="good" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button handleClick={() => setBad(bad + 1)} text="bad" />
            <Header text="statistics" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App
