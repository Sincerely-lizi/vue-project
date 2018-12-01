import API from '../api'
import http from '../utils/http'

// 获取电影详情列表
export function getMovieDetailList(id){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MOVIE_DETAIL_API,
            method: 'GET',
            data:{
              movieId:id
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
            }
            let newData = data.detailMovie;
            for(var item in newData){
                newData.img = newData.img.replace(/w.h/,'148.208');
            }
            resolve(newData);
        })
        .catch(error=>{
            //请求失败
        })
    })
}


// 获取电影日期列表  对应影院
export function getMovieDateList(movieId,hallType,
    brandId,serviceId,areaId,stationId,cityID,resId){
  return new Promise((resolve, reject)=>{
      http({
          url: API.MOVIE_API + '?'+'forceUpdate'+'='+ resId,
          method: 'POST',
          data:{
            movieId:movieId,
            day:'2018-11-23',
            offset:0,  
            limit:20,
            districtId:-1,
            lineId:-1,  
            hallType,
            brandId,
            serviceId,
            areaId,
            stationId,
            item:'',
            updateShowDay:true,
            resId:resId,
            cityId:cityID,
          }
      })
      .then(({data, status})=>{
          if(status != 200){
              //请求失败
          }
        //   let newData = data.showDays.dates;
        let newData = {cinemas:data.cinemas,showDays:data.showDays};
        newData.showDays.dates.map(item=>{
            item.date = item.date
        })  
        
        
        resolve(newData);
          
      })
      .catch(error=>{
          //请求失败
      })
  })
}