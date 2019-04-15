import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
// import { debounce } from '../../utils';
import { LightWidgetContainer } from '../Styles/Styles';

const InputContainer = styled.div``;
const LightInfoContainer = styled.div``;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;

  /* Hide default HTML checkbox */
  input {
    opacity: 0;
    width: 12px;
    height: 12px;
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
    height: 13px;
    width: 13px;
    left: 2px;
    bottom: 2px;
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
    -webkit-transform: translateX(13px);
    -ms-transform: translateX(13px);
    transform: translateX(13px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 17px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

const LightWidget = ({
  light,
  name,
  toggleOnOff,
  handleLightAdjust,
  checked,
}) => {
  // handleLightAdjust = debounce(handleLightAdjust, 1000);
  console.log('checked:', !!(light.state.reachable && light.state.on));
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
          onChange={e => handleLightAdjust(e, name)}
        />
        <Switch>
          <input
            type="checkbox"
            // value={!!(light.state.reachable && light.state.on)}
            checked={!!(light.state.reachable && light.state.on)}
            onChange={e => toggleOnOff(e, name)}
          />
          <span className="slider round" />
        </Switch>
      </InputContainer>
    </LightWidgetContainer>
  );
};

LightWidget.propTypes = {
  light: PropTypes.object,
  name: PropTypes.string,
  toggleOnOff: PropTypes.func.isRequired,
  handleLightAdjust: PropTypes.func.isRequired,
  checked: PropTypes.bool,
};

LightWidget.defaultProps = {
  light: {},
  name: '',
  checked: false,
};

export default LightWidget;
