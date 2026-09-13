# dka_ahen_mobile

読解アヘンの非公式モバイルビュー

https://aquaclara.github.io/dka_ahen_mobile/

## 開発

Node.js は `.nvmrc` のバージョンを使う。

```sh
npm ci
npm run build
```

`main` に push すると GitHub Actions がビルドして GitHub Pages に配信する。`dist/` はコミットしない。

```sh
npm test          # Prettier で整形を検査
npm run fix       # Prettier で整形
npm run typecheck # tsc で型検査
```
