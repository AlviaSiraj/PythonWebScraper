const initialState = {
  loading: false,
  questions: [], // This will hold the array of questions from the response
  error: null,
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "QUESTIONS_REQUEST":
      return { ...state, loading: true, error: null };
    case "QUESTIONS_SUCCESS":
      return { ...state, loading: false, questions: action.payload.questions };
    case "QUESTIONS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default questionReducer;
