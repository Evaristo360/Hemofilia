import { useApi } from 'hooks';
import moment from 'moment';

const useApiCalls = () => {
  const [getDocuments] = useApi({
    endpoint: 'document/dashboard/list',
    method: 'get'
  });

  const [getDocument] = useApi({
    endpoint: 'document/dashboard/get',
    method: 'get'
  });

  const [getSpecialty] = useApi({
    endpoint: 'catalogue/speciality/list',
    method: 'get'
  });

  const [postDocuments] = useApi({
    endpoint: 'document/dashboard/create',
    method: 'post'
  });

  const [updateDocument] = useApi({
    endpoint: 'document/dashboard/change-status',
    method: 'post'
  });

  const [deleteDocument] = useApi({
    endpoint: 'document/dashboard/delete',
    method: 'delete'
  });

  const [putDocument] = useApi({
    endpoint: 'document/dashboard/update',
    method: 'put'
  });

  const [getDocumentsExport] = useApi({
    endpoint: '/export/dashboard/document',
    method: 'get'
  });

  const getDocumentsList = async (stateSetter) => {
    const response = await getDocuments();

    if (response.headerResponse.status === 200) {
      const resp = response.payload.map((item) => ({
        ...item,
        createdAt: moment(item.createdAt).format('DD/MM/YYYY')
      }));

      stateSetter(resp);
    }
  };

  const getDocumentById = async (itemId) => {
    const response = await getDocument({ urlParams: itemId });

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

  const createDocument = async (data, file, stateSetter) => {
    try {
      const response = await postDocuments({
        body: {
          ...data,
          url: file
        }
      });

      if (response.headerResponse.status === 200) getDocumentsList(stateSetter);
    } catch (error) {
      throw new Error(error);
    }
  };

  const changeStatusDocumentById = async (itemId, status) => {
    const response = await updateDocument({
      urlParams: itemId,
      body: { status }
    });

    return response.payload;
  };

  const deleteDocumentById = async (itemId) => {
    try {
      const response = await deleteDocument({ urlParams: itemId });

      return response.payload;
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateDocumentById = async (itemId, data, stateSetter) => {
    try {
      const response = await putDocument({
        urlParams: itemId,
        body: data
      });

      if (response.headerResponse.status === 200) getDocumentsList(stateSetter);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getDocumentsCSV = async () => {
    try {
      const response = await getDocumentsExport();

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
    getDocumentsList,
    getSpecialtyList,
    getDocumentById,
    createDocument,
    changeStatusDocumentById,
    deleteDocumentById,
    updateDocumentById,
    getDocumentsCSV
  ];
};

export default useApiCalls;
