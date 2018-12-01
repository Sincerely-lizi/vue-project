<template>
  <div id="detail2">
    <app-content :style="{top: '0px', bottom: '0px'}">
    <app-header :title="title">
      <div slot="left" @click="backTo()">
            <span class="iconfont icon-zuo"></span>
        </div>
    </app-header>

    <!-- 电影详情 -->
    <div class="movie-detail" :style="{backgroundImage:' url('+movieDetailList.img+')'}">
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
    </div>
    </app-content>
  </div>
</template>


<script>
import {getMovieDetailList,getMovieDateList} from '../../services/detailService'
export default {
  props:{
    id:Number
  },
  data(){
    return {
      movieDetailList:{},
      movieId:this.$route.params.id,
      title:'猫眼电影',
    }
  },
  methods:{
    backTo(){
      this.$router.back();
    },
  },
  created(){
    console.log(this.movieId)
    getMovieDetailList(this.movieId).then((result)=>{
      this.movieDetailList = result;
      // console.log(this.movieDetailList)
      this.title = result.nm;
    });
  },
}
</script>


<style lang="scss" scoped>
#detail2{
  width: 100%;
  height: 100%;
  position: fixed;
  background: #fff;
  z-index: 2;
  // 电影详情
  .movie-filter{
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
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

  
}
</style>
