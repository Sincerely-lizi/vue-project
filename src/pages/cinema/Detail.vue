<template>
  <div class="cinema-detail">
    <app-content :style="{top: '0', bottom: '0'}">

      <app-header :title="title">
        <span slot="left" class="iconfont icon-zuo" @click="backAction()"></span>
      </app-header>

      <div class="cinema-info">
        <div class="title line-ellipsis">{{cinemaData.nm}}</div>
        <div class="location line-ellipsis">{{cinemaData.addr}}</div>
        <div class="location-icon"><img src="../../assets/location.png"></div>
	    </div>

    <!-- 轮播图 -->
    <div class="swiper-container cinema-nav">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item) in moviesData" :key="item.id">
            <img :src="item.img" />
        </div>
      </div>
    </div>

      <!-- 电影信息 -->
      <div class="movie-info">
				<div class="movie-title line-ellipsis">
					<span class="title">{{moviesData[0].nm}}</span>
					<span class="grade">
						<span>{{moviesData[0].sc}}<span class="small">分</span></span>	
					</span>
				</div>

				<div class="movie-desc line-ellipsis">{{moviesData[0].desc}}</div>
			</div>


      <!-- 滚动日期列表 -->
      <h-scroll class="data-list">
        <li class="data-item" v-for="(item,index) in moviesData[0].shows" 
        :key="index" >
            {{item.dateShow}}
        </li>
      </h-scroll>

      <!-- 购买列表 -->
      <div class="info-list">
          <!-- 选座列表 -->
        <div class="seat">
          <!-- vip -->
          <div class="vip-tips">
            <a>
              <div class="label">折扣卡</div>
              <div class="label-text line-ellipsis">购票享低价，首单2张立减6元</div> 	
              <div class="process">限时27.9元开卡</div>
            </a>
          </div>

          <!-- 列表 -->
          <div class="seat-list">
            <ul>
              <li class="seat-item"
              v-for="(item,index) in moviesData[0].shows[0].plist" 
                :key="index" >
                <div class="item box-flex">

                  <div class="time-block">
                    <div class="begin">{{item.tm}}</div>
                    <div class="end">19:32<span class="tui">散场</span></div>
                  </div>

                  <div class="info-block">
                    <div class="lan">{{item.lang}} {{item.tp}}</div>
                    <div class="hall">{{item.th}}</div>
                  </div>

                  <div class="price">
                    <div class="sellPr">
                      <span class="d">¥</span>
                      <span class="stonefont">21</span>
                      <!-- {{item.sellPr}} -->
                    </div>
                    <div class="vipPrice"><span class="icon">折扣卡</span><span class="num">¥21</span></div>
                    <div class="extraDesc">折扣卡首单特惠</div>
                  </div>
                  <div class="button-block">
                    <div class="button" data-bid="dp_wx_cinema_show_btn">购票</div>
                  </div>

                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 套餐团购列表 -->
        <div class="tuan" :style="{top: top+'px'}">
          <div class="gap" style="height: 10px; background-color: #f0f0f0;"></div>
          <ul class="tuan-list">
            <div class="tuan-title mb-line-b">影院超值套餐</div>
            <li class="tuan-item">
              <img src="" />

              <div class="item-info">
                <div class="title">
                  <span>双人</span>
                    46oz爆米花1桶+烤肠（烤肉肠）1根+22oz可乐2杯/立顿茶趣2杯(2选1)
                </div>
                <div class="sell-num">已售228</div>

                <div class="price">
                  <span class="sell-price">
                    <span>¥</span><span class="num">36</span>
                  </span>
                </div>

                <div class="buy-btn">去购买</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </app-content>
  </div>
</template>


<script>
import {getCinemaDetail} from '../../services/cinemaService'
import Swiper from 'swiper' 
import 'swiper/dist/css/swiper.min.css'
export default {
   props:{
      id:Number,
      nm:String
    },
  data(){
    return{
      title:'猫眼电影',
      cinemaId:this.$route.params.id,
      cinemaData:{},
      moviesData:[],
      selectIndex:0,
      top:0,
      height:0
    }
  },
  methods:{
    backAction(){
      this.$router.back();
    }
  },
  created(){
    // console.log(this.title,this.cinemaId)
    getCinemaDetail(this.cinemaId).then(({cinemaData,moviesData})=>{
      // console.log(cinemaData,moviesData);
      this.cinemaData = cinemaData;
      this.moviesData = moviesData;
      this.title = this.$route.params.nm;
      // this.cinemaId = this.$route.params.id
      this.moviesData[0].shows[0].plist.map(item=>{
        this.top = item * 94 +368;
      })
    });
    
  },
  mounted(){
      var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
         effect : 'coverflow',
         autoplay:true,
          slidesPerView: 3,
          centeredSlides: true,
          coverflowEffect: {
            rotate: 30,
            stretch: 10,
            depth: 60,
            modifier: 2,
            slideShadows : true
          },     
          observer:true,
          observerParents:true,   
      })
    
  }
}
</script>

<style lang="scss" scoped>
.cinema-detail{
  background: #fff;
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 3;

  // 影院信息
  .cinema-info {
    position: absolute;
    margin-top: 44px;
    width: 100%;
    padding: 15px 0px 15px 15px;
    .title {
      font-size: 17px;
      line-height: 24px;
      font-weight: 700;
      color: #333;
    }
    .location{
      margin-top: 2px;
      font-size: 13px;
      line-height: 18.5px;
      color: #999;
      width: 290px;
    }
    .location-icon{
      position: absolute;
      right: 12px;
      top: 50%;
      width: 70px;
      height: 31px;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      border-left: 1px solid #d8d8d8;
      text-align: center;
      img {
        display: inline-block;
        width: 19px;
        height: 22px;
        margin-top: 5px;
      }
    }
    .line-ellipsis {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  // 轮播图
  .cinema-nav{
    width: 100%;
    position: absolute;
    margin-top: 118px;
    padding: 20px 15px 20px 5px;
    background-color: #000;
    // opacity: 0.8;
    z-index: -1;
    .swiper-wrapper{
      z-index: 1;
      .swiper-slide-next{
        -webkit-transform:scale(1.2,1.2);
        overflow: visible;
      }
      .swiper-slide{
        width: 65px;
        height: 95px;
        margin: 0 10px;
        img{
          height: 95px;
          width: 65px;
        }
      }

    }
  }
  // 电影信息
  .movie-info {
    position: absolute;
    padding: 11px 15px;
    text-align: center;
    top: 250px;
    width: 100%;
    .movie-title {
      height: 24px;
      line-height: 24px;
      font-size: 17px;
      color: #333;
      font-weight: 700;
      width: 100%;
    .line-ellipsis {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      }
      .grade {
        color: #ffb400;
        font-size: 16px;
      }
    }
    .movie-desc {
      width: 100%;
      margin-top: 2px;
      height: 18.5px;
      line-height: 18.5px;
      font-size: 13px;
      color: #999;
    }
  }

  // 日期列表
  .data-list{
    height: 45px;
    background: #fff;
    display: flex;
    width: 100%;
    position: absolute;
    top:318px;
    border-top: 1px solid #f5f5f5;
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

  // 购买列表  售票、团购
  .info-list{
    position: absolute;
    top:368px;
    width: 100%;
    max-height: 1000px;
    //售票
    .seat{
      .vip-tips{
        flex: 1;
        background-color: #fff5ea;
        padding: 0 15px;
        height: 42px;
        line-height: 42px;
        width: 100%;
        a{
          display: flex;
          color:#777;
          .label{
            background-color: #ff941a;
            border-radius: 2px;
            font-size: 10px;
            line-height: 15px;
            height: 15px;
            width: 34px;
            text-align: center;
            color: #fff;
            margin-top: 13px;
            margin-right: 10px;
          }
          .label-text {
            flex: 1;
            text-align: center;
            color: #fa9600;
            font-size: 12px;
          }
          .process {
            flex: 1;
            text-align: center;
            line-height: 42px;
            color: #999;
            font-size: 12px;
            &::after {
              display: inline-block;
              content: "";
              width: 7px;
              height: 7px;
              border-left: 1px solid #ccc;
              border-top: 1px solid #ccc;
              transform: rotate(135deg);
            }
          }


        }
      }
      // 售票列表
      .seat-list{
        width: 100%;
        // 列表元素
        .seat-item{
          padding: 17px 0;
          margin-left: 12.5px;
          border-bottom: 1px solid #f5f5f5;
          .item{
            padding-right: 12.5px;
            display: flex;
            
            // 左
            .time-block{
              
              // display: flex;
              .begin {
                font-size: 20px;
                color: #333;
                line-height: 1;
                white-space: nowrap;
              }
              .end {
                margin-top: 10px;
                color: #999;
                font-size: 11px;
                line-height: 1;
                white-space: nowrap;
                .tui {
                  margin-left: 4px;
                  display: inline-block;
                  transform: translateY(-.5px);
                }
              }
            }
            // 左中
            .info-block {
              margin-left: 17px;
              flex: 1;
              overflow-x: hidden;
              .lan {
                margin-top: 2px;
                line-height: 18px;
                font-size: 13px;
                color: #333;
                white-space: normal;
              }
              .hall {
                margin-top: 7px;
                font-size: 11px;
                color: #999;
                white-space: normal;
              }
            }
            // 右中
            .price {
              width: 130px;
              margin-left: 5px;
              .sellPr {
                display: inline-block;
                line-height: 1;
                color: #f03d37;
                margin-top: 1px;
                font-size: 19px;
                .d{
                  font-size: 11px;
                }
              }
              .vipPrice {
                display: inline-block;
                line-height: 15px;
                height: 15px;
                transform: scale(.8);
                transform-origin: left;
                margin-right: -16px;
                border: 1px solid #ff9000;
                border-radius: 2px;
                font-size: 12px;
                .icon {
                  color: #fff;
                  background-color: #f90;
                  padding: 0 2px;
                }
                .num {
                  color: #f90;
                  background-color: #fff;
                  padding: 0 2px;
                }
                
              }
              .extraDesc {
                margin-top: 5px;
                display: block;
                font-size: 11px;
                color: #999;
              }
            }
            // 右  购票按钮
            .button-block {
                width: 45px;
                margin-left: 2px;
                position: relative;
              .button {
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                  width: 100%;
                  height: 27px;
                  line-height: 28px;
                  font-size: 12px;
                  background-color: #f03d37;
                  color: #fff;
                  border-radius: 4px;
                  text-align: center;
              }
            }
          }
          

        }
      }
    }

    //团购
    .tuan{
      background-color: #fff;
      .tuan-list{
        position: relative;
        margin: 0 0 0 15px;
        img{
          display: inline-block;
          width: 92px;
          height: 92px;
          float: left;
        }
        .item-info {
          position: relative;
          margin: 0 15px 0 102px;
          height: 92px;
          overflow: hidden;
          .title {
            font-size: 14px;
            line-height: 18px;
            color: #333;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            span {
              display: inline-block;
              vertical-align: top;
              margin-top: 1px;
              margin-right: 7px;
              padding: 0 4px;
              font-size: 10px;
              line-height: 15px;
              height: 15px;
              background: #f90;
              border-radius: 2px;
              color: #fff;
            }
          }
          .sell-num {
            display: inline-block;
            position: absolute;
            bottom: 34px;
            right: 0;
            line-height: 16px;
            height: 16px;
            font-size: 12px;
            color: #999;
          }
          .price {
            position: absolute;
            bottom: 0;
            left: 0;
            .sell-price {
              color: #f03d37;
              display: inline-block;
              span {
                font-size: 14px;
              }
              .num {
                font-size: 17px;
              }
            }
          }
          .buy-btn {
            position: absolute;
            right: 0;
            bottom: 0;
            display: inline-block;
            padding: 0 8px;
            height: 27px;
            line-height: 27px;
            font-size: 12px;
            border-radius: 3px;
            color: #fff;
            background-color: #f03d37;
          }

        }
      }
    }
  }
  

}
</style>

