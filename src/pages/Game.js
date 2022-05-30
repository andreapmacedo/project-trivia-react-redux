import React, { Component } from 'react';
import propTypes from 'prop-types';
import './Game.css';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      shuffledQuestions: [],
      questionIndex: 0,
      loading: false,
      btnNextDisabled: true,
      btnsAnswertDisabled: false,
      stateClassName: '',
      seconds: 30,
      timerOn: true,
    };
  }

  componentDidMount() {
    this.fetchQuestion();
    this.timerStart();
  }

  componentDidUpdate() {
    this.timerControl();
  }

  componentWillUnmount() {
    // clearInterval(this.intervalId);
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

  getAnswers = (index) => {
    const size = 0.5;

    const { questions } = this.state;
    if (questions[index].type === 'multiple') {
      const arr = questions[index].incorrect_answers;
      arr.push(questions[index].correct_answer);
      const shuffled = arr.sort(() => Math.random() - size);
      this.setState({
        shuffledQuestions: shuffled,
      });
    } else {
      const shuffled = ['True', 'False'];
      shuffled.sort(() => Math.random() - size);
      this.setState({
        shuffledQuestions: shuffled,
      });
    }
  }

  checkCorrect = (answer, correct) => answer === correct

  checkAnswer = (correct, questionIndex) => {
    this.setClassName(correct);
    clearInterval(this.intervalId);
    const maxQuestions = 5;
    if (questionIndex < maxQuestions) {
      this.setState({
        btnNextDisabled: false,
      });
    }
  }

  setClassName = (correct) => {
    const { shuffledQuestions } = this.state;
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
    const maxQuestions = 4;
    if (questionIndex < maxQuestions) {
      this.getAnswers(questionIndex + 1);
      this.setState({
        btnNextDisabled: true,
        questionIndex: questionIndex + 1,
        stateClassName: '',
        timerOn: true,
        seconds: 30,
        btnsAnswertDisabled: false,
      });
      this.timerStart();
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
  }

  timerStart() {
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
  }

  timerControl() {
    const TIME_LIMIT = 0;
    const { seconds, timerOn } = this.state;
    if (seconds <= TIME_LIMIT && timerOn) {
      console.log('timeControl');
      clearInterval(this.intervalId);
      this.setState({ btnsAnswertDisabled: true,
        timerOn: false,
        btnNextDisabled: false,
      });
    }
  }

  render() {
    const { questions,
      questionIndex, loading, shuffledQuestions,
      btnNextDisabled, seconds, btnsAnswertDisabled } = this.state;
    return (
      <section>
        { (questions.length > 0 && !loading)
        && (
          <div>
            <Header />
            <h2 data-testid="question-category">{questions[questionIndex].category}</h2>
            <p data-testid="question-text">{questions[questionIndex].question}</p>
            <h2>{seconds}</h2>
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
                  disabled={ btnsAnswertDisabled }
                >
                  { answer }
                </button>
              ))}
              {!btnNextDisabled
              && (
                <button
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.nextQuestion }
                  disabled={ btnNextDisabled }
                >
                  Next
                </button>
              )}
            </div>
          </div>)}
      </section>
    );
  }
}

Game.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default Game;
