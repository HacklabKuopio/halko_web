import * as migration_20251109_205054 from './20251109_205054';
import * as migration_20251110_221333 from './20251110_221333';
import * as migration_20251119_145414 from './20251119_145414';
import * as migration_20251119_152451 from './20251119_152451';
import * as migration_20251119_192052 from './20251119_192052';
import * as migration_20251119_192059 from './20251119_192059';
import * as migration_20260106_212849 from './20260106_212849';
import * as migration_20260107_233229 from './20260107_233229';
import * as migration_20260109_172212 from './20260109_172212';

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
    name: '20251119_152451',
  },
  {
    up: migration_20251119_192052.up,
    down: migration_20251119_192052.down,
    name: '20251119_192052',
  },
  {
    up: migration_20251119_192059.up,
    down: migration_20251119_192059.down,
    name: '20251119_192059',
  },
  {
    up: migration_20260106_212849.up,
    down: migration_20260106_212849.down,
    name: '20260106_212849',
  },
  {
    up: migration_20260107_233229.up,
    down: migration_20260107_233229.down,
    name: '20260107_233229',
  },
  {
    up: migration_20260109_172212.up,
    down: migration_20260109_172212.down,
    name: '20260109_172212',
  }
];
