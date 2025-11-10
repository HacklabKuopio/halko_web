import * as migration_20251109_205054 from './20251109_205054'
import * as migration_20251110_221333 from './20251110_221333'

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
]
