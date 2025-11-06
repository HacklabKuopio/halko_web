import * as migration_20251106_175121 from './20251106_175121';

export const migrations = [
  {
    up: migration_20251106_175121.up,
    down: migration_20251106_175121.down,
    name: '20251106_175121'
  },
];
