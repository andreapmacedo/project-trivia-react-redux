import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Settings extends Component {
  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"

          >
            Início
          </button>
        </Link>
      </>
    );
  }
}

export default Settings;