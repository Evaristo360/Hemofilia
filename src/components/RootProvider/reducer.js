import _ from 'lodash';

export const reducer = (state, action) => {
  switch (action.type) {
    case 'session':
      return {
        ...state,
        session: _.get(action, ['payload', 'session'], '')
      };
    case 'notifications':
      return {
        ...state,
        notifications: _.get(action, 'payload')
      };
    case 'tags':
      return {
        ...state,
        tags: _.get(action, 'payload', [])
      };
    case 'tasks':
      return {
        ...state,
        tasks: _.get(action, 'payload', [])
      };
    case 'userAdmin':
      return {
        ...state,
        userAdmin: _.get(action, 'payload', {})
      };
    case 'users':
      return {
        ...state,
        users: _.get(action, 'payload', [])
      };
    case 'modules':
      return {
        ...state,
        modules: _.get(action, 'payload', [])
      };
    case 'quotations':
      return {
        ...state,
        quotations: _.get(action, 'payload', [])
      };
    case 'doctors':
      return {
        ...state,
        doctors: _.get(action, 'payload', [])
      };
    case 'specialitys':
      return {
        ...state,
        specialitys: _.get(action, 'payload', [])
      };
    case 'states':
      return {
        ...state,
        states: _.get(action, 'payload', [])
      };
    case 'staticData':
      return {
        ...state,
        statistics: {
          ...state.statistics,
          staticData: _.get(action, 'payload', [])
        }
      };
    case 'userInteractions':
      return {
        ...state,
        statistics: {
          ...state.statistics,
          userInteractions: _.get(action, 'payload', [])
        }
      };
    case 'mostSee':
      return {
        ...state,
        statistics: {
          ...state.statistics,
          mostSee: _.get(action, 'payload', [])
        }
      };
    case 'topRated':
      return {
        ...state,
        statistics: {
          ...state.statistics,
          topRated: _.get(action, 'payload', [])
        }
      };
    case 'percentageDoctorsBySpeciality':
      return {
        ...state,
        statistics: {
          ...state.statistics,
          percentageDoctorsBySpeciality: _.get(action, 'payload', [])
        }
      };
    case 'lastDocuments':
      return {
        ...state,
        lastContent: {
          ...state.lastContent,
          lastDocuments: _.get(action, 'payload', [])
        }
      };
    case 'lastVideos':
      return {
        ...state,
        lastContent: {
          ...state.lastContent,
          lastVideos: _.get(action, 'payload', [])
        }
      };
    default:
      return state;
  }
};
