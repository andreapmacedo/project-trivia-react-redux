import md5 from 'crypto-js/md5';
import React from 'react';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      score: 0,
    };
  }

  render() {
    const { score } = this.state;

    const user = window.localStorage.getItem('name');
    const hash = md5(`${window.localStorage.getItem('email')}`).toString();
    return (
      <header
        className="cabecalho"
      >
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="Imagem do usuário"
          data-testid="header-profile-picture"
        />
        <p
          data-testid="header-player-name"

        >
          {' '}
          { user }
        </p>
        <p
          data-testid="header-score"

        >
          Pontos:
          {' '}
          { score }
        </p>
      </header>
    );
  }
}

export default Header;
