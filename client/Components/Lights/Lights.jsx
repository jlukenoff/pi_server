import React, { Component } from 'react';
import styled from '@emotion/styled';
import LightWidget from '../LightWidget/LightWidget';
// import PropTypes from 'prop-types';

const Container = styled.div`
  width: 800px;
  margin: auto;
  border: 1px solid #ccc;
`;

const LightEntryContainer = styled.div`
  width: 80%;
  min-height: 80px;
  margin: auto;
`;

const LightsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
`;

const ScheduleContainer = styled.iframe`
  border: 0;
`;

class Lights extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lights: [],
    };
  }

  componentDidMount() {
    return fetch('/api/hue')
      .then(c => c.json())
      .then(d => {
        this.setState({
          lights: Object.keys(d).map(lightIdx => ({
            isOn: d[lightIdx].state.on,
            brightness: d[lightIdx].state.bri,
            isReachable: d[lightIdx].state.reachable,
            name: d[lightIdx].name,
          })),
        });
      })
      .catch(e =>
        console.error(
          `Error fetching HUE light data (/client/Components/Lights.jsx:43): ${e}`
        )
      );
  }

  renderLights(lightsList) {
    return lightsList.map(l => {
      console.log(JSON.stringify(l, null, 2));
      return <LightWidget />;
    });
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
