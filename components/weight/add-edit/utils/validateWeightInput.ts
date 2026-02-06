export type ValidationResult = {
  isValid: boolean;
};

/**
 * Validates weight input value
 * @param weight - Weight value as string
 * @returns Validation result
 */
export function validateWeightInput(weight: string): ValidationResult {
  return { isValid: !!weight.trim() };
}
