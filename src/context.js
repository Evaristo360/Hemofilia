import { ModalContext } from '@octopy/react-modal';
import { LoaderContext } from '@octopy/react-loader';
import { LanguageContext } from 'components/Language/LanguageContext';
import { ThemeContext } from 'components/Theme/ThemeContext';
import { SideMenuContext } from 'components/SideMenu/SideMenuContext';
import { RootProviderContext } from 'components/RootProvider/RootProviderContext';
import { DrawerContext } from 'components/Drawer/DrawerContext';

const appContext = {
  language: LanguageContext,
  theme: ThemeContext,
  modal: ModalContext,
  loader: LoaderContext,
  sideMenu: SideMenuContext,
  drawer: DrawerContext,
  root: RootProviderContext
};

export default appContext;
