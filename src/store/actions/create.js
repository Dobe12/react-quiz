import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "./types";
import axios from "../../axios/axios-quiz";

export function addQuizQuestion(question) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item: question
    }
}

export function finishCreatingQuiz() {
    return async (dispatch, getState) => {
        await axios.post('quiz.json',getState().create.quiz)
        dispatch(resetQuizCreation())
    }
}

function resetQuizCreation() {
    return {
        type: RESET_QUIZ_CREATION
    }
}
