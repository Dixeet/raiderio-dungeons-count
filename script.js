// ==UserScript==
// @name     Dungeon count
// @version  1
// @grant    none
// @author Rodrive
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
    var $infos = $("<div>Informations</div>");
    var $containerResults = $("<div></div>");
    var $filterForm = $('<form style="padding-bottom: 10px; margin-bottom: 10px; border-bottom: 3px solid #ffffff;"></form>');
    var $minKeyLvlInput = $('<input style="max-width: 40px; color: #000000;" type="number" name="minKeyLvlInput" value="1" min="1" max="30">');
    var $maxKeyLvlInput = $('<input style="max-width: 40px; color: #000000;" type="number" name="maxKeyLvlInput" value="30" min="1" max="30">');
    var $filterButton = $('<input style="color: #000000; margin-top: 5px;" type="button" value="Filter">');

    init();

    function init(){
        initView();
        getCharactedId();
    }

    function initView(){
        $container.prepend($infos);
        $container.append($containerResults);
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
            dungeons[i].runs = [];
            data.runs.forEach(function(run){
               dungeons[i].runs.push({
                   keyLvl: run.summary.mythic_level,
                   dungeonTime: run.summary.keystone_time_ms,
                   timeRemaining: run.summary.time_remaining_ms,
                   time: run.summary.clear_time_ms
               });
            });
            if(i + 1 < dungeons.length){
                getDungeonsDataR(i + 1);
            } else {
                createFilter();
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

    function createFilter() {
        $infos.hide();
        $filterForm.append($minKeyLvlInput);
        $filterForm.append(" <= Key Level <= ");
        $filterForm.append($maxKeyLvlInput);
        $filterForm.append("<br>");
        $filterButton.click(filterClick);
        $filterForm.append($filterButton);
        $container.prepend($filterForm);
        createView();
    }

    function filterClick() {
        createView($minKeyLvlInput.val(), $maxKeyLvlInput.val());
    }

    function createView(minKeyLvl, maxKeyLvl) {
        var total = 0;
        var totalTimed = 0;
        $containerResults.empty();
        if(!minKeyLvl || minKeyLvl <= 0){minKeyLvl = 1;};
        if(!maxKeyLvl || maxKeyLvl > 30){maxKeyLvl = 30;};
        if(minKeyLvl > maxKeyLvl){
            var tmpMinKeyLvl = minKeyLvl;
            minKeyLvl = maxKeyLvl;
            maxKeyLvl = tmpMinKeyLvl;
        }
        dungeons.forEach(function(dungeon){
            dungeon.countFiltered = 0;
            dungeon.timed = 0;
            dungeon.runs.forEach(function(run){
                if(minKeyLvl <= run.keyLvl && run.keyLvl <= maxKeyLvl){
                    dungeon.countFiltered++;
                    if(run.timeRemaining >= 0){dungeon.timed++}
                }
            });
            total += dungeon.countFiltered;
            totalTimed += dungeon.timed;
            $containerResults.append("<div style='border-bottom: 1px solid #ffffff; padding: 3px 0'>" + dungeon.name + " : " + dungeon.countFiltered + "  (" + dungeon.timed + ")</div>");
        })
        $containerResults.append("<div style='border-top: 2px solid #ffffff; padding: 5px 0'><h3><strong>" + "Total : " + total + " || Timed : " + totalTimed + "</strong></h3></div>");
    }


})();
