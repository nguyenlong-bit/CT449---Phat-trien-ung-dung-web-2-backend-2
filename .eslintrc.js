module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true
    },
    extends: ["eslint:recommended", "prettier"],
    parserOptions: {
        ecmaVersion: 12 
    },
    rules: {
        "no-unused-vars": "warn", 
        "no-console": "off", 
        "prefer-const": "warn", 
        "eqeqeq": "warn" 
    }
};
