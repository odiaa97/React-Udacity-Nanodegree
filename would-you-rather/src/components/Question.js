import React, { useEffect } from 'react'
import { Card, Button, Badge, Container, Row, Col, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { saveQuestionAnswer, getQuestions } from '../api'
import { answerQuestion, questionsReceived } from '../actions/questions'
import PageNotFound from './PageNotFound'
import { useHistory } from 'react-router-dom'

const mapStateToProps = ({ authedUser, questions }) => {
    return {
        authedUser,
        questions,
    }
}

function Question({ questions, questionsReceived, questionId, question, authedUser, answerQuestion, showTotalVotes }) {
    const history = useHistory()
    useEffect(() => {
        async function fetchData() {
            const questions = await getQuestions()
            questionsReceived(questions)
        }
        if (questions === null) {
            fetchData()
        }
    })
    if (!questions) {
        return (
            <div className="text-center mt-4">
                <Spinner animation="border"/>
            </div>
        )
    }
    question = question || questions[questionId]
    if (!authedUser || !question) {
        return <PageNotFound message="Question not found"/>
    }
    const myAnswer = authedUser && authedUser.answers && authedUser.answers[question.id]
    const answered = myAnswer != null
    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length
    const formatVotes = (nVotes) => {
        switch (nVotes) {
            case 0: return 'no votes'
            case 1: return '1 vote'
            default: return `${nVotes} votes`
        }
    }
    const sendAnswerQuestion = async (selectedAnswer) => {
        const answer = {
            qid: question.id,
            answer: selectedAnswer,
            authedUser: authedUser.id,
        }
        answerQuestion(answer)
        await saveQuestionAnswer(answer)
    }
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    Would you rather...
                    {questionId == null && (
                        <Button className="ml-2" variant="secondary" size="sm" onClick={(e) => {
                            e.preventDefault()
                            history.push(`/questions/${question.id}`)
                        }}>
                            Details
                        </Button>
                    )}
                </Card.Title>
                <Container className="mw-100 p-0">
                    <Row>
                        <Col sm={8}>
                            <Button disabled={answered} onClick={() => sendAnswerQuestion('optionOne')}>
                                {question.optionOne.text}
                            </Button>
                            {(answered && showTotalVotes) && <span className="ml-3">{Math.round((question.optionOne.votes.length / totalVotes) * 100)}% ({formatVotes(question.optionOne.votes.length)})</span>}
                            {myAnswer && myAnswer === 'optionOne' && <Badge variant="secondary" className="ml-2">my vote</Badge>}
                            <Card.Text className="mt-3">OR</Card.Text>
                            <Button disabled={answered} onClick={() => sendAnswerQuestion('optionTwo')}>
                                {question.optionTwo.text}
                            </Button>
                            {(answered && showTotalVotes) && <span className="ml-3">{Math.round((question.optionTwo.votes.length / totalVotes) * 100)}% ({formatVotes(question.optionTwo.votes.length)})</span>}
                            {myAnswer && myAnswer === 'optionTwo' && <Badge variant="secondary" className="ml-2">my vote</Badge>}
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}

export default connect(mapStateToProps, { answerQuestion, questionsReceived })(Question)