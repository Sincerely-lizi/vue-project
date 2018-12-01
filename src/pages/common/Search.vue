<template>
<div id="search" class="page">
    <!-- 标题 -->
    <app-header title="猫眼电影">
        <div slot="left" @click="backTo()">
            <span class="iconfont icon-zuo"></span>
        </div>
    </app-header>
        <!-- 搜索栏 -->
        <div class="search-header">
            <div class="search">
                <img src="../../assets/search1.png"/>
                <input type="text" class="search-input" 
                :placeholder="input" v-model="inpValue">
                <img class="cancel-img" v-if="inpValue!=''"  
                src="../../assets/cancel.png" @click="cancelValue()"/>
            </div>
            <div class="cancel" @click="cancelValue()">取消</div>
        </div>


        <div v-if="inpValue==''" class="hot-search">
            <h3>热门搜索</h3>
            <div class="hot-movies-wrap">
            </div>
        </div> 


    <!-- 页面内容 -->
    <div class="page">
        <app-content :style="{top:'108px', bottom: 0}">
        
        <!-- 电影和影院 -->
        <ul v-if="inpValue!=''&&stype== -1" class="search-list">
            <h3>电影/电视剧/综艺</h3>
            <li class="search-item" v-for="(item) in movieList.list" :key="item.id">
               <!-- cat   pubDesc nm enm  img  sc -->
               <div class="left-images">
                    <img :src="item.img"/>
                </div>
                <div class="center-info">
                    <div class="name-score one-line">
                        <span class="name one-line">{{item.nm}} </span>
                        <span class="score">{{item.sc}}</span>
                    </div> 
                    <p class="ename one-line">{{item.enm}}</p>
                    <h5 class="cat">{{item.cat}}</h5>
                    <div class="time">{{item.pubDesc}}</div>
                </div>
            </li>
            <div class="more-result">查看全部{{movieList.total}}部影视剧</div>
        </ul>


        <!-- 影院 -->
        <ul class="search-list" v-if="inpValue!=''">
            <h3>影院</h3>
            <li class="search-item" v-for="(item,index) in cinemaList.list" 
            :key="item.id" v-if="index < 3 ||flag">
               <div class="title">
                    <span class="name one-line">{{item.nm}}</span>
                    <span class="price">{{item.sellPrice}}
                    <span class="q">元起</span>
                    </span>
                </div>
                <div class="addr">{{item.addr}}</div>
                <div class="tag">
                    <span class="refund" v-if="item.allowRefund == 1">退</span>
                    <span class="refund" v-if="item.endorse == 1">改签</span>
                    <span class="snack" v-if="item.snack == 1">小吃</span>
                    <span class="vip" v-if="item.vipTag == 1">{{item.vipTag}}</span>
                    <span class="type" v-for="(item,index) in item.hallType" :key="index">
                    {{item}}
                    </span>
                </div>
            </li>
            <div class="more-result" @click="showMore()">
            查看全部{{cinemaList.total}}家电影院</div>
        </ul>

        
        </app-content>
    </div>
    
</div>
</template>

<script>
import {getSearchCinema} from '../../services/appService'
import {mapState} from 'vuex'

export default {
    props: {
        type: Array,
    },
    data(){
        return {
            input:'搜影院',
            inpValue:'',
            cinemaList:[],
            movieList:[],
            // stype:[2,-1],
            stype:0,
            flag:false
        }
    },
    computed: {
        ...mapState(['cityID'])
    },
    methods:{
        backTo(){
            this.$router.back();
        },
        // 清空输入框
        cancelValue(){
            this.inpValue =''
        },
        // 点击查看更多
        showMore(){
            this.flag = true;
        }
    },
    created(){
        if(this.type.length == 1){
            this.input = '搜影院';
            this.stype=2;
                    
        }else if(this.type.length == 2){
            this.input = '搜影院，搜电影';
            this.stype = -1;
        }

            this.$watch('inpValue',(inp1,inp2)=>{
                let kw = inp1;
                let cityID = this.cityID;
                let stype = this.stype;
                // console.log(kw,cityID,this.stype)
                getSearchCinema({kw,cityID,stype}).then(result=>{
                    // console.log(result);
                    if(this.stype==2){
                        this.cinemaList = result;
                    }else if(this.stype == -1){
                        this.cinemaList = result.newData2;
                        this.movieList = result.newData;
                    }
                })
            })
        
    }
}
</script>

<style lang="scss" scoped>
#search{
    position: fixed;
    width: 100%;
    height:100%;
    z-index: 5;
    background: #f5f5f5;
    .one-line{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .header-btn-left a{
        color: #fff;
    }
    h3{
        font-size: 15px;
        color: #999;
        padding: 9px 15px;
        background: #fff;

    }
    .search-header{
        position: absolute;
        top: 44px;
        height: 47px;
        display: flex;
        width: 100%;
        align-items: center;
        padding: 8px 8px 8px 10px;
        background-color: #f5f5f5;
        border-bottom: 1px solid #e5e5e5;
        z-index: 1;
            .search{
                width: 75%;
                display: flex;
                flex:1;
                position: relative;
                border: 1px solid #e6e6e6;
                border-radius: 5px;
                background-color: #fff;
            }
            .search-input{
                border:none;
                outline: none;
                padding: 0 10px;
                color: #333;
                line-height: 36px;
            }
            img{
                height: 15px;
                margin: 10px;
            }
            .cancel-img{
                position: absolute;
                right:0;
            }
            .cancel{
                height: 30px;
                line-height: 30px;
                padding: 0 15px;
                font-size: 16px;
                color: #f03d37;
            }     
    }
    .hot-search {
        padding: 0 0 8px 15px;
        background-color: #fff;
        position: absolute;
        top: 108px;
        width: 100%;
            h3 {
                border-top: 1px solid #e5e5e5;
                padding-top: 17px;
                font-size: 15px;
                color: #666;
            }
    }
     .page{
            .search-list{
                .more-result {
                    color: #ef4238;
                    text-align: center;
                    line-height: 44px;
                    height: 44px;
                    font-size: 15px;
                    background: #fff;
                    border-top: 1px solid #f5f5f5;
                }
                .search-item{
                    padding:15px;
                    background-color: #fff;
                    position: relative;
                    overflow: hidden;
                    border-top: 1px solid #e6e6e6;
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
                                color: #333;
                            }
                        }
                
                    }
                    .addr{
                        margin-top: 6px;
                        font-size: 13px;
                        color: #999;
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
                    .left-images{
                        float: left;
                        img{
                        // width: 100%;
                        height:90px;
                        width: 64px;
                        }
                    }
                    .center-info {
                        float: left;
                        padding: 0px 14px 12px 10px;
                        width: 74%;
                        height: 90px;
                        max-height: 90px;
                        .name-score{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            .name{
                                display: inline-block;
                                font-weight: 700;
                                font-size: 17px;
                                    width: 205px;
                            }
                            .score{
                                font-size: 14px;
                                color: #666;
                                flex-shrink: 0;
                            }
                        }
                        .ename,.cat,.time{
                            width: 215px;
                            font-size: 13px;
                            color: #666;
                            margin-top: 2px;
                        }
                    }
                }
            }
    }       
        
}
    


</style>
