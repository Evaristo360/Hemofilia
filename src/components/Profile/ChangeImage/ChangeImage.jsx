import React from 'react';
import { useIntl } from 'react-intl';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid
} from '@material-ui/core';
import { messages } from './ChangeImageMessages';
import { useStyles } from './ChangeImageStyles';
import { ProfileIcons } from 'assets';
import { useChangeImage } from './useChangeImage';
import { renderImagePicker } from '@octopy/react-form';

export const ChangeImage = ({ formik }) => {
  const { profileImage } = ProfileIcons;
  const { formatMessage: f } = useIntl();
  const classes = useStyles();
  const { fieldsForm } = useChangeImage();

  const fieldsMapper = (field, index) => (
    <Grid item {...field.breakpoints}>
      {field.type === 'image' && renderImagePicker({ index, formik, field })}
    </Grid>
  );

  return (
    <Card className={classes.cardContainer}>
      <CardHeader
        avatar={
          <img
            src={profileImage}
            alt={'ProfileImage-Icon'}
            style={{ marginRight: '-8px' }}
          />
        }
        title={
          <Typography variant="h4" color="primary">
            {f(messages.title)}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="h7" color="primary" display="block">
          {f(messages.selectPhoto)}
        </Typography>
        {fieldsForm.map(fieldsMapper)}
      </CardContent>
    </Card>
  );
};
