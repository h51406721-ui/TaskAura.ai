export * from './schemas';
import { z } from 'zod';
import { UserSchema, MessageSchema, TaskSchema, SummarySchema } from './schemas';
export type User = z.infer<typeof UserSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type Task = z.infer<typeof TaskSchema>;
export type Summary = z.infer<typeof SummarySchema>;
//# sourceMappingURL=index.d.ts.map