import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import './Game.css';
import Header from '../components/Header';
import { scoreUpdate } from '../redux/actions/playerActions';

class Game extends Component {
  constructor() {
    super();
    this.state = { questions: [],
      shuffledAnswers: [],
      questionIndex: 0,
      loading: false,
      btnNextDisabled: true,
      btnsAnswertDisabled: false,
      stateClassName: '',
      seconds: 30,
      timerOn: true,
      score: 0,
      dificultyIndex: 0,
      assertions: 0,
    };
  }

  componentDidMount() {
    this.fetchQuestion();
    this.timerStart();
  }

  componentDidUpdate() {
    this.timerControl();
  }

  validateToken = (responseCode) => {
    const { history } = this.props;
    const wrongCode = 3;
    if (responseCode === wrongCode) {
      localStorage.setItem('token', '');
      history.push('/');
    }
  }

  checkDifficulty = () => {
    const { questions, dificultyIndex } = this.state;
    const { difficulty } = questions[dificultyIndex];
    const THREE = 3;
    if (difficulty === 'easy') return 1;
    if (difficulty === 'medium') return 2;
    if (difficulty === 'hard') return THREE;
  }

  calcScore = (boolean) => {
    const { seconds } = this.state;
    const DIFFICULTY = this.checkDifficulty();
    const TEN = 10;
    if (boolean) {
      this.setState((prevState) => ({
        score: prevState.score + TEN + (seconds * DIFFICULTY),
        dificultyIndex: prevState.dificultyIndex + 1,
        assertions: prevState.assertions + 1,
      }), () => {
        const { score, assertions } = this.state;
        const { updateScore } = this.props;
        updateScore({ score, assertions });
      });
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
      const arr = questions[index].incorrect_answers
        .concat(questions[index].correct_answer);
      const shuffled = arr.sort(() => Math.random() - size);
      this.setState({
        shuffledAnswers: shuffled,
      });
    } else {
      const shuffled = ['True', 'False'];
      shuffled.sort(() => Math.random() - size);
      this.setState({ shuffledAnswers: shuffled });
    }
  }

  checkCorrect = (answer, correct) => answer === correct

  checkAnswer = (correct, questionIndex, answer) => {
    this.setState({ btnsAnswertDisabled: true });
    this.setClassName();
    this.calcScore(this.checkCorrect(answer, correct));
    clearInterval(this.intervalId);
    const maxQuestions = 5;
    if (questionIndex < maxQuestions) {
      this.setState({
        btnNextDisabled: false,
      });
    }
  }

  setClassName = () => {
    const { shuffledAnswers, questions, questionIndex } = this.state;
    // console.log(questions[questionIndex].correct_answer);
    const correctAnswer = questions[questionIndex].correct_answer;
    let correctIndex;
    shuffledAnswers.forEach((question, index) => {
      if (question === correctAnswer) correctIndex = index;
    });
    this.setState({ stateClassName: correctIndex });
  }

  getClassName = (index) => {
    const { stateClassName } = this.state;
    if (index === stateClassName) return 'correct-answer answer';
    if (stateClassName !== '') return 'incorrect-answer answer';
    return 'answer';
  }

  setPlayerRank = () => {
    const { player: { name, score, picture } } = this.props;
    const playerInfo = { name, score, picture };
    if (JSON.parse(localStorage.getItem('ranking'))) {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      localStorage.setItem('ranking', JSON.stringify([...ranking, playerInfo]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([playerInfo]));
    }
  };

  nextQuestion = () => {
    const { questionIndex } = this.state;
    const maxQuestions = 4;
    if (questionIndex < maxQuestions) {
      this.getAnswers(questionIndex + 1);
      this.setState({ btnNextDisabled: true,
        questionIndex: questionIndex + 1,
        stateClassName: '',
        timerOn: true,
        seconds: 30,
        btnsAnswertDisabled: false,
      });
      this.timerStart();
    } else {
      this.setPlayerRank();
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
      this.setClassName();
      clearInterval(this.intervalId);
      this.setState({ btnsAnswertDisabled: true,
        timerOn: false,
        btnNextDisabled: false,
      });
    }
  }

  render() {
    const { questions,
      questionIndex, loading, shuffledAnswers,
      btnNextDisabled, seconds, btnsAnswertDisabled } = this.state;
    return (
      <section className="game-container">
        { (questions.length > 0 && !loading)
        && (
          <div className="main-container">
            <Header />
            <div className="categoty-container">
              <h3>Category</h3>
              <p data-testid="question-category">{questions[questionIndex].category}</p>
            </div>
            <div className="question-container">
              <h3>Question</h3>
              <p data-testid="question-text">{questions[questionIndex].question}</p>
            </div>
            <div data-testid="answer-options" className="answers-container">
              { shuffledAnswers.map((answer, index) => (
                <button
                  key={ index }
                  className={ this.getClassName(index) }
                  data-testid={
                    this.checkCorrect(answer,
                      questions[questionIndex].correct_answer)
                      ? 'correct-answer'
                      : `wrong-answer-${index}`
                  }
                  type="button"
                  onClick={
                    () => this.checkAnswer(questions[questionIndex].correct_answer,
                      questionIndex, answer)
                  }
                  disabled={ btnsAnswertDisabled }
                >
                  { answer }
                </button>
              ))}
              {!btnNextDisabled
                ? (
                  <button
                    className="btn-next"
                    type="button"
                    data-testid="btn-next"
                    onClick={ this.nextQuestion }
                    disabled={ btnNextDisabled }
                  >
                    Next
                  </button>)
                : (<h2>{seconds}</h2>)}
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
  updateScore: propTypes.func.isRequired,
  player: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: ({ score, assertions }) => dispatch(scoreUpdate({ score, assertions })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
