import React from 'react';
import { AuthProvider } from '@octopy/react-auth';
import { ModalProvider } from '@octopy/react-modal';
import { LoaderProvider } from '@octopy/react-loader';
// import { ContextLogger } from 'components/ContextLogger';

import { App } from 'components/App';
import { RootProvider } from 'components/RootProvider';
import { LanguageProvider } from 'components/Language';
import { ThemeProvider } from 'components/Theme';
import { DrawerProvider } from 'components/Drawer';
import { SideMenuProvider } from 'components/SideMenu';
import { config } from 'providers/config';
import { translations } from './translations';
// import appContext from './context';

// const contextConfig = { objectDiffs: true, arrayDiffs: false };

export function Root() {
  return (
    <>
      <ThemeProvider defaultTheme={config.siteConfig.defaultTheme}>
        <LanguageProvider
          locale={config.siteConfig.languageCode}
          translations={translations}
        >
          <RootProvider>
            <LoaderProvider>
              <ModalProvider>
                <DrawerProvider>
                  <AuthProvider>
                    <SideMenuProvider>
                      <App />
                      {/* <ContextLogger
                        contexts={appContext}
                        config={contextConfig}
                      /> */}
                    </SideMenuProvider>
                  </AuthProvider>
                </DrawerProvider>
              </ModalProvider>
            </LoaderProvider>
          </RootProvider>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}
