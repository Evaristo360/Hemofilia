import React, { useEffect } from 'react';
import { get } from 'lodash';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useLoader } from '@octopy/react-loader';
import { Alert, useModal } from '@octopy/react-modal';
import {
  VerifyAccount as VerifyAccountComponent,
  setToken,
  decodeToken
} from '@octopy/react-auth';
import { useApi, useQueryString } from 'hooks';
import { messages } from './VerifyAccountMessages';

const VerifyAccount = () => {
  const intl = useIntl();
  const history = useHistory();
  const queryString = useQueryString();
  const { handleShowLoader } = useLoader();
  const { handleOpenModal } = useModal();

  const token = get(queryString, 'token', '').replaceAll('$', '.');

  const [resetPasswordService] = useApi({
    endpoint: 'auth/verify-account',
    method: 'post',
    token
  });

  useEffect(() => {
    setToken(token);
  }, []);

  const submitPin = async (formData) => {
    if (!token) return;

    handleShowLoader(true);
    const { email } = decodeToken(token);

    const { headerResponse = {} } = await resetPasswordService({
      body: { token, pin: formData.pin }
    });

    if (headerResponse.status === 200) {
      handleOpenModal({
        body: (
          <Alert message={intl.formatMessage(messages.successVerifyMessage)} />
        ),
        configProps: {
          maxWidth: 'xs'
        }
      });

      handleShowLoader(false);
      history.push(`/login/${email}`);
    }
  };

  return <VerifyAccountComponent actions={{ handleSubmit: submitPin }} />;
};

export { VerifyAccount };
