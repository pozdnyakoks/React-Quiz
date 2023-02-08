import React from 'react';

export default function Quiz(props) {
    function replace(text) {
        return text.replaceAll('&quot;', '\'')
        .replaceAll('&ldquo;', '\'')
        .replaceAll('&rdquo;', '\'')
        .replaceAll('&lsquo;', '\'')
        .replaceAll('&rsquo;', '\'')
        .replaceAll('&#039;', '\'')
        .replaceAll('&amp;', '&')
        .replaceAll('&hellip;', '...')
        .replaceAll('&oacute;', 'ó')
        .replaceAll('&Eacute;','É')
        .replaceAll('&iacute;', 'é').replaceAll('&lrm;', '');
    }

    let answers = props.info.arr.map((el,i) => {
        let text = replace(el);
        return <li data-text={el} onClick={(ev)=>{props.choice(ev)}} key={i} className="answer">
            {text}</li>
    })

    let question = replace(props.info.question)
    return (
        <li className="question">
            <p data-question={props.info.question}>
                {question}
            </p>
            <ul className="answersList">
                {answers}
            </ul>
            <hr />
        </li>
    )
}