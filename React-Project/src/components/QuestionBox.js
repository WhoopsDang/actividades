import React, {useState} from "react";

const QuestionBox = ({question, correct, incorrect, selected}) => {
    if(incorrect.length !== 4){
    let i = Math.random() * (4 - 0) + 0;
    incorrect.splice(i,0,correct)
    }
    

    const [answer, setAnswer] = useState(incorrect)
    
    return (
        <div className="questionBox">
            <div className="question">{question}</div>
            {answer.map((text, index) =>(
                <button key={index} className="answerBtn" onClick={() => {
                    
                    setAnswer([text]);
                    selected(text);
                    
                }
                }>{text}</button>

            ))}

        </div>

    )

}

export default QuestionBox