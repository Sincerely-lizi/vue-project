import http from '../utils/http'
import API from '../api'

export function getCinema(offset,hallType,brandId,serviceId,areaId,stationId,cityID){
  return new Promise((resolve,reject)=>{
    http({
      url:API.CINEMA_API,
      method:'GET',
      data:{
        day:'2018-11-21',
        offset,  limit:20,
        districtId:-1,
        lineId:-1,
        hallType,
        brandId,
        serviceId,
        areaId,
        stationId,
        item:'',
        updateShowDay:true,
        reqId:'',
        cityId:cityID,
      }
    }).then(({status,data})=>{
      if(status!=200){
        // 请求失败
        return;
      }
      resolve({data:data.cinemas,id:data.resId});
    })
    
  }).catch(error=>{
    //请求失败
  })
}


// 影院详情
export function getCinemaDetail(id){
  return new Promise((resolve,reject)=>{
    http({
      url:API.CINEMA_DETAIL_API,
      method:'GET',
      data:{
        cinemaId:id
      }
    }).then(({status,data})=>{
      if(status!=200){
        // 请求失败
        return;
      }
      let cinemaData = data.cinemaData;
      let moviesData = data.showData.movies;
      moviesData.map(item=>{
        item.img = item.img.replace(/w.h/,'148.208')
        return moviesData;
      })
      resolve({cinemaData,moviesData});
    })
    
  }).catch(error=>{
    //请求失败
  })
}