module.exports = {
    "env": {
        "es2021": true,
        "browser": true,
        "worker": true
    },
    "extends": [
        "eslint:recommended",
        "react-app",
        "react-app/jest"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "arrow-body-style": ["warn", "never"],
        "arrow-parens": "warn",
        "arrow-spacing": [
            "warn",
            {
                "before": true,
                "after": true
            }
        ],
        "curly": ["error", "all"],
        "eqeqeq": "warn",
        "indent": [
            "warn",
            4,
            {
                "ignoredNodes": ["ConditionalExpression"],
                "MemberExpression": 0,
                "ignoreComments": true
            }
        ],
        "linebreak-style": ["error", "unix"],
        "no-caller": "error",
        "no-case-declarations": "error",
        "no-console": 0,
        "no-empty": "error",
        "no-eval": "error",
        "no-trailing-spaces": "error",
        "no-plusplus": "error",
        "no-unused-labels": "error",
        "no-useless-escape": "error",
        "no-void": "error",
        "no-with": "error",
        "new-cap": 0,
        "object-curly-spacing": ["error", "never"],
        "prefer-rest-params": "warn",
        "prefer-spread": "warn",
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "wrap-iife": "warn"
    }
};