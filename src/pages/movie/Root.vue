<template>
<div>
    <div class="page" id="movie">
        <app-header title="猫眼电影"></app-header>

        <header class="sub-header">
            <router-link to="/movie/city" class="city-icon">
                {{city}}
            </router-link>
            <nav class="nav">
                <li v-for="(navItem, index) in navList" :key="index"
                    :class="{active: navIndex==index}" @click="navAction(index)">
                    {{navItem}}
                </li>
            </nav>
            <router-link to="/movie/search" class="search-icon">
                <img src="../../assets/search.png"/>
            </router-link>
        </header>
        
        <keep-alive>
            <playing v-if="navIndex==0"/>
            <coming v-if="navIndex==1"/>
        </keep-alive>
        
    </div>
    <router-view></router-view>
</div>
</template>

<script>
import Playing from '../../components/movie/Playing'
import Coming from '../../components/movie/Coming'
import {mapState} from 'vuex'
export default {
    components: {
        'playing': Playing,
        'coming': Coming,
    },
    data(){
        return {
            navList: ['正在热映', '即将上映'],
            navIndex: 0,
        }
    },
    computed: {
        ...mapState(['city'])
    },
    methods: {
        navAction(index){
            this.navIndex = index;
        }
    },
}
</script>

<style lang="scss" scoped>
.sub-header{
    width: 100%;
    height: 44px;
    border-bottom: 1px solid #666;
    position: absolute;
    left: 0;
    top: 44px;
    color: #666;
    font-size: 14px;
    display: flex;
    .city-icon{
        flex: 1;
        text-align: center;
        line-height: 44px;
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
    .nav{
        width: 60%;
        display: flex;
        li{
            flex: 1;
            text-align: center;
            line-height: 44px;
            font-weight: bold;
            &.active{
                color: #f03d37;
                border-bottom: 2px solid #f03d37;
            }
        }
    }
    .search-icon{
        flex: 1;
        img{
            width: 24px;
            margin: 10px auto;
        }
    }
}


</style>
