/*
=====================================================
                    =    main scripts starts   =
=====================================================
*/
$(document).ready(function () {

    /*********** [-- IOS click --]  **********/
    const IS_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (IS_IOS) {
        document.documentElement.classList.add('ios');
    }


    /*********** [-- Google map --]  **********/
    function initMap(getId) {
        if (document.getElementById(getId)) {
            var location = {
                lat: 40.4001309,
                lng: 49.8507559
            }

            map = new google.maps.Map(document.getElementById(getId), {
                zoom: 15,
                center: location,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{
                    "featureType": "landscape.man_made",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#f7f1df"
                    }]
                }, {
                    "featureType": "landscape.natural",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#d0e3b4"
                    }]
                }, {
                    "featureType": "landscape.natural.terrain",
                    "elementType": "geometry",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "poi.business",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "poi.medical",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#fbd3da"
                    }]
                }, {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#bde6ab"
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#ffe15f"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#efd151"
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#ffffff"
                    }]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "black"
                    }]
                }, {
                    "featureType": "transit.station.airport",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#cfb2db"
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#a2daf2"
                    }]
                }]
            });


            marker = new google.maps.Marker({
                map: map,
                position: location,
                icon: 'assets/css/icons/location.svg',
                animation: google.maps.Animation.DROP
            });
            marker.addListener('click', toggleBounce);
        }
    }

    function toggleBounce() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
    initMap("map");
    google.maps.event.addDomListener(window, "load", initMap);


    /*********** [-- Content Nav --]  **********/
    $(".content-nav li").on("mouseover", function (e) {
        autolineMover(e.target);
        $(".content-nav li").removeClass("active");
        $(this).addClass("active");
    }).on("mouseout", function (e) {
        autolineMover(e.target);
    })
    autolineMover(".content-nav li.active");

    /*********** [-- tab id smooth scroll --]  **********/
    function smoothScroll() {
        let href = window.location.href;
        let tabId = href.split("#")[1];
        switch (tabId) {
            case "photo":
            case "video":
                $("html, body").animate({
                    scrollTop: $("#" + tabId + "-tab").offset().top - 100
                }, 700)
                break;
            default:
                return;
        }
    }
    smoothScroll();

    /*********** [-- input counter up down --]  **********/
    function counterControls() {
        $(".counter-control > span:first-of-type").on("click", function (e) {
            let input = $(e.target).next();
            let counter = input.val();
            if (input.val() > 1 && input.val() !== undefined) {
                counter--;
            } else {
                counter = 1;
            }
            input.val(counter);
        });

        $(".counter-control > span:last-of-type").on("click", function (e) {
            let input = $(e.target).prev();
            let counter = input.val();
            if (input.val() >= 0 && input.val() !== undefined) {
                counter++;
            } else {
                counter = 0
            }
            input.val(counter);
        })
    }
    counterControls();

    function autolineMover(element) {
        if ($(element).length > 0) {
            let left = $(element).position().left,
                width = $(element).width()
            $(".hr-line").css({
                left: left + 'px',
                width: width + 'px'
            })
        }
    }

    /*********** [-- Custom Modal call --]  **********/
    $('.call-modal').on('click', function () {
        $.fn.custombox(this, {
            overlay: true,
            effect: 'superscaled'
        });
        activeOwlCarousel($(this))
        youtubeIframe($(this));
        modalOpening();
        return false;
    });

    function closeModal() {
        $(".close-modal").on("click", function () {
            $.fn.custombox('close');
            $.fn.colorbox.close();
            $(".custombox-overlay").removeClass("for-gallery");
        })
    }

    function activeOwlCarousel(element) {
        if (element.attr("data-gallery-id")) {
            let dataId = element.attr("data-gallery-id");
            let owl = $(".gallery-pager");
            setTimeout(() => {
                owl.trigger('to.owl.carousel', dataId - 1);
            }, 10)
        }
    }

    function youtubeIframe(element) {
        if (element.attr("data-video-id")) {
            let dataId = element.attr("data-video-id");
            $("#video-modal").find("iframe").attr("src", "https://www.youtube.com/embed/" + dataId);
        }
    }

    /*********** [-- Calendar --]  **********/
    function calendar() {
        $('.calendar-block').each(function(i,el){
            $(el).find('input').datepicker({
                autoclose: true,
                format: "dd/mm/yyyy",
                todayHighlight: true,
                container: $(el)
            });
        })
    };
    calendar();

    /*********** [-- Gallery Box active --]  **********/
    function changeImageGallery() {
        $(".gallery-cover").removeClass("fadeEffect")
        setTimeout(() => {
            $(".gallery-cover").addClass("fadeEffect");
        }, 10)
    }

    function changeImageUrl() {
        let source = $(".owl-item.active.center").find("img").attr("src");
        $(".gallery-cover").find("img").attr("src", source);
    }

    function galleryPager() {
        let owl = $(".gallery-pager");
        $(".gallery-pager  li").on("click", function () {
            owl.trigger('to.owl.carousel', $(this).data('position'))
        });
        owl.children().each(function (index) {
            $(this).attr('data-position', index); // NB: .attr() instead of .data()
        });
    }
    galleryPager();

    function galleryArrow() {
        $(document).keydown(function (e) {
            if (e.keyCode === 39) {
                $("#gallery-cover-next").click();
            } else if (e.keyCode === 37) {
                $("#gallery-cover-prev").click();
            }
        });
    }
    galleryArrow();

    function owlMainControls() {
        $(".gallery-pager .owl-prev").on("click", function () {
            changeImageUrl();
        });
        $(".gallery-pager .owl-next").on("click", function () {
            changeImageUrl();
        });
    }

    function customOwlControls() {
        $("#gallery-cover-prev").on("click", function () {
            $(".owl-prev").trigger("click");
            changeImageUrl();
        });
        $("#gallery-cover-next").on("click", function () {
            $(".owl-next").trigger("click");
            changeImageUrl();
        })
    }

    /*********** [-- Owl carousel l --]  **********/
    function callSlider(className) {
        if ($(className).length > 0) {
            let data = $(className).owlCarousel({
                center: true,
                items: 8,
                loop: true,
                mouseDrag: false,
                autoplay: false,
                margin: 0,
                responsive: {
                    320: {
                        items: 4
                    },
                    991: {
                        items: 8
                    },
                }
            });
            changeImageUrl();
            data.on('changed.owl.carousel', function (e) {
                changeImageGallery();
                changeImageUrl();
            });
            customOwlControls();
            owlMainControls();
        }
    }

    /*********** [-- Selectbox  --]  **********/

    function customSelect() {
        var x, i, j, selElmnt, a, b, c, d, l;
        x = document.getElementsByClassName("custom-select-box");
        for (l = 0; l < x.length; l++) {
            selElmnt = x[l].getElementsByTagName("select")[0];
            a = document.createElement("DIV");
            a.setAttribute("class", "select-selected");
            a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
            x[l].appendChild(a);
            b = document.createElement("DIV");
            b.setAttribute("class", "select-items select-hide");
            if (x[l].getAttribute("data-filter")) {
                d = document.createElement("input");
                d.setAttribute("class", "data-input-filter");
                a.appendChild(d);
                d.value = a.innerText;
                filterData(d)
            }
            for (j = 1; j < selElmnt.length; j++) {
                c = document.createElement("DIV");
                c.innerHTML = selElmnt.options[j].innerHTML;
                c.addEventListener("click", function (e) {
                    var y, i, k, s, h;
                    s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                    h = this.parentNode.previousSibling;

                    for (i = 0; i < s.length; i++) {
                        if (s.options[i].innerHTML == this.innerHTML) {
                            s.selectedIndex = i;
                            if (h.closest(".custom-select-box").getAttribute("data-filter")) {
                                h.querySelector("input").value = this.innerHTML;

                            } else {
                                h.innerHTML = this.innerHTML;
                            }
                            y = this.parentNode.getElementsByClassName("same-as-selected");
                            for (k = 0; k < y.length; k++) {
                                y[k].removeAttribute("class");
                            }
                            this.setAttribute("class", "same-as-selected");
                            break;
                        }
                    }
                    h.click();
                });
                b.appendChild(c);
            }
            x[l].appendChild(b);
            a.addEventListener("click", function (e) {
                e.stopPropagation();
                closeAllSelect(this);
                if (this.closest(".custom-select-box ").getAttribute("data-filter")) {
                    this.nextSibling.classList.remove("select-hide");
                    this.classList.add("select-arrow-active");
                } else {
                    this.nextSibling.classList.toggle("select-hide");
                    this.classList.toggle("select-arrow-active");
                }
            });
        }

        function closeAllSelect(elmnt) {
            var x, y, i, arrNo = [];
            x = document.getElementsByClassName("select-items");
            y = document.getElementsByClassName("select-selected");
            for (i = 0; i < y.length; i++) {
                if (elmnt == y[i]) {
                    arrNo.push(i)
                } else {
                    y[i].classList.remove("select-arrow-active");
                }
            }
            for (i = 0; i < x.length; i++) {
                if (arrNo.indexOf(i)) {
                    x[i].classList.add("select-hide");
                }
            }
        }


        function filterData(element) {
            $(element).on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $(this).closest(".select-selected").next().find("div").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        }

        document.addEventListener("click", closeAllSelect);
    }



    function mathces(mobileWidth) {
        if (mobileWidth.matches !== true) {
            customSelect();
        } else {
            $(".custom-select-box .select-selected:gt(1)").remove();
            $(".custom-select-box .select-items.select-hide:gt(1)").remove();
        }
    }

    var mobileWidth = window.matchMedia("(max-width: 576px)")
    mathces(mobileWidth)
    mobileWidth.addListener(mathces)

    /*********** [-- Main slider  --]  **********/
    $('.slider').slick({
        draggable: true,
        arrows: true,
        dots: false,
        fade: true,
        speed: 3000,
        autoplay: false,
        autoplaySpeed: 2500,
        infinite: true,
        waitForAnimate: false,
        touchThreshold: 300
    });


    $('.slick-prev[data-control').on("click", function () {
        $(".slick-prev.slick-arrow").click();
    });

    $('.slick-next[data-control').on("click", function () {
        $(".slick-next.slick-arrow").click();
    });

    /*********** [-- Custom Scroll Bar   --]  **********/
    function niceScroll(element) {
        if (element) {
            $(function () {
                $(element).overlayScrollbars({});
            })
        }
    }


    /*********** [-- Fetch Api Weather && Currency  --]  **********/
    function fetchApiData(url, className, timer) {
        fetch(url)
            .then(data => {
                return data.json();
            })
            .then(resData => {
                let data = JSON.stringify(resData);
                setTimeout(() => {
                    $("." + className).removeClass(className + "-loading");
                }, timer)
            })
            .catch(error => {
                setTimeout(() => {
                    $("." + className).removeClass(className + "-loading");
                }, timer)
            })
    }

    fetchApiData("http://data.fixer.io/api/latest?access_key=e6088d36f4770c3fac802b36d44f0fc1",
        "currency-block", 1500);
    fetchApiData("https://jsonplaceholder.typicode.com/todos/1",
        "weather-block", 1500);

    /*********** [-- Gallery Video background Color   --]  **********/
    function galleryCover() {
        $(".video-image a, .gallery-image a").on("click", function () {
            $(".custombox-overlay").addClass("for-gallery");
        })
    }

    /*********** [-- count up animation   --]  **********/
    function counter() {
        $("#calculate-btn").on("click", function () {
            inputVal = $("#calculate-value").val();
            var options = {
                useEasing: false,
                useGrouping: true,
                separator: '',
                decimal: '.',
            };
            var countUp = new CountUp('calculate-result', 0, inputVal, 0, 0.3, options);
            countUp.start();
        });
    }
    counter();


    /*********** [-- Star Checkbox   --]  **********/
    function startLabel() {
        $(".star, label").on("click", function (e) {
            e.preventDefault();
            $(this).parent().find("input").trigger("click");
        })
    }
    startLabel();

    /*********** [-- After Modal opening   --]  **********/
    function modalOpening() {
        startLabel();
        counterControls();
        callSlider('.gallery-pager');
        closeModal();
        niceScroll(".scrollable");
        galleryCover();
        galleryPager();
        calendar();
        galleryArrow();
    }

    /*********** [-- colorBox   --]  **********/
    $(".call-colorbox").on("click", function () {
        // $.colorbox.resize();
        let x = $(this).attr("width"),
            y = $(this).attr("height"),
            element = $(this);
        colorBox(x, y, element);
    })

    let resizeMode = false;

    function resizeColorbox(x) {
        if (x.matches) {
            resizeMode = true;
        } else {
            resizeMode = false;
            niceScroll(".scrollable");
        }
    }

    let x = window.matchMedia("(max-width: 991px)")
    resizeColorbox(x)
    x.addListener(resizeColorbox)

    function colorBox(width, height, element) {
        $.colorbox({
            inline: true,
            // rel: false,
            // fixed: true,
            href: $(element).attr("href"),
            width: resizeMode ? '100%' : width,
            // height: resizeMode ? '65%' : height,
            close: "",
            onComplete: function () {
                $(this).colorbox.resize();
                closeModal();
            }
        });
    }


    /*********** [-- sidebar navigation mobile   --]  **********/
    $("*").on("click", function (e) {
        if ($(e.target).hasClass("sidebar-title")) {
            $(this).next().toggleClass("height");
        } else {
            $("aside ul").removeClass("height");
        }
    });

    /*********** [-- Menu drpdown   --]  **********/
    $(".header-menus li.dropdown a").on("click", function () {
        $(this).parent("li").find("ul").fadeToggle(300);
    });

    /*********** [-- sidebar navigation mobile   --]  **********/
    $("*").on("click", function (e) {
        e.stopPropagation();
        if ($(e.target).hasClass("mobile-toggle-btn")) {
            $("body").toggleClass("mobile-active");
        } else if ($(e.target).closest("header").length > 0) {
            $("body").addClass("mobile-active");
        } else {
            $("body").removeClass("mobile-active");
        }
    })
});


/*********** [-- Page Preloader   --]  **********/
$(window).on("load", function () {
    $(".loading-page").remove();
})