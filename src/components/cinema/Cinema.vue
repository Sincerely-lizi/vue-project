<template>
<app-content :style="{top: '132px', bottom: '49px'}" @loadmore="loadMoreData" :canLoadMore="canLoadMore">
  <ul class="cinema-list">
    <li class="cinema-item" v-for="item in cinemaList" 
    :key="item.id" @click="setCinemaId(item.id,item.nm)">
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
</template>
<script>
import {getCinema} from "../../services/cinemaService";
import {mapState} from 'vuex'
export default {
  data(){
    return {
      cinemaList:[],
      canLoadMore: true,
      offset:0,
      getCinemaId:{}
    }
  },
    computed: {
        ...mapState(['cityID'])
    },
  methods: {
        //加载更多数据
        loadMoreData(){
            this.offset +=20;
            // console.log(this.offset)
            let offset = this.offset;
            let cityID = this.cityID;
            getCinema(offset,cityID).then(({data,ids})=>{
              this.cinemaList = [...this.cinemaList,...data];
            })
        },
        setCinemaId(id,nm){
          this.$router.push(`/cinema/detail/${id}/${nm}`)
        }
    },
  created(){
    this.$center.$on('getCinemaId',id=>{
      this.getCinemaId = {...id};
      // console.log(this.getCinemaId);
      this.num = -1;
      let hallType = this.getCinemaId['hallType'],
          brandId = this.getCinemaId['brandId'],
          serviceId = this.getCinemaId['serviceId'],
          areaId = this.getCinemaId['areaId'],
          stationId = this.getCinemaId['stationId'];
      getCinema(offset,hallType,brandId,serviceId,areaId,stationId,cityID).then(({data,ids})=>{
        this.cinemaList = data;
        // this.num = -1;
      })
    });
    let offset = this.offset;
    let cityID = this.cityID;
    // console.log(this.getCinemaId);
    getCinema(offset,-1,-1,-1,-1,-1,cityID).then(({data,ids})=>{
      this.cinemaList = data;
    }) 

  }
}
</script>
<style lang="scss" scoped>
.cinema-list{
  // background: cornflowerblue;
  // width:100%;
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
</style>



