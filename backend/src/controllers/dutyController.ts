import { Request, Response, NextFunction } from 'express';
import { validateDutyInput } from '../utils/validation';
import { DutyRepository } from '../repositories/dutiesRepository';
import { NotFoundError, ValidationError, DatabaseError } from '../utils/error';

const dutyRepo = new DutyRepository();

// Create Duty
export const createDuty = async (req: Request, res: Response, next: NextFunction) => {
  const validationError = validateDutyInput(req.body);
  if (validationError) {
    return next(new ValidationError(validationError));
  }

  try {
    const dutyData = { ...req.body};
    const newDuty = await dutyRepo.create(dutyData);
    res.status(201).json(newDuty);
  } catch (err) {
    next(new DatabaseError('Error creating Duty'));
  }
};

// Get All Duties
export const getAllDuties = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const duties = await dutyRepo.getAll();
    res.status(200).json(duties);
  } catch (err) {
    next(err);
  }
};

// Get Duty by ID
export const getDutyById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const duty = await dutyRepo.getById(req.params.id);
    if (!duty) {
      throw new NotFoundError('Duty not found');
    }
    res.status(200).json(duty);
  } catch (err) {
    next(err);
  }
};

// Update Duty
export const updateDuty = async (req: Request, res: Response, next: NextFunction) => {
  const validationError = validateDutyInput(req.body);
  if (validationError) {
    return next(new ValidationError(validationError));
  }

  try {
    const updatedDuty = await dutyRepo.update(req.params.id, req.body);
    if (!updatedDuty) {
      throw new NotFoundError('Duty not found');
    }
    res.status(200).json(updatedDuty);
  } catch (err) {
    next(err);
  }
};

// Delete Duty
export const deleteDuty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await dutyRepo.delete(req.params.id);
    if (!deleted) {
      throw new NotFoundError('Duty not found');
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
