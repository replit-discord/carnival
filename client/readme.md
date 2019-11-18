# client

## contributing

configuration should have been bootstrapped from the [main readme](../readme.md##contributing)'s `yarn bootstrap`

### linting and formatting

since you are (hopefully) using the `eslint` and `prettier` vscode extensions, they will automatically format your code when your document saves.

note the eslint warnings. you must fix these or else the pre-commit check will fail. during development, we manually set some 'error' rules to 'warnings' for faster development. see `.eslintrc.pre-commit.json` for a full list of rules.
