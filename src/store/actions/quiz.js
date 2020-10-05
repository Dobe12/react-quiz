import axios from "../../axios/axios-quiz";
import {
    FETCH_QUIZE_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS, QUIZ_FINISH, QUIZ_NEXT_QUESTION, QUIZ_RETRY,
    QUIZ_SET_STATE
} from "./types";

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('quiz.json');
            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест #${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quizes))

        }catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuiz(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`quiz/${quizId}.json`)
            const quiz = response.data

            dispatch(fetchQuizSuccess(quiz))

        }catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function quizAnswerClick(answerId) {
    return async (dispatch, getState) => {
        const state = getState().quiz

        const question = state.quiz[state.activeQuestion]
        const results = state.results

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]

            if (state.answerState[key] === 'success') {
                return
            }
        }

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(quizSetState({[answerId]: 'success'}, results))
            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(quizFinish())
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                }
                window.clearTimeout(timeout)
            }, 500)

        } else {
            results[question.id] = 'error'
            dispatch(quizSetState({[answerId]: 'error'}, results))
        }
    }
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}

export function quizNextQuestion(number){
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}

export function quizFinish(){
    return {
        type: QUIZ_FINISH
    }
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    }
}

export function fetchQuizesStart(){
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizSuccess(quiz){
    return {
        type: FETCH_QUIZE_SUCCESS,
        quiz
    }
}

export function fetchQuizesSuccess(quizes){
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e){
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}
