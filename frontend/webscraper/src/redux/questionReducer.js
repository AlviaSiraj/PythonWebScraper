const initialState = {
  loading: false,
  data: {
    content: [], // or use an empty string depending on your needs
    headings: {},
  },
  error: null,
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "QUESTIONS_REQUEST":
      return { ...state, loading: true, error: null };
    case "QUESTIONS_SUCCESS":
      return { ...state, loading: false, questions: action.payload };
    case "QUESTIONS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default questionReducer;
