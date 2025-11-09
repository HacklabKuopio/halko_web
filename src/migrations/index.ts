import * as migration_20251109_205054 from './20251109_205054';

export const migrations = [
  {
    up: migration_20251109_205054.up,
    down: migration_20251109_205054.down,
    name: '20251109_205054'
  },
];
