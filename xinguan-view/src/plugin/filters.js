import Vue from 'vue';

/*
注意点: 在使用过滤器的时候, 可以在过滤器名称后面加上()
        如果给过滤器的名称后面加上了(), 那么就可以给过滤器的函数传递参数
使用:   <p>{{time | dateFormart}}</p> // 年月日时分秒
使用:   <p>{{time | dateFormart("yyyy-MM-dd")}}</p> // 年月日
使用:   <p>{{time | dateFormart("HH-mm-ss")}}</p> // 时分秒
* */
Vue.filter('dateFormart', function(value, fmStr) {
  // console.log(fmStr);
  const date = new Date(value);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 + '';
  const day = date.getDate() + '';
  const hour = date.getHours() + '';
  const minute = date.getMinutes() + '';
  const second = date.getSeconds() + '';
  if (fmStr && fmStr === 'yyyy-MM-dd') {
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  } else if (fmStr && fmStr === 'HH-mm-ss') {
    return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}`;
  }
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}`;
});
