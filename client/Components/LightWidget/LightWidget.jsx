import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { LightWidgetContainer } from '../Styles/Styles';

const InputContainer = styled.div``;
const LightInfoContainer = styled.div``;

const LightWidget = ({ light, name }) => (
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
    </InputContainer>
  </LightWidgetContainer>
);

LightWidget.propTypes = {
  light: PropTypes.object,
  name: PropTypes.string,
};

LightWidget.defaultProps = {
  light: {},
  name: '',
};

export default LightWidget;
