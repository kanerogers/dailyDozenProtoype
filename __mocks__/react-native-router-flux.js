import React, { PropTypes } from 'react';
import { View } from 'react-native';

export const Scene = props => <View {...props} />;

export const Router = ({ children }) => <View>{children}</View>;

Router.propTypes = {
  children: PropTypes.node.isRequired,
};
