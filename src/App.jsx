import { useState } from 'react';

import { Step } from './components/Step';
import './App.css';

const dailySteps = [
  {
    recordedDate: '2026-03-26',
    stepCount: 1234,
  },
  {
    recordedDate: '2026-03-27',
    stepCount: 5678,
  },
];

function getYYYYMMDD() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため+1
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function App() {
  const [input, setInput] = useState(0);
  const [steps, setSteps] = useState(dailySteps);
  const [error, setError] = useState('');

  const handleRegister = () => {
    const step = Number(input);

    if (isNaN(step) || step <= 0) {
      setError('正しい歩数を入力してください');
      return;
    }

    // 同じ日付の場合はエラー
    const existingStep = steps.find((s) => s.recordedDate === getYYYYMMDD());
    if (existingStep) {
      setError('その日付の歩数は既に登録されています');
      return;
    }

    const newStep = {
      recordedDate: getYYYYMMDD(),
      stepCount: Number(input),
    };
    setSteps([...steps, newStep]);
    setInput(0);
    setError('');
  };

  const handleDelete = (recordedDate) => {
    setSteps(steps.filter((step) => step.recordedDate !== recordedDate));
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
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button className='add-button' onClick={handleRegister}>
          登録
        </button>
        {error && <p className='error-message'>{error}</p>}
      </div>

      <ul className='step-list'>
        {steps.map((step) => (
          <Step
            key={step.recordedDate}
            step={step}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
