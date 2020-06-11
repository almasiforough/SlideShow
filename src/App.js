import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button'
import QuestionPaper from './component/QuestionPaper';
import { connect } from 'react-redux'
import * as jsonObj from './store/Data.json'

class App extends React.Component {
  questions = [];
  abbreviation = [];
  answer = [];
  type = [];
  option = [];
  lable = [];
  minmax = [];

  componentDidMount() {
    let data = jsonObj.data.qa;
    data.map(element => {
      this.questions.push(element.question);
      this.abbreviation.push(element.abbreviation);
      this.answer.push(element.answer);
      this.type.push(element.type);
      this.option.push(element.option);
      this.lable.push(element.lable);
      this.minmax.push(element.minmax);
    }
    )

    this.props.onInitialization(this.questions, this.abbreviation, this.answer, this.type, this.option, this.lable, this.minmax);
  }
  render() {
    return ((this.props.isMainPage ?
      <div className="App">
        <div className="Centered">
          <Button variant="outlined" color="primary"
            onClick={this.props.onClickHandler}
            style={{ backgroundColor: "White", width: "30vw", minWidth: "200px", height: "50px" }} >
            Start Quiz
      </Button>
        </div>
      </div> :
      <div className="App">
        <div className="Centered">
          <QuestionPaper />
        </div>

      </div>)
    );
  }

}
const mapStateToProps = (state) => {
  return {
    isMainPage: state.isMainPage,
    answer: state.answer,
    question: state.question,
    lable: state.lable,
    minmax: state.minmax
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onClickHandler: () => {
      dispatch({ type: 'CHANGE_ISMAINPAGE', payload: false })
    },
    onInitialization: (question, abbreviation, answer, type, option, lable, minmax,) => {
      dispatch({ type: 'INITIAL_QUESTIONS', payload: question });
      dispatch({ type: 'INITIAL_ABBREVATION', payload: abbreviation });
      dispatch({ type: 'INITIAL_ANSWERS', payload: answer });
      dispatch({ type: 'INITIAL_TYPE', payload: type });
      dispatch({ type: 'INITIAL_OPTION', payload: option });
      dispatch({ type: 'INITIAL_LABLE', payload: lable });
      dispatch({ type: 'INITIAL_MINMAX', payload: minmax });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
