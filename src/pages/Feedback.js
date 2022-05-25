import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  constructor() {
    super();
    this.performanceFeedback = this.performanceFeedback.bind(this);
  }

  performanceFeedback() {
    const { points } = this.props;
    const numberOfhits = 3;
    if (points < numberOfhits) return 'Well Done!';
    return 'Could be better...';
  }

  render() {
    return (
      <main>
        <h2 data-testid="feedback-text">
          { this.performanceFeedback() }
        </h2>
      </main>
    );
  }
}

Feedback.propTypes = {
  points: PropTypes.number.isRequired,
};

/** Atualize comforme o nome da chave no state */
const mapStateToProps = (state) => ({
  points: state.rootReducer.points,
});

export default connect(mapStateToProps)(Feedback);
