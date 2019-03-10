import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Route, Switch } from 'react-router-dom';
import Lights from '../Lights/Lights';
import Nav from '../Nav/Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  render() {
    const Container = styled.div`
      width: 920px;
      margin: auto;
      min-height: 600px;
      border: 1px solid #ccc;
      font-family: Helvetica-Neue, Arial, sans-serif;
    `;
    return (
      <Container>
        <Nav />
        <Switch>
          <Route path="/lights" component={Lights} />
        </Switch>
      </Container>
    );
  }
}

// App.propTypes = {
// };

export default App;
