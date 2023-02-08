import React from "react"
import { nanoid } from "nanoid"
import Quiz from './components/Quiz'
import Start from './components/Start';
import Confetti from "react-confetti";


export default function App() {
    const [start, setStart] = React.useState(true);
    const [questInfo, setQuestInfo] = React.useState([]);
    const [isFinal, setIsFinal] = React.useState(false);
    const [checkAnswers, setCheckAnswers] = React.useState(false);
    const [newGame, setNewGame] = React.useState(false);

    function changeStartState() {
        setStart(false)
    }

    function mixArray(arr) {
        return arr.sort(() => Math.random() - 0.5)
    }

    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10&category=11&type=multiple').then(res => res.json()).then((data) => {
            setQuestInfo(data.results.map(el => ({
                id: nanoid(),
                answer: el['correct_answer'],
                question: el.question,
                wrong: el['incorrect_answers'],
                chosen: '',
                arr: mixArray([el['correct_answer']].concat(el['incorrect_answers']))
            }))
            )
        })
    }, [newGame])

    function choice(ev) {
        let content = ev.target.getAttribute('data-text');
        ev.target.parentNode.childNodes.forEach(el => el.classList.remove('checked'));
        ev.target.classList.add('checked');
        setQuestInfo(prev => prev.map(el => {
            if (el.arr.includes(content)) {
                document.querySelector(`[data-question='${el.question}']`).classList.remove('wrong');
                return {
                    ...el,
                    chosen: content
                }
            } else {
                return el
            }
        }
        ))
    }

    function result() {
        let questions = document.querySelectorAll('.question');
        if (isFinal) {
            setIsFinal(false)
            setNewGame(prev => !prev)

        } else {
            if (questInfo.every(el => el.arr.includes(el.chosen))) {
                questInfo.forEach(el => {
                    let item = document.querySelector(`[data-text='${el.chosen}']`)
                    let node = item.parentNode
                    node.childNodes.forEach(el => el.classList.add('wrong'))
                    if (el.chosen === el.answer) {
                        item.classList.remove('wrong')
                        item.classList.add('right')
                    }
                })
                setCheckAnswers(false);
                setIsFinal(true)
            } else {
                setCheckAnswers(true);
                questInfo.forEach(el => {
                    if (el.chosen === '') {
                        document.querySelector(`[data-question='${el.question}']`).classList.add('wrong');
                    }
                })
            }
        }
    }




    return (
        <main>
            <img className="blue" src="./images/blue.svg" />
            {start && <Start changeState={changeStartState} />}
            {!start &&
                <div className="quiz-container">
                    <ul className="questionsList">
                        {questInfo.map(el => {
                            return <Quiz
                                choice={choice}
                                info={el}
                                key={el.id}
                            />
                        })

                        }

                    </ul>
                    <div className="final">
                    {document.querySelectorAll('.right').length === questInfo.length && <Confetti />}
                        {checkAnswers && <span className="error">Please, answer all questions</span>}
                        {isFinal && <span className="calcAnswers">You scored {document.querySelectorAll('.right').length}/{questInfo.length} correct answers</span>}
                        <button onClick={result} className="checkBtn">{isFinal ? 'Play Again' : 'Check Answers'}</button>
                    </div>
                </div>}

            <img className="yellow" src="./images/yellow.svg" />
        </main>
    )
}