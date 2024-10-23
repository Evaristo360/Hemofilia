import { get } from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import {
  Login as LoginComponent,
  decodeToken,
  useAuth
} from '@octopy/react-auth';
import { getItem, setItem } from 'utils/persistentStorage';
import { Alert, useModal } from '@octopy/react-modal';
import { useApi, useQueryString } from 'hooks';
import { useRootProvider } from 'components/RootProvider';
import { messages } from './LoginMessages';

const Login = () => {
  const intl = useIntl();
  const history = useHistory();
  const queryString = useQueryString();
  const { actions: authActions } = useAuth();
  const { handleChangeSession } = useRootProvider();
  const { handleOpenModal, handleCloseModal } = useModal();

  const [loginService] = useApi({
    endpoint: 'auth/login',
    method: 'post'
  });

  const [recoveryPassword] = useApi({
    endpoint: `auth/recovery-password/email`,
    method: 'post'
  });

  const handleSubmit = async (data) => {
    try {
      const authResponse = await loginService({
        body: data
      });

      const token = get(authResponse, ['payload', 'token'], null);
      const user = get(authResponse, ['payload', 'user'], null);

      if (token) {
        const sessionData = {
          token,
          user,
          status: true
        };

        await authActions.login(sessionData);
        handleChangeSession({ session: sessionData });

        setItem('session', {
          user,
          status: true
        });

        history.push('/');
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const submitEmail = async (formData) => {
    const responseRecoveryPass = await recoveryPassword({
      body: { email: formData.email }
    });

    if (responseRecoveryPass.headerResponse.status === 200) {
      handleCloseModal();

      handleOpenModal({
        body: (
          <Alert message={intl.formatMessage(messages.checkEmailMessage)} />
        ),
        configProps: {
          maxWidth: 'xs'
        }
      });
    }
  };

  return (
    <LoginComponent
      actions={{ handleSubmit, handleSubmitEmailToRecovery: submitEmail }}
    />
  );
};

export { Login };
