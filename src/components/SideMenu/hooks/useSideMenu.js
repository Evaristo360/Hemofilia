import { useContext } from 'react';
import { SideMenuContext } from '../SideMenuContext';

export const useSideMenu = () => useContext(SideMenuContext);
