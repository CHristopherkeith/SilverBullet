<template>
  <div class="recordBoard">
    <!-- <ul class="recordBoardScore">
      <li class="recordBoardTitle">
        <span>Address</span>
        <span class="totalScore">{{userAddress}}</span>
      </li>
    </ul> -->
    <ul class="recordBoardScore">
      <li class="recordBoardTitle">
        <span>Score</span>
        <span class="totalScore">{{score}}</span>
      </li>
      <li>
        <div class="targetCount">
          <span>Hits</span>
          <span class="targetCountRes">0</span>
        </div>
        <div class="scoreCount">
          <span>0</span>
        </div>
      </li>
      <li>
        <div class="targetCount">
          <span>Misses</span>
          <span class="targetCountRes">0</span>
        </div>
        <div class="scoreCount">
          <span>0</span>
        </div>
      </li>
      <li>
        <div class="targetCount">
          <span>Missed targets</span>
          <span class="targetCountRes">0</span>
        </div>
        <div class="scoreCount">
          <span>0</span>
        </div>
      </li>
      <li>
        <div class="targetCount">
          <span>Total targets</span>
          <span class="targetCountRes">0</span>
        </div>
      </li>
    </ul>
    <ul class="recordBoardBest">
      <li class="recordBoardTitle">
        <span>Best</span>
        <span class="totalScore">{{best.bestCcore}}</span>
      </li>
      <li>
        <div class="targetCount">
          <span>Hits</span>
          <span class="targetCountRes">{{best.bestHits}}</span>
        </div>
      </li>
      <li>
        <div class="targetCount">
          <span>Misses</span>
          <span class="targetCountRes">{{best.bestMisses}}</span>
        </div>
      </li>
      <li>
        <div class="targetCount">
          <span>Missed targets</span>
          <span class="targetCountRes">{{best.bestMissesTgt}}</span>
        </div>
      </li>
    </ul>
    <ul class="recordBoardPrizes">
      <li class="recordBoardTitle">
        <span>Prizes</span>
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
  props: ['score', 'best'],
  data () {
    return {
    }
  },
  methods: {

  },
  computed: mapState([
    'userAddress',
  ]),
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
  .recordBoard>ul>li>div>span{
    color: #B6CCE9;
    font-size: 12px;
    line-height: 16px;
    bottom: 0px;
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
