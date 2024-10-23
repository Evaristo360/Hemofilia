import { useContext } from 'react';
import { VideosContext } from '../VideosContext';

export const useVideos = () => useContext(VideosContext);
