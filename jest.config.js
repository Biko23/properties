module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    "setupFiles": ["<rootDir>/tests/setup.js"],
    "collectCoverage": true,
    "collectCoverageFrom": [
      "<rootDir>/components/**/*.vue", 
      "<rootDir>/views/**/*.vue",
      "!**/node_modules/**"
    ],
    "moduleFileExtensions": [
      "js",
      "json",
      "vue"
    ],
    "transform": {
      ".*\\.(vue)$": "vue-jest",
      ".*\\.(js)$": "babel-jest"
    },
    "testEnvironment": "jsdom",
    "preset": "@vue/cli-plugin-unit-jest"
  }

  