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
    var tmpDungeons = [{"id":9391,"name":"The Underrot","count":14,"runs":[{"keyLvl":11,"dungeonTime":1800999,"timeRemaining":33729,"time":1767270},{"keyLvl":14,"dungeonTime":1800999,"timeRemaining":-284590,"time":2085589},{"keyLvl":13,"dungeonTime":1800999,"timeRemaining":-1528699,"time":3329698},{"keyLvl":11,"dungeonTime":1800999,"timeRemaining":191272,"time":1609727},{"keyLvl":10,"dungeonTime":1800999,"timeRemaining":247286,"time":1553713},{"keyLvl":10,"dungeonTime":1800999,"timeRemaining":-1227596,"time":3028595},{"keyLvl":10,"dungeonTime":1800999,"timeRemaining":-291354,"time":2092353},{"keyLvl":7,"dungeonTime":1800999,"timeRemaining":490320,"time":1310679},{"keyLvl":7,"dungeonTime":1800999,"timeRemaining":431667,"time":1369332},{"keyLvl":7,"dungeonTime":1800999,"timeRemaining":304423,"time":1496576},{"keyLvl":5,"dungeonTime":1800999,"timeRemaining":37995,"time":1763004},{"keyLvl":6,"dungeonTime":1800999,"timeRemaining":-482675,"time":2283674},{"keyLvl":5,"dungeonTime":1800999,"timeRemaining":184392,"time":1616607},{"keyLvl":4,"dungeonTime":1800999,"timeRemaining":-94009,"time":1895008}]},{"id":9028,"name":"Atal'dazar","count":14,"runs":[{"keyLvl":13,"dungeonTime":1800999,"timeRemaining":111158,"time":1689841},{"keyLvl":12,"dungeonTime":1800999,"timeRemaining":65497,"time":1735502},{"keyLvl":14,"dungeonTime":1800999,"timeRemaining":-328348,"time":2129347},{"keyLvl":13,"dungeonTime":1800999,"timeRemaining":-505893,"time":2306892},{"keyLvl":14,"dungeonTime":1800999,"timeRemaining":-703507,"time":2504506},{"keyLvl":12,"dungeonTime":1800999,"timeRemaining":-328811,"time":2129810},{"keyLvl":12,"dungeonTime":1800999,"timeRemaining":-35445,"time":1836444},{"keyLvl":11,"dungeonTime":1800999,"timeRemaining":151000,"time":1649999},{"keyLvl":10,"dungeonTime":1800999,"timeRemaining":126448,"time":1674551},{"keyLvl":8,"dungeonTime":1800999,"timeRemaining":369807,"time":1431192},{"keyLvl":9,"dungeonTime":1800999,"timeRemaining":423648,"time":1377351},{"keyLvl":9,"dungeonTime":1800999,"timeRemaining":114664,"time":1686335},{"keyLvl":9,"dungeonTime":1800999,"timeRemaining":-745735,"time":2546734},{"keyLvl":4,"dungeonTime":1800999,"timeRemaining":656382,"time":1144617}]},{"id":9164,"name":"Freehold","count":17,"runs":[{"keyLvl":14,"dungeonTime":2160999,"timeRemaining":279390,"time":1881609},{"keyLvl":13,"dungeonTime":2160999,"timeRemaining":31417,"time":2129582},{"keyLvl":12,"dungeonTime":2160999,"timeRemaining":-137327,"time":2298326},{"keyLvl":13,"dungeonTime":2160999,"timeRemaining":307265,"time":1853734},{"keyLvl":12,"dungeonTime":2160999,"timeRemaining":305999,"time":1855000},{"keyLvl":11,"dungeonTime":2160999,"timeRemaining":223441,"time":1937558},{"keyLvl":12,"dungeonTime":2160999,"timeRemaining":379520,"time":1781479},{"keyLvl":10,"dungeonTime":2160999,"timeRemaining":14665,"time":2146334},{"keyLvl":12,"dungeonTime":2160999,"timeRemaining":231795,"time":1929204},{"keyLvl":10,"dungeonTime":2160999,"timeRemaining":432762,"time":1728237},{"keyLvl":9,"dungeonTime":2160999,"timeRemaining":514150,"time":1646849},{"keyLvl":7,"dungeonTime":2160999,"timeRemaining":335341,"time":1825658},{"keyLvl":9,"dungeonTime":2160999,"timeRemaining":500411,"time":1660588},{"keyLvl":10,"dungeonTime":2160999,"timeRemaining":-2042118,"time":4203117},{"keyLvl":5,"dungeonTime":2160999,"timeRemaining":328931,"time":1832068},{"keyLvl":6,"dungeonTime":2160999,"timeRemaining":389615,"time":1771384},{"keyLvl":4,"dungeonTime":2160999,"timeRemaining":185956,"time":1975043}]},{"id":9354,"name":"Siege of Boralus","count":11,"runs":[{"keyLvl":11,"dungeonTime":2160999,"timeRemaining":-222814,"time":2383813},{"keyLvl":10,"dungeonTime":2160999,"timeRemaining":-167090,"time":2328089},{"keyLvl":12,"dungeonTime":2160999,"timeRemaining":80125,"time":2080874},{"keyLvl":11,"dungeonTime":2160999,"timeRemaining":-148601,"time":2309600},{"keyLvl":10,"dungeonTime":2160999,"timeRemaining":243440,"time":1917559},{"keyLvl":10,"dungeonTime":2160999,"timeRemaining":-35666,"time":2196665},{"keyLvl":9,"dungeonTime":2160999,"timeRemaining":-159663,"time":2320662},{"keyLvl":8,"dungeonTime":2160999,"timeRemaining":-648402,"time":2809401},{"keyLvl":8,"dungeonTime":2160999,"timeRemaining":-496558,"time":2657557},{"keyLvl":7,"dungeonTime":2160999,"timeRemaining":-265187,"time":2426186},{"keyLvl":7,"dungeonTime":2160999,"timeRemaining":-1166119,"time":3327118}]},{"id":9527,"name":"Temple of Sethraliss","count":10,"runs":[{"keyLvl":12,"dungeonTime":2160999,"timeRemaining":-111047,"time":2272046},{"keyLvl":12,"dungeonTime":2160999,"timeRemaining":-618090,"time":2779089},{"keyLvl":11,"dungeonTime":2160999,"timeRemaining":-105105,"time":2266104},{"keyLvl":9,"dungeonTime":2160999,"timeRemaining":-171394,"time":2332393},{"keyLvl":12,"dungeonTime":2160999,"timeRemaining":-18781,"time":2179780},{"keyLvl":10,"dungeonTime":2160999,"timeRemaining":-105924,"time":2266923},{"keyLvl":5,"dungeonTime":2160999,"timeRemaining":-91212,"time":2252211},{"keyLvl":6,"dungeonTime":2160999,"timeRemaining":42959,"time":2118040},{"keyLvl":7,"dungeonTime":2160999,"timeRemaining":-1213782,"time":3374781},{"keyLvl":4,"dungeonTime":2160999,"timeRemaining":323021,"time":1837978}]},{"id":9526,"name":"Kings' Rest","count":7,"runs":[{"keyLvl":7,"dungeonTime":2340999,"timeRemaining":-768034,"time":3109033},{"keyLvl":11,"dungeonTime":2340999,"timeRemaining":218089,"time":2122910},{"keyLvl":10,"dungeonTime":2340999,"timeRemaining":-9290,"time":2350289},{"keyLvl":10,"dungeonTime":2340999,"timeRemaining":287306,"time":2053693},{"keyLvl":6,"dungeonTime":2340999,"timeRemaining":522976,"time":1818023},{"keyLvl":8,"dungeonTime":2340999,"timeRemaining":-2425966,"time":4766965},{"keyLvl":8,"dungeonTime":2340999,"timeRemaining":-840239,"time":3181238}]},{"id":8064,"name":"The MOTHERLODE!!","count":18,"runs":[{"keyLvl":13,"dungeonTime":2340999,"timeRemaining":-144285,"time":2485284},{"keyLvl":12,"dungeonTime":2340999,"timeRemaining":259426,"time":2081573},{"keyLvl":10,"dungeonTime":2340999,"timeRemaining":408341,"time":1932658},{"keyLvl":14,"dungeonTime":2340999,"timeRemaining":-738279,"time":3079278},{"keyLvl":12,"dungeonTime":2340999,"timeRemaining":-572875,"time":2913874},{"keyLvl":13,"dungeonTime":2340999,"timeRemaining":-2530294,"time":4871293},{"keyLvl":11,"dungeonTime":2340999,"timeRemaining":158386,"time":2182613},{"keyLvl":10,"dungeonTime":2340999,"timeRemaining":-459493,"time":2800492},{"keyLvl":10,"dungeonTime":2340999,"timeRemaining":-2757902,"time":5098901},{"keyLvl":11,"dungeonTime":2340999,"timeRemaining":-568956,"time":2909955},{"keyLvl":8,"dungeonTime":2340999,"timeRemaining":357831,"time":1983168},{"keyLvl":10,"dungeonTime":2340999,"timeRemaining":-3806405,"time":6147404},{"keyLvl":7,"dungeonTime":2340999,"timeRemaining":-265153,"time":2606152},{"keyLvl":8,"dungeonTime":2340999,"timeRemaining":193702,"time":2147297},{"keyLvl":8,"dungeonTime":2340999,"timeRemaining":-50991,"time":2391990},{"keyLvl":6,"dungeonTime":2340999,"timeRemaining":412154,"time":1928845},{"keyLvl":2,"dungeonTime":2340999,"timeRemaining":865595,"time":1475404},{"keyLvl":5,"dungeonTime":2340999,"timeRemaining":-410870,"time":2751869}]},{"id":9424,"name":"Waycrest Manor","count":9,"runs":[{"keyLvl":14,"dungeonTime":2340999,"timeRemaining":19750,"time":2321249},{"keyLvl":13,"dungeonTime":2340999,"timeRemaining":158404,"time":2182595},{"keyLvl":11,"dungeonTime":2340999,"timeRemaining":136582,"time":2204417},{"keyLvl":11,"dungeonTime":2340999,"timeRemaining":-821599,"time":3162598},{"keyLvl":9,"dungeonTime":2340999,"timeRemaining":302069,"time":2038930},{"keyLvl":9,"dungeonTime":2340999,"timeRemaining":-177880,"time":2518879},{"keyLvl":10,"dungeonTime":2340999,"timeRemaining":125512,"time":2215487},{"keyLvl":6,"dungeonTime":2340999,"timeRemaining":73330,"time":2267669},{"keyLvl":6,"dungeonTime":2340999,"timeRemaining":346106,"time":1994893}]},{"id":9327,"name":"Tol Dagor","count":9,"runs":[{"keyLvl":13,"dungeonTime":1980999,"timeRemaining":-272945,"time":2253944},{"keyLvl":11,"dungeonTime":1980999,"timeRemaining":-952293,"time":2933292},{"keyLvl":10,"dungeonTime":1980999,"timeRemaining":77181,"time":1903818},{"keyLvl":12,"dungeonTime":1980999,"timeRemaining":-490958,"time":2471957},{"keyLvl":11,"dungeonTime":1980999,"timeRemaining":2988,"time":1978011},{"keyLvl":11,"dungeonTime":1980999,"timeRemaining":-430582,"time":2411581},{"keyLvl":7,"dungeonTime":1980999,"timeRemaining":438214,"time":1542785},{"keyLvl":7,"dungeonTime":1980999,"timeRemaining":3737,"time":1977262},{"keyLvl":5,"dungeonTime":1980999,"timeRemaining":113713,"time":1867286}]},{"id":9525,"name":"Shrine of the Storm","count":8,"runs":[{"keyLvl":12,"dungeonTime":2340999,"timeRemaining":-275574,"time":2616573},{"keyLvl":10,"dungeonTime":2340999,"timeRemaining":17440,"time":2323559},{"keyLvl":11,"dungeonTime":2340999,"timeRemaining":-9819,"time":2350818},{"keyLvl":10,"dungeonTime":2340999,"timeRemaining":-945880,"time":3286879},{"keyLvl":8,"dungeonTime":2340999,"timeRemaining":262439,"time":2078560},{"keyLvl":9,"dungeonTime":2340999,"timeRemaining":135417,"time":2205582},{"keyLvl":11,"dungeonTime":2340999,"timeRemaining":-6087075,"time":8428074},{"keyLvl":9,"dungeonTime":2340999,"timeRemaining":-882437,"time":3223436}]}];

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
