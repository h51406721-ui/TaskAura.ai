import { z } from 'zod';
export declare const UserSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    name: z.ZodString;
    email: z.ZodString;
}, z.core.$strip>;
export declare const MessageSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    userId: z.ZodNumber;
    content: z.ZodString;
    createdAt: z.ZodString;
}, z.core.$strip>;
export declare const TaskSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    completed: z.ZodDefault<z.ZodBoolean>;
    userId: z.ZodNumber;
}, z.core.$strip>;
export declare const SummarySchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    userId: z.ZodNumber;
    summary: z.ZodString;
    createdAt: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=schemas.d.ts.map