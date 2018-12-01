import API from '../api'
import http from '../utils/http'

// 城市列表
export function getCityListData(){
    return new Promise((resolve, reject)=>{
        http({
            url: API.CITY_LIST_API,
            method: 'GET'
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
            }else{
                //请求成功
                let newData2 = [];
                let hotList = ['上海','北京','广州','深圳','武汉','天津',
                '西安','南京','杭州','成都','重庆'];
                data.cts.map(item=>{
                    hotList.map(item2=>{
                        if(item.nm==item2){
                            newData2.push(item);
                        }
                    })
                })
                // console.log(newData2)
                // 取得首字母，按字母先分类
                let map = {};
                data.cts.map(item=>{
                    // 获取每个首字母
                    let letter = item.py[0];
                    if(!map[letter]){
                        map[letter] = [];
                    }
                    map[letter].push(item);
                })
                //获取map的所有key值（首字母）
                let keys = Object.keys(map);
                //将每个首字母排序b>a
                // 选择排序
                for(let i = 0; i < keys.length; i++){
                    for(let j = i+1; j < keys.length; j++){
                        if(keys[i] > keys[j]){
                            let tmp = keys[i];
                            keys[i] = keys[j];
                            keys[j] = tmp;
                        }
                    }
                }
                //组装数据
                let newData = keys.map(item=>{
                    return {
                        key: item, 
                        value: map[item]
                    }
                })
                resolve({
                    keys: keys,
                    data: newData,
                    list: newData2
                });
            }
        })
        .catch(error=>{
            //请求失败
        })
    })
}


// 搜索
export function getSearchCinema({kw,cityID,stype}){
    return new Promise((resolve,reject)=>{
        http({
            url:API.SEARCH_CINEMA_API,
            method:'GET',
            data:{
                kw,
                cityId:cityID,
                stype,
            }
        }).then(({data, status})=>{
            if(status != 200){
                //请求失败
            }
            if(stype == 2){
                //影院
                var newData2 = data.cinemas;
                resolve(newData2);
            }else if(stype == -1){
                // 电影
                var newData = data.movies;
                var newData2 = data.cinemas;
                newData.list.map(item=>{
                    item.img = item.img.replace(/w.h/,'128.180');
                    item.pubDesc = item.pubDesc.slice(0,10);
                    if(item.sc ==0){
                        item.sc = '暂无评分'
                    }
                    return newData;
                })
                resolve({newData,newData2});
            }
        })
        .catch(error=>{
            //请求失败
        })
    })
}


//全城   品牌  特色
export function getFilterCinema(cityId){
    return new Promise((resolve,reject)=>{
        http({
            url:API.FILTER_CINEMA_API,
            method:'GET',
            data:{
                ci:cityId,
            }
        }).then(({data,status})=>{
            if(status!=200){
                //请求失败
            }
            let district = data.district.subItems;
            let subway= data.subway.subItems;
            let brand= data.brand.subItems;
            let service = data.service.subItems;
            let hallType = data.hallType.subItems;

            let mapDistrict = {},mapSubway={};
            district.map((item,index)=>{
                if(index != 0 ){
                     mapDistrict[index] = item.subItems;
                }
            })
            subway.map((item,index)=>{
                if(index != 0 ){
                     mapSubway[index] = item.subItems;
                }
            })
            // console.log(mapDistrict)
            resolve({district,mapDistrict,subway,mapSubway,brand,service,hallType})
        }).catch(error=>{
            //请求失败
        })
    })
}