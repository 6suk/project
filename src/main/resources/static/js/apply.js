// required 검사 + SUBMIT
$('#sendbtn').click(function () {
  let check = requiredCheck();
  if (check) {
    console.log('실행');
    $('#applyform').submit();
  }
});

// Modal 컨트롤
let modal_bg = $('.modalBg');
let modal_bg_question = $('.modalBg.question');
let modal = $('.savedot-modal');
let apply_btn = $('#applybtn');
let close_btn = $('#closebtn');

apply_btn.click(function () {
  modal_bg.fadeToggle(220);
});

close_btn.click(function () {
  modal_bg.fadeToggle(220);
});

$('#question-closebtn').click(function () {
  modal_bg_question.fadeToggle(220);
});

$('#question-openbtn').click(function () {
  modal_bg_question.fadeToggle(220);
});

let apply_trade_type = $('#apply_trade_type');
let apply_trade_type_1 = $('#apply_trade_type_1');
let apply_trade_type_2 = $('#apply_trade_type_2');
let apply_parcel_notice = $('#apply_parcel_notice');

let apply_place_addr = $('#apply_place_addr').val(); // 만남장소
let apply_parcel_type = $('#apply_parcel_type').val(); // 택배 타입(선불/착불)
let apply_parcel_price = $('#apply_parcel_price').val(); // 택배비

// 거래 방식에 맞춰 Apply Form 변경
$(function () {
  switch (trade_type_val) {
    case '1': // 직접거래
      // $(apply_parcel_price).attr({ disabled: true, placeholder: '판매자가 만남거래를 선택하셨어요:)' });
      $(apply_parcel_notice)
        .attr({ disabled: true })
        .val('만남장소 : ' + apply_place_addr);
      $(apply_trade_type).attr('disabled', true);
      $(apply_trade_type_1).attr('selected', true);
      break;
    case '2': // 택배거래
      // $(apply_parcel_price).attr({ disabled: true, placeholder: '판매자가 택배거래를 선택하셨어요:)' });

      if (apply_parcel_type == '1') {
        // 선불
        $(apply_parcel_notice)
          .attr({ disabled: true })
          .val('택배비 : ' + apply_parcel_price);
      } else {
        $(apply_parcel_notice).attr({ disabled: true }).val('판매자가 착불 택배 거래를 선택하셨어요:)'); // 착불
      }

      $(apply_trade_type).attr('disabled', true);
      $(apply_trade_type_2).attr('selected', true);
      break;
    case '3': // 직접거래 + 택배거래
      $(apply_parcel_notice).attr({ disabled: true, placeholder: '직접거래/택배거래 중 선택해주세요:)' });

      $(apply_trade_type).change(function () {
        if ($(this).val() == '1') {
          $(apply_parcel_notice)
            .attr({ disabled: true })
            .val('만남장소 : ' + apply_place_addr);
        } else {
          if (apply_parcel_type == '1') {
            $(apply_parcel_notice)
              .attr({ disabled: true })
              .val('택배비 : ' + apply_parcel_price);
          } else {
            $(apply_parcel_notice).attr({ disabled: true }).val('판매자가 착불 택배 거래를 선택하셨어요:)');
          }
        }
      });

      $(apply_trade_type).addClass('required').attr('readonly', false);
      $(apply_parcel_notice).attr('readonly', false);
      break;
  }
});
