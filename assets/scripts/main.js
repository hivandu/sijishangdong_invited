// Created by Hivan Du 2015(Siso brand interactive team).

"use strict";

var app = {
    create: function (){
        //  create countUp instance for scene05 userId
        var options = {
            useEasing : true,
            useGrouping : true,
            separator : '',
            decimal : '',
            prefix : '',
            suffix : ''
        };

        this.userIdCountUp = new CountUp("userId", 0, 888001, 0, 1.2, options);

        //  create slider
        var isVisitedIdPage = false;

        app.mySwiper = new Swiper ('.swiper-container', {
            direction: 'vertical',

            parallax : true,

            noSwiping: false,

            // init
            onInit: function () {
                console.log('Initialized...');
                //  scene 01
                setTimeout(function () {
                    $('.scene01').addClass('active activeTransition');
                }, 500);
            },

            onTransitionStart: function (swiper) {
                if (swiper.previousIndex == 6) {
                    $('.countUp').empty();
                    setTimeout(function () {
                        app.userIdCountUp.reset();
                        app.userIdCountUp.start();
                    }, 1200);
                }

                if (isVisitedIdPage == false) {
                    if (localStorage.invite_isvisited) {
                        var userId = localStorage.invite_visitedUserId;
                        app.userIdCountUp.endVal = parseInt(userId);
                        console.log("you have been retrieved yor id: ", userId);
                    } else {
                        app.server();
                    }
                }

                isVisitedIdPage = true;
            },

            //  router
            onTransitionEnd: function (swiper) {
                var curIndex = swiper.activeIndex;
                if (curIndex == 7) {
                    $('#iSlider-arrow').fadeOut(600);
                } else {
                    $('#iSlider-arrow').fadeIn(600);
                }

                //  show content
                $('.scene').eq(curIndex).addClass('active activeTransition delay')
                    .siblings('.scene').removeClass('active activeTransition delay');

            }
        });

        //  first time play BGM
        var initSound = function () {
            //  delay play
            $('#audio')[0].play();

            document.removeEventListener('touchstart', initSound, false);
        };
        document.addEventListener('touchstart', initSound, false);
    },

    server: function () {
        console.log("Initializing server...");

        //  socket io
        var socket = io.connect('http://120.26.48.94:89');

        //  visit server
        socket.emit('visited', {});

        //  '获取游戏结果'
        socket.on('returnedId', onGameResultHandle);

        function onGameResultHandle(data) {
            console.log('get game result from socket::', data);
            localStorage.invite_visitedUserId = parseInt(data);
            localStorage.invite_isvisited = true;
            app.userIdCountUp.endVal = parseInt(data);
        }
    },

    clearCache: function () {
        localStorage.removeItem('invite_isvisited');
        localStorage.removeItem('invite_visitedUserId');
    },

    start: function (){
        this.create();
    }
};

$(function (){
    // init app
    app.start();
});