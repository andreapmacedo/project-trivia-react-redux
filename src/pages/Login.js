import React from 'react';

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
    console.log(response.test(email));
    this.setState({ isValidEmail: response.test(email) });
  }

  validityName = (name) => {
    const min = 0;
    const response = name.length > min;
    console.log(response);
    console.log(name);
    this.setState({ isValidName: response });
  }

  inpuHandleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
    if (name === 'email') this.validityEmail(value);
    if (name === 'name') this.validityName(value);
  }

  render() {
    const { email, name, isValidEmail, isValidName } = this.state;
    return (
      <>
        <h1>Tela Login</h1>
        <div>
          Nome
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            onChange={ this.inpuHandleChange }
            value={ name }
          />
          Email
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            onChange={ this.inpuHandleChange }
            value={ email }
          />
          <button
            data-testid="btn-play"
            type="submit"
            disabled={ !isValidEmail || !isValidName }
            onClick={ this.login }
          >
            jogar
          </button>
        </div>
      </>
    );
  }
}

export default Login;
