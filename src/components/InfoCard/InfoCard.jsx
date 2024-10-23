import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Card,
  Box,
  CardActionArea,
  CardContent
} from '@material-ui/core';
import { VideoLibrary, ChromeReaderMode } from '@material-ui/icons';
import { useStyles } from './InfoCardStyles';

const InfoCard = ({
  title,
  number,
  image,
  moreInfoCard,
  specialty,
  numberSpecialty,
  onClick,
  qualified,
  numberDoc,
  numberQualified,
  modalCards,
  widthCard
}) => {
  const classes = useStyles({ modalCards, widthCard });

  return (
    <>
      {moreInfoCard ? (
        <Card className={classes.rootmoreInfoCard}>
          <Box style={{ height: '83px' }}>
            <img
              src={image}
              alt="icon-specialty"
              className={classes.iconSpecialty}
            />
          </Box>
          <Box className={classes.contentSpecialty}>
            <Typography className={classes.titleSpecialty}>
              {specialty}
            </Typography>

            {qualified ? (
              <Box className={classes.contentQualified}>
                <Box display={'flex'}>
                  <ChromeReaderMode className={classes.iconQualified} />
                  &nbsp;
                  <Box className={classes.qualified}>
                    <Typography className={classes.numberQualifiedModal}>
                      {numberQualified}
                    </Typography>
                  </Box>
                </Box>
                <Box display={'flex'}>
                  <VideoLibrary className={classes.iconQualified} /> &nbsp;
                  <Box className={classes.qualified}>
                    <Typography className={classes.numberQualifiedModal}>
                      {numberDoc}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Typography className={classes.numberSpecialty}>
                {numberSpecialty}
              </Typography>
            )}
          </Box>
        </Card>
      ) : (
        <Card onClick={onClick} className={classes.root}>
          <CardActionArea>
            <CardContent>
              {image && <Box>{image}</Box>}
              <Typography className={classes.title}>{title}</Typography>
              <Typography className={classes.infoNumber}>{number}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  );
};

InfoCard.propTypes = {
  title: PropTypes.string,
  number: PropTypes.string,
  image: PropTypes.string,
  moreInfoCard: PropTypes.bool,
  specialty: PropTypes.string,
  numberSpecialty: PropTypes.number,
  onClick: PropTypes.func,
  qualified: PropTypes.bool,
  numberDoc: PropTypes.number,
  numberQualified: PropTypes.number,
  modalCards: PropTypes.any,
  widthCard: PropTypes.any
};

export { InfoCard };
