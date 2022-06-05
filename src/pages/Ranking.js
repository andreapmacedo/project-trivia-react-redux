import React, { Component } from 'react';
import propTypes from 'prop-types';
import './Ranking.css';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('ranking'))) {
      const rankingList = JSON.parse(localStorage.getItem('ranking'));
      this.setState({
        ranking: rankingList.sort((a, b) => b.score - a.score),
      });
    }
  }

  goToHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { ranking } = this.state;
    return (
      <div className="ranking-container">
        <div className="main-container">
          <h1 data-testid="ranking-title">Ranking</h1>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.goToHome }
          >
            Home
          </button>
          {ranking.map((player, index) => (
            <div
              className="player-container"
              key={ index }
            >
              <div className="player-img">
                <img src={ player.picture } alt={ player.name } />
              </div>
              <div className="player-score">
                <p data-testid={ `player-name-${index}` }>{ player.name }</p>
                <p data-testid={ `player-score-${index}` }>{ player.score }</p>
              </div>
            </div>
          ))}
        </div>
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
