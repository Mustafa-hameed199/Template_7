let log = console.log;

$(function() {
    ///////////////////////////////////////////////// Show Menu Links  //////////////////
    $('.nav__bars-icon').on('click', function() {
        $(this).toggleClass('animate');
        $('.nav__ul').toggleClass('show');
    })

    ///////////////////////////////////////////////// Links click active class and Scroll to Section  //////////////////
    function scrollTo(sec) {
        let id = sec.data('scroll');
        let top = $('#' + id).offset().top - $('header').outerHeight() + 1;
        $('html').animate({ scrollTop : top }, 1000 );
    }
    
    $('.nav__ul a').on('click', function (e) {
        e.preventDefault();
        $('.nav__bars-icon').removeClass('animate')
        $('.nav__ul a').each(function () { $(this).removeClass('active') });
        $(this).addClass('active');
        $('.nav__ul').removeClass('show');

        scrollTo($(this));
    })

    $('.home__btn').on('click', function (e) {
        e.preventDefault();
        scrollTo($(this));
    })
    
    ///////////////////////////////////////////////// Responsive  Menu //////////////////
    $(window).on('resize', () => {
        if ($(window).outerWidth() >= 768) {
            $('.nav__ul').removeClass('hide show');
        } else {
            $('.nav__ul').addClass('hide');
        }
    })

    if ($(window).outerWidth() >= 768) {
        $('.nav__ul').removeClass('hide show');
    } else {
        $('.nav__ul').addClass('hide');
    }

    ///////////////////////////////////////////////// Header Background  (white) on Scroll  //////////////////
    // -------------------------------------- and -------------------------------------------------------
    ///////////////////////////////////////////////// Sync Links with Section on Scroll  //////////////////
    $(window).on('scroll', () => {
        if ($(window).scrollTop() > 20 ) {
            $('header').css('background-color','white');
        } else {
            $('header').css('background-color','transparent');
        }
        // ------------------------------------- Sync Links --------
        let h = $('header').outerHeight();

        $('.sec').each(function () {
            if ($(window).scrollTop() >= $(this).offset().top - h ) {
                let id = $(this).attr('id');
                $('.nav__ul a').each(function () { $(this).removeClass('active') });
                $('[data-scroll=' + id + ']').addClass('active');
            }
        })
    })

    if ($(window).scrollTop() > 20 ) {
        $('header').css('background-color','white');
    } else {
        $('header').css('background-color','transparent');
    }
    ///////////////////////////////////////////////// skills progress  //////////////////
    function progressF() {
        $('.about-me .skill__percent').each(function () {
            let num =  $(this).data('num');

            if ( $(window).scrollTop() > $(".skills__list").offset().top - 600 ) {
                $(this).parent().next().find('span').width(num);
            }
        })
    }
    
    $(window).on('scroll', progressF);
    progressF()
})

///////////////////////////////////////////////// Observer tracker elements  //////////////////
let options = {
    root:null,
    threshold: .25,
    rootMargin: '0px'
}

let observer = new IntersectionObserver(scrollTo, options)

function scrollTo(entries) {
    entries.forEach( el => {
        if (el.isIntersecting) {
            el.target.classList.add('reveal');
            setTimeout( () => {
                el.target.classList.remove('un-reveal')
            }, 2500)
        }
    })
} 

document.querySelectorAll('.content-to-reveal').forEach(el =>  observer.observe(el) )

