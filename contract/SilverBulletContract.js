'use strict';

var ScoreContent = function(text){
	if(text){
		var o = JSON.parse(text);
		this.exactScore = new BigNumber(o.exactScore || 0);
    	this.exactMisses = new BigNumber(o.exactMisses || 0);
    	this.exactMissesTgt = new BigNumber(o.exactMissesTgt || 0);
    	this.pressScore = new BigNumber(o.pressScore || 0);
    	this.pressMisses = new BigNumber(o.pressMisses || 0);
    	this.pressMissesTgt = new BigNumber(o.pressMissesTgt || 0);
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

	// ok
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

	// ok
	getScore: function(){
		var from = Blockchain.transaction.from;
		return this.silverBullet.get(from);
	},

	numOfPlayers: function(){
		return this.numOfPlayers;
	},

	// ok
	getDataSize: function(){
		return this.size;
	},

	// ok
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

    // ok
	verifyAddress: function(address){
		// 1-valid, 0-invalid
		var result = Blockchain.verifyAddress(address);
		return {
			valid: result == 0 ? false : true
	    };
	}
};
module.exports = SilverBulletContract;