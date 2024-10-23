import React from 'react';
import { Box, Typography } from '@material-ui/core';

const Section = ({ children, title }) => (
  <Box m={2} mt={0}>
    <Typography variant="subtitle2">{title}</Typography>
    <Box pt={1}>{children}</Box>
  </Box>
);

export { Section };
