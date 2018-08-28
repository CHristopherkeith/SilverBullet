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
	LocalContractStorage.defineMapProperty(this, "arrayMap");
	LocalContractStorage.defineProperty(this, "size");
	this.numOfPlayers = null;
};

SilverBulletContract.prototype = {
	init: function (){
		this.numOfPlayers = 0;
		this.size = 0;
	},

	saveScore: function(value, type){
		var score, misses, missesTgt, newScoreContent;
		var index = this.size;
		var scoreField = type + 'Score',
			missesField = type + 'Misses',
			missesTgtField = type + 'MissesTgt';
		var from = Blockchain.transaction.from;
		var valueObj = JSON.parse(value);
		var originalScore = this.silverBullet.get(from);
		score = new BigNumber(valueObj.score);
		misses = new BigNumber(valueObj.misses);
		missesTgt = new BigNumber(valueObj.missesTgt);
		if(type!=='exact'&&type!=='press'){
			throw new Error("Not the correct type.");
		}
		if(originalScore&&originalScore[scoreField].gt(score)){
			throw new Error("Not the best score.");
		}
		if(originalScore){
			newScoreContent = originalScore;
		}else{
			newScoreContent = new ScoreContent();
			this.arrayMap.set(index, from);
			this.size +=1;
		}
		newScoreContent[scoreField] = score;
		newScoreContent[missesField] = misses;
		newScoreContent[missesTgtField] = missesTgt;
		this.silverBullet.set(from, newScoreContent);
	},

	getScore: function(){
		var from = Blockchain.transaction.from;
		return this.silverBullet.get(from);
	},

	numOfPlayers: function(){
		return this.numOfPlayers;
	},

	getDataSize: function(){
		return this.size;
	},

	forEach: function(limit, offset){
        limit = parseInt(limit);
        offset = parseInt(offset);
        if(offset>this.size){
           throw new Error("offset is not valid");
        }
        var number = offset+limit;
        if(number > this.size){
          number = this.size;
        }
        var result = [];
        for(var i=offset;i<number;i++){
            var key = this.arrayMap.get(i);
            var object = this.silverBullet.get(key);
            // result += "index:"+i+" key:"+ key + " value:" +object+"_";
            result.push({index: i, key: key, value: object})
        }
        return result;
    },

	verifyAddress: function(address){
		// 1-valid, 0-invalid
		var result = Blockchain.verifyAddress(address);
		return {
			valid: result == 0 ? false : true
	    };
	}
};
module.exports = SilverBulletContract;