import { MigrationBuilder } from 'node-pg-migrate';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable('duties', {
    id: { type: 'serial', primaryKey: true },
    name: { type: 'varchar(100)', notNull: true },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
  });
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable('duties');
};