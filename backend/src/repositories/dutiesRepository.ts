import { GenericRepository } from '../repositories/genericRepository';
import { Duty } from '../models/Duty';

export class DutyRepository extends GenericRepository<Duty> {
  constructor() {
    super('duties');
  }
}
