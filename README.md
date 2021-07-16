# < koheimatsunobu-portfolio >
エンジニア用ポートフォリオサイトです。現在のITスキルなどをまとめております。 
レスポンシブ対応済みで、PC/タブレット/スマートフォンからアクセス可能です。  

[KOHEI MATSUNOBU　エンジニア用ポートフォリオサイト](https://koheimatsunobu-portfolio.com)

## < 機能概要 >  
1. ポートフォリオサイトの「CONTACT」ページからお問い合わせがあった際にメール通知。
2. GitHub Actionsを使用したCI/CDを構築。リモートリポジトリにpushされた際にS3に自動デプロイし、CloudFrontのキャッシュクリア処理を行う。
3. S3やLambdaなどサーバーレス化を行い、コストを削減。

## < インフラ構成 >
![koheimatsunobu-portfolio](https://user-images.githubusercontent.com/58101150/125888203-507679f7-57ca-4545-a58e-ef32887305a6.png)
  
### < インフラ構成の概要 >  
(1)独自ドメインを使用しているため、Route53と連携。  
(2)HTTPS化するため、証明書発行しRoute53と連携。  
(3)Webサイトにアクセスする際にRoute53からCloudFrontに最新のキャッシュを返すための連携。  
(4)エッジサーバーにWEBサイト情報(S3を静的WEBホスティング)をキャッシュするよう設定。  
(5)ポートフォリオサイトの「CONTACT」ページからお問い合わせがあった際、API GatewayをS3バケットに保存してあるjsファイルのajaxからコールする。  
(6)API GatewayのPOSTメソッドからLambda関数をコール。  
(7)Lambda関数でお問い合わせデータをSESと連携。  
(8)お問い合わせデータをSESからメール通知。  
(9)GitHubのリモートリポジトリにpushした際に、S3バケットにファイルをアップロード。また、アップロード完了後CloudFrontのキャッシュをクリアする。
