import { useState } from "react"

function App() {
  const [isOpen, setIsopen] = useState(true)
  const [A, setA] = useState(false);
  const [B, setB] = useState(false);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState("");
  const [score, setScore] = useState(0)
  /* STILL TESTING THE BELOW */

  function handleCalculate() {
    setIsopen(false);
    if (weight === "" || height === "" || age === "") {
      alert("Please fill the requirements")
      setIsopen(true)
    }
    let value = (weight) / (height * height);
    let newValue = Math.round(value * 10) / 10;
    setScore(newValue)
  }
  function handleReset() {
    setA(false);
    setB(false);
    setWeight(0)
    setAge(0);
    setHeight("");
    setScore(0);
    setIsopen(true);
  }

  return (
    <>
      {isOpen && <Main isOpen={isOpen} setIsopen={setIsopen} >
        <h3 className="center">Calculate your BMI</h3>
        <Gender A={A} B={B} setA={setA} setB={setB} />
        <Height height={height} setHeight={setHeight} />
        <WeightAndAge weight={weight} age={age} setWeight={setWeight} setAge={setAge} />
        <button className="calculate" onClick={handleCalculate}>calculate</button>
      </Main>}
      {!isOpen && <SecondMain isOpen={isOpen} setIsopen={setIsopen} score={score} handleReset={handleReset} />}
    </>
  )
}


function Main({ children }) {

  return (

    <main>
      {children}
    </main>
  )
}

function Gender({ A, B, setA, setB }) {


  function handleClickA() {
    setA(true);
    setB(false);
  }

  function handleClickB() {
    setB(true);
    setA(false);
  }

  return <div className="gender">
    <div onClick={handleClickA} className={A ? "clicked highlight" : ""}>
      <p className="center">Male</p>
      <span className="icon">
        <i className="ri-men-line"></i>
      </span>
    </div>
    <div onClick={handleClickB} className={B ? "clicked highlight" : ""}>
      <p className="center">Female</p>
      <span className="icon">
        <i className="ri-women-line"></i>
      </span>
    </div>
  </div>
}

function WeightAndAge({ weight, setWeight, age, setAge }) {


  function handleIncreaseAge() {
    setAge(a => a + 1)
  }

  function handleDecreaseAge() {
    if (age > 0)
      setAge(a => a - 1)
  }

  function handleIncreseWeight() {
    setWeight(w => w + 1)
  }

  function handleDecreaseWeight() {
    if (weight > 0)
      setWeight(w => w - 1)
  }
  return (
    <>
      <div className="ageandweight">
        <div className="weight">
          <p className="center">WEIGHT</p>
          <div className="btn-container">
            <button onClick={handleDecreaseWeight}>-</button>
            <p>{weight}kg</p>
            <button onClick={handleIncreseWeight}>+</button>
          </div>
        </div>
        <div className="age">
          <p className="center">AGE</p>
          <div className="btn-container">
            <button onClick={handleDecreaseAge} >-</button>
            <p>{age}yrs</p>
            <button onClick={handleIncreaseAge}>+</button>
          </div>
        </div>
      </div>
    </>
  )
}
function Height({ height, setHeight }) {

  function handleChange(e) {
    const value = e.target.value;
    const numericValue = parseFloat(value);
    if (numericValue >= 0) {
      setHeight(numericValue);
    }
  }
  return (
    <div className="height">
      <p className="center">HEIGHT<sub> m</sub></p>
      <input type="number" value={height} onChange={handleChange} min="0" max="10" placeholder="0" />
      <p className="center">{height === "" || height === 0 ? "" : height + "M"}</p>
    </div>
  );
}


function SecondMain({ setIsopen, score, handleReset }) {
  function handleBack() {
    setIsopen(true)
  }
  return (
    <main>
      <div className="result-btn-div">
        <button onClick={handleBack}>BACK</button>
        <button onClick={handleReset}>RESET</button>
      </div>
      <p className="center result-txt">Your Result</p>
      <div className="result-container">
        <p className={score < 18.5 || score > 25 ? "red" : "green"}>{score < 18.5 ? "UNDERWEIGHT" : score > 18.5 && score < 24.9 ? "NORMAL WEIGHT" : score > 25 && score < 29.9 ? "OVERWEIGHT" : "OBESITY:"}</p>
        <h1 className="center">{score}</h1>
      </div>
      <div className="facts">
        <p>you are 50% percent bigger than the average</p>
      </div>
    </main>
  )
}


export default App;
