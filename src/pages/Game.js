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
      qIndex: 0,
      answeredIndex: [],
      loading: false,
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

  controlQuestions = (index) => {
    const maxQuestions = 4;
    // console.log(index);
    if (index >= maxQuestions) {
      this.setState({
        qIndex: 0,
      });
      this.fetchQuestion();
    } else {
      this.setState({
        qIndex: index + 1,
      });
    }
  }

  checkAnswer = (answer, correct, qIndex, rIndex) => {
    const { answeredIndex } = this.state;
    const result = this.checkCorrect(answer, correct);

    if (result) {
      const maxQuestions = 4;
      if (qIndex < maxQuestions) this.getAnswers(qIndex + 1);
      this.setState({
        answeredIndex: [],
      });
      this.controlQuestions(qIndex);
    } else {
      this.setState({
        answeredIndex: [...answeredIndex, rIndex],
      });
    }
  }

  render() {
    // const { questions } = this.props;
    const { questions, qIndex, loading, shuffledQuestions } = this.state;
    return (
      <section>
        { (questions.length > 0 && !loading)
        && (
          <div>
            <Header />
            <h2 data-testid="question-category">{questions[qIndex].category}</h2>
            <p data-testid="question-text">{questions[qIndex].question}</p>
            <div data-testid="answer-options">
              { shuffledQuestions.map((answer, index) => (
                <button
                  key={ index }
                  className={
                    (this.checkCorrect(answer, questions[qIndex].correct_answer))
                      ? 'correct-answer'
                      : 'red'
                  }
                  data-testid={
                    this.checkCorrect(answer, questions[qIndex].correct_answer)
                      ? 'correct-answer'
                      : `wrong-answer-${index}`
                  }
                  type="button"
                  onClick={
                    () => this.checkAnswer(answer,
                      questions[qIndex].correct_answer, qIndex, index)
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
