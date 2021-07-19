module.exports = {
  rootDir: "./",
  moduleFileExtensions: ["js", "vue", "json", "ts"],
  transform: {
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/tests/unit/**/*.spec.ts"],
  coveragePathIgnorePatterns: ["/node_modules/", "/vendor/", "/tests/"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
