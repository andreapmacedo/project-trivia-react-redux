import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  playAgain = () => {
    const { history } = this.props;
    localStorage.setItem('token', '');
    history.push('/');
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default Feedback;
