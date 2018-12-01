<template>
<div id="cityList">
    <app-content :style="{top: 0, bottom: 0}" ref="content">
    <!-- 定位 -->
    <section>
      <div id="locate" class="city-title">
        定位城市
      </div>
      <div class="city-list-inline">
        <div class="city-item location-city">定位失败，请点击重试</div>
      </div>
    </section>

    <!-- 最近 -->
    <section>
      <div id="history" class="city-title">
        最近访问城市
      </div>
      <div class="city-list city-list-inline">
        <div class="city-item" v-for="(item,index) in nearList" :key="index"
        @click="selectCityAction(item)">
          {{item.nm}}
        </div>
    </div>
    </section>

    <!-- 热门城市  -->
    <section>
      <div id="history" class="city-title">
        热门城市
      </div>
      <div class="city-list city-list-inline clearfix">
        <div class="city-item" v-for="(item,index) in hotList" 
        :key="index" @click="selectCityAction(item)">
          {{item.nm}}
        </div>
      </div>
    </section>


  <!-- 所有城市 -->
  <section>
    <div class="all-city" v-for="cityMap in data" :key="cityMap.key" ref="list">
            <div class="city-title">{{cityMap.key.toUpperCase()}}</div>
            <ul>
                <li class="city-item" v-for="item in cityMap.value" :key="item.id"
                    @click="selectCityAction(item)">
                    {{item.nm}}
                </li>
            </ul>
        </div>

  </section>
</app-content>
  <!-- 右边固定 -->
    <div class="nav">
      <div class="nav-item" v-for="(item) in navList" :key="item">
        {{item}}
      </div>
      <div class="nav-item" v-for="(item, index) in keys" :key="item" @click="btnAction(index)">
        {{item.toUpperCase()}}
      </div>
    </div>
</div>
</template>

<script>
import {getCityListData} from '../../services/appService'
import {mapActions} from 'vuex'
export default {
  data(){
    return{
      navList:['定位','最近','热门'],
      hotList:[],
      nearList:[],
      data: [],
      keys: []
    }
  },
  methods: {
        ...mapActions(['selectCity']),
        btnAction(index){
            //跳转到指定的字母的城市列表中
            //计算需要滚动的高度
            let height = 0;
            for(let i = 0; i < index; i++){
                height += this.$refs.list[i].offsetHeight;
            }     
            //让滚动视图滚动
            this.$refs.content.scrollTo(height);
        },
        selectCityAction(item){
            //将选中的城市保存，保存到全局数据中
            this.selectCity({
                city: item.nm,
                id: item.id
            })

            // 返回上一页
            this.$router.back();
        }
    },
    created(){
        // 去本地存储数据，如果没有就请求，如果有就直接使用
        getCityListData().then(({data, keys,list})=>{
            // 本地存储数据，以便下次使用
            this.data = data;
            this.keys = keys;
            this.hotList = list;  //热门城市
            // console.log(list)
        })
        // 从本地获取最近城市
        this.nearList = JSON.parse(localStorage.getItem('list'));
        // console.log(this.nearList)
    }
}
</script>

<style lang="scss" scoped>
#cityList{
    position: fixed;
    width: 100%;
    height:100%;
    z-index: 5;
    background: #ebebeb;
    padding-right: 20px;
    font-size: 14px;
    .city-title {
      padding-left: 15px;
      line-height: 30px;
      padding-right: 30px;
    }
    .clearfix:after {
      content: " ";
      display: table;
      clear: both;
    }
    .city-list-inline {
      background-color: #f5f5f5;
      padding-bottom: 8px;
      padding-top: 15px;
      // height:200px;
      margin-right: 8%;
      // display: flex;
      .city-item{
        display: inline-block;
        // padding: 0 10px;
        background: #fff;
        width: 27%;
        height: 33px;
        margin-top: 15px;
        margin-left: 4%;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        line-height: 33px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .nav {
      position: fixed;
      top: 75px;
      right: 0;
      width: 35px;
      z-index: 10;
      text-align: center;
      font-size: 12px;
    }
    .all-city{
      margin-right: 8%;
      .city-item{
        background-color: #f5f5f5;
        height: 44px;
        padding-left: 15px;
        line-height: 44px;
        border-bottom: 1px solid #c8c7cc;
      }
    }
}
</style>
