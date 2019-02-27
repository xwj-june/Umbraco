/* =============================================================================
    1. GLOBAL VAR
    2. GLOBAL FUNCTIONS    
    3. PLUGINS        
    4. GLOBAL INVOKERS
	5. GLOBAL INIT

============================================================================= */

// =============================================================================
// 1. GLOBAL VAR
// =============================================================================


// =============================================================================
// 2. GLOBAL FUNCTIONS
// =============================================================================
// Facebook - Share

window.fbAsyncInit = function () {
    FB.init({
        appId: '461260597738236',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.2'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



// =============================================================================
// 3. PLUGINS   
// =============================================================================


// =============================================================================
// 4. GLOBAL INVOKERS
// =============================================================================


$(document).ready(function () {
    //Email set up for blogs
    if ($("#js-mail-to").length) {
        var pageTitle = $(document).find("title").text();
        //var pageTitle = "*page title*";
        var pageUrl = $(location).attr("href");        
        var mailSubject = pageTitle + " - Zero Waste Taranaki";
        var mailbody = "Hi, look what I found on the Zero Waste Taranaki Website - " + pageUrl;
        $("#js-mail-to").attr("href", "mailto: ?subject=" + mailSubject + '&body=' + mailbody);            
    }

    // Facebook - Share from event profile

    $("#js-facebook-share").on("click", function (e) {

        e.preventDefault();
        e.stopImmediatePropagation();
        var $targetTitle = $('meta[name=title]').attr("content"),
            $targetDesc = $('meta[name=description]').attr("content"),
            $targetUrl = $(location).attr("href"),
            //$targetUrl = $('meta[name=url]').attr("content"),
            $targetImage = $('meta[name=image]').attr("content")

        FB.ui({
            method: 'share_open_graph',
            action_type: 'og.shares',
            action_properties: JSON.stringify({
                object: {
                    'og:url': $targetUrl,
                    'og:title': $targetTitle,
                    'og:description': $targetDesc,
                    'og:image': $targetImage,
                    'og:image:width': "350",
                    'og:image:height': "233"
                }
            })
        },
            function (response) {
                // Action after response
            });
    });


    //Twitter post set up for blogs
    if ($("#js-tweet-to").length) {        
        var pageTitle = $(document).find("title").text();
        //var pageTitle = "*page title*";
        var pageUrl = $(location).attr("href");
        var textToTweet = "Hi, look what I found on the Zero Waste Taranaki Website - " + pageUrl;
        $("#js-tweet-to").on("click", function (e) {
            var twtLink = 'http://twitter.com/home?status=' + encodeURIComponent(textToTweet);
            window.open(twtLink, '_blank');
        });         
    }

    //Content block section nav scroll event
    if ($(".js-content-block-section-nav").length) {
        $(".js-content-block-section-nav a").on("click", function (e) {
            var body = $("html, body");
            var section = $($(this).attr("href"));
            body.animate({
                scrollTop: section.offset().top -110
            }, 1000);
        });
    }


    //Post - desc display setting
    if ($(".js-post-desc").length) {
        // Max text length = 274        
        var substr = $(".js-post-desc").text().substr(1, 180);
        $(".js-post-desc").text(substr + "...");        
    }
    
    //GO TO Top
    $("#js-go-to-top").on("click", function (e) {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
    });

    //Navigation Toggle 

    $("#js-nav-toggle").on("click", function (e) {        
        $(".js-main-nav").slideToggle("fast", function () {
            $(".js-main-nav").toggleClass("s-show");
        });
        $("#js-nav-toggle").toggleClass("is-active");
    });

    $(".js-main-nav-link-submenu").on("click", function (e) {
        $(".js-main-nav-submenu").slideToggle("fast", function () {
            $(".js-main-nav-submenu").toggleClass("s-show");
        });
    });
    

    //Scroll Event - Main Navigation
    $(window).on("scroll", function (e) {
        var st = $(this).scrollTop();
        if (st > 600) {
            $("body").addClass("s-scrolled");
        }
        else if (st < 600) {
            $("body").removeClass("s-scrolled");
        }        
    });


    //Scroll Event - Alphabet Section Nav
    $(window).on("scroll", function (e) {
        var st = $(this).scrollTop();        
        if (st > 100) {
            $(".alphabet-section-nav").addClass("alphabet-section-nav-s-fixed");
        }
        else if (st === 0) {
            $(".alphabet-section-nav").removeClass("alphabet-section-nav-s-fixed");            
        }
    });


    //Alphabet Section Nav Control
    if ($("#js-alphabet-list").length) {
        var button_next = $(".js-alphabet-section-nav-button-next");
        var button_prev = $(".js-alphabet-section-nav-button-prev");
        //click next
        button_next.on("click", function (e) {               
            $(this).closest(".js-alphabet-section-nav-segment").css("display","none").nextAll().first().css("display", "flex");
        });
        //click prev
        button_prev.on("click", function (e) {
            $(this).closest(".js-alphabet-section-nav-segment").css("display", "none").prevAll().first().css("display", "flex");
        });

        $(".js-alphabet-section-anchor").on("click", function (e) {
            var body = $("html, body");
            var section = $($(this).attr("href"));
            body.animate({
                scrollTop: section.offset().top - 200
            }, 1000);
        });
        
    };

    // Countdown
    
        // Set the date we're counting down to
        var sFestivalDate = "December 16, 2019 00:00:00";
        var $CountDownDate = new Date(sFestivalDate).getTime();

        //if ($CountDownDate === $Current_Time || $Current_Time > $CountDownDate) {
        //    $("#js-festival-countdown--text").addClass("s-hidden")
        //    $("#js-countdown-finish").addClass("s-display");
        //}

        console.log("we are here");
        // Update the count down every 1 second
        //var $CountDown = setInterval(function () {
        var countdown = setInterval(function () {
            console.log("Check Interval");
            
            var $Current_Time = new Date().getTime();
            // Get todays date and time
            var $now = new Date().getTime();

            // Find the distance between now and the count down date
            var iDistance = $CountDownDate - $now;

            // Time calculations for days, hours, minutes and seconds
            var iDays = Math.floor(iDistance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((iDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((iDistance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((iDistance % (1000 * 60)) / 1000);

                
            $(".js-countdown-days").html(String(iDays));
            $(".js-countdown-hours").html(String(hours));
            $(".js-countdown-minutes").html(String(minutes));
            $(".js-countdown-seconds").html(String(seconds));
            // If the count down is over, write some text 
            //if (iDistance < 0) {
            //    clearInterval(countdown);
            //    $(".js-countdown").addClass("s-header-countdown-displayed");
            //    $(".js-hero-countdown").addClass("s-hero-countdown-displayed");
            //}
        }, 1000);
    //end of document ready
});



// =============================================================================
// 5. GLOBAL INIT
// =============================================================================
