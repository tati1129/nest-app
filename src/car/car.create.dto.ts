import z from 'zod';

export const CreateCarSchema = z.object({
  brand: z.string().min(2, 'Braand must be at least contain 2 characters'),
  model: z.string().min(1, 'Model name must be at least contain 1 symbols'),
  year: z.coerce.number().min(2000, 'Earliest year possible is 2000'),
  // price: z.number().min(0, 'Price must be positive'),
  price: z.coerce.number().positive('Price must be positive'),
});

export type CreateCarDto = z.infer<typeof CreateCarSchema>;
/*  */
