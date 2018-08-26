'use strict';

var ScoreContent = function(text){
	if(text){
		var o = JSON.parse(text);
		this.exactScore = new BigNumber(o.exactScore);
    	this.exactMisses = new BigNumber(o.exactMisses);
    	this.exactMissesTgt = new BigNumber(o.exactMissesTgt);
    	this.pressScore = new BigNumber(o.pressScore);
    	this.pressMisses = new BigNumber(o.pressMisses);
    	this.pressMissesTgt = new BigNumber(o.pressMissesTgt);
	}else{
		this.exactScore = null;
    	this.exactMisses = null;
    	this.exactMissesTgt = null;
    	this.pressScore = null;
    	this.pressMisses = null;
    	this.pressMissesTgt = null;
	}
};

ScoreContent.prototype = {
	toString: function(){
		return JSON.stringify(this);
	}
};

var SilverBulletContract = function(){
	LocalContractStorage.defineMapProperty(this, "silverBullet", {
		parse: function(text){
			return new ScoreContent(text)
		},
		stringify: function(o){
			return o.toString();
		}
	});
	this.numOfPlayers = null;
};

SilverBulletContract.prototype = {
	init: function (){
		this.numOfPlayers = 0;
	},

	saveScore: function(value){
		var exactScore, exactMisses, exactMissesTgt;
		var from = Blockchain.transaction.from;
		var valueObj = JSON.parse(value);
		var scoreContent = this.silverBullet.get(from);
		if(scoreContent){
			// if(scoreContent.exactScore&&)
		}
	}
}