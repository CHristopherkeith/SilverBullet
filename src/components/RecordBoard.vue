<template>
  <div class="recordBoard">
    <ul class="walletLink" v-show="!hasWalletExt">
      <li class="recordBoardTitle walletLinkTitle">
        <!-- <span>Click To Install Wallet</span> -->
        <span><a href="https://github.com/nebulasio/WebExtensionWallet" target="_window">Click To Install Wallet</a></span>
      </li>
    </ul>
    <ul class="recordBoardScore">
      <li class="recordBoardTitle">
        <span>Score</span>
        <span class="totalScore">{{now.score}}</span>
      </li>
      <li>
        <div class="targetCount">
          <span>Hits</span>
          <span class="targetCountRes">{{now.hits}}</span>
        </div>
        <div class="scoreCount">
          <span>{{hitsScore}}</span>
        </div>
      </li>
      <li>
        <div class="targetCount">
          <span>Misses</span>
          <span class="targetCountRes">{{now.misses}}</span>
        </div>
        <div class="scoreCount">
          <span>{{missesScore}}</span>
        </div>
      </li>
      <li>
        <div class="targetCount">
          <span>Missed targets</span>
          <span class="targetCountRes">{{now.missesTgt}}</span>
        </div>
        <div class="scoreCount">
          <span>{{missesTgtScore}}</span>
        </div>
      </li>
      <li>
        <div class="targetCount">
          <span>Total targets</span>
          <span class="targetCountRes">{{now.totalTarget}}</span>
        </div>
      </li>
    </ul>
    <ul class="recordBoardBest">
      <li class="recordBoardTitle">
        <span>Best</span>
        <span class="totalScore">{{best.exactScore}}</span>
      </li>
      <!-- <li>
        <div class="targetCount">
          <span>Hits</span>
          <span class="targetCountRes">{{best.bestHits}}</span>
        </div>
      </li> -->
      <li>
        <div class="targetCount">
          <span>Misses</span>
          <span class="targetCountRes">{{best.exactMisses}}</span>
        </div>
      </li>
      <li>
        <div class="targetCount">
          <span>Missed targets</span>
          <span class="targetCountRes">{{best.exactMissesTgt}}</span>
        </div>
      </li>
    </ul>
    <ul class="recordBoardPrizes">
      <li class="recordBoardTitle">
        <span>Prizes(tentative)</span>
      </li>
      <li>
        <div class="targetCount">
          <span>80000 pts</span>
          <span class="targetCountPrize"><span>100</span> Nas</span>
        </div>
      </li>
      <li>
        <div class="targetCount">
          <span>70000 pts</span>
          <span class="targetCountPrize"><span>35</span> Nas</span>
        </div>
      </li>
      <li>
        <div class="targetCount">
          <span>60000 pts</span>
          <span class="targetCountPrize"><span>30</span> Nas</span>
        </div>
      </li>
      <li>
        <div class="targetCount">
          <span>50000 pts</span>
          <span class="targetCountPrize"><span>25</span> Nas</span>
        </div>
      </li>
      <li>
        <div class="targetCount">
          <span>40000 pts</span>
          <span class="targetCountPrize"><span>20</span> Nas</span>
        </div>
      </li>
      <li>
        <div class="targetCount">
          <span>30000 pts</span>
          <span class="targetCountPrize"><span>15</span> Nas</span>
        </div>
      </li>
      <li>
        <div class="targetCount">
          <span>20000 pts</span>
          <span class="targetCountPrize"><span>10</span> Nas</span>
        </div>
      </li>
      <li>
        <div class="targetCount">
          <span>0 - 20000 pts</span>
          <span class="targetCountPrize"><span>5</span> Nas</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'RecordBoard',
  // components: {TheTarget},
  props: ['now'],
  data () {
    return {
    }
  },
  methods: {

  },
  // computed: mapState([
  //   'userAddress',
  //   'best'
  // ]),
  computed: {
    ...mapState([
      'userAddress',
      'best',
      'hasWalletExt',
    ]),
    ...mapState({
      hitsScore: state =>state.hitsPoint*state.now.hits,
      missesScore: state =>state.missesPoint*state.now.misses,
      missesTgtScore: state =>state.missesTgtPoint*state.now.missesTgt,
    }),
  }
}
</script>

<style scoped>
  .recordBoard{
    width: 100%;
    height: 100%;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .recordBoard>ul{
    list-style-type: none;
  }
  .recordBoard>ul>li{
    /*padding-top: 5px;*/
    height: 25px;
  }
  .recordBoard>ul>li>div{
    position: relative;
  }
  .recordBoardTitle{
    color: white;
    font-weight: bolder;
    font-size: 18px;
    border-bottom: solid 4px #86C8FF;
  }
  .recordBoardTitle>span, .recordBoard>ul>li>div>span{
    position: absolute;
    /*top: 0px;*/
  }
  .walletLinkTitle{
    /*color: red !important;*/
    border-bottom: solid 4px red !important;
  }
  .walletLinkTitle a{
    color: red !important;
    text-decoration: none;
  }
  .recordBoard>ul>li>div>span{
    color: #B6CCE9;
    font-size: 12px;
    line-height: 16px;
    bottom: 0px;
  }
  .walletLink{
    padding-bottom: 10px;
    margin-top: -10px;
  }
  .totalScore{
    right: 0px;
  }
  .targetCount{
    float: left;
    width: 65%;
    height: 100%;
    border-bottom: dotted 1px #627186;
  }
  .recordBoardPrizes .targetCount{
    width: 100%;
  }
  .scoreCount{
    float: right;
    width: 30%;
    height: 100%;
    border-bottom: dotted 1px #627186;
  }
  .targetCountRes, .scoreCount>span, .targetCountPrize{
    right: 0px;
  }
  .targetCountPrize{
    color: white;
    /*font-weight: bolder;*/
    font-size: 16px;
  }
  .targetCountPrize>span{
    color: #FFDF7D;
  }
  .targetCountRes{
    color: white !important;
    font-weight: bolder;
    font-size: 16px !important;
  }
  .recordBoardPrizes{
    padding-top: 15px;
  }
  .recordBoardBest{
    padding-top: 15px;
  }
</style>
