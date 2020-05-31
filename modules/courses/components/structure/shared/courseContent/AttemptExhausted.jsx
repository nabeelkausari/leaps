import React from "react";
import { Button } from "../../../../../../components/Buttons/Button";

const AttemptExhausted = ({ error, viewAnswers }) => {
  return (
    <div className="course-module-content__no-attempts">
      <div className="course-module-content__no-attempts--title">
        Attempts are exhausted
      </div>
      <div className="course-module-content__no-attempts--sub-title">
        {error.message}
      </div>
      <Button variant="primary" size="md" onClick={viewAnswers}>
        View Answers
      </Button>
    </div>
  );
};

export default AttemptExhausted;
