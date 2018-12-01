<template>
<app-content :style="{top: '88px', bottom: '49px'}" @loadmore="loadMoreData" :canLoadMore="canLoadMore">
  <div class="playing">
            <ul>
                <li class="movie-item" v-for="item in playingList" :key="item.id" @click.stop="setMovieId(item.id)">    
                    <div class="left-images">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="center-info">
                       <div class="name">{{item.nm}} </div> 
                       <span class="version">{{item.version}}</span>
                       <h5 class="score">观众评:<span>{{item.sc}}</span></h5>
                       <div class="star">主演：{{item.star}}</div>
                       <h6 class="info">{{item.showInfo}}</h6>

                    </div> 
                    <div class="right-btn">
                        <a class="false-red" href="javascript:;" v-if="item.globalReleased==true">购票</a>
                        <a class="true-blue" href="javascript:;" v-if="item.globalReleased==false">预售</a>
                    </div>                  
                </li>
            </ul>
  </div>
</app-content>
</template>
<script>
import { getPlayingList,getMorePlayingList } from "../../services/movieService";
export default {
  data() {
    return {
      playingList: [],
      playingIDS: [],
      canLoadMore: true,
      version:['预售','购票']
    };
  },

  methods: {
    //点击到详情页
    setMovieId(id){
      this.$router.push(`/movie/detail/${id}`);
      // this.$center.$emit('sendMovieId',id);
    },
        //加载更多数据
        loadMoreData(){
            console.log('执行加载更多');
            //取出ids
            let ids = [...this.playingIDS];
            ids = ids.splice(this.playingList.length, 10);
            //组装ids
            let movieIds = ids.join(',');
            // 发送请求
            this.canLoadMore = false;
            getMorePlayingList(movieIds).then(result=>{
                this.playingList = [...this.playingList, ...result];
                //判断是否可以继续加载更多
                if(this.playingList.length >= this.playingIDS.length){
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
    //初始化请求数据
        getPlayingList().then(({data, ids})=>{
            this.playingList = data;
            this.playingIDS = ids;
        })
  }
};
</script>
<style lang="scss" scoped>
.movie-item {
  height: 114px;
  padding-left: 15px;
  padding-right: 18px;
  display: flex;
  align-items: center;
  color: #666;
  font-size: 13px;
  border-bottom: 1px solid #999;
  .left-images {
    // flex: 1;
    // width: 17%;
    img{
      // width: 100%;
      height:90px;
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
        background: #f03d37;
      }
      &.true-blue{
        background: #3c9fe6;
      }
    }

  }
}
</style>


