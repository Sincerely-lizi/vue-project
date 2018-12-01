<template>
<app-content :style="{top: '88px', bottom: '49px'}" @loadmore="loadMoreData" :canLoadMore="canLoadMore">
  <div class="coming">

    <div class="expected">
        <p>最受期待的电影：</p>
        <h-scroll class="expected-list">
            <li class="expected-item" v-for="item in expectedList" :key="item.id"> 
                <div class="image">
                  <img :src="item.img | replaceWH(85, 115)"/>
                  <p>{{item.wish}}人想看</p>
                  <div class="toggle-wish" data-wishst="0" data-movieid="577564">
                    <span></span>
                  </div>
                </div>
                <h5 class="name">{{item.nm}}</h5>
                <p class="title">{{item.comingTitle}}</p>
            </li>
        </h-scroll>
    </div>

    <div class="coming-list" v-for="(list,key) in comingMap" :key="key">
      <p class="group-date">
        {{key}}
      </p>
      <ul>
        <li class="main-item" v-for="item in list" :key="item.id">
          <div class="left-images">
              <img :src="item.img | replaceWH(85, 115)"/>
          </div>
                    <div class="center-info">
                       <div class="name">{{item.nm}} </div> 
                       <p class="wish">{{item.wish}}人想看</p>
                       <div class="star">主演：{{item.star}}</div>
                       <h6 class="rt">{{item.rt}}上映</h6>
                    </div> 
                    <div class="right-btn">
                        <a class="false-red" href="javascript:;" v-if="item.showst==1">想看</a>
                        <a class="true-blue" href="javascript:;" v-if="item.showst==4">预售</a>
                    </div> 
        </li>
      </ul>
    </div>
  </div>
</app-content>
</template>
<script>
import '../../utils/filter'
import { getComingList ,getMostExpectedData,getMoreComingList} from "../../services/movieService";
export default {
  data() {
    return {
      comingMap: {},
      comingList:[],
      expectedList:[],
      comingIDS: [],
      canLoadMore: true,
    };
  },

  methods: {
        //加载更多数据
        loadMoreData(){
            // console.log('执行加载更多');
            //取出ids
            let ids = [...this.comingIDS];
            ids = ids.splice(this.comingList.length, 10);
            //组装ids
            let movieIds = ids.join(',');
            // 发送请求
            this.canLoadMore = false;
            
            getMoreComingList(movieIds).then(({data,list})=>{
                this.comingMap = Object.assign(this.comingMap,data);
                this.comingList = [...this.comingList, ...list];
                //判断是否可以继续加载更多
                if(this.comingList.length >= this.comingIDS.length){
                    //加载完毕
                    this.canLoadMore = false;
                }else{
                    //还可以继续加载
                    this.canLoadMore = true;
                }
            })
        }
    },
  created() {
    getComingList().then(({data,list,ids}) => {
      this.comingMap = data;
      this.comingList = list;
      this.comingIDS = ids;
    });
    getMostExpectedData().then(result=>{
      this.expectedList = result;     
      
    })
  }
};
</script>
<style lang="scss" scoped>
.expected{
  border-bottom: 8px solid #f5f5f5;
  padding: 10px 15px;
    .expected-item{
        display: inline-block;
        width: 85px;
        overflow: hidden;
        padding: 10px;
        .image{
          width: 85px;
          height: 115px;
          position: relative;
          margin-bottom: 6px;
          img{
            width:100%;
            height: 100%;
          }
          p{
            position: absolute;
            bottom: 0;
            color: #faaf00;
            font-size: 11px;
            font-weight: 600;
          }
          .toggle-wish{
            width: 28px;
            height:28px;
            line-height: 28px;
            background: rgba(61,63,71,.6);
            text-align: center;
            border-bottom-right-radius: 10px;
            position: absolute;
            top: 0;
            left: 0;
            span{
              background-image: url(../../assets/like.png);
              display: inline-block;
              width: 10px;
              height: 10px;
              background-size: 100%;
              background-repeat: no-repeat;
            }
          }
        }
        .name{
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          margin: 0 0 3px;
          font-size: 13px;
          color: #222;
        }
        .title{
          margin: 0;
          font-size: 12px;
          color: #999;
        }
    }
}
.coming-list {
  border-bottom: 1px solid #f5f5f5;
  .group-date {
    line-height: 32px;
    padding: 12px 15px 0;
    margin: 0;
    font-size: 14px;
    color: #333;
  } 
  .main-item {
    padding: 15px;
    height: 114px;
    display: flex;
    align-items: center;
    color: #666;
    font-size: 13px;
    border-bottom: 1px solid #999;
      .left-images {
        // flex: 1;
        // width:17%;
        img{
          height: 90px;
        }
      }
      .center-info {
        padding: 12px 14px 12px 10px;
        width: 55.2%;
        height: 90px;
        max-height: 90px;
        .name{
          display: inline-block;
          padding-right: 5px;
          font-size: 17px;
          width: 142px;
          color: #333;
          font-weight: 700;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .version{
          font-size: 9px;
          background: #3c9fe6;
          color:#fff;
        }
        .score span{
          color:#faaf00;
        }
        .star {
          font-size: 13px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .right-btn {
        flex: 1;
        font-size: 12px;
        text-align: center;
        a {
          padding: 4px 10px;
          border-radius: 4px;
          color: #fff;
          &.false-red{
            background: #faaf00;
          }
          &.true-blue{
            background: #3c9fe6;
          }
        }
      }
  }
}

</style>