# commit conventions

## commit naming

* keep commits short and meaningful
* use the imperative, present tense ('change' rather than 'changed' or 'changes')
* do not capitalize the first letter
* do not add a period

here are some high-quality examples. note that you don't need to match the formatting, just the guidelines stated above :ok_hand:

```md
feat(ts): convert util/addtheme.js to ts
fix(renderer): inject css styles
```

### some handy keywords

`(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types)`

## branch naming

be sure to create a new branch when contributing. *do **not** commit to the `dev` or `master` branch*. use tokens to categorize branches. add blurb about branch, separated by token with forward slash. see [this](https://stackoverflow.com/a/6065944) for more information.

### tokens

```bash
fix  # bug fixes, hotfixes
misc # miscellaneous
wip  # new feature with unclear completion time
feat # new feature with clear completion time
```

### examples

```bash
fix/webpack-fail-start
misc/org-assets # organize assets directory
wip/offline-editing
feat/util-tests
```

## troubleshooting

after `npm start`, you may receive errors. this is because `npm starts` runs nodemon and webpack concurrently, instead of in sequence. consequently, nodemon may launch electron before webpack bundles an output to `dist/dev/main.bundle.js`. acknowledge the errors until webpack finishes bundling.
