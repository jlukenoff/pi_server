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

    this.toggleOnOff = this.toggleOnOff.bind(this);
    this.handleLightAdjust = this.handleLightAdjust.bind(this);
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

  toggleOnOff(e, name) {
    const {
      state: { lights },
    } = this;
    const { id } = lights[name];
    const payload = { name, id, on: e.target.checked };

    // console.log('e.target.checked:', e.target.checked);

    console.log(
      'JSON.stringify(payload, null, 2):',
      JSON.stringify(payload, null, 2)
    );
    return fetch('/api/hue/toggle', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(c => c.json())
      .then(res => {
        console.log('res:', res);
        return this.setState({ lights: res });
      })
      .catch(err => console.error(`Error toggling light ${name}: ${err}`));
  }

  handleLightAdjust(e, name) {
    const {
      state: { lights },
    } = this.state;
    const { id } = lights[name];
    const payload = { id, name, bri: e.target.value };

    return fetch('/api/hue/adjust', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(c => c.json())
      .then(res => {
        return this.setState({ lights: res.lights });
      })
      .catch(err => console.error(`Error toggling light ${name}: ${err}`));
  }

  render() {
    const { lights } = this.state;
    return (
      <Container>
        <LightsContainer>
          {lights &&
            Object.entries(lights).map(lightPair => (
              <LightWidget
                light={lightPair[1]}
                name={lightPair[0]}
                checked={lightPair[1].state.on}
                handleLightAdjust={this.handleLightAdjust}
                toggleOnOff={this.toggleOnOff}
              />
            ))}
        </LightsContainer>
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
