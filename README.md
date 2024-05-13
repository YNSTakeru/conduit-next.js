デプロイ先
[https://conduit-next-js.vercel.app/](https://conduit-next-js.vercel.app/)

# 実行方法について

## ローカルで実行する

`.env.local`ファイルを作成

NEXT_PUBLIC_DATABASE_URLの値は以下のリポジトリから取得
[https://github.com/YNSTakeru/sail-laravel-api-sandbox/tree/main/sail/conduit-api](https://github.com/YNSTakeru/sail-laravel-api-sandbox/tree/main/sail/conduit-api)

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_DATABASE_URL=${上記URLのリポジトリから取得}
```

```bash
npm install
npm run dev
```

# テスト

Footerのテスト

```bash
npm test
```
