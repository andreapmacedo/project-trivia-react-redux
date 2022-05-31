import md5 from 'crypto-js/md5';
import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { score } = this.props;

    const user = window.localStorage.getItem('name');
    const hash = md5(`${window.localStorage.getItem('email')}`).toString();
    return (
      <header
        className="cabecalho"
      >
        <h1>Good Game</h1>
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
          Score:
          {' '}
          { score }
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  score: propTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
