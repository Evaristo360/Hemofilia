import { useApi } from 'hooks';

const useApiCalls = () => {
  const [getDocuments] = useApi({
    endpoint: 'document/web/list',
    method: 'get'
  });

  const [getDocument] = useApi({
    endpoint: 'document/web/get',
    method: 'get'
  });

  const [voteDocument] = useApi({
    endpoint: 'document/web/vote',
    method: 'post'
  });

  const getDocumentsList = async () => {
    const response = await getDocuments();

    if (response.headerResponse.status === 200) {
      return response.payload;
    }
  };

  const getDocumentById = async (itemId) => {
    const response = await getDocument({ urlParams: itemId });

    return response.payload;
  };

  const voteDocumentById = async (itemId, points) => {
    try {
      const response = await voteDocument({
        urlParams: itemId,
        body: {
          points
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  return [getDocumentsList, getDocumentById, voteDocumentById, getDocument];
};

export default useApiCalls;
