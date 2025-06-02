  import { useState, useEffect } from 'react'
  import { Flex, Progress } from 'antd';
  import { DotLottieReact } from '@lottiefiles/dotlottie-react';
  import './App.css'

  function App() {
    const [name, setName] = useState('')
    const [timeSet, setTimeSet] = useState(10)
    const [seconds, setSeconds] = useState(timeSet)
    const [timerActive, setTimerActive] = useState(false)
    const [finished, setFinished] = useState(false)
    const [moti, setMoti] = useState('')
    const [runCnt, setRunCnt] = useState(0)


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
            setRunCnt(runCnt + 1)
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
      setSeconds(timeSet)
      alert(`Hello, ${name}!`)
    }

    const resetTimer = () => {
      setSeconds(timeSet)
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
              <input
                  type="text"
                  value={timeSet}
                  onChange={e => setTimeSet(Number(e.target.value))}
                  placeholder="Time Set"
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
          <Flex gap="small" vertica>
            <Progress percent={Math.round((timeSet -seconds) / timeSet * 100)}  />
          </Flex>
          <div className="confetti">
            {finished && (
                <div className="confetti">
                  <DotLottieReact
                      src="https://lottie.host/49ab0238-f0cb-42f3-813a-cfcd1aa2d6a4/OLpeyuhECq.lottie"
                      autoplay
                      loop={false}
                  />
                </div>
            )}
          </div>

          <div className="runCnt">
            {runCnt}
          </div>
        </>
    )
  }

  export default App
