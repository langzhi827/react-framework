
module.exports = {
    "moduleNameMapper": {
        "^SRC_PATH(.*)$": "<rootDir>/src$1"
    },
    "globals": {
    },
    "transform": {
        '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest'
    },
    "transformIgnorePatterns": [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"
    ],
    "setupFiles": ["<rootDir>/src/public/env-config.js"],
    "setupTestFrameworkScriptFile": "<rootDir>/jest/setupTestFrameworkScriptFile.js"
};