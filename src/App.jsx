import { useState } from 'react';

import { Step } from './components/Step';
import './App.css';

const dailySteps = [
  {
    recordedDate: '20260326',
    stepCount: 1234,
  },
  {
    recordedDate: '20260327',
    stepCount: 5678,
  },
];

function getYYYYMMDD() {
  const today = new Date();

  const yyyy = today.getFullYear();

  // getMonth() は 0〜11 で返ってくるため +1 が必要。padStartで2桁にゼロ埋めする
  const mm = String(today.getMonth() + 1).padStart(2, '0');

  // getDate() で日付を取得し、同じくゼロ埋めする
  const dd = String(today.getDate()).padStart(2, '0');

  return `${yyyy}${mm}${dd}`;
}

function App() {
  const [step, setStep] = useState(0);
  const [steps, setSteps] = useState(dailySteps);

  const handleRegister = () => {
    const newStep = {
      recordedDate: getYYYYMMDD(),
      stepCount: Number(step),
    };
    setSteps([...steps, newStep]);
    setStep(0);
  };

  return (
    <div className='app'>
      <h1>歩数登録アプリ</h1>
      <div className='step-form'>
        <label className='form-label' htmlFor='step-input'>
          歩数
        </label>
        <input
          id='step-input'
          className='step-input'
          type='number'
          onChange={(e) => setStep(e.target.value)}
          value={step}
        />
        <button className='add-button' onClick={handleRegister}>
          登録
        </button>
      </div>

      <ul className='step-list'>
        {steps.map((step) => (
          <Step key={step.recordedDate} step={step} />
        ))}
      </ul>
    </div>
  );
}

export default App;
