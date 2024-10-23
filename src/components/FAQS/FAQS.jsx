import React from 'react';
import {
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useIntl } from 'react-intl';
import { useStyles } from './FAQSStyle';
import { messages } from './FAQSMessages';

const FAQS = () => {
  const classes = useStyles();
  const intl = useIntl();

  const [expanded, setExpanded] = React.useState('');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Container spacing={2} className={classes.mainContainer}>
      {[...new Array(9)].map((x, i) => (
        <Accordion
          expanded={expanded === `faq${i}`}
          onChange={handleChange(`faq${i}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`faq${i}-content`}
            id={`faq${i}-header`}
          >
            <Typography className={classes.heading}>
              {`${i + 1}. `}
              {intl.formatMessage(messages[`faq${i + 1}`])}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {intl.formatMessage(messages[`answer${i + 1}`])}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQS;
