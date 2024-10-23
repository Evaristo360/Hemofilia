import React, { useEffect } from 'react';
import { get } from 'lodash';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useLoader } from '@octopy/react-loader';
import { Alert, useModal } from '@octopy/react-modal';
import {
  PasswordRecovery as PasswordRecoveryComponent,
  setToken,
  decodeToken
} from '@octopy/react-auth';
import { useApi, useQueryString } from 'hooks';
import { messages } from './PasswordRecoveryMessages';

const PasswordRecovery = () => {
  const intl = useIntl();
  const history = useHistory();
  const queryString = useQueryString();
  const { handleShowLoader } = useLoader();
  const { handleOpenModal } = useModal();

  const token = get(queryString, 'token', '').replaceAll('$', '.');

  const [resetPasswordService] = useApi({
    endpoint: 'auth/recovery-password/reset',
    method: 'post',
    token
  });

  useEffect(() => {
    setToken(token);
  }, []);

  const submitNewPassword = async (formData) => {
    if (!token) return;

    handleShowLoader(true);
    const { email } = decodeToken(token);

    const { headerResponse = {} } = await resetPasswordService({
      body: { token, password: formData.password, pin: formData.pin }
    });

    if (headerResponse.status === 200) {
      handleOpenModal({
        body: (
          <Alert
            message={intl.formatMessage(messages.successRecoveryMessage)}
          />
        ),
        configProps: {
          maxWidth: 'xs'
        }
      });

      handleShowLoader(false);
      history.push(`/login/${email}`);
    }
  };

  return (
    <PasswordRecoveryComponent actions={{ handleSubmit: submitNewPassword }} />
  );
};

export { PasswordRecovery };
