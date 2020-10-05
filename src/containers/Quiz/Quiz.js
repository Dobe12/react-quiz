import React, {Component} from "react"
import classes from "./Quiz.module.css";
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuiz, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";

class Quiz extends Component {

    async componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1 >Quiz</h1>
                    {
                        this.props.loading || !this.props.quiz
                            ? <Loader />
                            : this.props.isFinished
                            ? <FinishedQuiz
                                results = {this.props.results}
                                quiz = {this.props.quiz}
                                onRetry = {this.props.retryQuiz}
                            />
                            : <ActiveQuiz
                                onAnswerClick = {this.props.quizAnswerClick}
                                answers= {this.props.quiz[this.props.activeQuestion].answers}
                                question = {this.props.quiz[this.props.activeQuestion].question}
                                questionsCount = {this.props.quiz.length}
                                activeQuestion = {this.props.activeQuestion + 1}
                                state = {this.props.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        results: state.quiz.results,
        activeQuestion: state.quiz.activeQuestion,
        isFinished: state.quiz.isFinished,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: quizId => dispatch(fetchQuiz(quizId)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
