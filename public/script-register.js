(function ($) {
    'use strict';
    /*==================================================================
        [ Daterangepicker ]*/
    try {
        $('.js-datepicker').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
            locale: {
                format: 'DD/MM/YYYY'
            },
        });

        var myCalendar = $('.js-datepicker');
        var isClick = 0;

        $(window).on('click', function () {
            isClick = 0;
        });

        $(myCalendar).on('apply.daterangepicker', function (ev, picker) {
            isClick = 0;
            $(this).val(picker.startDate.format('DD/MM/YYYY'));

        });

        $('.js-btn-calendar').on('click', function (e) {
            e.stopPropagation();

            if (isClick === 1) isClick = 0;
            else if (isClick === 0) isClick = 1;

            if (isClick === 1) {
                myCalendar.focus();
            }
        });

        $(myCalendar).on('click', function (e) {
            e.stopPropagation();
            isClick = 1;
        });

        $('.daterangepicker').on('click', function (e) {
            e.stopPropagation();
        });


    } catch (er) { console.log(er); }
    /*[ Select 2 Config ]
        ===========================================================*/

    try {
        var selectSimple = $('.js-select-simple');

        selectSimple.each(function () {
            var that = $(this);
            var selectBox = that.find('select');
            var selectDropdown = that.find('.select-dropdown');
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });

    } catch (err) {
        console.log(err);
    }


});//(jQuery);
// file upload
const fileInput = document.getElementById('imageUpload');
const previewImage = document.getElementById('previewImage');
const previewText = document.getElementById('previewText');

fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        // Kiểm tra dung lượng ≤ 2MB
        if (file.size > 2 * 1024 * 1024) {
            alert("Ảnh vượt quá 2MB, vui lòng chọn ảnh nhỏ hơn.");
            fileInput.value = ""; // reset input
            previewText.style.display = 'block';
            previewImage.style.display = 'none';
            previewImage.setAttribute('src', '');
            return;
        }

        const reader = new FileReader();
        previewText.style.display = 'none';
        previewImage.style.display = 'block';

        reader.addEventListener('load', function () {
            previewImage.setAttribute('src', this.result);
        });

        reader.readAsDataURL(file);
    } else {
        previewText.style.display = 'block';
        previewImage.style.display = 'none';
        previewImage.setAttribute('src', '');
    }
});