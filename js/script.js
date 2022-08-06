$(function () {

  $('.card-caption').on('click', 'a', function (e) {
    e.stopPropagation();
  });

  var $nav = $('#gnav');
  var offset = $nav.offset();
  var navHeight = $nav.innerHeight();
  var headerInner = $('#header .inner');

  //ページ内スクロール
  $('a[href^="#"]').on('click', function () {
    var speed = 300;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - navHeight;
    $("html, body").animate({
      scrollTop: position
    }, speed, "swing");
    return false;
  });

  // TOPボタン押下時
  $('#pagetop').hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('#pagetop').fadeIn();
    } else {
      $('#pagetop').fadeOut();
    }
  });

  $('#pagetop').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 700);
    return false;
  });

  /* Humburger-Menu */
  $('.menu-btn').on('click', function () {
    // メニューとバーガーの線にopenクラスをつけ外しする
    $('.menu-content, .btn-line').toggleClass('open');
  });

  $('.menu-list').on('click', function() {
    // ハンバーガーメニューリストを選択すると、メニューが閉じる
    $('.menu-content, .btn-line').removeClass('open');
  });

  /* お問い合わせページでinputタグ上でEnterキー押下時、次要素へフォーカス移動 */
  $('input').on('keydown', function(e){
    var n = $('input').length;
    // Enterキー押下時
    if (e.which == 13) {
      e.preventDefault();
      var Index = $('input').index(this);
      var nextIndex = $('input').index(this) + 1;

      if (nextIndex < n) {
        // 次要素へフォーカス移動
        $('input')[nextIndex].focus();
      } else {
        // 最後の場合フォーカスを外す
        $('input')[Index].blur();
      }
    }
  });

  /* Contact Validation Check */
  // 入力内容
  var subject;
  var name;
  var email;
  var tel;
  var body;
  var flg = false;

  $(function(){
    $('#btn_submit').on('click', function(){
      subject = '';
      name = '';
      email = '';
      tel = '';
      body = '';

      if(input_check()) {
        // Open Modal Window
        $('.js-modal').fadeIn();
      }
      return false;
    });
  });

  // お問い合わせフォーム内容初期化
  function init_contact() {
    // エラー用装飾のためクラスをリセット
    $('#subject').removeClass('inp_error');
    $('#name').removeClass('inp_error');
    $('#email').removeClass('inp_error');
    $('#tel').removeClass('inp_error');
    $('#body').removeClass('inp_error');

    // 入力エラー文をリセット
    $('#subject_error').val('');
    $('#name_error').val('');
    $('#email_error').val('');
    $('#tel_error').val('');
    $('#body_error').val('');

    // お問い合わせが正常の場合
    if (flg == true) {
      flg = false;

      $('#subject').val('');
      $('#name').val('');
      $('#email').val('');
      $('#tel').val('');
      $('#body').val('');
    }

  }

  function input_check(){
    var result = true;

    // お問い合わせフォーム初期化
    init_contact();

    // 入力内容
    subject = $('#subject').val();
    name = $('#name').val();
    email = $('#email').val();
    tel = $('#tel').val().replace(/[━.*‐.*―.*－.*\–.*ー.*\-]/gi, '');
    body = $('#body').val();

    // バリデーション
    // 件名
    if (subject == '') {
      $('#subject_error').html('件名は必須です。');
      $('#subject').addClass('inp_error');
      result = false;
    } else if (subject > 100) {
      $('#subject_error').html('件名は100文字以内で入力してください。');
      $('#subject').addClass('inp_error');
      result = false;
    }

    // 氏名
    if (name.length > 25) {
      $('#name_error').html('氏名は25文字以内で入力してください。');
      $('#name').addClass('inp_error');
      result = false;
    }

    // メールアドレス
    if (email == '') {
      $('#email_error').html('メールアドレスは必須です。');
      $('#email').addClass('inp_error');
      result = false;
    } else if (!email.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)) {
      $('#email_error').html('正しいメールアドレスを入力してください。');
      $('#email').addClass('inp_error');
      result = false;
    } else if (email.length > 255) {
      $('#email_error').html('正しいメールアドレスを入力してください。');
      $('#email').addClass('inp_error');
      result = false;
    }

    // 電話番号
    if (tel != '') {
      if ((!tel.match(/^[0-9]+$/)) || (tel.length < 10)) {
        $('#tel_error').html('正しい電話番号を入力してください。');
        $('#tel').addClass('inp_error');
        result = false;
      }
    }

    // お問い合わせ内容
    if (body == '') {
      $('#body_error').html('お問い合わせ内容は必須です。');
      $('#body').addClass('inp_error');
      result = false;
    } else if (body.match(/[<(.*)>.*<\/\1>]/)) {
      $('#body_error').html('HTML、URLの貼り付けは禁止しています。');
      $('#body').addClass('inp_error');
      result = false;
    } else if (body.match(/^[ 　\r\n\t]*$/)) {
      $('#body_error').html('お問い合わせ内容は必須です。');
      $('#body').addClass('inp_error');
      result = false;
    } else if (body.length > 1000) {
      $('#body_error').html('お問い合わ内容は1000文字以内で入力してください。');
      $('#body').addClass('inp_error');
      result = false;
    }

    return result;

  };

  // Close Modal Window
  $('.js-modal-close').on('click', function(){
    // 入力値をセット
    $('#subject').val(subject);
    $('#name').val(name);
    $('#email').val(email);
    $('#tel').val(tel);
    $('#body').val(body);

    $('.js-modal').fadeOut();
  });

  // AWS API Gateway Connection
  $(function(){
    $('.js-modal-send').on('click', function(){
      var data = {
        'subject': subject,
        'name': name,
        'email': email,
        'tel': tel,
        'body': body
      }

      var token = {
        'token': tokenData
      }

      // Close Modal Window
      $('.js-modal').fadeOut();

      // reCAPTCHAv3認証
      $.ajax({
        url: 'https://neqn9ywn49.execute-api.ap-northeast-1.amazonaws.com/dev',
        type: 'POST',
        data: JSON.stringify(token)
      })
      .done(function(){
        // 正常
        $.ajax({
          url: 'https://d0pqnmfba3.execute-api.ap-northeast-1.amazonaws.com/prod',
          type: 'POST',
          data: JSON.stringify(data)
        })
        .done(function(){
          // 正常
          // お問い合わせフォーム初期化
          flg = true;
          init_contact();

          // Open Alert Box
          open_alert(true, 1);
        })
        .fail(function(){
          // 異常
          open_alert(false, 2);
        });
      })
      .fail(function(){
        // 異常 
        open_alert(false, 3);
      });
    });
  });

  // Open Alert Box
  function open_alert(status, bodycode) {

    if (status) {
      //正常
      $('.alert-box').css(
        'background-color', 'rgb(108,226,98)'
      );
      $('.alert').text(
        '正常に送信されました。回答まで時間を要する場合があります。ご了承ください。'
      );
    } else {
      //異常
      $('.alert-box').css(
        'background-color', 'rgb(231,103,86)'
      );

      if (bodycode == 2) {
        $('.alert').text(
          'お問い合わせ内容の送信に失敗しました。再度お問い合わせ内容を送信してください。'
        );
      } else if (bodycode == 3) {
        $('.alert').text(
          'reCAPTCHAによる認証に失敗したか、不正なbotによる送信の可能性があります。時間間隔を空けて再度お問い合わせ内容を送信してください。'
        );
      }
    }
    $('.alert-box').slideDown(750).delay(5000).slideUp(750);
  }

  /* Google reCAPTCHAv3 */
  var tokenData; //生成済みトークンの退避用

  $(function(){
    // Google reCAPTCHAv3のサイトキーを使用してトークンを生成
    grecaptcha.ready(function(){
      grecaptcha.execute('6LfWBJ0bAAAAAIv6gMpbX9vodQ9acrFZfwJLsM4d', { action: 'submit'})
      .then(function(token){
        //トークン生成
        tokenData = token;
      });
    });
  });
  
  // レーダーチャート設定
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    //グラフの種類
    type: 'radar',
    //データの設定
    data: {
      //データ項目のラベル
      labels: ["Frontend", "Backend", "FW", "DB", "Cloud", "Infra", "Network", "OS"],
      //データセット
      datasets: [{
        //背景色
        backgroundColor: "rgba(68,68,68,0.5)",
        //枠線の色
        borderColor: "rgba(68,68,68,1)",
        //結合点の背景色
        pointBackgroundColor: "rgba(68,68,68,1)",
        //結合点の枠線の色
        pointBorderColor: "#fff",
        //結合点の背景色（ホバ時）
        pointHoverBackgroundColor: "#fff",
        //結合点の枠線の色（ホバー時）
        pointHoverBorderColor: "rgba(68,68,68,1)",
        //結合点より外でマウスホバーを認識する範囲（ピクセル単位）
        hitRadius: 5,
        //グラフのデータ
        data: [4, 5, 3, 3, 5, 3, 3, 4]
      }]
    },
    //オプションの設定
    options: {
      // レスポンシブ指定
      responsive: true,
      maintainAspectRatio: false,
      scale: {
        ticks: {
          // 最小値の値を0指定
          beginAtZero: true,
          min: 0,
          stepSize: 1,
          // 最大値を指定
          max: 5,
        },
        pointLabels: {
          fontSize: 10
        }
      },
      //ラベル非表示
      legend: {
        display: false,
        fontSize: 10,
        labels: {
          // このフォント設定はグローバルプロパティを上書きします。
          fontSize: 14,
        }
      }
    }
  });

  // Accordion Event
  // アコーディオンをクリックした際の動作
  $('.accordion-title').on('click', function(){
    let findElm = $(this).next('.box'); // 直後のアコーディオンを行うエリアを取得
    $(findElm).slideToggle();           // アコーディオンの上下動作

    if($(this).hasClass('close')){      // タイトル要素にクラス名closeがある場合
      $(this).removeClass('close');     // クラス名を除外
    } else {
      $(this).addClass('close');        // クラス名を付与
    }
  });

  // ページ読み込みの際にopenクラスを付与し、openが付いていたら開く動作
  $(window).on('load', function(){
    //$('.accordion-area li:first-of-type section').addClass('open');   // accordino-areaの先頭liのsectionにopenクラス付与
    $('.open').each(function(index, element){
      let title = $(element).children('.accordion-title');  // openクラスの子要素のaccordion-titleクラスを取得
      $(title).add('close');                                // タイトルクラスにcloseを付与

      let box = $(element).children('.box');                // openクラスの子要素boxクラスを取得
      $(box).slideDown(500);                                // アコーディオンを開く
    });
  });

  // Particle JS
  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 38,//この数値を変更すると幾何学模様の数が増減できる
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#444"//色
      },
      "shape": {
        "type": "polygon",//形状はpolygonを指定
        "stroke": {
          "width": 0,
        },
        "polygon": {
          "nb_sides": 3//多角形の角の数
        },
        "image": {
          "width": 190,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.664994832269074,
        "random": false,
        "anim": {
          "enable": true,
          "speed": 2.2722661797524872,
          "opacity_min": 0.08115236356258881,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#444",
        "opacity": 0.6,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,//この数値を小さくするとゆっくりな動きになる
        "direction": "none",//方向指定なし
        "random": false,//動きはランダムにしない
        "straight": false,//動きをとどめない
        "out_mode": "out",//画面の外に出るように描写
        "bounce": false,//跳ね返りなし
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 961.4383117143238
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false
        },
        "resize": true
      }
    },
    "retina_detect": true
  });
});