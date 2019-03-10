import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

// import styles from './Nav.css';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ccc;
`;

const NavButton = styled(Link)`
  height: 100%;
  text-decoration: none;
  line-height: 50px;
  color: #000;
  padding: 10px;
  border-right: 1px solid #ccc;
`;
const Nav = () => (
  <Container>
    <NavButton to="/lights">Lights</NavButton>
  </Container>
);

// Nav.propTypes = {
// };

export default Nav;
