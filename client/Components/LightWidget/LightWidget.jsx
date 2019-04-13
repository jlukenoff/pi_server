import React from 'react';
import styled from '@emotion/styled';
import { LightWidgetContainer } from '../Styles/Styles'

const LightWidget = ({
  light,
  name
}) => <LightWidgetContainer>
  Name: {name}<br/>On: {light.state.on ? 'true' : 'false'}<br />reachable: {light.state.reachable ? 'true' : 'false'}</LightWidgetContainer>;

// LightWidget.propTypes = {
// };

export default LightWidget;
