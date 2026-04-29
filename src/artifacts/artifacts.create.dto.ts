import z from "zod";

export const CreateArtifactSchema = z.object({
    name: z.string().min(3,'Name must be at least contain 3 symbols'),
    age: z.number().min(0, 'Age must be positive'),
});

//z.infer<> создаем тип схемы после парсинга( из схемы выводим тип что будем получать)
export type CreateArtifactDto = z.infer<typeof CreateArtifactSchema>;

