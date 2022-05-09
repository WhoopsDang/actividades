import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/result";


class Quiz extends Component {
state = {
    qbank: [],
    score: 0,
    responses: 0
};

getQuestions = async () =>{
    let response = await fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
    let data = await response.json()
    
        

    this.setState({
        qbank: data.results
    })

    
    console.log(this.state.qbank)
}


    playAgain = () => {
        this.getQuestions()
        this.setState({
            qbank: [],
            score: 0,
            responses: 0
        })
    }

    computeAnswer = (answer, correct_answer) => {
        if (answer === correct_answer){
            this.setState({
                score: this.state.score + 1
            })
        }

        this.setState({
            responses: this.state.responses < 5 ? this.state.responses + 1 : 5
        })

    }

    componentDidMount(){
        this.getQuestions()
    }

    render(){
        return(
            <div className="container">
                <div className="title">Quizzical</div>
                {this.state.responses < 5 && this.state.qbank.map(
                    ({correct_answer, incorrect_answers, question}) => 
                    <QuestionBox question={question} correct = {correct_answer} incorrect = {incorrect_answers} 
                    selected = {answer => this.computeAnswer(answer, correct_answer)}/>
                )}

                {this.state.responses === 5 ? (<Result score = {this.state.score} playAgain= {this.playAgain} />) : null}
            </div>

        )
    }
}

ReactDOM.render(<Quiz />, document.getElementById("root"))