import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { player } from '../redux/actions/playerActions';
import './Login.css';
import triviaImg from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      isValidEmail: false,
      isValidName: false,
    };
  }

  validityEmail = (email) => {
    // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const response = /\S+@\S+\.\S+/;
    this.setState({ isValidEmail: response.test(email) });
  }

  validityName = (name) => {
    const min = 0;
    const response = name.length > min;
    this.setState({ isValidName: response });
  }

  goToSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  goToGame = async () => {
    const { history, setPlayerInfo } = this.props;
    const { name, email } = this.state;
    const url = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(url);
    const apiData = await response.json();
    localStorage.setItem('token', apiData.token);
    setPlayerInfo({ name, email });
    history.push('/game');
  }

  inputHandleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
    if (name === 'email') this.validityEmail(value);
    if (name === 'name') this.validityName(value);
  }

  render() {
    const { email, name, isValidEmail, isValidName } = this.state;
    return (
      <div className="login">
        <div className="logo">
          <img src={ triviaImg } alt="trivia" />
        </div>
        <div className="menu-container">
          <div className="input-conteiner">
            Nome:
            <input
              className="login-input"
              data-testid="input-player-name"
              type="text"
              name="name"
              onChange={ this.inputHandleChange }
              value={ name }
            />
          </div>
          <div className="input-conteiner">
            Email:
            <input
              className="login-input"
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              onChange={ this.inputHandleChange }
              value={ email }
            />
          </div>
          <div className="btn-container">
            <button
              data-testid="btn-play"
              type="submit"
              disabled={ !isValidEmail || !isValidName }
              onClick={ this.goToGame }
            >
              Play
            </button>
            <button
              data-testid="btn-settings"
              type="button"
              onClick={ this.goToSettings }
            >
              Settings
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setPlayerInfo: ({ name, email }) => dispatch(player({ name, email })),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
  setPlayerInfo: propTypes.func.isRequired,
};
