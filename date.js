class dateFn {
  constructor(){
    return '自定义的时间格式处理方法'
  }
  //获取当前时间毫秒数
  getCurrentMstime() {
    var myDate = new Date()
    return myDate.getTime()
  }
  //转换日期格式yyyy-mm-dd HH:mm:ss
  DateTimeConverToDateTime( time){
    return this.formatterDateTime(time)
  }
  //时间转毫秒数 
  dateToLongMsTime(date){
    return date.getTime()
  }
  //格式化日期 yy-mm-dd
  formatterDate(date){
    const dateTime = new Date(date)
    const result = dateTime.getFullYear()+'-'
          +((dateTime.getMonth()+1)>=10 ? (dateTime.getMonth()+1):"0"+(dateTime.getMonth()+1))+'-'
          +(dateTime.getDate() <10 ? "0"+dateTime.getDate():dateTime.getDate());
          
          return result
  }
  /**
     * @描述：格式化日期（含时间"00:00:00"）
     * @创建人：millery
     * @创建时间：2015年12月23日
     */
    formatterDate2( date ) {
    	var datetime = new Date(date);
        var result = datetime.getFullYear()
                + "-"// "年"
                + ((datetime.getMonth() + 1) >= 10 ? (datetime.getMonth() + 1) : "0"
                        + (datetime.getMonth() + 1))
                + "-"// "月"
                + (datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime
                        .getDate()) + " " + "00:00:00";
        return result;
    }
    /**
     * @描述：格式化去日期（含时间）
     */
    formatterDateTime(date) {
    	var datetime = new Date(date);
        var result = datetime.getFullYear()
                + "-"// "年"
                + ((datetime.getMonth() + 1) >= 10 ? (datetime.getMonth() + 1) : "0"
                        + (datetime.getMonth() + 1))
                + "-"// "月"
                + (datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime
                        .getDate())
                + " "
                + (datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime
                        .getHours())
                + ":"
                + (datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime
                        .getMinutes())
                + ":"
                + (datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime
                        .getSeconds());
        return result;
    }
    /**
     * @描述：时间比较（结束时间大于开始时间）
     */
    compareDateTime (startTime, endTime) {
        return ((new Date(endTime.replace(/-/g, "/"))) > (new Date(
                startTime.replace(/-/g, "/"))));
    }
   
    /**
     * @描述：验证开始时间合理性（开始时间不能小于当前时间X个月）

     */
    compareRightStartTime(month, startTime) {
        var now = formatterDayAndTime(new Date());
        var sms = new Date(startTime.replace(/-/g, "/"));
        var ems = new Date(now.replace(/-/g, "/"));
        var tDayms = month * 30 * 24 * 60 * 60 * 1000;
        var dvalue = ems - sms;
        if (dvalue > tDayms) {
            return false;
        }
        return true;
    }
    
    /**
     * @描述：验证开始时间合理性（结束时间不能小于当前时间（X）个月）
     */
    compareRightEndTime (month, endTime) {
        var now = formatterDayAndTime(new Date());
        var sms = new Date(now.replace(/-/g, "/"));
        var ems = new Date(endTime.replace(/-/g, "/"));
        var tDayms = month * 30 * 24 * 60 * 60 * 1000;
        var dvalue = sms - ems;
        if (dvalue > tDayms) {
            return false;
        }
        return true;
    }
    
    /**
     * @描述：验证开始时间合理性（结束时间与开始时间的间隔不能大于（X）个月）
     */
    compareEndTimeGTStartTime(month, startTime, endTime) {
        var sms = new Date(startTime.replace(/-/g, "/"));
        var ems = new Date(endTime.replace(/-/g, "/"));
        var tDayms = month * 30 * 24 * 60 * 60 * 1000;
        var dvalue = ems - sms;
        if (dvalue > tDayms) {
            return false;
        }
        return true;
    }
    
    /**
     * @描述：获取最近几天（开始时间和结束时间值,时间往前推算）

     */
    getRecentDaysDateTime (day) {
        var daymsTime = day * 24 * 60 * 60 * 1000;
        var yesterDatsmsTime = this.getCurrentMsTime() - daymsTime;
        var startTime = this.longMsTimeConvertToDateTime(yesterDatsmsTime);
        var pastDate = this.formatterDate2(new Date(startTime));
        var nowDate = this.formatterDate2(new Date());
        var obj = {
            startTime : pastDate,
            endTime : nowDate
        };
        return obj;
    }
    
    /**
     * @描述：获取今天（开始时间和结束时间值）
     */
    getTodayDateTime () {
        var daymsTime = 24 * 60 * 60 * 1000;
        var tomorrowDatsmsTime = this.getCurrentMsTime() + daymsTime;
        var currentTime = this.longMsTimeConvertToDateTime(this.getCurrentMsTime());
        var termorrowTime = this.longMsTimeConvertToDateTime(tomorrowDatsmsTime);
        var nowDate = this.formatterDate2(new Date(currentTime));
        var tomorrowDate = this.formatterDate2(new Date(termorrowTime));
        var obj = {
            startTime : nowDate,
            endTime : tomorrowDate
        };
        return obj;
    }
    
    /**
     * @描述：获取明天（开始时间和结束时间值）
     */
    getTomorrowDateTime () {
        var daymsTime = 24 * 60 * 60 * 1000;
        var tomorrowDatsmsTime = this.getCurrentMsTime() + daymsTime;
        var termorrowTime = this.longMsTimeConvertToDateTime(tomorrowDatsmsTime);
        var theDayAfterTomorrowDatsmsTime = this.getCurrentMsTime()+ (2 * daymsTime);
        var theDayAfterTomorrowTime = this.longMsTimeConvertToDateTime(theDayAfterTomorrowDatsmsTime);
        var pastDate = this.formatterDate2(new Date(termorrowTime));
        var nowDate = this.formatterDate2(new Date(theDayAfterTomorrowTime));
        var obj = {
            startTime : pastDate,
            endTime : nowDate
        };
        return obj;
    }

}
const date = new dateFn()
export default date