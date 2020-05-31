const QUIZ_BASE_URI = "/quiz/";
// const base = makeApiClient('quiz', QUIZ_BASE_URI);
const QUIZ_QUESTIONS = `${QUIZ_BASE_URI}attempt/questions/`;
const QUIZ_INSTRUCTIONS = `${QUIZ_BASE_URI}`;
const QUIZ_ABSTRACT_RESULT = `${QUIZ_BASE_URI}results/`;

const default_link = {
  href: null,
  accept: "application/json"
};

const getAbstractResult = quiz_id => {
  let link = { ...default_link };
  link.href = `${QUIZ_ABSTRACT_RESULT}${quiz_id}/latest`;
  return link;
};

const getQuizID = quiz_id => quiz_id.split("/").pop();

const getInstructionsLink = quiz_id => {
  let link = { ...default_link };
  link.href = `${QUIZ_INSTRUCTIONS}${getQuizID(quiz_id)}/instructions`;
  return link;
};

const getQuestionsLink = quiz_id => {
  let link = { ...default_link };
  link.href = `${QUIZ_QUESTIONS}${getQuizID(quiz_id)}/false`;
  return link;
};

const getQuizStatus = quiz_id => {
  let link = { ...default_link };
  link.href = `${QUIZ_QUESTIONS}${getQuizID(quiz_id)}/true`;
  return link;
};
const getFinalResult = quiz_id => {
  let link = { ...default_link };
  link.href = `${QUIZ_ABSTRACT_RESULT}${quiz_id}/final`;
  return link;
};

export const quiz_links = {
  getInstructionsLink,
  getQuestionsLink,
  getAbstractResult,
  getFinalResult,
  getQuizStatus
};


// const getInstructionsById = (id) => fetchLinkAs({ href: `${QUIZ_INSTRUCTIONS}${id}/instructions`, accept: 'application/json' });
// const getQuestionsById = (id) => fetchLinkAs({ href: `${QUIZ_QUESTIONS}${id}`, accept: 'application/json' });
// const getAttemptResultByHref = (href) => fetchLinkAs({ href, accept: 'application/json' });
// const getId = (quiz) => quiz._links.self.href.split('/').pop();
// const getQuestions = (quiz) => getQuestionsById(getId(quiz));
// const getInstructions = (quiz) => getInstructionsById(getId(quiz));
// const getAttemptResult = (attemptLink) => getAttemptResultByHref(attemptLink.href);
// const submit = (quiz) => fetchLink(quiz._links.submit);
// const answer = (option) => fetchLink(option._links.answer);
