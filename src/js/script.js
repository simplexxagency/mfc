'use strict';

$(document).ready(function () {

    // --------- Main ----------
  // Header bg color
  let $header = $('.header');
  let $hero = $('.hero');

  $(window).scroll(function () {
    let top = $(this).scrollTop();

    if ( $hero.height() > 0 ) {
      $header.toggleClass('active', top > $hero.height() + 100);
    } else {
      $header.toggleClass('active', top > $header.height());
    }
  });

  if ( $hero.height() > 0 ) {
    $header.toggleClass('active', top > $hero.height() + 100);
  } else {
    $header.toggleClass('active', top > $header.height());
  }

  // Mobile Menu in Header
  $('.header__mobile-btn').on('click', function () {
    $('.header__mobile-btn').removeClass('active');
    $('.header__mobile-wrap').addClass('active');
    $('.header__mobile-box').addClass('active');
    $('body, html').addClass('active');
  });

  // Mobile Menu Close in Header
  $('.header__mobile-close').on('click', function () {
    $('.header__mobile-btn').addClass('active');
    $('.header__mobile-wrap').removeClass('active');
    $('.header__mobile-box').removeClass('active');
    $('body, html').removeClass('active');
  });

  // Smooth scroll
  $('a[href^="#"]').click(function () {
    var target = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 1000);
    $('body').removeClass('active');
    return false;
  });


  // Calculator 
  function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);
        return '' + (Math.round(n * k) / k)
          .toFixed(prec);
      };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
      .split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '')
      .length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1)
        .join('0');
    }
    return s.join(dec);
  };

  function calculate() {

    var amount = Number.parseFloat($(".hero__calc-summ input[type='range']").val()),
      payment = $(".hero__calc-checkbox input[type='checkbox']"),
      refill = Number.parseFloat($(".hero__calc-rise input[type='range']").val()),
      totalIncome = 0,
      rate = parseFloat("8.1") / 100,
      month = Number.parseFloat($(".hero__calc-time input[type='range']").val());

    amount = (amount == 0 || isNaN(amount)) ? 50000 : amount;
    month = (month == 0) ? 3 : month;
    refill = (refill == 0 || isNaN(refill)) ? 0 : refill;

    for (var i = 0; i < month; i++) {
      var newRefill = i * refill;

      var newAmount = amount + newRefill;
      var newAmount1 = amount + newRefill;

      if (!payment.prop('checked') && i) newAmount += totalIncome;

      var income = newAmount * rate * month / 12;
      var percents = income / month;
      totalIncome += percents;
    }

    // $(".calc__total-result").html(number_format(newAmount1 + totalIncome, 0, '.', ' ') + ' ₽');
    $(".hero__calc-final").html(number_format(newAmount1 + totalIncome, 0, '.', ' ') + ' ₽');
    // $(".object-form__inputs__summ").html(number_format(newAmount1 + totalIncome, 0, '.', ' ') + ' ₽');

    // $(".calc__total-profit").text(number_format(totalIncome, 0, '.', ' ') + ' ₽');
    // $(".calc__total-month").text(number_format(totalIncome / month, 0, '.', ' ') + ' ₽');
    // $(".calc__total-time").html(month + ' мес.');

  };

  $(".hero__calc-summ").closest('.hero__calc-item').find('.hero__calc-value').html(number_format($(".hero__calc-summ input[type='range']").val(), 0, '.', ' ') + ' ₽');

  $(".hero__calc-time").closest('.hero__calc-item').find('.hero__calc-value').html($(".hero__calc-time input[type='range']").val() + " мес.");

  $(".hero__calc-rise").closest('.hero__calc-item').find('.hero__calc-value').html(number_format($(".hero__calc-rise input[type='range']").val(), 0, '.', ' ') + ' ₽');

  $(".hero__calc-summ input[type='range']").on('input', function () {
    $(".hero__calc-summ").closest('.hero__calc-item').find('.hero__calc-value').html(number_format($(".hero__calc-summ input[type='range']").val(), 0, '.', ' ') + ' ₽');
    calculate();
  });

  $(".hero__calc-time input[type='range']").on('input', function () {
    $(".hero__calc-time").closest('.hero__calc-item').find('.hero__calc-value').html(number_format($(".hero__calc-time input[type='range']").val(), 0, '.', ' ') + ' мес');
    calculate();
  });

  $(".hero__calc-rise input[type='range']").on('input', function () {
    $(".hero__calc-rise").closest('.hero__calc-item').find('.hero__calc-value').html(number_format($(".hero__calc-rise input[type='range']").val(), 0, '.', ' ') + ' ₽');
    calculate();
  });

  $(".hero__calc-checkbox input[type='checkbox']").on('input', function () {
    calculate();
  });

  calculate();

});