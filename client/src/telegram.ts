export type WebAppUser = {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name: string;
  username: string;
  is_premium: boolean;
  photo_url: string;
};


export type WebappData = {
  user: WebAppUser;
};


export type TelegramWebapp = {
  initData: string;
  initDataUnsafe: WebappData;
  version: string;
  platform: string;
  headerColor: string;
  backgroundColor: string;
  expand: () => void;
  close: () => void;
};

type Window = {
  Telegram?: {
    WebApp: TelegramWebapp;
  };
};

declare var window: Window; 

export const tg: TelegramWebapp | undefined = window.Telegram?.WebApp;