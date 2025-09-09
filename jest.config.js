module.exports = {
  roots: ["<rootDir>/apps"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "node"
};
