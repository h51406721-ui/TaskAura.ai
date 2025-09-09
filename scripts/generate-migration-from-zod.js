// Generate SQL migration from Zod schema (simple example)
const { UserSchema } = require('../apps/backend/src/user.schema');
const fs = require('fs');

// Map Zod types to SQLite types
const typeMap = {
  string: 'TEXT',
  number: 'INTEGER',
  boolean: 'BOOLEAN',
};

function zodToSql(schema, tableName) {
  const shape = schema._def.shape();
  const columns = Object.entries(shape).map(([key, value]) => {
    let type = value._def.typeName;
    let sqlType = typeMap[type] || 'TEXT';
    let constraints = [];
    if (key === 'id') constraints.push('PRIMARY KEY AUTOINCREMENT');
    if (value._def.typeName === 'string' && value._def.checks.some(c => c.kind === 'email')) constraints.push('UNIQUE');
    if (!value._def.isOptional) constraints.push('NOT NULL');
    return `  ${key} ${sqlType} ${constraints.join(' ')}`.trim();
  });
  return `CREATE TABLE IF NOT EXISTS ${tableName} (\n${columns.join(',\n')}\n);`;
}

const sql = zodToSql(UserSchema, 'users');
fs.writeFileSync('scripts/generated-migration.sql', sql + '\n');
console.log('Generated migration SQL:', sql);
