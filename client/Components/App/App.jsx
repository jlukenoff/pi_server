import React, { Component } from 'react';

// import PropTypes from 'prop-types';

import styles from './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  render() {
    return (
      <div className={styles.rootContainer}>hello from react</div>
    );
  }
}

// App.propTypes = {
// };

export default App;
