// ==UserScript==
// @name         Better Worked Bots;
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       CryoScalpel
// @match        https://starve.io/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
(function() {

    window.Player = {
        name: null,
        player: null,
        otherPlayers: new Map(),
    }

    let botUtils = {

        settings: {
             followOtherPlayer: false,
        },

        localServer: "ws://127.0.0.1:8080",

        botSocket: null,

        sendGameServer: function(url){

            try{
                let setServerPacket = [0, url];
                botUtils.botSocket.send(JSON.stringify(setServerPacket));
                return 1;
            }catch(e){
                return 0;
            }
        },

        sendFollowPoint: function(pos, type){
            try{
                let setFollowPointPacket = [type, pos.x, pos.y];
                botUtils.botSocket.send(JSON.stringify(setFollowPointPacket));
                return 1;
            }catch(e){
                return 0;
            }
        },

        connect: (url) => {

            botUtils.botSocket = new WebSocket(url);
            botUtils.botSocket.onopen = function() {
                console.log('%c Connected To Bot Server! ', "background: #b3f587; color: white; font-size: x-large");
            };

            botUtils.botSocket.onclose = function(e) {
                console.log('%c Socket Closed, Reconnecting In 1 Second', "background: #ff725c; color: white; font-size: x-large");
                setTimeout(function() {
                    botUtils.connect(url);
                }, 1000);
            };

            botUtils.botSocket.onerror = function(err) {
                console.log('%c Socket Encountered Error - Closing', "background: #ff725c; color: white; font-size: x-large");
                botUtils.botSocket.close();
            };
        },

        keyDown: (e)=>{
            if(e.code == "KeyF")
            botUtils.followOtherPlayer = true;
        },
        keyUp: (e)=>{
             if(e.code == "KeyF")
            botUtils.followOtherPlayer = false;
        },

    }

    document.addEventListener('keydown', botUtils.keyDown);
    document.addEventListener('keyup', botUtils.keyUp);

    botUtils.connect(botUtils.localServer);

    const dist2d = (me, them)=>{
        return Math.sqrt((me.x-them.x)**2 + (me.y-them.y)**2);
    }
    const hackLoop = function(e){



        if(botUtils.botSocket && Player.player){
            if(botUtils.botSocket.readyState == 1 && Player.player){

                let nearest = {player:null,dist:null};
                Player.otherPlayers.forEach((_list, id) => {

                    let timeStamp = _list[1];
                    let player = _list[0];

                    if(performance.now() - timeStamp > 3000){
                        Player.otherPlayers.delete(id);

                    }else{

                        if(!player.bb.aW.match("FARMER")){


                            let dist = dist2d(Player.player, Player.otherPlayers);
                            if(!nearest.dist || dist < nearest.dist){
                                nearest.dist = dist;
                                nearest.player = player;
                            }
                        }

                    }

                })

                if(nearest.player && botUtils.followOtherPlayer){
                    botUtils.sendFollowPoint(nearest.player, 2);
                }else{
                    botUtils.sendFollowPoint(Player.player, 1);
                }
            }
        }



        window.requestAnimationFrame(hackLoop);
    }
    window.requestAnimationFrame(hackLoop);

    WebSocket = class extends WebSocket {
        constructor(server) {
            super(...arguments)

            if(server != botUtils.localServer){
                console.log(botUtils.sendGameServer(server));
            }
        }

        send(){
            let data = JSON.parse(arguments[0]);
            if(data.length == 16){ //its a handshake packet
                Player.name = data[0];
            }
            console.log(data);
            //lets update our player pos;
            super.send(...arguments);
        }
    }

    var push = Array.prototype.push;
    Array.prototype.push = function(data) {
        if (data && data.type != null && data.id != null && data.x && data.y && data.update) {
            if (data.bb) {
                const old_update = arguments[0].update;
                arguments[0].update = function() {
                    if (this.bb.aW == Player.name) {
                        Player.player = this;
                    }else{
                        Player.otherPlayers.set(this.r5, [this, performance.now()]);
                    }
                    return old_update.apply(this, arguments);
                }
            }
        }
        return push.apply(this, arguments);
    }
})();
