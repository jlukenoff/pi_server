import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { LightWidgetContainer } from '../Styles/Styles';

const InputContainer = styled.div``;
const LightInfoContainer = styled.div``;

const Switch = styled.div`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  /* Hide default HTML checkbox */
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

class LightWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
    };
  }

  render() {
    const { light, name } = this;
    return (
      <LightWidgetContainer>
        <LightInfoContainer>
          Name: {name}
          <br />
          On: {light.state.on ? 'true' : 'false'}
          <br />
          reachable: {light.state.reachable ? 'true' : 'false'}
        </LightInfoContainer>
        <InputContainer>
          <input
            type="range"
            min="0"
            max="254"
            value={light.state.bri}
            onChange={e => console.log(e.target.value)}
          />
          <Switch>
            <input type="checkbox" />
            <span className="slider round" />
          </Switch>
        </InputContainer>
      </LightWidgetContainer>
    );
  }
}

LightWidget.propTypes = {
  light: PropTypes.object,
  name: PropTypes.string,
};

LightWidget.defaultProps = {
  light: {},
  name: '',
};

export default LightWidget;
