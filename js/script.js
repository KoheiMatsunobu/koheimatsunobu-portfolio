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

    // お問い合わせ送信後の場合
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

      // Close Modal Window
      $('.js-modal').fadeOut();

      // reCAPTCHAv3認証
      $.ajax({
        type: 'POST',
        url: '../libs/grecaptcha_execute.php',
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        timeout: 10000,
        cache: false,
        data: {
          'recaptchaResponse' : tokenData
        },
        dataType: 'json'
      })
      .done(function(){
        // 正常

        $.ajax({
          url: 'https://d0pqnmfba3.execute-api.ap-northeast-1.amazonaws.com/prod',
          type: 'POST',
          data: JSON.stringify(data),
          success: function (data) {
            console.log(data);
          }
        })
        .done(function(){
          // 正常
          // お問い合わせフォーム初期化
          flg = true;
          init_contact();

          // Open Alert Box
          $('.alert-box').slideDown(750).delay(2500).slideUp(750);
        })
        .fail(function(){
          // 異常
        });
      })
      .fail(function(){
        // 異常 
      });
    });
  });

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
});