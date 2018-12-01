<template>

<div id="detail">
<!-- <div class="backer" v-if="num!=-1" @click="clear"></div> -->
<app-content :style="{top: 0, bottom: '0px'}">
  <app-header :title="title">
    <div slot="left" @click="backTo()">
      <span class="iconfont icon-zuo"></span>
    </div>
  </app-header>

    <!-- 电影详情 -->
    <div  class="movie-detail" :style="{backgroundImage:' url('+movieDetailList.img+')'}">
      <div class="movie-filter"></div>
      <div class="detail box-flex">
        <div class="poster">
          <img :src="movieDetailList.img">
        </div>
        <div class="content flex">
          <div class="title middle line-ellipsis">
            {{movieDetailList.nm}}
            </div>
          <div class="title-en-name line-ellipsis">{{movieDetailList.enm}}</div>
          <div class="score line-ellipsis">
                  {{movieDetailList.sc}}     
            <span class="snum">{{movieDetailList.snum}}万人评</span>             
          </div>
          <div class="type line-ellipsis">
            <span>{{movieDetailList.cat}}</span>
            <div class="type-group">
              <img style="width: 42px;" class="sd-imax" src="">
            </div>
          </div>
          <div class="src line-ellipsis">{{movieDetailList.fra}}/{{movieDetailList.dur}}分钟</div>
          <div class="pubDesc line-ellipsis">{{movieDetailList.pubDesc}}</div>
        </div>
      </div>
      <div class="arrow-g" @click="goDetail()">
            <img src="../../assets/you.png">
        </div>
    </div>

    <!-- 滚动日期列表 -->
    <h-scroll class="data-list">
      <li class="data-item" v-for="(item,index) in showDaysList.dates" 
      :key="index" >
          {{item.date}}
      </li>

    </h-scroll>
    <!-- 引入每个下拉菜单 -->
      <!-- 分类 -->
        <header class="sub-two-header">
            <li v-for="(item,index) in classList" :key="item"  @click="downPull(index)">
                
                <span :class="{chosen:index==num}">{{item}}</span>
            </li>
        </header>
        <Down :index='num' @getFilterId="setNewId"/>
    <!-- 影院列表 -->
    <ul class="cinema-list">
      <li class="cinema-item" v-for="item in cinemaList" :key="item.id">
        <div class="title">
          <span class="name">{{item.nm}}</span>
          <span class="price">{{item.sellPrice}}
            <span class="q">元起</span>
            </span>
        </div>
        <div class="addr">{{item.addr}}</div>
        <div class="tag">
          <span class="refund" v-if="item.tag.allowRefund == 1">退</span>
          <span class="refund" v-if="item.tag.endorse == 1">改签</span>
          <span class="snack" v-if="item.tag.snack == 1">小吃</span>
          <span class="vip" v-if="item.tag.vipTag == 1">{{item.tag.vipTag}}</span>
          <span class="type" v-for="(item,index) in item.tag.hallType" :key="index">
            {{item}}
          </span>
        </div>
        <p class="tag-2">{{item.promotion.cardPromotionTag}}</p>
      </li>
   </ul>
   
</app-content>

</div>
</template>
<script>
import {getMovieDetailList,getMovieDateList} from '../../services/detailService'
import {mapState} from 'vuex'
import Down from '../../components/down/Down'
export default {
  components: {
        'Down': Down
    },
  props:{
    id:Number
  },
  data(){
    return{
      classList:['全城','品牌','特色'],
      movieId:this.$route.params.id,
      movieDetailList:{},
      title:'猫眼电影',
      obj:{},
      cinemaList:[],
      showDaysList:[],
      num:-1,
      show:1,
      top:'240px',

      // 动态请求id
      resId:new Date().getTime(),
      filterIdList:{
          'areaId':-1,
          'stationId':-1,
          'brandId':-1,
          'serviceId':-1,
          'hallType':-1
      }
    }
  },
   computed: {
        ...mapState(['cityID'])
    },
  methods:{
    backTo(){
      this.$router.back();
    },
    downPull(index){
            this.num = index;
            this.show = 0;
            this.top = '44px'
            // console.log(this.num);
    },

    clear(){
      this.num = -1;
      this.show = 1;
    },
    setNewId(filterId){
      // console.log(filterId)
      Object.keys(filterId).map(item=>{
        if(filterId[item]==null){
          this.filterIdList[item] = -1
        }else{
          this.filterIdList[item] = filterId[item];
        }
      })
      // console.log(this.filterIdList)
    },
    goDetail(){
      // console.log(this.movieId);
      let id = this.movieId;
      this.$router.push(`/movie/detail2/${id}`)
    }
  },
  created(){
    let cityID = this.cityID;

    // 获得指定电影详情信息
    getMovieDetailList(this.movieId,this.resId).then((result)=>{
      this.movieDetailList = result;
      // console.log(this.movieDetailList)
      this.title = result.nm;
    });

    // 获得日期和对应的影院
    getMovieDateList(this.movieId,-1,-1,-1,-1,-1,cityID,this.resId)
      .then(result=>{
        this.cinemaList = result.cinemas;
        this.showDaysList = result.showDays;
        // console.log(result)
      })
    
    // 获得变化后的日期和对应的影院
    this.$watch('filterIdList',(newV,oldV)=>{
      this.num=-1;
      let cityID = this.cityID;
      var hallType = newV['hallType'],
        brandId = newV['brandId'],
        serviceId = newV['serviceId'],
        areaId = newV['areaId'],
        stationId = newV['stationId'];
      // console.log(hallType,brandId,serviceId,areaId,stationId)
      getMovieDateList(this.movieId,hallType,brandId,serviceId,
          areaId,stationId,cityID,this.resId).then(result=>{
          this.cinemaList = result.cinemas;
          this.showDaysList = result.showDays;
          // console.log(result)
      })
    },{deep:true})
  },
  mounted(){
  }
}
</script>
<style lang="scss" scoped>


#detail{
  width: 100%;
  height: 100%;
  position: fixed;
  background: #fff;
  z-index: 1;
  .backer{
    z-index: 0;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,.3);
  }
  // 电影详情
  .movie-filter{
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      opacity: 0.9;
      background-color: #333;
    }
  .movie-detail{
    top: 44px;
    left: 0;
    height: 188px;
    position: relative;
    cursor: pointer;
    background-size: 100% 100%;
    z-index: 1;
    
    .detail{
      height: 150px;
      padding: 19px 30px 19px 15px;
      display: flex;
      .poster img{
        width: 110px;
        height: 150px;
        box-sizing: border-box;
      }
      .content{
        overflow-x: hidden;
        margin-left: 136.5px;
        line-height: 1;
        color: #fff;
        .line-ellipsis {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .title{
          font-size: 20px;
          margin-top: 2px;
          font-weight: 700;
          overflow: hidden;
        }
        .title-en-name{
          margin-top: 10px;
          font-size: 12px;
          color: #fff;
          opacity: .8;
        }
        .score{
          font-size: 18px;
          font-weight: 700;
          color: #fc0;
          margin-top: 11px;
          .snum{
            margin-top: 10px;
            font-size: 12px;
            color: #fff;
            opacity: .8;
          }
        }
        .type,.src,.pubDesc{
          margin-top: 10px;
          font-size: 12px;
          color: #fff;
          opacity: .8;
          span{
            vertical-align:top;
          }
        }


      }
    }


  }
  .arrow-g{
    position: absolute;
    width: 10px;
    right: 15px;
    top: 50%;
  }

  // 日期列表
  .data-list{
    height: 45px;
    background: #fff;
    display: flex;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    z-index: 8;
    .data-item{
      position: relative;
      display: inline-block;
      width: 115px;
      line-height: 43px;
      margin-left: 4.5px;
      font-size: 14px;
      text-align: center;
      list-style: none;
      color: #666;
    }
  }

  .sub-two-header{
    height: 40px;
    background: #fff;
    display: flex;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    z-index: 8;
    li{
        flex: 1;
        text-align: center;
        line-height: 40px;
        border-right: 1px solid #f5f5f5;
        span{
            &::after{
                content: '';
                display: inline-block;
                width: 0;
                height: 0;
                border: 6px solid transparent;
                border-top: 3px solid #666;
                transform: translateY(2px);
            }
        }
        .chosen{
            color: #f03d37;
            &::after{
                border-top: 3px solid #f03d37;
                transform: rotate(180deg) translateY(3px) ;
            }
            
        }
    }
  }

  // 影院列表
  .cinema-list{
    .cinema-item{
    padding: 13px 15px 13px 0;
    margin-left: 15px;
    background-color: #fff;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid #f1f1f1;
    .title{
      height: 23px;
      line-height: 23px;
      font-size: 16px;
      color: #000;
      .price{
        margin-left: 4px;
        font-size: 18px;
        color:#f03d37;
        .q{
          font-size: 11px;
        }
      }
   
   }
   .addr{
     margin-top: 6px;
    font-size: 13px;
    color: #666;
   }
   .tag{
      height: 17px;
      line-height: 17px;
      margin-top: 4px;
      margin-bottom: 4px;
      overflow: hidden;
      font-size: 9px;
      flex-shrink: 0;
     .snack,.vip,.refund,.type{
        position: relative;
        display: inline-block;
        padding: 0 3px;
        height: 15px;
        line-height: 15px;
        border-radius: 2px;
        color: #f90;
        border: 1px solid #f90;
        margin-right: 5px;
     }
     .refund,.type{
        color: #589daf;
        border: 1px solid #589daf;
     }
   }
   .tag-2{
      margin-left: 0;
      font-size: 11px;
      color: #999;
   }
    }
  }

  .close-tab{
    position:absolute;
    // top: 310px;
    left: 0;
    width: 100%;
    z-index: 10;
    // height: 500px;
}
  
}
</style>

