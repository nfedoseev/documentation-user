(function ($) {

    $(document).ready(function () {

        // =======  Define variables =======
        // =================================
        // --  Screen resolutions
        var screen_md = 992;

        // --  Window, window's properties
        var $win  = $(window),
            win_w = $win.width();

        // --  Main elements
        var $body       = $('body'),
            $header     = $body.find('> header'),
            $sub_nav    = $header.find(".o_sub_nav");
            $wrap       = $body.find('> #wrap'),
            $card_top   = $wrap.find('> .card.top'),
            $card_top_t = $card_top.find('> .container'),
            $main       = $wrap.find('main'),
            $footer     = $body.find('> footer');

        // --  Detect page type
        var page_type = (function () {
            if ($wrap.hasClass('index')) {
                return 'index';
            } else if ($main.find('article').hasClass('doc-tocindex-category')){
                return 'category-index';
            } else {
                return 'article';
            }
        })();

        // --  Floating action
        var $mask       = $body.find('#mask'),
            $float      = $body.find("#floating_action"),
            $float_menu = $body.find("#floating_action_menu");

        // -- Elements' heights
        var body_h    = $body.height(),
            header_h  = $header.outerHeight(),
            sub_nav_h = $sub_nav.height();

        // --  Aside
        var $aside       = $main.find('aside'),
            has_aside    = $aside.length > 0,
            $aside_nav   = undefined;
            aside_links  = undefined;

        if (has_aside) {
            $aside_nav   = $aside.find('> .navbar-aside');
            aside_links  = $aside_nav.find("li > a");
        }

        // ======= Affix =================
        // ===============================
        function set_affix(body_h) {
            var aside_offset = $aside.offset().top - sub_nav_h,
                aside_width  = $aside.width(),
                main_bottom  = 40;

            $aside_nav.css('width', aside_width);
            $aside_nav.affix({
                target: window,
                offset: {
                    top    : aside_offset,
                    bottom : main_bottom
                }
            });
        };

        // ======= Footer animations =====
        // ===============================
        var footer_animation = function () {
            var footer_effect = $main.outerHeight() >= $win.outerHeight();

            if (!footer_effect) {
                footer_stop();
                return;
            };

            $footer.toggleClass('o_footer_effect', footer_effect);
            $body.css('padding-bottom', $footer.outerHeight());

            var checkIfSearch = function(e) {
                if ((e.ctrlKey || e.metaKey) && String.fromCharCode(e.which).toLowerCase() === 'f') {
                    footer_stop();
                }
            };
            $win.on('keydown.footer', function(e) {
                checkIfSearch(e);
            });
        };

        var footer_stop = function() {
            $footer.removeClass('o_footer_effect');
            $body.css('padding-bottom', 0);
            $win.off('keydown.footer');
        };


        // ======= Docs Functions ==========
        // =================================
        // -- Layouting
        var layouting = function () {
            if ($main.hasClass("index")) {
                $main.find("#index .index-tree > .row").each(function() {
                    var childs = $(this).find(".col-md-3");
                    if (childs.length == 2) {
                        childs.removeClass("col-md-3").addClass("col-md-6");
                    }
                    if (childs.length == 3) {
                        childs.removeClass("col-md-3").addClass("col-md-4");
                    }
                })
                $(".floating_action_container").remove();
            }
            if (has_aside) { $aside_nav.find("li").has("ul").addClass("parent"); };

	    if (page_type == 'article') {
		attach_permalink_markers();

		// Hide empty-permalink first sections
		var $f_s = $main.find('article.doc-body > section:first-child');
		$f_s.toggleClass('hidden', $f_s[0].childElementCount == 1 && $f_s.children().is('i:empty'));

		if (has_aside) {
		    if (aside_links.length < 2) {
			has_aside = false;
			$main.addClass("o_aside_removed");
			$floating_container.add($mask).add($aside).remove();
			return;
		    }

		    floating_menu_layout();
		    set_scroll_to(aside_links);
		    ripple_animation(aside_links);
		    $aside_nav.find("li").has("ul").addClass("parent");
		}
	    }
        }


        // -- Attach permalink markers to sections' title
        var attach_permalink_markers = function () {
            $main.find('article.doc-body > section').each( function () {
                var $section  = $(this),
                    $title    = $section.find('> h2, > h3, > h4, > h5, > h6'),
                    target_id = $section.attr('id'),
                    $icon     = $('<i/>').addClass('mdi-content-link');

                if ($title.length <= 0) {
                    return;
                }

                $title.addClass('o_has_permalink_marker').append($icon);

                $icon.on('click', function () {
                    _scroll_and_set_hash("#" + target_id);

                    $title.addClass('o_marked').delay(1000).queue(function (){
                        $title.removeClass('o_marked').dequeue();
                    });
                    return false;
                });
            });
        };

        // -- Scroll To
        var set_scroll_to = function (el_list) {
            el_list.each(function () {
                var $link     = $(this),
                    target_id = $link.attr("href");

                $link.on("click", function () {
                    $aside_nav.find("li").removeClass("active");
                    $link.parents("li").addClass("active");
                    _scroll_and_set_hash(target_id);
                    return false;
                });
            });

            $body.scrollspy({
                target: 'aside',
                offset: 200,
            });
        };


        // -- Float action menu
        var floating_menu_layout = function() {
            var lis = $aside_nav.find("> ul > li").clone(true)
                .addClass("ripple")
                .css({
                    position: 'relative',
                    overflow: 'hidden'
                });
            lis.find("ul").remove().end()
                .find("a").removeClass("ripple").on("click", function() {
                    floating_menu_toggle();
                });
            $float_menu.find(".content").empty().append(lis);
            $float.add($mask).on("click", function  () {
                floating_menu_toggle();
                return false;
            });
        }
        var floating_menu_toggle = function() {
            $float.toggleClass("active");
            setTimeout(function() {
                $float_menu.toggleClass("active");
                $mask.toggleClass("active");
            }, 300);
        };

        // -- Ripple buttons
        var ripple_animation = function(el_list) {
            el_list.each(function() {
                var btn = $(this);
                btn
                    .css({
                        position: 'relative',
                        overflow: 'hidden'
                    })
                    .bind('mousedown', function(e) {
                        var ripple;
                        if (btn.find('.inner-ripple').length === 0) {
                            ripple = $('<span class="inner-ripple"/>');
                            btn.prepend(ripple);
                        } else {
                            ripple = btn.find('.inner-ripple');
                        }
                        ripple.removeClass('inner-ripple-animated');

                        if (!ripple.height() && !ripple.width()) {
                            var diameter = Math.max(btn.outerWidth(), btn.outerHeight());
                            ripple.css({
                                height: diameter,
                                width: diameter
                            });
                        }
                        var x = e.pageX - btn.offset().left - ripple.width() / 2;
                        var y = e.pageY - btn.offset().top - ripple.height() / 2;
                        ripple.css({
                            top: y + 'px',
                            left: x + 'px'
                        }).addClass('inner-ripple-animated');
                        setTimeout(function() {
                            ripple.removeClass('inner-ripple-animated');
                        }, 351);
                    });
            });
        };

        // -- Cards animation
        var cards_animate = function(type, speed) {
            type  = type || 'in';
            speed = speed || 2000;
            var $container = $("main.index"),
                $cards  = $container.find(".card"),
                $titles = $container.find("h2");

            $cards.each(function() {
                var $card      = $(this),
                    cardOffset = this.getBoundingClientRect(),
                    offset     = cardOffset.left * 0.8 + cardOffset.top,
                    delay      = parseFloat(offset / speed).toFixed(2);
                $card.css("transition-delay", delay + "s");
            });

            if (type === "in") {
                $titles.fadeTo(0, 0);
                $titles.fadeTo(1000, 1);
                $container.addClass("animating");
            } else {
                $titles.fadeTo(300, 0);
                $container.removeClass("animating");
            }
        };

        // -- Header buttons
        var header_buttons = function () {
            var timer;
            $header.on('click', '.o_primary_nav .dropdown-toggle', function(e) {
                e.preventDefault();

                var $a = $(this);
                clearTimeout(timer);

                $a.parent().toggleClass('open');
                $a.closest('ul').toggleClass('o_sub_opened', $a.parent().hasClass('open'));
                if ($a.closest('.o_primary_nav').children('.open').length > 0) {
                    $header.addClass("o_sub_opened");
                } else {
                    timer = setTimeout(function() {
                        $header.removeClass("o_sub_opened");
                    }, 200);
                }
            });
            $header.on('click', '.o_primary_nav .o_secondary_nav', function(e) {
                if (e.target === e.currentTarget) {
                    $header.find('.open').removeClass('open');
                    $header.find('.o_sub_opened').andSelf().removeClass('o_sub_opened');
                }
            });

            // -- Mobile menu opening
            $header.on('click', '.o_mobile_menu_toggle', function(e) {
                e.preventDefault();
                $(this).find('i').toggleClass('fa-bars fa-times');
                $header.toggleClass('o_mobile_menu_opened');
            });
        };

        var card_top_animation = function (win_top){
            var scrollFactor = 1.6,
                bannerHeight = Math.max(450, $card_top.outerHeight(true) - 60),
                top          = Math.min(win_top, bannerHeight/scrollFactor),
                base_value   = top * (scrollFactor - 1),
                opacity      = top/bannerHeight * scrollFactor;

            $card_top.css('transform', 'translateY(' + base_value + 'px)');
            $card_top_t.css({
                'transform' : 'translateY( -' + ( base_value - (top/2))  + 'px)',
                'opacity'   : 1 - opacity
            });
        }

        $(".content-switcher").each(function(index, switcher) {
            var $switcher = $(switcher),
                $links    = $switcher.find('> ul > li'),
                $tabs     = $switcher.find('> .tabs > *'),
                $all      = $links.add($tabs);

            function select(index) {
                $all.removeClass('active');
                $links.eq(index).add($tabs.eq(index)).addClass('active');
            }
            select(0);
            $switcher.on('click', '> ul > li', function() {
                select($(this).index());
                return false;
            });
        });


        // ======= Utils ==================
        // =================================
        var _scroll_and_set_hash = function (target_id) {
            $('html, body').animate({
                scrollTop: $(target_id).offset().top - 60
            }, 100);
            window.location.hash = target_id;
        };

        var _toggle_float = function () {
            $float.toggleClass("active");
            setTimeout(function () {
                $float_menu.toggleClass("active");
                $mask.toggleClass("active");
            }, 300);
        };

        // ======= Onload ==================
        // =================================
        // -- Call default functions
        layouting();
        cards_animate();
        header_buttons();
        ripple_animation($(".ripple"));

        if (has_aside) {
            floating_menu_layout();
            set_scroll_to(aside_links);
            ripple_animation(aside_links);
        }

        // -- Conditionally call specific functions according to resolution
        if (win_w >= screen_md){
            footer_animation();

            if (has_aside) {
                $win.load(function (){
                    // wait until page load before affix
                    body_h = $body.height();
                    set_affix(body_h);
                })
            }
        };

        // ======= On resize ==============
        // ================================
        // Update properties and conditionally call functions according to resolution
        $win.on('resize', function () {
            win_w  = $win.width();
            body_h = $body.height();

            if (win_w >= screen_md){
                footer_animation();
                if (has_aside) { set_affix(body_h); };
            } else {
                footer_stop();
            };
        });

        // ======= On scroll ==============
        // ================================
        $win.on('scroll', function () {
            if (win_w >= screen_md) {
                var win_top  = $win.scrollTop();
                    header_h = $header.outerHeight();

                $header.toggleClass('o_scrolled', win_top > header_h);
                card_top_animation(win_top);
            } else {
                $card_top.css('transform', '');
            }
        });
    });
})(jQuery);
