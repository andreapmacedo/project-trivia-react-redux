import React from 'react';
import propTypes from 'prop-types';

class Feedback extends React.Component {
  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <h1>Feedback</h1>
        <button
          type="button"
          data-testid="btn"
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
