const DEFAULT_SYSTEM_NAME = 'GIRASOL_PA_LA_GIGI_OS_V1.0';
const DEFAULT_BROWSER_TITLE = 'GIGI';
const DEFAULT_INTRO_MESSAGE =
  'Te amo chisqui, no te pude mandar flores, pero te dejo esta que nunca se te va a marchitar, y siempre vas a poder tener. Espero poco a poco ir llegando a ti';

export const APP_CONFIG = {
  systemName: import.meta.env.VITE_SYSTEM_NAME || DEFAULT_SYSTEM_NAME,
  browserTitle: import.meta.env.VITE_BROWSER_TITLE || DEFAULT_BROWSER_TITLE,
  introMessage: import.meta.env.VITE_INTRO_MESSAGE || DEFAULT_INTRO_MESSAGE,
};
