import { get } from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Register as RegisterComponent } from '@octopy/react-auth';
import { useLoader } from '@octopy/react-loader';
import { Alert, useModal } from '@octopy/react-modal';
import { uploadFile } from '@octopy/react-aws-utils';
import { useApi } from 'hooks';
import { messages } from '../AuthMessages';

const Register = () => {
  const intl = useIntl();
  const history = useHistory();
  const { handleShowLoader } = useLoader();
  const { handleOpenModal } = useModal();

  const [specialityList, setSpecialityList] = useState(null);
  const [stateList, setStateList] = useState(null);
  const formikRef = useRef();

  const [signUpService] = useApi({
    endpoint: 'auth/register',
    method: 'post'
  });

  const [specialityListService] = useApi({
    endpoint: 'catalogue/speciality/list',
    method: 'get'
  });

  const [stateListService] = useApi({
    endpoint: 'catalogue/state/list',
    method: 'get'
  });

  const [checkIdService] = useApi({
    endpoint:
      'https://www.cedulaprofesional.sep.gob.mx/cedula/buscaCedulaJson.action',
    method: 'post'
  });

  useEffect(async () => {
    const specialtyResponse = await specialityListService();
    const stateResponse = await stateListService();

    setSpecialityList(get(specialtyResponse, 'payload', []));
    setStateList(get(stateResponse, 'payload', []));
  }, []);

  // const handleCheckId = async (id) => {
  //   let isValid = false;

  //   try {
  //     let formData = new FormData();

  //     formData.append(
  //       'json',
  //       `{"maxResult":"1000","nombre":"","paterno":"","materno":"","idCedula":"${id}"}`
  //     );

  //     const response = await checkIdService({
  //       body: formData,
  //       ignoreValidation: true
  //     });

  //     if (get(response, ['items', 'length'], 0) === 0) {
  //       formikRef.current.setErrors({
  //         professionalId: intl.formatMessage(messages.invalidId)
  //       });

  //       return false;
  //     }

  //     return true;
  //   } catch (e) {
  //     formikRef.current.setErrors({
  //       professionalId: intl.formatMessage(messages.invalidId)
  //     });
  //   }

  //   return isValid;
  // };

  const handleUploadImage = async (image, callback) => {
    handleShowLoader(true);

    uploadFile({
      file: image.file,
      onError: () => {
        handleOpenModal({
          configProps: {
            maxWidth: 'sm'
          },
          body: <Alert message={intl.formatMessage(messages.uploadFileError)} />
        });

        handleShowLoader(false);
      },
      onSuccess: (fileUrl) => {
        handleShowLoader(false);

        callback(fileUrl);
      }
    });
  };

  const handleSubmit = async (values) => {
    try {
      // const isValidId = await handleCheckId(values.professionalId);
      const isValidId = true;

      if (isValidId && get(values, 'image.file', null)) {
        await handleUploadImage(values.image, async (urlAvatar) => {
          const { headerResponse = {} } = await signUpService({
            body: {
              email: values.email,
              name: values.name,
              password: values.password,
              speciality: values.speciality,
              state: values.state,
              license: values.professionalId,
              clinic: values.hospital,
              avatar: urlAvatar,
              phone: values.phone
            }
          });

          if (headerResponse.status === 200) {
            handleOpenModal({
              body: (
                <Alert
                  message={intl.formatMessage(messages.successRegisterMessage)}
                />
              ),
              configProps: {
                maxWidth: 'xs'
              }
            });

            history.push(`/login/${values.email}`);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!stateList || !specialityList) return null;

  return (
    <RegisterComponent
      actions={{ handleSubmit }}
      aditionalData={{ states: stateList, speciality: specialityList }}
      formikRef={formikRef}
    />
  );
};

export { Register };
