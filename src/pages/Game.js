import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions } from '../redux/actions/gameActions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    const { addQuestions } = this.props;
    addQuestions();
  }

  // validateToken = (responseCode) => {
  //   const { history } = this.props;
  //   const wrongCode = 3;
  //   if (responseCode === wrongCode) {
  //     localStorage.setItem('token', '');
  //     history.push('/');
  //   }
  // }

  // fetchQuestion = async () => {
  //   const token = localStorage.getItem('token');
  //   const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  //   const response = await fetch(url);
  //   const apiData = await response.json();
  //   this.validateToken(apiData.response_code);
  //   this.setState({ questions: apiData.results });
  // }

  checkGlobalState = () => {
    const { questions } = this.props;
    console.log(questions);
  }

  render() {
    // const { questions } = this.props;
    const { questions } = this.props;

    return (
      <div>
        <h1>Let Play</h1>
        {questions.map((question, index) => (
          // if ( index === 0) { category0 = question }
          <h1 key={ index } data-testid="question-category">{ question.category }</h1>
        ))}
        {questions
          // ? <h1 data-testid="question-category">{ JSON.stringify(questions) }</h1>
          ? <h1 data-testid="question-category">{ questions[0].category }</h1>
          : <h1 data-testid="question-category"> </h1>}
        <button
          data-testid="btn-"
          type="button"
          onClick={ this.checkGlobalState }
        >
          Populate
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addQuestions: () => {
    dispatch(getQuestions());
  },
  // addQuestions: () => {
  //   dispatch(getQuestion());
  // },
});

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  currentQuestion: state.game.currentQuestion,
});

Game.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
  addQuestions: propTypes.func.isRequired,
  questions: propTypes.arrayOf.isRequired,
  // currentQuestion: propTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
