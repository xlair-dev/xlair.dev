# XLAIR Web

XLAIR の公式 Web サイトです。Next.js の App Router で構成しています。

## 開発環境

- Node.js 24
- pnpm 12.0.0

依存関係をインストールして開発サーバーを起動します。

```bash
pnpm install
pnpm dev
```

`http://localhost:3000` を開いてください。

### 環境変数

開発用の環境変数をコピーしてから起動します。

```bash
cp .env.dev.example .env
```

| 変数 | 用途 |
| --- | --- |
| `SITE_URL` | サイトの公開 URL |
| `API_BASE_URL` | server の API URL |
| `AUTH0_ISSUER` | Auth0 の issuer URL |
| `AUTH0_AUDIENCE` | server が発行する API の audience |
| `AUTH0_M2M_CLIENT_ID` | web 用 M2M Application の Client ID |
| `AUTH0_M2M_CLIENT_SECRET` | web 用 M2M Application の Client Secret |

Next.js サーバーは起動時に Auth0 の client-credentials grant で `/sync` を呼び出し、server が管理する曲一覧をメモリへ同期します。M2M の client secret はブラウザへ公開せず、実行時環境変数だけに設定してください。

### コマンド

```bash
pnpm dev       # 開発サーバーを起動する
pnpm lint      # Biome の検査を実行する
pnpm build     # 本番ビルドを実行する
pnpm start     # 本番ビルドを起動する
```

## Docker Compose

本番用の環境変数を `.env` に用意して起動します。

```bash
cp .env.prod.example .env
docker compose up -d
```

## デプロイ

main ブランチへの push で GitHub Actions が lint と build を実行し、Docker イメージを GitHub Container Registry へ publish します。

## 計画停電中の Workers 運用

`outage/workers` ブランチは、計画停電中に API server を使わずサイトを公開するための臨時ブランチです。このブランチではトップページの統計を表示せず、ランキングページに停止案内を表示します。Auth0 と API server の認証情報は設定しません。

### 初回設定

Cloudflare Dashboard の **Workers & Pages** から新しい Worker を作成し、GitHub repository と `outage/workers` ブランチを接続します。Worker 名は `wrangler.jsonc` の `xlair-dev-outage` に合わせます。Build settings は次のように設定します。

| 項目 | 設定 |
| --- | --- |
| Production branch | `outage/workers` |
| Build command | `pnpm exec opennextjs-cloudflare build` |
| Deploy command | `pnpm exec wrangler deploy` |

Workers Builds が GitHub と Cloudflare の連携、デプロイ認証を管理します。ローカルで実行する場合は `pnpm preview` で Workers runtime 上の表示を確認し、`pnpm deploy` でデプロイします。

初回デプロイ後、Cloudflare 側で `xlair.dev` をこの Worker の Custom Domain として設定します。DNS を切り替える前に `*.workers.dev` の URL でトップページ、ランキング停止案内、画像とスタイルを確認してください。

### 停電時と復旧時

停電開始時に `xlair.dev` の DNS/Custom Domain の向き先を Workers に切り替えます。復旧後は Kubernetes 側に戻します。切り替えは Cloudflare の DNS 設定に合わせて実施し、既存レコードの TTL も事前に確認してください。

通常運用へこのブランチを merge しないでください。停電終了後は `outage/workers` の push を止め、Cloudflare 側で Git 連携を解除してから不要な `xlair-dev-outage` Worker を削除します。ブランチは次の停電に備えて残せますが、再利用時は最新の `main` から作り直します。
