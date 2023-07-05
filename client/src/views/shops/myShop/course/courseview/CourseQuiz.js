import React, { useState } from 'react';
import { Row, Col, Button, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';

function CourseQuiz(props) {
    const activeQuizData = props
    const questions = activeQuizData.activeQuizData;
    const [s, setS] = useState(0);
    const [answer, setAnswer] = useState();
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [score, setScore] = useState(0)
    const check = (item, sr) => {
        if (answer != undefined) {
            return answer[sr] === item
        }
        return false
    }
    const handleAnswerClick = (item, sr) => {
        setAnswer({ ...answer, [sr]: item })
    }

    const handleNext = () => {
        if (s + 1 < questions.length) {
            setS(s + 1)
        }
        else {
        }
    }
    const handlePrevious = () => {
        if (s > 0) {
            setS(s - 1)
        }
    }
    const handleQuizFinish = () => {
        let result = 0
        if (answer === undefined) {
            toast.error("No Questions Attempted")
        }
        else {
            for (let i = 0; i < questions.length; i++) {
                if (questions[i].solution === answer[i]) {
                    result = result + 1
                    setScore(result)
                }
                ;
            }
            setQuizCompleted(true)
        }
    }
    return (
        quizCompleted ? <div className="p-4 ">
            <Row className="text-center my-2">
                <Col xl="12"><h3 className={`${score <= 4 ? "text-warning" : "text-success"}`}>Your Score is {score}/{questions.length}</h3></Col>
            </Row>
            {
                questions.map((item, index) => (
                    <Row className='my-2'>
                        <Col md={12}>
                            <Row className="mt-1">
                                <h4 for="q1">
                                    {index + 1 + ")"} {item.question}
                                </h4>
                            </Row>
                        </Col>
                        <div>
                            <Row className="m-1" >
                                {item?.options.map((solution, indexOfOption) => (
                                    <Col xl="6" className={`${solution === item.solution ? "bg-light-success" : answer[index] === solution ? "bg-light-danger" : ""}`}>
                                        <div className="m-1">{indexOfOption === 0 ? "A) " : indexOfOption === 1 ? "B) " : indexOfOption === 2 ? "C) " : indexOfOption === 3 ? "D) " : " "}{solution}</div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Row>
                ))
            }
        </div> :
            <>
                <ModalBody>
                    <Row >
                        <Col md={12}>
                            <Row className="mt-1">
                                <h4 for="q1">
                                    {s + 1 + ")"} {questions[s?.toString()]?.question}
                                </h4>
                            </Row>
                        </Col>
                        <div>
                            <Row className="ms-1">
                                {questions[s]?.options.map((item) => (
                                    <Col xl="6" className='my-1'>
                                        <div onClick={() => { handleAnswerClick(item, s) }} className={`p-1 rounded ${check(item, s) ? "bg-primary" : "bg-dark"}  text-white`}>{item}</div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={handlePrevious}  >
                        Previous
                    </Button>{' '}
                    <Button color={`${s >= questions.length - 1 ? "success" : "primary"}`} onClick={s >= questions.length - 1 ? handleQuizFinish : handleNext}>
                        {s >= questions.length - 1 ? "Finish" : "Next"}
                    </Button>
                </ModalFooter>
            </>
    )
}

export default CourseQuiz