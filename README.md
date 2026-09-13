# dka_ahen_mobile

読解アヘンの非公式モバイルビュー

https://aquaclara.github.io/dka_ahen_mobile/

## 開発

Node.js は `.nvmrc` のバージョンを使う。

```sh
npm ci
npm run build
```

GitHub Pages はリポジトリの `dist/` をそのまま配信するため、`src/` を変更したら `npm run build` の結果も一緒にコミットする。

```sh
npm test          # Prettier で整形を検査
npm run fix       # Prettier で整形
npm run typecheck # tsc で型検査
```
