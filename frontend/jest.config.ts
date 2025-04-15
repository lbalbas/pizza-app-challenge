export default {
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
        "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/tests/__mocks__/fileMock.js",
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    },
};