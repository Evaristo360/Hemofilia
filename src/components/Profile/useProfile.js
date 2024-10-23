/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { useApi } from 'hooks';
import { get } from 'lodash';
import { useRootProvider } from 'components/RootProvider';

export const useProfile = () => {
  const {
    handleChangeSpecialitys,
    handleChangeStates,
    rootState
  } = useRootProvider();
  const { specialitys, states } = rootState;


  const [getStates] = useApi({
    endpoint: 'catalogue/state/list',
    method: 'get'
  });

  const getStatesList = async () => {
    const response = await getStates();

    const states = get(response, 'payload', []);

    handleChangeStates(states);
  };

  const [getSpecialitys] = useApi({
    endpoint: 'catalogue/speciality/list',
    method: 'get'
  });

  const getSpecialitysList = async () => {
    const response = await getSpecialitys();

    const specialitys = get(response, 'payload', []);

    handleChangeSpecialitys(specialitys);
  };

  useEffect(() => {
    getStatesList();
    getSpecialitysList();
  }, []);

  return {
    states,
    specialitys
  };
};
