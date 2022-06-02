import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.performanceFeedback = this.performanceFeedback.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  playAgain() {
    const { history } = this.props;
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
    const { assertions, score } = this.props;

    return (
      <>
        <Header />
        <main>
          <h1>Feedback</h1>
          <h2 data-testid="feedback-text">{this.performanceFeedback()}</h2>
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question" id="assertions">{assertions}</p>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.playAgain }
          >
            Play Again
          </button>
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"

            >
              Ranking
            </button>
          </Link>
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
