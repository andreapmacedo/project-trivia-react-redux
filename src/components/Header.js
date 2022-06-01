import md5 from 'crypto-js/md5';
import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { score, name, email } = this.props;
    const hash = md5(`${email}`).toString();
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
          { name }
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
  name: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  name: state.player.name,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
