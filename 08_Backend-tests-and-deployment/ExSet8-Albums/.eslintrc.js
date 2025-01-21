module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true
  },
  "globals": {
    "require": true,
    "process": true,
    "axios": true,
    "module": true
  },
  "extends": "eslint:recommended",
  "overrides": [
    {
      "env": {
        "node": true,
        "browser": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    'indent': ['error', 2]
  }
}
