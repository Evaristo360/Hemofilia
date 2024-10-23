import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Box, Container, Typography } from '@material-ui/core';
import { messages } from './SearchMessages';
import { useStyles } from './SearchStyles';
import { Item } from './Item/Item';

const exampleData = [
  {
    name: 'modules',
    items: [
      {
        title: 'Login',
        content: 'Login system',
        tag: 'autenticacion'
      },
      {
        title: 'Signup',
        content:
          'LLogin systemLogin system Login systemLogin system Login systemLogin system Login systemLogin system Login systemLogin system ogin systemLogin system ',
        tag: 'autenticacion'
      }
    ]
  },
  {
    name: 'users',
    items: [
      {
        title: 'Fabio Bermudez',
        content: 'fabiosaac12@gmail.com'
      },
      {
        title: 'Armando Albor',
        content: 'armandoalbor@gmail.com'
      },
      {
        title: 'Ricardo Francisco',
        content: 'ricardofrancisco@gmail.com'
      }
    ]
  },
  {
    name: 'tags',
    items: [
      {
        title: 'autenticacion'
      },
      {
        title: 'seguridad'
      },
      {
        title: 'crud'
      }
    ]
  }
];

const Search = () => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      {exampleData.map((section) => (
        <Box mb={3}>
          <Typography variant="h6">
            {intl.formatMessage(messages[section.name])}
          </Typography>
          <Box className={classes.itemsContainer}>
            {section.items.map((item) => (
              <Item {...item} section={section.name} />
            ))}
          </Box>
        </Box>
      ))}
    </Container>
  );
};

Search.propTypes = {};

export { Search };
