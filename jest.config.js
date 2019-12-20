module.exports = {
    "verbose": true,
    "setupFiles": ["./tests/setup.js", "./src/public/env-config.js"],
    "testMatch": ["src/**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    "snapshotSerializers": ["enzyme-to-json/serializer"],
    "transform": {
        "^.+\\.[t|j]sx?$": "babel-jest",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tests/transformers/image.js",
    },
    "moduleNameMapper": {
        "^@/(.*)$": "<rootDir>/src/$1",
        // https://jestjs.io/docs/en/webpack#mocking-css-modules
        "\\.(css|less)$": "identity-obj-proxy"
    },
    "globals": {
        "env": {}
    }
};