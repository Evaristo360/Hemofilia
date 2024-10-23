import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { messages } from './ContentMessages';
import { Section } from './Section';
import { Mode } from './Mode/Mode';
import { Direction } from './Direction/Direction';
import { Color } from './Color/Color';
import { Stretch } from './Stretch/Stretch';
import { Fullscreen } from './Fullscreen/Fullscreen';

const Content = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Section title={formatMessage(messages.mode)}>
        <Mode />
      </Section>
      <Section title={formatMessage(messages.direction)}>
        <Direction />
      </Section>
      {/*  <Section title={formatMessage(messages.color)}>
        <Color />
      </Section> */}
      <Section title={formatMessage(messages.stretch)}>
        <Stretch />
      </Section>
      <Fullscreen />
    </>
  );
};

Content.propTypes = {};

export { Content };
