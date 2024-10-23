import React from 'react';
import PropTypes from 'prop-types';
import { Box, ButtonBase, Card, Typography } from '@material-ui/core';
import { useStyles } from './ItemStyles';
import { useModal } from '@octopy/react-modal';
import {
  ItemDetailsModalBody,
  ItemDetailsModalActions
} from 'components/ItemDetailsModal';
import { messages } from './ItemMessages';
import { useIntl } from 'react-intl';

const Item = ({ id, title, content, tag, section }) => {
  const { formatMessage } = useIntl();
  const classes = useStyles();
  const { handleOpenModal } = useModal();

  const handleClick = () => {
    handleOpenModal({
      title: formatMessage(messages[`${section}Item`]),
      body: <ItemDetailsModalBody />,
      configProps: {
        maxWidth: 'sm'
      },
      actionButtons: <ItemDetailsModalActions section={section} id="0" />
    });
  };

  return (
    <ButtonBase className={classes.container} onClick={handleClick}>
      <Card className={classes.card}>
        <Box className={classes.titleContainer}>
          <Typography variant="subtitle1">{title}</Typography>
          {tag && (
            <Typography
              className={classes.tag}
              variant="caption"
              color="primary"
            >
              #{tag}
            </Typography>
          )}
        </Box>
        {content && (
          <Typography className={classes.content} variant="body2">
            {content}
          </Typography>
        )}
      </Card>
    </ButtonBase>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired
};

export { Item };
