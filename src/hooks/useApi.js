/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { HttpErrorAlert, useModal } from '@octopy/react-modal';
import { useLoader } from '@octopy/react-loader';
import { useAuth } from '@octopy/react-auth';
import { instance } from 'providers/api';
import { toQueryString } from 'utils/http';

const useApi = ({ endpoint, method }) => {
  const history = useHistory();
  const [responseData, setResponseData] = useState(null);
  const [responseCode, setResponseCode] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { actions: authActions } = useAuth();

  const { handleOpenModal, handleCloseModal } = useModal();
  const { handleShowLoader } = useLoader();

  useEffect(() => {
    if (_.includes(endpoint, 'log-out')) return;

    const isAuthFlow = _.includes(endpoint, 'sign-in');

    if (_.get(error, 'code', 0) === 401 && !isAuthFlow) {
      authActions.logout();

      // TODO: Add this remove to auth package
      // window.localStorage.removeItem('event');
      // history.push('/login');

      handleOpenModal({
        configProps: {
          maxWidth: 'sm'
        },
        body: (
          <HttpErrorAlert
            errorCode={error ? error.code : responseCode}
            errorMessage={'Tu sesión ha caducado, vuelve a ingresar.'}
            onAccept={handleCloseModal}
          />
        )
      });
    } else if (error || (responseCode && responseCode >= 400)) {
      const customMessage = _.get(responseData, 'headerResponse.message', null);

      handleOpenModal({
        configProps: {
          maxWidth: 'sm'
        },
        body: (
          <HttpErrorAlert
            errorCode={error ? error.code : responseCode}
            errorMessage={error.message || customMessage}
            onAccept={handleCloseModal}
          />
        )
      });
    }
  }, [error, responseCode]);

  const handleFetch = async ({
    body = {},
    urlParams = null,
    queryString = null,
    ignoreValidation = false
  } = {}) => {
    let url = `${endpoint}${urlParams ? `/${urlParams}` : ''}`;

    if (_.isObject(queryString)) {
      url = `${url}?${toQueryString(queryString)}`;
    }

    try {
      setLoading(true);
      handleShowLoader(true);
      setError(null);

      const response = await instance[method](url, body);

      if (!ignoreValidation) {
        const headerResponse = _.get(response, ['data', 'headerResponse']);
        const hasError = _.get(headerResponse, 'status', 0) !== 200;

        const status = _.get(headerResponse, 'status', 666);
        const message = _.get(headerResponse, 'message', '');

        if (hasError) {
          setError({
            code: status,
            name: message,
            message: message
          });
        } else {
          setResponseData(response.data);
          setStatus(status);
          setResponseCode(status);
        }
      }

      return response.data;
    } catch (error) {
      setLoading(false);
      handleShowLoader(false);

      setError({
        code: _.get(error, 'response.status'),
        name: _.get(error, 'response.statusText'),
        message: _.get(error, 'response.data.headerResponse.message', null)
      });

      return _.get(error, 'response.data');
    } finally {
      setLoading(false);
      handleShowLoader(false);
    }
  };

  return [handleFetch, responseData, loading, status];
};

export { useApi };
