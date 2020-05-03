const WebSocket = require('ws');

const Utils = {

	bots: new Map(),

	calcAngle: (p1, p2) => {
		var dy = p2.y - p1.y;
		var dx = p2.x - p1.x;
		var theta = Math.atan2(dy, dx);
		theta *= 180 / Math.PI;
		return theta;
	},
	angle360: (p1,p2) => {
		var theta = Utils.calcAngle(p1,p2);
		if (theta < 0) theta = 360 + theta;
		theta = Math.floor(theta*255/360)
		return theta;
	},

	usernames: ["syriantroika","voicecloak","lubberwortwhisk","linguisticedmundston","festiveutility","thinkableunlocking","travelerskateboard","eruptionssnoopy","addresspiles","goldberk","ringwormknobby","woodenshakily","smallweedsmouch","deferreddiscovery","naturecatalysts","neutronfreebie","cabinetsnicker","moodyeye","policybackwash","fetlockclubbing","anguishedepidemic","uppercutrural","affixeditor","swainwestminster","falseawed","cryreaction","lanyardriverside","edinburghlazily","ruttishdominoes","clarpyudding","mickerdoormat","notedwas","ontoyearly","happilydangly","exilepummel","mckinleycreamed","cillypaintbrush","gatherertrotty","chunkmoneywise","scrimmagerant","cattailvacancy","goatsquaint","degreepunch","velvetforn","acresilent","opiumvoop","directstumpy","flavorfulheartpulse","prudemiramichi","bourypositive","lawworried","venogramsaline","phenomenoncub","forwardepee","objectfavourite","pradahook","phalangedwell","paraffinfloat","powerlesslumbey","neatlyflyre","unhitchedtrimmers","lovenullify","nevadamidnite","cheaterphillip","cofactorwildcat","hanoverianburgoo","beltsduchess","harbintrinket","worryfire","riotfries","breastsoblong","skantsunstylish","authenticpellow","woleusher","informalbranch","vegangranitic","scrapcurvy","baggiemember","cameraload","unsightlychance","smolycathouse","congolesewolf","kishornof","earfuloort","boyzgrandy","artisticinsert","radaroutburst","affriceveryone","ticketfitter","simmeringmortgage","vitaminsshrivel","crickedleicester","pabsbaseball","mushytwinkleton","renrendelta","alphadroppings","americiumboots","smishynintendo","glorioustoad","swimsuitnebula","wansonlivable","supervisechestre","parabolachemistry","wastefultok","steevegubble","halfterminator","glaringturbojet","kentuckyaltair","footagegame","adelevictor","spoolskedaddle","staddleinsano","oxfordstubbs","jubilantrollup","vomerhandstand","chalicecement","disastrousamidships","exclamationmeatballs","aerieziggy","whatconsist","wirelessbite","registerpimento","lokenmoppings","playgroupeastbound","juncturenegative","bedfordshiretrapper","axesdover","rimmeddetoxify","nottleignition","hopepry","uponbooga","listeningpains","boltmirror","respectmute","herbsstar","geckobig","initialwear","dismisscherries","flamboyantizzy","cocoaworsted","karmaconfess","residualchorton","appledash","pondgrove","breathdome","flashingpervous","sparsemaking","snowdropstiffen","arkansaskeepsake","rarehorrified","traitorhalley","mojospotter","heavydefiance","agonyretail","abusegleaming","dudebath","radioactivebafflement","lilyfray","mobilizeanxiety","wombsnitch","sleekextras","clotsload","artistmeathead","teifigrammarian","reggieexperts","glintlyla","greasyawry","penninevargas","relaxeuro","amigofinal","mindlessturkey","familyswollen","petermusky","subduedgainfully","rannochgoal","foothillbacker","jellyprint","threatmouse","unrulylimited","goeswake","troikabotland","overblownstuff","observantoutcast","systemshare","vocationstethoscope","scriptassociated","sericitetingley","questionverify","outnumberdare","travestystack","polymerssolva","glutinouska","coastlandshrike","parasailchevy","rosetulkinghorn","instancemodulator","rantspores","wifesame","itemizeronion","bridgecouch"],

	randInt: function(min, max){
		min = Math.ceil(min);
    	max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	getTk: function(length=14){
			for (var e = "", f = 0; f < length; f++) e += String.fromCharCode(48 + Math.floor(74 * Math.random()));
			return e;
	},

	getCt: function(){
		let t = "Jmv9X4x6UVOPbbjaAhB"; // this is our token
		let Ct = "";
		for (a = 1; a < t.length; a += 3) Ct += t[a];
		return Ct;
	},

	Of: 0,

	handshake: function(packet, caller){
		let decoded = JSON.parse(JSON.stringify(packet));
		const xPos = decoded[3];
		const yPos = decoded[10];
		const leaderBoard = decoded[4];
		const night = decoded[5];
		const botPlayerId = decoded[9];
		const maxPlayers = decoded[12];
		const serverID = decoded[13];
		const time = decoded[16];
		Utils.Of = decoded[7];
		const mapSeed = decoded[20];
		console.log(`Bot has id: ${botPlayerId}`);

		caller.player.id = botPlayerId;
		caller.player.pos.x = xPos;
		caller.player.pos.y = yPos;

		caller.calcRoute(caller.followPoint);
	},
	
	follow: function() {
		
	},

	entityupdate: function(a, e, d, caller){
		a = new Uint16Array(a.buffer);

		d = (e.length - 2) / 18;

		for (var c = 0; c < d; c++) {
			var f = 2 + (18 * c),
				g = 1 + (9 * c),
				h = e[f],
				k = a[g + 1],  
				l = a[g + 5],   
				m = (h * Utils.Of) + l; 

			var p = a[g + 2],
				t = a[g + 3],  
				u = a[g + 4],  
				w = a[g + 6],   
				v = a[g + 7],
				g = a[g + 8],
				f = ((e[f + 1] / 255) * Math.PI) * 2; 
			
			switch(p){
			
				case 0:
					
					if(h == caller.player.id){
						if(t + u === 0 ){ 
							caller.changeVelocity();
							
						}else{
							caller.player.pos.x = t;
							caller.player.pos.y = u;
							caller.calcRoute(caller.followPoint);
						}
					}
				
					
					break;

			}
			
		}
	},

	handlePacket: function(e, caller){
		if ("string" == typeof e.data) switch (e = JSON.parse(e.data), e[0]) {
			case 3:
				Utils.handshake(e, caller);
				break;
			 default:
				break;
		}else{
			var d = new Uint8Array(e.data);
			switch (d[0]) {
			case 0:
				Utils.entityupdate(e.data, d, !1, caller)
				break;
			case 25:
				console.log('died');
				new botSocket(caller.url);
				break;        
			}    
		}
	},

}

class botSocket {
    constructor(url){
		this.url = url;
		
		this.uuid = Math.floor(Math.random()*1000000);

		this.followPoint = {x:0,y:0,type:0};

        this.ws = new WebSocket(this.url);
		this.name = `FARMER ${Utils.usernames[Utils.randInt(0,Utils.usernames.length-1)]}`
		//this.name = `CRYO_ZOMBIE.APOCALYPSE`
		this.directions = [1,2,8,4];

		this.movements = {}
		this.movements[this.movements["LEFT"] = 1] = "LEFT";
		this.movements[this.movements["RIGHT"] = 2] = "RIGHT";
		this.movements[this.movements["UP"] = 8] = "UP";
		this.movements[this.movements["DOWN"] = 4] = "DOWN";

		this.lastSendLocation = Date.now();

		this.player = {
			velocity: 0,
			lastSentVelocity:null,
			lastSentAngle:null,
			lastStuck:Date.now(),
			pos: {x:null,y:null},
			name: this.name,
			id:null,
			angle:0,
		}

		let that = this;
        this.ws.addEventListener("open", (data) => {
			Utils.bots.set(this.uuid, this);
			console.log("Established conenction");
			const version = 51
			let payload = [this.name, 1704, 1203, version, (Utils.getCt() + Utils.getTk().substring(6)), "",0,0,0,0,0,1,0,0,0,null]
            this.ws.send(JSON.stringify(payload));
        })
        
        this.ws.addEventListener("message", (e) => {

            Utils.handlePacket(e, this);
        })
        this.ws.addEventListener("close", (data) => {
			 console.log('connection closed')
			 Utils.bots.delete(this.uuid);
        })
	}

	generateNewDirection(){
		let direction;
		let tries = 0;

		while(!direction){
			//Error handling
			if(tries > 10){
				console.log("Something went really wrong");
				return 0;
			}
			tries++;

			//generate a random direction that isnt out current
			let index = Utils.randInt(0, this.directions.length-1);
			if(this.directions[index] != this.player.velocity)
				direction = this.directions[index];
			return direction;
		}
	}

	calcRoute(point){ // lemme just 1 min afk, don't leave xD
		
		const dx = this.player.pos.x - point.x;
		const dy = this.player.pos.y - point.y;

		if(Math.abs(dx)/Math.abs(dy) > 0.5 && Math.abs(dx)/Math.abs(dy) < 2){
		
			let dir = 0;
			if(dx >= 0){
				dir+=this.movements["LEFT"];
			}
			if(dx < 0){
				dir+=this.movements["RIGHT"];
			}
			if(dy >= 0){
				dir+=this.movements["UP"];
			}
			if(dy < 0){
				dir+=this.movements["DOWN"];
			}
			this.player.velocity = dir;

		}
		else if (Math.abs(dy) > Math.abs(dx)) //then the y value must be atleast 3 times greater than x
		{

			if (dy > 0) // we must be not as far as them so go down /// u muted ur self???????????
			{
				let dir = this.movements["UP"]
				this.player.velocity = dir;

			} else {

				let dir = this.movements["DOWN"]
				this.player.velocity = dir;

			}

		} else // then x value must be 3 times greater than y
		{

			if (dx > 0) // we must be not as far as them so go right /// u muted ur self???????????
			{
				let dir = this.movements["LEFT"]
				this.player.velocity = dir;

			} else {

				let dir = this.movements["RIGHT"]
				this.player.velocity = dir;

			}

		}

		//little peice of aimbot code
		let dist = Math.sqrt(dx**2 + dy**2);
		if(dist < 1600){
			this.calcAngle(point, dist);
		}
		this.updateServer("DIR");
	}

	calcAngle(point, dist){

		if(point.type != 2 && point.type != 3){
			return;
		}
		this.player.angle = Utils.calcAngle(this.player.pos, point);
		if(dist < 1000){
			this.updateServer("ATK");
		}
		this.updateServer("ANG");
	}

	changeVelocity(){

		let currentTime = Date.now();
		if(currentTime - this.player.lastStuck > 500){
			this.player.velocity = this.generateNewDirection();
			this.player.lastStuck = currentTime;
			console.log('player stuck, updating pos');
			this.updateServer("DIR");
		}
		
	}

	updateServer(type){
		switch(type){
			case "DIR":
				let currentTime = Date.now();
				if(currentTime - this.lastSendLocation > 500){
					let updateLocationPacket = [1, this.player.pos.x-400, this.player.pos.y-400];
					this.ws.send(JSON.stringify(updateLocationPacket));
					this.lastSendLocation = currentTime;
				}

				if(this.player.velocity != this.player.lastSentVelocity){
					//console.log(`updating movement ${this.player.velocity}`);
					let movementPacket = [2, this.player.velocity];
					this.ws.send(JSON.stringify(movementPacket));
					this.player.lastSentVelocity = this.player.velocity;
				}
				break;
			case "ANG":

				if(this.player.angle != this.player.lastSentAngle){
					let anglePacket = [3, this.player.angle];
					this.ws.send(JSON.stringify(anglePacket));
					this.player.lastSentAngle = this.player.angle;
				}
				break;
			case "ATK":
				this.ws.send(`[[5, 64]]`);
				let attackPacket = [4, this.player.angle];
				let resetAttackPacket = [14];
				this.ws.send(JSON.stringify(attackPacket));
				let that=this;
				setTimeout(function(){
					if(that.ws.readyState == 1){
						that.ws.send(JSON.stringify(resetAttackPacket));
					}
				},100);

				break;
			default:
				console.log("Unknown update type");
				break;
		}
	}
}


const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', function(ws){
	console.log('we got a connection.');
	ws.on('message', function(data){
		let json = JSON.parse(data);

		switch(json[0]){
			case 0: //tell the game client what server we are on
				console.log(json[1]);
				console.log('Smashing with bots');
				setTimeout(function(){

					for(var i = 0; i < 50; i ++){
						new botSocket(json[1])
					}

				},4000)
				
				break;
			case 1:

				Utils.bots.forEach((bot, uuid)=>{
					if(bot.followPoint.type != 3){
					bot.followPoint.x = json[1];
					bot.followPoint.y = json[2];
					bot.followPoint.type = 1;
					}
				})
				break;
			case 2:
				Utils.bots.forEach((bot, uuid)=>{
					if(bot.followPoint.type != 3){
						bot.followPoint.x = json[1];
						bot.followPoint.y = json[2];
						bot.followPoint.type = 2;
						}
				})
				break;
			default:
				console.log("unknown", json);
				break;
		}
	})
})
for(var i = 0; i < 1; i ++){
	//new ws("wss://server-au.starve.io:443")
}
