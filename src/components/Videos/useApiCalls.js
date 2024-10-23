import { useApi } from 'hooks';
import moment from 'moment';

const useApiCalls = () => {
  const [getVideos] = useApi({
    endpoint: 'video/dashboard/list',
    method: 'get'
  });

  const [getVideo] = useApi({
    endpoint: 'video/dashboard/get',
    method: 'get'
  });

  const [getSpecialty] = useApi({
    endpoint: 'catalogue/speciality/list',
    method: 'get'
  });

  const [postVideos] = useApi({
    endpoint: 'video/dashboard/create',
    method: 'post'
  });

  const [updateVideo] = useApi({
    endpoint: 'video/dashboard/change-status',
    method: 'post'
  });

  const [deleteVideo] = useApi({
    endpoint: 'video/dashboard/delete',
    method: 'delete'
  });

  const [putVideo] = useApi({
    endpoint: 'video/dashboard/update',
    method: 'put'
  });

  const [getVideosExport] = useApi({
    endpoint: '/export/dashboard/video',
    method: 'get'
  });

  const getVideosList = async (stateSetter) => {
    const response = await getVideos();

    if (response.headerResponse.status === 200) {
      const resp = response.payload.map((item) => ({
        ...item,
        createdAt: moment(item.createdAt).format('DD/MM/YYYY')
      }));

      stateSetter(resp);
    }
  };

  const getVideoById = async (itemId) => {
    const response = await getVideo({ urlParams: itemId });

    return response.payload;
  };

  const getSpecialtyList = async (stateSetter) => {
    const response = await getSpecialty();

    if (response.headerResponse.status === 200) {
      const specialtyList = response.payload.map((item) => ({
        name: item.name,
        label: item._id
      }));

      stateSetter(specialtyList);
    }
  };

  const createVideo = async (data, file, stateSetter) => {
    try {
      const response = await postVideos({
        body: {
          ...data,
          url: file
        }
      });

      if (response.headerResponse.status === 200) getVideosList(stateSetter);
    } catch (error) {
      throw new Error(error);
    }
  };

  const changeStatusVideoById = async (itemId, status) => {
    const response = await updateVideo({
      urlParams: itemId,
      body: { status }
    });

    return response.payload;
  };

  const deleteVideoById = async (itemId) => {
    const response = await deleteVideo({ urlParams: itemId });

    return response.payload;
  };

  const updateVideoById = async (itemId, data, stateSetter) => {
    try {
      const response = await putVideo({
        urlParams: itemId,
        body: data
      });

      if (response.headerResponse.status === 200) getVideosList(stateSetter);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getVideosCSV = async () => {
    try {
      const response = await getVideosExport();

      if (response.headerResponse.status === 200) {
        const url = response.payload.url;
        const a = document.createElement('a');

        a.setAttribute('href', url);
        a.setAttribute('download', '');
        a.click();
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return [
    getVideosList,
    getVideoById,
    getSpecialtyList,
    createVideo,
    changeStatusVideoById,
    deleteVideoById,
    updateVideoById,
    getVideosCSV
  ];
};

export default useApiCalls;
