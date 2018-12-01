// 封装所有接口为一个对象输出



const SAT_HOST = 'http://localhost:8080';  //开发
const UAT_HOST = 'http://10.225.225.225:8080'; //测试
const PRO_HOST = 'https://m.maoyan.com';  //生产

//正在热映的电影  参数 token（用户标识）
const PLAYING_API = '/ajax/movieOnInfoList';

/*
更多正在热映数据的接口
参数：
    token 用户标识
    movieIds  请求的电影id
*/
const MORE_PLAYING_API = '/ajax/moreComingList';

//即将上映的接口 
/*
  参数： ci 城市id
        token  用户标识
        limit  数据长度
 */
const COMING_API = '/ajax/comingList';


/*
最受期待的电影数据接口
参数：ci 城市id
     limit   数据长度
     offset   数据偏移量
     token  用户标识
*/
const MOST_EXPECTED_API = '/ajax/mostExpected';

/*
更多即将上映数据的接口
参数：   
    ci  城市id, token 用户标识, limit 数据长度, movieIds  请求的电影id
*/
const MORE_COMING_API = '/ajax/moreComingList';

/*影院列表数据
day=2018-11-15
offset=0  limit=20
districtId=-1
lineId=-1
hallType=-1
brandId=-1
serviceId=-1
areaId=-1
stationId=-1
item=''
updateShowDay=true
reqId=1542268893425
cityId=110

*/ 
const CINEMA_API = '/ajax/cinemaList';

/*城市列表接口*/
const CITY_LIST_API = '/dianying/cities.json';

/*影院 
kw= 输入内容
cityId=57
stype=2
*/
const SEARCH_CINEMA_API = '/ajax/search'


/*
全城 品牌 特色 的数据
影院页面：ci
电影详情页：movieId 电影id   
            day  选择的日期
*/ 
const FILTER_CINEMA_API = '/ajax/filterCinemas'

/*
电影详情 对应的影院信息，日期列表
forceUpdate
movieId: 电影id
day: 日期
offset: 0
limit: 请求条数
districtId: -1
lineId: -1
hallType: -1
brandId: -1
serviceId: -1
areaId: -1
stationId: -1
item: 
updateShowDay: true
reqId: 1542444878396
cityId: 城市id
*/
const MOVIE_API = '/ajax/movie'

/*
电影详情信息
movieId  电影信息
*/
const MOVIE_DETAIL_API = '/ajax/detailmovie'


/*
/ajax/cinemaDetail
cinemaId=25643
*/
const CINEMA_DETAIL_API = '/ajax/cinemaDetail'


// 输出一个对象（接口对象）
export default{
  SAT_HOST,
  UAT_HOST,
  PRO_HOST,
  PLAYING_API,
  MOST_EXPECTED_API,
  MORE_PLAYING_API,
  COMING_API,
  MORE_COMING_API,
  CINEMA_API,
  CITY_LIST_API,
  SEARCH_CINEMA_API,
  FILTER_CINEMA_API,
  MOVIE_API,
  MOVIE_DETAIL_API,
  CINEMA_DETAIL_API
}