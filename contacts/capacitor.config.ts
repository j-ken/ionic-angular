import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ch.coop.contacts',
  appName: 'contacts',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
