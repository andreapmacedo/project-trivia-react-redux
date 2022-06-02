import React, { Component } from 'react';
import propTypes from 'prop-types';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('ranking'))) {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      // const sortedName = ranking.sort((a, b) => b.name - a.name);
      this.setState({
        ranking: ranking.sort((a, b) => b.score - a.score),
      });
    }
  }

  goHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goHome }
        >
          Home
        </button>
        {ranking.map((player, index) => (
          <div key={ index }>
            <img src={ player.picture } alt={ player.name } />
            <h3 data-testid={ `player-name-${index}` }>{ player.name }</h3>
            <h4 data-testid={ `player-score-${index}` }>{ player.score }</h4>
          </div>
        ))}
      </div>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default (Ranking);
