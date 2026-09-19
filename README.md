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
| `TMP_AXCEL3_SHEET_ID` | `AXCEL³` の譜面 ID |
| `TMP_EVERYTHING_SHEET_ID` | `Everything` の譜面 ID |

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
