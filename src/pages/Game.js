import React, { Component } from 'react';
import propTypes from 'prop-types';
// import { connect } from 'react-redux';
import './Game.css';
// import { getQuestions } from '../redux/actions/gameActions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      qIndex: 0,
      // cIndex: [],
      // loading: false,
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
    // this.setState({ loading: true });
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(url);
    const apiData = await response.json();
    this.validateToken(apiData.response_code);
    this.setState({ questions: apiData.results });
    // this.setState({ loading: false });
  }

  // checkGlobalState = () => {
  //   const { questions } = this.props;
  // }

  // checkLocalState = () => {
  //   const { questions } = this.state;
  //   console.log(questions);
  // }

  getAnswers = () => {
    // https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
    function shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    const { questions } = this.state;
    const allAnswers = questions[0].incorrect_answers;
    allAnswers.push(questions[0].correct_answer);
    return shuffleArray(allAnswers);
  }

  checkAnswer = (answer, correct) => answer === correct

  render() {
    // const { questions } = this.props;
    const { questions, qIndex } = this.state;
    return (
      <section>
        { questions.length > 0
        && (
          <div>
            <h2 data-testid="question-category">{questions[qIndex].category}</h2>
            <p data-testid="question-text">{questions[qIndex].question}</p>
            <div data-testid="answer-options">
              { this.getAnswers().map((answer, index) => (
                <button
                  key={ index }
                  className={
                    (this.checkAnswer(answer, questions[qIndex].correct_answer))
                      ? ''
                      : 'red'
                  }
                  data-testid={
                    this.checkAnswer(answer, questions[qIndex].correct_answer)
                      ? 'correct-answer'
                      : `wrong-answer-${index}`
                  }
                  type="button"
                  onClick={
                    () => this.checkAnswer(answer, questions[qIndex].correct_answer)
                  }
                >
                  { answer }
                </button>
              ))}
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
