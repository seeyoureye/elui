//日期格式
export const Format = function(date,fmt) { //
    let o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};
// 回到顶部 不知道为什么 scrollTop = 0 没反应 真奇怪 那写一个定时器吧,小于等于 0 停止
export const goTop = function(time){
    // 应该说间隔 不该用 速度 不过无所谓了,估计用不了几次
    let timer = setInterval(
        ()=>{
        let top = document.documentElement.scrollTop;
        let speed = -25;
        document.documentElement.scrollTop = top + speed;
        if(top<= 0 ){
            document.documentElement.scrollTop = 0;
            clearInterval(timer);
        }
    },time)
}
