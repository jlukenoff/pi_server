import React from 'react';
import styled from '@emotion/styled';
// import PropTypes from 'prop-types';

const Container = styled.div`
  width: 90%;
  margin: auto;
  border: 1px solid #000;
  min-height: 75px;
`;
const LightWidget = ({
  isOn,
  brightness,
  name,
  handleToggle,
  handleAdjust,
}) => <div>hello from react</div>;

// LightWidget.propTypes = {
// };

export default LightWidget;
