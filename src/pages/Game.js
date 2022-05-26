import React, { Component } from 'react';
import propTypes from 'prop-types';
// import { connect } from 'react-redux';
import './Game.css';
// import { getQuestions } from '../redux/actions/gameActions';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      shuffledQuestions: [],
      questionIndex: 0,
      // answeredIndex: [],
      loading: false,
      btnDisabled: true,
      stateClassName: '',
    };
  }

  componentDidMount() {
    // const { addQuestions } = this.props;
    // addQuestions();
    this.fetchQuestion();
  }

  validateToken = (responseCode) => {
    const { history } = this.props;
    const wrongCode = 3;
    if (responseCode === wrongCode) {
      localStorage.setItem('token', '');
      history.push('/');
    }
  }

  fetchQuestion = async () => {
    this.setState({ loading: true });
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(url);
    const apiData = await response.json();
    this.validateToken(apiData.response_code);
    this.setState({
      questions: apiData.results,
    });
    this.setState({ loading: false });
    this.getAnswers(0);
  }

  // checkGlobalState = () => {
  //   const { questions } = this.props;
  // }

  // checkLocalState = () => {
  //   const { questions } = this.state;
  //   console.log(questions);
  // }

  getAnswers = (index) => {
    // console.log('getAnswer', index);
    const { questions } = this.state;
    const shuffled = questions[index].incorrect_answers;
    shuffled.push(questions[index].correct_answer);
    shuffled.sort();
    this.setState({
      shuffledQuestions: shuffled,
    });
  }

  checkCorrect = (answer, correct) => answer === correct

  checkAnswer = (correct, questionIndex) => {
    // const result = this.checkCorrect(answer, correct);
    // console.log(questionIndex);
    this.setClassName(correct);
    const maxQuestions = 4;
    if (questionIndex < maxQuestions) {
      this.setState({
        btnDisabled: false,
      });
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
  }

  setClassName = (correct) => {
    const { shuffledQuestions } = this.state;
    // const correct = this.checkCorrect(answer, correct)
    let correctIndex;
    shuffledQuestions.forEach((question, index) => {
      if (question === correct) correctIndex = index;
    });
    this.setState({
      stateClassName: correctIndex,
    });
  }

  getClassName = (index) => {
    const { stateClassName } = this.state;
    if (index === stateClassName) return 'correct-answer';
    if (stateClassName !== '') return 'incorrect-answer';
  }

  nextQuestion = () => {
    const { questionIndex } = this.state;
    this.getAnswers(questionIndex + 1);
    this.setState({
      btnDisabled: true,
      questionIndex: questionIndex + 1,
      stateClassName: '',
    });
  }

  // checkAnswer = (answer, correct, questionIndex, rIndex) => {
  //   const { answeredIndex } = this.state;
  //   const result = this.checkCorrect(answer, correct);
  //   const markedAnswer = answeredIndex.includes(rIndex);
  //   // console.log(rIndex);
  //   // console.log(answeredIndex);
  //   if (!markedAnswer) {
  //     if (result) {
  //       const maxQuestions = 4;
  //       if (questionIndex < maxQuestions) this.getAnswers(questionIndex + 1);
  //       this.setState({
  //         answeredIndex: [],
  //       });
  //       this.controlQuestions(questionIndex);
  //     } else {
  //       this.setState({
  //         answeredIndex: [...answeredIndex, rIndex],
  //       });
  //     }
  //   }
  // }

  render() {
    // const { questions } = this.props;
    const { questions,
      questionIndex, loading, shuffledQuestions, btnDisabled } = this.state;
    return (
      <section>
        { (questions.length > 0 && !loading)
        && (
          <div>
            <Header />
            <h2 data-testid="question-category">{questions[questionIndex].category}</h2>
            <p data-testid="question-text">{questions[questionIndex].question}</p>
            <div data-testid="answer-options">
              { shuffledQuestions.map((answer, index) => (
                <button
                  key={ index }
                  className={ this.getClassName(index) }
                  data-testid={
                    this.checkCorrect(answer,
                      questions[questionIndex].correct_answer, index)
                      ? 'correct-answer'
                      : `wrong-answer-${index}`
                  }
                  type="button"
                  onClick={
                    () => this.checkAnswer(questions[questionIndex].correct_answer,
                      questionIndex, index)
                  }
                >
                  { answer }
                </button>
              ))}
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.nextQuestion }
                disabled={ btnDisabled }
              >
                Next
              </button>
            </div>
          </div>)}
      </section>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   // addQuestions: () => {
//   //   dispatch(getQuestions());
//   // },
//   // addQuestions: () => {
//   //   dispatch(getQuestion());
//   // },
// });

// const mapStateToProps = (state) => ({
//   // questions: state.game.questions,
//   // currentQuestion: state.game.currentQuestion,
// });

Game.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
  // addQuestions: propTypes.func.isRequired,
  // questions: propTypes.arrayOf.isRequired,
  // currentQuestion: propTypes.arrayOf.isRequired,
};

export default Game;
// export default connect(mapStateToProps, mapDispatchToProps)(Game);
