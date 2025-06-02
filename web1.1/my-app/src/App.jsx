import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [seconds, setSeconds] = useState(10)
  const [timerActive, setTimerActive] = useState(false)
  const [finished, setFinished] = useState(false)
  const [moti, setMoti] = useState('')

  //motivation words
  const arr = ["You can do it", "Just Do It", "Never give up now", "Keep going, stay strong"]

  useEffect(() => {
    if (!timerActive) return

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev === 1) {
          clearInterval(interval)
          setTimerActive(false)
          setFinished(true)
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timerActive])

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * arr.length)
      setMoti(arr[randomIndex])
    }, 3000)

    return () => clearInterval(interval)
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Hello, ${name}!`)
  }

  const resetTimer = () => {
    setSeconds(10)
    setTimerActive(false)
    setFinished(false)
  }



  return (
      <>
        <div className="moti" style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
          {moti || "Get ready..."}
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <div style={{ marginTop: '20px' }}>
          {seconds > 0 ? (
              <>
                <button onClick={() => setTimerActive(prev => !prev)}>
                  {timerActive ? 'Stop' : 'Start'}
                </button>
                <button onClick={resetTimer} style={{ marginLeft: '10px' }}>
                  Reset
                </button>
                <div>{name}, {seconds} seconds left</div>
              </>
          ) : (
              <>
                <button onClick={resetTimer}>Try again</button>
                <div style={{ marginTop: '10px' }}>
                  {name && <strong>Congratulations, {name}, you did it!</strong>}
                </div>
              </>
          )}
        </div>
      </>
  )
}

export default App
