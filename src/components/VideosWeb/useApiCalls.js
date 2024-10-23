import { useApi } from 'hooks';

const useApiCalls = () => {
  const [getVideos] = useApi({
    endpoint: 'video/web/list',
    method: 'get'
  });

  const [getVideo] = useApi({
    endpoint: 'video/web/get',
    method: 'get'
  });

  const [voteVideo] = useApi({
    endpoint: 'video/web/vote',
    method: 'post'
  });

  const getVideosList = async () => {
    const response = await getVideos();

    if (response.headerResponse.status === 200) {
      return response.payload;
    }
  };

  const getVideoById = async (itemId) => {
    const response = await getVideo({ urlParams: itemId });

    return response.payload;
  };

  const voteVideoById = async (itemId, points) => {
    try {
      const response = await voteVideo({
        urlParams: itemId,
        body: {
          points
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  return [getVideosList, getVideoById, voteVideoById, getVideo];
};

export default useApiCalls;
