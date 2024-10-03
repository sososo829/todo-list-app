interface DutyInput {
  name: string;
}

export const validateDutyInput = (data: DutyInput): string | null => {
  const { name } = data;

  if (!name || name.trim().length === 0) {
    return 'Name is required';
  }
  if (name.length < 3 || name.length > 100) {
    return 'Name must be between 3 and 100 characters';
  }

  return null;
};
