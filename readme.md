# carnival

`carnival` is a website that showcases great games made by the community of [repl.it](https://repl.it). this implies categorization and search of these games, but we also wish to offer additional capabilities such as leaderboard systems, identity management, and / or multiplayer apis.

the project is in early development. if you have a suggestion, feel free to [add one](https://github.com/repl-it-discord/carnival/issues/2). or, chat about this project real-time on the [repl.it discord server](https://repl.it/discord).

## contributing

```bash
git clone https://github.com/repl-it-discord/carnival
cd carnival
yarn bootstrap

cd client
yarn serve
cd ..

cd server
yarn build && yarn serve
cd ..
```

if you are using vscode, ensure you have the [editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig), [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), and [vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) extensions; notice we have project-specific settings in `.vscode`
