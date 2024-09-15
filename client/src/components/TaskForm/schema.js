import * as z from 'zod';

export const schema = z.object({
    task: z.string().min(3),
});