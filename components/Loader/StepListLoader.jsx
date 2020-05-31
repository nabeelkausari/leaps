import React from "react";
import StepSkeleton from "../Skeletons/StepSkeleton";

export const StepListLoader = ({ steps_size }) => {
  let step_skeletons = [];
  for (let i = 0; i < steps_size; i++) step_skeletons.push(<StepSkeleton />);

  return <div className="step-list-loader">{step_skeletons}</div>;
};

export default StepListLoader;
