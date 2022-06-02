import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { scoreReset } from '../redux/actions/playerActions';
import addToRanking from '../redux/actions/rankingActions';

class Feedback extends Component {
  constructor() {
    super();

    this.performanceFeedback = this.performanceFeedback.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  playAgain() {
    const { history, name, email, score, resetScore, addRanking } = this.props;
    const newPlayer = {
      name,
      picture: email,
      score,
    };
    addRanking(newPlayer);
    resetScore();
    localStorage.setItem('token', '');
    history.push('/');
  }

  performanceFeedback() {
    const { assertions } = this.props;
    const numberOfhits = 3;
    if (assertions >= numberOfhits) return 'Well Done!';
    return 'Could be better...';
  }

  render() {
    return (
      <>
        <Header />
        <main>
          <h1>Feedback</h1>
          <h2 data-testid="feedback-text">{this.performanceFeedback()}</h2>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.playAgain }
          >
            Play Again
          </button>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  resetScore: () => dispatch(scoreReset()),
  addRanking: (objPlayer) => dispatch(addToRanking(objPlayer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  assertions: PropTypes.number,
  name: PropTypes.string,
  score: PropTypes.number,
  email: PropTypes.string,
  resetScore: PropTypes.func,
  addToRanking: PropTypes.func,
}.isRequired;
