"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummarySchema = exports.TaskSchema = exports.MessageSchema = exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.number().int().optional(),
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
});
exports.MessageSchema = zod_1.z.object({
    id: zod_1.z.number().int().optional(),
    userId: zod_1.z.number().int(),
    content: zod_1.z.string().min(1),
    createdAt: zod_1.z.string().datetime(),
});
exports.TaskSchema = zod_1.z.object({
    id: zod_1.z.number().int().optional(),
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
    completed: zod_1.z.boolean().default(false),
    userId: zod_1.z.number().int(),
});
exports.SummarySchema = zod_1.z.object({
    id: zod_1.z.number().int().optional(),
    userId: zod_1.z.number().int(),
    summary: zod_1.z.string(),
    createdAt: zod_1.z.string().datetime(),
});
//# sourceMappingURL=schemas.js.map