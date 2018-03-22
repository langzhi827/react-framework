
module.exports = {
    "moduleNameMapper": {
        "^SRC_PATH(.*)$": "<rootDir>/src$1",
    },
    "globals": {
    },
    "setupFiles": ["<rootDir>/src/public/env-config.js"],
    "setupTestFrameworkScriptFile": "<rootDir>/jest/setupTestFrameworkScriptFile.js"
};