<template>
  <div class="close-tab">
    <div class="tab-content">
      
      
      <!-- 全城 -->
      <div class="page region" v-if="index == 0">
        <!-- 商区   地铁站 -->
        <ul class="tab">
          <li class="item" @click="selectTab(0)" :class="{chosen:0==selectIndex}">商区</li>
          <li class="item" @click="selectTab(1)" :class="{chosen:1==selectIndex}">地铁站</li>
        </ul>

        <!-- 地区列表 -->
        <div class="region-list">

          <!-- 左边 -->
          <div class="region-sidenav">
            <!-- 商区 -->
            <div class="district" v-if="selectIndex == 0">
              <div class="district-li" v-for="(item,index) in filterList.district" 
              :key="item.id" @click="areaAction(index)" :class="{chosen:index == areaIndex}">
              {{item.name}}({{item.count}})
              </div>
            </div>
            <!-- 地铁 -->
            <div class="district subway" v-if="selectIndex == 1">
              <div class="district-li" v-for="(item,index) in filterList.subway" 
              :key="item.id" @click="subwayAction(index)" :class="{chosen:index == subwayIndex}">
              {{item.name}}({{item.count}})
              </div>
            </div>
          </div>

          <!-- 右边 -->
          <div class="region-item">
            <!-- 商区 -->
            <div class="filter-list"  v-if="selectIndex == 0">
              <div class="item chosen" v-for="(item,index) in filterList.mapDistrict[areaIndex]" 
              :key="item.id" @click="areaItemAction(index,item.id)">
              
                  <span class="item-name" :class="{chosen:index==areaItemIndex}">{{item.name}}</span>
                  <span class="item-count" :class="{countchosen:index==areaItemIndex}">{{item.count}}</span>
              </div>
            </div>

            <!-- 地铁 -->
            <div class="filter-list"  v-if="selectIndex == 1">
              <div class="item chosen" v-for="(item,index) in filterList.mapSubway[subwayIndex]" 
              :key="item.id" @click="subwayItemAction(index,item.id)">
              
                  <span class="item-name" :class="{chosen:index==subwayItemIndex}">{{item.name}}</span>
                  <span class="item-count" :class="{countchosen:index==subwayItemIndex}">{{item.count}}</span>
              </div>
            </div>
          </div>

        </div>

        
      </div>


      <!-- 品牌 -->
      <div class="page brand"  v-if="index == 1" >
        <div class="brand-item" v-for="(item,index) in filterList.brand" 
        :key="item.id" @click="brandAction(index,item.id)">
            <span class="brand-name" :class="{chosen:index==brandIndex}">{{item.name}}</span>
            <span class="brand-count" :class="{brandchosen:index==brandIndex}">{{item.count}}</span>
        </div>
      </div>


      <!-- 特色 -->
      <div class="page special" v-if="index == 2" >
        
        <div class="item-title">特色功能</div>
          <div class="item-list">
            <div class="item" v-for="(item,index) in filterList.service" 
            :key="item.id" @click="serviceAction(index,item.id)" :class="{chosen:index==powerIndex}">
                {{item.name}}
            </div>
          </div>

        <div class="item-title">特殊厅</div>
          <div class="item-list">
            <div class="item" v-for="(item,index) in filterList.hallType" 
            :key="item.id"  @click="hallAction(index,item.id)" :class="{chosen:index==hallIndex}">
              {{item.name}}
            </div>
          </div>
          <div id="special-btn">
            <span class="btn" id="cancel-btn" @click="cancelId()">重置</span>
            <span class="btn" id="confirm-btn" @click="confirmId()">确定</span>
          </div>

      </div>

    </div>
  </div>
</template>

<script>
import {getFilterCinema} from "../../services/appService";
import {mapState} from 'vuex'
export default({
  props:{
    index:Number
  },
  data(){
    return {
      filterList:[],
      selectIndex:0,   //两个tab栏的index  (商区.地铁)
      areaIndex:0,  //商区左边列表index
      subwayIndex:0,
      areaItemIndex:0 ,//商区右边列表index
      subwayItemIndex:0 ,
      brandIndex:0,
      powerIndex:0,
      hallIndex:0,
      filterId:{}
    }
  },
  computed: {
      ...mapState(['cityID'])
  },
  methods:{
    // 两个tab栏
    selectTab(index){
      this.selectIndex = index;
    },
    // 选中商区列表
    areaAction(index){
      this.areaIndex = index;
    },
    subwayAction(index){
      this.subwayIndex = index;
    },

    // 选中商区子列表子元素
    areaItemAction(index,id){
      this.areaItemIndex = index;
      this.filterId['areaId'] = id;
      this.$emit('getFilterId',this.filterId);
      this.$center.$emit('getCinemaId',this.filterId);
    },
    subwayItemAction(index,id){
      this.subwayItemIndex = index;
      this.filterId['subwayId'] = id;
      this.$emit('getFilterId',this.filterId);
      this.$center.$emit('getCinemaId',this.filterId);
    },

    // 选中品牌列表元素
    brandAction(index,id){
      this.brandIndex = index;
      this.filterId['brandId'] = id;
      this.$emit('getFilterId',this.filterId);
      this.$center.$emit('getCinemaId',this.filterId);
    },

    // 选中特色服务
    serviceAction(index,id){
      this.powerIndex = index;
      this.filterId['serviceId'] = id;
    },
    // 选中特色厅
    hallAction(index,id){
      this.hallIndex = index;
      this.filterId['hallType'] = id;
    },

    // 提交特色区的两个id
    cancelId(){
      this.filterId['serviceId'] = null;
      this.filterId['hallType'] = null;
    },
    confirmId(){
      this.$emit('getFilterId',this.filterId);
      this.$center.$emit('getCinemaId',this.filterId);
    }
  },
  created(){
    let cityID = this.cityID;
    getFilterCinema(cityID).then(result=>{
      this.filterList = result;
      // console.log(this.filterList)
    }) 
  },

})
</script>

<style lang="scss" scoped>
.tab-content{
  .page{
    max-height:350px;
    width: 100%;
    position: absolute;
    background: #fff;
    top:0; left:0;
    color: #777;
    font-size: 14px;
  } 

  // 城市
  .region{
    
    .tab{
      width: 100%;
      display: flex;
        .item{
          flex:1;
          text-align: center;
          line-height: 44px;
        }
        .chosen{
          color: #f03d37;
          border-bottom: 1px solid #f03d37;
        }
    }

    .region-sidenav{
      overflow: auto;
      max-height: 300px;
      width: 35%;
      height: 100%;
      float: left;
      .district{
        .district-li{
          height: 44px;
          padding-left: 10px;
          line-height: 44px;
          font-size: 14px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .chosen{
          color: #f03d37;
          background: #f5f5f5;
        }

      }
    } 
    
    .region-item{
      width: 65%;
      height: 100%;
      max-height: 300px;
      float: right;
      overflow: scroll;
      background: #f5f5f5;
      .filter-list{
        background: #f5f5f5;
        .item{
            position: relative;
            height: 45px;
            line-height: 45px;
            padding: 0 0 0 25px;
            .item-name{
              width: 80%;
              font-size: 14px;
              color: #333;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              
            }
            .chosen{
                color: #f03d37;
                &::before{
                  content: "";
                    display: block;
                    position: absolute;
                    left: 8px;
                    top: 19px;
                    width: 11.5px;
                    height: 8px;
                    background-image: url(../../assets/gou.png);
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }
              }
            .item-count{
                float: right;
                width: 20px;
                margin-right: 10px;
                color: #8f9296;
                font-size: 12px;
                text-align: right;
            }
            .countchosen{
                color: #f03d37;
            }
        }
      }
    }
  }

  //品牌
  .brand{
    background-color: #fff;
    overflow: auto;
    z-index: 999;
    .brand-item{
       position: relative;
      line-height: 44px;
      height: 44px;
      padding: 0 30px 0 26px;
      border-bottom: 1px solid #e5e5e5;
      color: #333;
      .brand-name{
        display: inline-block;
        width: 49%;
      }
      .chosen{
          color: #f03d37;
            &::before{
              content: "";
              display: block;
              position: absolute;
              left: 8px;
              top: 19px;
              width: 11.5px;
              height: 8px;
              background-image: url(../../assets/gou.png);
              background-repeat: no-repeat;
              background-size: 100% 100%;
          }
      }     
      .brand-count{
        float: right;
        color: #8f9296;
        font-size: 12px;
      }
      .brandchosen{
        color: #f03d37;
      }
    }
  }
  // 特色
  .special{
    min-height: 150px;
    // max-height: 300px;
    overflow: scroll;
    .item-title{
        margin-left: 12px;
        margin-top: 11px;
        font-size: 15px;
    }
    .item-list{
      margin: 0 12px 12px;
      .item{
          float: left;
          width: 21.3%;
          height: 30px;
          padding: 3px 0;
          margin-right: 3%;
          margin-top: 10px;
          line-height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: .7rem;
      }
      .chosen{
          background: #fcf0f0;
          color: #f03d37;
          border: 1px solid #f03d37;
      }
    }
    #special-btn{
      height: 60px;
      width: 100%;
      border-top: 1px solid #e5e5e5;
      margin-top: 197px;
      background: #fafafa;
      .btn{
        display: inline-block;
        height: 34px;
        width: 21.3%;
        margin: 13px 11px;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
        text-align: center;
        line-height: 34px;
        font-size: 14px;
      }
      #confirm-btn {
        float: right;
        background: #f03d37;
        border: 1px solid #f03d37;
        color: #fff;
      }

    }

  }

}
</style>
