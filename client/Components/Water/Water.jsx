import React, { Component } from 'react';
import styled from '@emotion/styled';

// import PropTypes from 'prop-types';

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`;

class Water extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeOn: 0,
      ...props,
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e, key) {
    const { state } = this;
    state[key] = e.target.value;
    this.setState({ ...state });
  }

  handleSubmit() {
    const {
      state: { timeOn },
    } = this;
    return fetch('/api/pump', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ timeOn }),
    })
      .then(c => c.json())
      .then(r => {
        console.log(JSON.stringify(r, null, 2));
      })
      .catch(e => console.error(`Error making call to pump: ${e}`));
  }

  render() {
    const {
      state: { timeOn },
    } = this;
    return (
      <Container>
        <input value={timeOn} onChange={e => this.handleInput(e, 'timeOn')} />
        <button onClick={this.handleSubmit} type="button">
          Submit
        </button>
      </Container>
    );
  }
}

// Water.propTypes = {
// };

export default Water;
