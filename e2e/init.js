const detox = require('detox');
const config = require('../.detoxrc');

beforeAll(async () => {
  await detox.init(config, { launchApp: false });
  await device.launchApp({
    permissions: { notifications: 'YES' },
  });
});

beforeEach(async () => {
  await device.reloadReactNative();
});

afterAll(async () => {
  await detox.cleanup();
});
