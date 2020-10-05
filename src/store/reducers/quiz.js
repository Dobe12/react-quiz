import {
    FETCH_QUIZE_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS, QUIZ_FINISH, QUIZ_NEXT_QUESTION, QUIZ_RETRY,
    QUIZ_SET_STATE
} from "../actions/types";

const initialState = {
    quizes: [],
    loading: false,
    error: null,
    results: {},
    activeQuestion: 0,
    isFinished: false,
    answerState: null,
    quiz: null
}

export default function quizReducer(state= initialState, action) {
    switch (action.type){
        case FETCH_QUIZES_START:
            return {
                ...state, loading: true
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state, loading: false, quizes: action.quizes
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state, error: action.error
            }
        case FETCH_QUIZE_SUCCESS:
            return {
                ...state, loading: false, quiz: action.quiz
            }
        case QUIZ_SET_STATE:
            return {
                ...state, answerState: action.answerState, results: action.results
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state, answerState: null, activeQuestion: action.number
            }
        case QUIZ_FINISH:
            return {
                ...state,
                isFinished: true
            }
        case QUIZ_RETRY: {
            return {
                ...state,
                results: {},
                activeQuestion: 0,
                isFinished: false,
                answerState: null
            }
        }
        default:
            return state
    }
}
