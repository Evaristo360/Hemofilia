import { useContext } from 'react';
import { DocumentsContext } from '../DocumentsContext';

export const useDocuments = () => useContext(DocumentsContext);
