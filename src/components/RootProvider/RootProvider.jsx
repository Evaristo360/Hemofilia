import React, { useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { reducer } from './reducer';
import { RootProviderContext, initialState } from './RootProviderContext';

const RootProvider = (props) => {
  const { children } = props;
  const [rootState, rootDispatch] = useReducer(reducer, initialState);

  const handleChangeSession = (payload) => {
    rootDispatch({ type: 'session', payload });
  };

  const handleChangeNotifications = (payload) => {
    rootDispatch({ type: 'notifications', payload });
  };

  const handleChangeTags = (payload) => {
    rootDispatch({ type: 'tags', payload });
  };

  const handleChangeTasks = (payload) => {
    rootDispatch({ type: 'tasks', payload });
  };

  const handleChangeUserAdmin = (payload) => {
    rootDispatch({ type: 'userAdmin', payload });
  };

  const handleChangeUsers = (payload) => {
    rootDispatch({ type: 'users', payload });
  };

  const handleChangeModules = (payload) => {
    rootDispatch({ type: 'modules', payload });
  };

  const handleChangeQuotations = (payload) => {
    rootDispatch({ type: 'quotations', payload });
  };

  const handleChangeDoctors = (payload) => {
    rootDispatch({ type: 'doctors', payload });
  };

  const handleChangeSpecialitys = (payload) => {
    rootDispatch({ type: 'specialitys', payload });
  };

  const handleChangeStates = (payload) => {
    rootDispatch({ type: 'states', payload });
  };

  const handleChangeStatistics = (payload) => {
    rootDispatch({ type: 'staticData', payload });
  };

  const handleChangeUserInteractions = (payload) => {
    rootDispatch({ type: 'userInteractions', payload });
  };

  const handleChangeMostVisited = (payload) => {
    rootDispatch({ type: 'mostSee', payload });
  };

  const handleChangeTopRated = (payload) => {
    rootDispatch({ type: 'topRated', payload });
  };

  const handleChangePercentageDoctorsBySpeciality = (payload) => {
    rootDispatch({ type: 'percentageDoctorsBySpeciality', payload });
  };

  const handleChangeLastDocuments = (payload) => {
    rootDispatch({ type: 'lastDocuments', payload });
  };

  const handleChangeLastVideos = (payload) => {
    rootDispatch({ type: 'lastVideos', payload });
  };

  const contextValue = useMemo(
    () => ({
      handleChangeSession,
      handleChangeTasks,
      handleChangeTags,
      handleChangeUserAdmin,
      handleChangeUsers,
      handleChangeModules,
      handleChangeQuotations,
      handleChangeDoctors,
      handleChangeSpecialitys,
      handleChangeStates,
      handleChangeStatistics,
      handleChangeUserInteractions,
      handleChangeMostVisited,
      handleChangeTopRated,
      handleChangePercentageDoctorsBySpeciality,
      handleChangeLastDocuments,
      handleChangeLastVideos,
      handleChangeNotifications,
      rootState
    }),
    [rootState]
  );

  return (
    <RootProviderContext.Provider value={contextValue}>
      {children}
    </RootProviderContext.Provider>
  );
};

RootProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { RootProvider };
