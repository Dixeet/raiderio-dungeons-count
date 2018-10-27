// ==UserScript==
// @name     Dungeon count
// @version  1
// @grant    none
// @include https://raider.io/characters/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
(function() {
    'use strict';

    var playerId = 0;
    var requestString = "https://raider.io/api/characters/mythic-plus-runs?season=season-bfa-1&role=all&mode=scored&affixes=all&date=all";

    var dungeons = [
        {id: 9391, name: "The Underrot"},
        {id: 9028, name: "Atal'dazar"},
        {id: 9164, name: "Freehold"},
        {id: 9354, name: "Siege of Boralus"},
        {id: 9527, name: "Temple of Sethraliss"},
        {id: 9526, name: "Kings' Rest"},
        {id: 8064, name: "The MOTHERLODE!!"},
        {id: 9424, name: "Waycrest Manor"},
        {id: 9327, name: "Tol Dagor"},
        {id: 9525, name: "Shrine of the Storm"},
    ];

    var $container = $("<div style='width: 250px; background-color: #353535; position: fixed; top: 250px; left: 20px; color: #bbb; padding: 5px 5px'></div>");
    var $infos = $("<div>Information</div>");

    init();

    function init(){
        initView();
        getCharactedId();
    }

    function initView(){
        $container.prepend($infos);
        $('body').append($container);
    }

    function updateInfos(text){
        $infos.text(text);
    }

    function getDungeonsDataR(i){
        i = typeof(i) === "undefined" ? 0 : i;
        updateInfos("Gathering data for " + dungeons[i].name + "...");
        $.get(requestString + '&characterId=' + playerId + '&dungeonId=' + dungeons[i].id, function( data ) {
            dungeons[i].count = data.runs.length;
            if(i + 1 < dungeons.length){
                getDungeonsDataR(i + 1);
            } else {
                createView();
            }
        });
    }

    function getCharactedId() {
        playerId = $($("#content .text-muted.rio-text-body--xxx-small.slds-text-align--right .rio-spaced-element--medium.slds-show--inline-block")[1]).text().split(" ")[1];
        if(typeof(playerId) === "undefined"){
            setTimeout(function(){getCharactedId()},500);
        } else {
            getDungeonsDataR();
        }
    }

    function createView() {
        var total = 0;
        dungeons.forEach(function(dungeon){
            $container.append("<div>" + dungeon.name + " : " + dungeon.count + "</div>");
            total += dungeon.count;
        })
        $infos.hide();
        $container.prepend("<div><strong>" + "Total : " + total + " </strong></div>");
    }


})();
