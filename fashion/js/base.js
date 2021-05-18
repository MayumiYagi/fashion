$(function(){
  'use strict'

  //cart mordal
  $('.cart').on('click',function(){
    $('.cart-inner').fadeIn();
    $('main,footer').css({'opacity':'0.5'});
  });
  $('.close').on('click',function(){
    $('.cart-inner').fadeOut();
    $('main,footer').css({'opacity':'1'});
  });

  //pantsとjacketのページ遷移
  $('.category').on('click',function(){
    var target = $(this).attr('data-target');
    target = '.' + target;
    $(target).addClass('active').siblings().removeClass('active');
  });

  //slick　slider
  $('#slick').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    cssEase: 'linear',


    //responsive slick　slider ----------------
    responsive: [
      {
        breakpoint: 480,
        settings:{
          slidesToShow: 1,
        }
      }
    ]
  });
});

function math(){
    var len = $('.cart-item-list li').length;
    $('.cart-items').text(len);
  }

  // カートに追加処理
  $('.cart-add-btn').on('click',function(e){
    e.preventDefault();
    var $self = $(this),
        disabled = $self.attr('disabled','disabled'),
        cartInItems = $self.prev('figure').clone(),
        cart = $('.cart-item-list'),
        cartList = $('.cart-item-list li'),
        itemId = $self.prev('figure').data('items'),
        cartInItems = cartInItems.prependTo(cart).wrap('<li data-id="'+ itemId +'"></li>'),
        countSet = $('<div class="count-set"><span class="qty qty-minus down">-</span><input type="numeric" class="count" value="1" /><span class="qty qty-plus up">+</span></div><button class="delete">削除</button>'),
        cartInItems = cartInItems.append(countSet);

    $self.text('カートに追加済み').css({
      'background': '#ccc',
      'color': '#000',
    });
    cartInItems;
    math();
    attent();
  });

  // カート商品数量変更（マイナス）
  $('.cart-item-list').on('click','.qty-minus', function() {
    var $this = $(this),
        $input = $this.closest('.count-set').find('input'),
        value = parseInt($input.val());
    if (value > 1) {
      value = value - 1;
    } else {
      value = 0;
    }
    $input.val(value);
  });

  // カート商品数量変更（プラス）
  $('.cart-item-list').on('click','.qty-plus', function() {
    var $this = $(this),
        $input = $this.closest('.count-set').find('input'),
        //整数にする（valueは）
        value = parseInt($input.val());
    if (value < 100) {
      value = value + 1;
    } else {
      value =100;
    }
    $input.val(value);
  });

  // カート内アラート
  function attent(){
    var count = $('.cart-item-list li').length;
    if(count == 0){
      $('.alert').show();
    }else{
      $('.alert').hide();
    }
  }

  // カート内商品削除処理
  $('.cart-item-list').on('click', '.delete', function(){
    var del = $(this).parents('li').data('id');
    $('.mens-items,.ladies-items').find('figure[data-items="'+del+'"]').next('.cart-add-btn').removeAttr('disabled').text('カートに追加').css({
      'background':'#000',
      'color': '#fff',
    });
    $(this).parents('li').remove();
    math();
    attent();
  });
