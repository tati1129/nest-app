import z from "zod";

export const CreateCarSchema = z.object({
    brand: z.string().min(2,'Car name must be at least contain 2 symbols'),
   model: z.string().min(1,'Model name must be at least contain 1 symbols'),
   year: z.number().min(2000,'Year must be positive and greater than 2000'),
  price:z.number().min(0, 'Price must be positive'),
  });

export type CreateCarDto = z.infer<typeof CreateCarSchema>;