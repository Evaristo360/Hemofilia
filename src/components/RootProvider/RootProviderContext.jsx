import { get } from 'lodash';
import { createContext } from 'react';
import { getItem } from 'utils/persistentStorage';

export const initialState = {
  session: {
    token: getItem('token'),
    user: get(getItem('session'), 'user')
  },
  userAdmin: {},
  users: [],
  tags: [],
  tasks: [],
  modules: [],
  quotations: [],
  doctors: [],
  specialitys: [],
  states: [],
  statistics: {
    staticData: [],
    userInteractions: [],
    mostSee: [],
    topRated: [],
    percentageDoctorsBySpeciality: []
  },
  lastContent: {
    lastDocuments: [],
    lastVideos: []
  }
};

export const RootProviderContext = createContext();
