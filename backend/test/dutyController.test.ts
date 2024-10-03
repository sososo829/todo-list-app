import { createDuty, getAllDuties, getDutyById, updateDuty, deleteDuty } from '../src/controllers/dutyController';
import { Request, Response, NextFunction } from 'express';
import { DutyRepository } from '../src/repositories/dutiesRepository';
import { NotFoundError } from '../src/utils/error';

jest.mock('pg', () => {
  const mClient = {
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

jest.mock('../src/repositories/dutiesRepository', () => {
  return {
    DutyRepository: jest.fn().mockImplementation(() => ({
      create: jest.fn().mockResolvedValue({ id: 1, name: 'Test Duty' }),
      getById: jest.fn().mockResolvedValue({ id: 1, name: 'Duty 1' }),
      update: jest.fn().mockResolvedValue({ id: 1, name: 'Updated Duty' }),
      delete: jest.fn().mockResolvedValue(true),
      getAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Duty 1' }, { id: 2, name: 'Duty 2' }]),
    })),
  };
});

describe('Duty Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: { name: 'Test Duty' },
      params: { id: '1' },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(), 
    };
    next = jest.fn();
  });
  

  it('should create a new duty', async () => {
    await createDuty(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Test Duty' });
  });

  it('should get all duties', async () => {
    await getAllDuties(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Duty 1' }, { id: 2, name: 'Duty 2' }]);
  });

  it('should get a duty by id', async () => {
    await getDutyById(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Duty 1' });
  });

  it('should update a duty', async () => {
    req.body = { name: 'Updated Duty' };
    await updateDuty(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Updated Duty' });
  });

  it('should delete a duty', async () => {
    await deleteDuty(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(204);
  });

  //TODO utils, error handling

});
