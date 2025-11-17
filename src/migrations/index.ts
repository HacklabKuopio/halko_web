import * as migration_20251109_205054 from './20251109_205054';
import * as migration_20251110_221333 from './20251110_221333';
import * as migration_20251119_145414 from './20251119_145414';
import * as migration_20251119_152451 from './20251119_152451';

export const migrations = [
  {
    up: migration_20251109_205054.up,
    down: migration_20251109_205054.down,
    name: '20251109_205054',
  },
  {
    up: migration_20251110_221333.up,
    down: migration_20251110_221333.down,
    name: '20251110_221333',
  },
  {
    up: migration_20251119_145414.up,
    down: migration_20251119_145414.down,
    name: '20251119_145414',
  },
  {
    up: migration_20251119_152451.up,
    down: migration_20251119_152451.down,
    name: '20251119_152451'
  },
];
