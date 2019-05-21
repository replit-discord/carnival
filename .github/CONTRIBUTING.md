# Contributing

👋 Hey! Thanks for thinking about contributing! Make sure you read the following three sections before contributing.

## Pull Requests

Before you make a PR

1. *Create an Issue of what you plan to add*
2. *Do **not** commit to `dev` or `master` branch*

Of course, if you're change is relatively small, this may not be needed.

## Commit Naming

* Keep commits short and meaningful
* Use the imperative, present tense ('change' rather than 'changed' or 'changes')
* Do not capitalize the first letter
* Do not add a period

Here are some high-quality examples. Note that you don't need to match the formatting, just the guidelines stated above :ok_hand:

```md
feat(ts): convert util/addTheme.js to ts
fix(renderer): inject css styles
```

### Some handy keywords

`(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types)`

## Branch Naming

Be sure to create a new branch when contributing. *Do **not** commit to the `dev` or `master` branch*. Use tokens to categorize branches. Add blurb about branch, separated by token with forward slash. See [this](https://stackoverflow.com/a/6065944) for more information.

### Tokens

```sh
fix  # Bug fixes, hotfixes
misc # Miscellaneous
wip  # New feature with unclear completion time
feat # New feature with clear completion time
```

### Examples

```sh
fix/webpack-fail-start
misc/org-assets # organize assets directory
wip/offline-editing
feat/util-tests
```