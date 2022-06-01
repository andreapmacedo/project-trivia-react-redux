import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.performanceFeedback = this.performanceFeedback.bind(this);
  }

  performanceFeedback() {
    const { assertions } = this.props;
    const numberOfhits = 3;
    if (assertions < numberOfhits) return 'Well Done!';
    return 'Could be better...';
  }

  render() {
    return (
      <>
        <Header />
        <main>
          <h2 data-testid="feedback-text">
            {this.performanceFeedback()}
          </h2>
        </main>

      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
