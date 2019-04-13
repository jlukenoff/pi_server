import React, { Component } from 'react';
import styled from '@emotion/styled';
import LightWidget from '../LightWidget/LightWidget';
// import PropTypes from 'prop-types';

const Container = styled.div`
  width: 800px;
  margin: auto;
`;

const LightsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  margin-bottom: 15px;
`;

const ScheduleContainer = styled.iframe`
  border: 0;
`;

class Lights extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lights: {},
    };
  }

  componentDidMount() {
    return fetch('/api/hue')
      .then(c => c.json())
      .then(lights => {
        this.setState({
          lights,
        });
      })
      .catch(e =>
        console.error(
          `Error fetching HUE light data (/client/Components/Lights.jsx:43): ${e}`
        )
      );
  }

  renderLights(lights) {
    return Object.entries(lights).map(lightPair => (
      <LightWidget light={lightPair[1]} name={lightPair[0]} />
    ));
  }

  render() {
    const { lights } = this.state;
    return (
      <Container>
        <LightsContainer>{lights && this.renderLights(lights)}</LightsContainer>
        <ScheduleContainer
          title="Schedule"
          src="https://calendar.google.com/calendar/embed?src=vcdf9rcs3t08i69aun44r3f394%40group.calendar.google.com&ctz=America%2FLos_Angeles"
          width="800"
          height="600"
          frameBorder="0"
        />
      </Container>
    );
  }
}

// Lights.propTypes = {
// };

export default Lights;
