export const Step = ({ step, handleDelete }) => {
  const formattedStepCount = step.stepCount.toLocaleString();

  return (
    <li>
      <span>
        {step.recordedDate} {formattedStepCount}歩
      </span>
      <button onClick={() => handleDelete(step.recordedDate)}>削除</button>
    </li>
  );
};
