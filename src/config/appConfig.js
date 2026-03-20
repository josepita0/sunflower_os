const DEFAULT_SYSTEM_NAME = 'GIRASOL_OS_V1.0';
const DEFAULT_BROWSER_TITLE = 'GIRASOL';
const DEFAULT_INTRO_MESSAGE =
  '';

export const APP_CONFIG = {
  systemName: import.meta.env.VITE_SYSTEM_NAME || DEFAULT_SYSTEM_NAME,
  browserTitle: import.meta.env.VITE_BROWSER_TITLE || DEFAULT_BROWSER_TITLE,
  introMessage: import.meta.env.VITE_INTRO_MESSAGE || DEFAULT_INTRO_MESSAGE,
};
