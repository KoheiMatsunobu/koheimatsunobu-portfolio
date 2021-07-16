# < koheimatsunobu-portfolio >
エンジニア用ポートフォリオサイトです。現在のITスキルなどをまとめております。 
レスポンシブ対応済みで、PC/タブレット/スマートフォンからアクセス可能です。  

[KOHEI MATSUNOBU　エンジニア用ポートフォリオサイト](https://koheimatsunobu-portfolio.com)

## < 1.機能概要 >  
1. ポートフォリオサイトの「CONTACT」ページからお問い合わせがあった際にメール通知。
2. GitHub Actionsを使用したCI/CDを構築。リモートリポジトリにpushされた際にS3に自動デプロイし、CloudFrontのキャッシュクリア処理を行う。
3. S3の静的WEBホスティング機能やLambda関数などを用いたサーバーレス化。

## < 2.使用言語/環境 >  
- 言語
    - HTML/CSS/JavaScript(JQuery)
- インフラ
    - AWS
        - Amazon Route53
        - AWS Certificate Manager(ACM)
        - Amazon CloudFront
        - Simple Storage Service(Amazon S3)
        - Amazon API Gateway
        - AWS Lambda(Node.js 14.x)
        - Simple Email Service(SES)
- 独自ドメイン取得先
    - お名前.com

## < 3.画面構成 >
<img width="600" alt="web-pc" src="https://user-images.githubusercontent.com/58101150/125891577-9faa4b66-136c-4891-a154-6f3ee28c4158.png">

1. セクションは、PROFILE/SKILL/WORK/CONTACT。  
2. CONTACTセクションの「お問い合わせ」ボタンを押下することで、お問い合わせページに画面遷移。
3. お問い合わせページで「送信」ボタンを押下することで、お問い合わせ内容をメール通知。  

## < 4.インフラ構成 >
![koheimatsunobu-portfolio](https://user-images.githubusercontent.com/58101150/125888203-507679f7-57ca-4545-a58e-ef32887305a6.png)
  
### インフラ構成の概要  
(1)独自ドメインを使用しているため、Route53と連携。  
(2)HTTPS化するため、ACMでSSL/TLS証明書を発行しRoute53と連携。  
(3)Webサイトにアクセスする際にRoute53からCloudFrontに最新のキャッシュを返すための連携。  
(4)エッジサーバー(CloudFront)にWEBサイト情報(S3を静的WEBホスティング)をキャッシュするよう設定。  
(5)ポートフォリオサイトの「CONTACT」ページからお問い合わせがあった際、API GatewayをS3バケットに保存してあるjsファイルのajaxからコールする。  
(6)API GatewayのPOSTメソッドからLambda関数をコール。  
(7)Lambda関数とSESを連携しお問い合わせ内容をSESでメール通知する構成。  
(8)お問い合わせ内容をSESからメール通知。  
(9)GitHubのリモートリポジトリにpushした際に、S3バケットにファイルをアップロード。また、アップロード完了後CloudFrontのキャッシュをクリアする。  



