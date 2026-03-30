export const Step = ({ step, handleDelete }) => {
  const formattedStepCount = step.stepCount.toLocaleString();

  return (
    <li>
      {step.recordedDate} {formattedStepCount}歩
      <button onClick={() => handleDelete(step.recordedDate)}>削除</button>
    </li>
  );
};
