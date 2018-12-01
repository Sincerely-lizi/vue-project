<template>
<div>
<div class="page" id="cinema">
    <app-header title="影院"></app-header>
    <!-- 搜索 -->
    <header class="sub-one-header">
        <router-link class="city-icon" to="/cinema/city">
            {{city}}
        </router-link>
        <!-- 触发搜索界面 -->
        <router-link to="/cinema/search" class="search">
            <input class="search-inp" type="text">
            <div class="search-icon">
                <img src="../../assets/search1.png" alt="">
                <span>搜影院</span>
            </div>
        </router-link>
        
    </header>
    <!-- 分类 -->
    <header class="sub-two-header">
        <li v-for="(item,index) in classList" :key="item"  @click="downPull(index)">
            
            <span :class="{chosen:index==num}">{{item}}</span>
        </li>
    </header>
    


    <!-- 影院列表 -->
    <cinema/>
<!-- 引入每个下拉菜单 -->
    <Down :index='num' @getFilterId="getFilterId"/>
    <!-- 引入搜索界面的路由 -->
    <router-view></router-view>


</div>
<div class="backer" v-if="num!=-1" @click="clear"></div>
</div>
</template>

<script>
import Cinema from '../../components/cinema/Cinema'
import Down from '../../components/down/Down'
import {mapState} from 'vuex'
export default {
    components: {
        'Cinema': Cinema,
        'Down': Down
    },
    data(){
        return {
            classList:['全城','品牌','特色'],
            num:-1
        }
    },
    computed: {
        ...mapState(['city'])
    },
    methods:{
        downPull(index){
            this.num = index;
            console.log(this.num);
        },
        clear(){
            this.num = -1;
        },
        getFilterId(id){
            this.num = -1;
        }

    }
}
</script>

<style lang="scss" scoped>
.backer{
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,.3);
}
.sub-one-header{
    height: 44px;
    background: #f5f5f5;
    display: flex;
    position: absolute;
    left: 0;
    top: 44px;
    width: 100%;
    align-items: center;
    z-index: 2;
    .city-icon{
        // flex: 1;
        text-align: center;
        line-height: 44px;
        margin-left: 12px;
        margin-right: 12px;
        &::after{
            content: '';
            display: inline-block;
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-top: 3px solid #666;
            transform: translateY(4px);
        }
    }
    .search{
        width: 74%;
        height: 29px;
        display: flex;
        align-items: center;
        border: .5px solid #e6e6e6;
        
        .search-inp{
          width:100%; 
          line-height: 29px;
          background: #fff;
          position: relative;
          border: none;border-radius: 5px;
          outline: none;
        }
        img {
            width: 14px;
            height: 14px;
            margin-left: 3px;
            margin-right: 4px;
            margin-top: 2px;
        }
        span{
            font-size: 13px;
            color: #b2b2b2;
        }
        .search-icon{
            position: absolute;
            display: flex;
            left:40%;
            // display: inline-block;
        }
    }
}
.sub-two-header{
    height: 40px;
    background: #fff;
    display: flex;
    position: absolute;
    left: 0;
    top: 88px;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    z-index: 2;
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
.close-tab{
    position:absolute;
    top: 130px;
    left: 0;
    width: 100%;
    z-index: 2;
}
</style>

