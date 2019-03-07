// 金额转换为两位小数
export const moneyToFixed2=(rmb)=>{
    rmb = rmb + "";
    var numLength = rmb.length;
    if (numLength > 3) {
        var rmb1 = rmb.substring(0, numLength - 2);
        var rmb2 = rmb.substring(numLength - 2);
        return rmb1 + "." + rmb2
    } else if (numLength == 3) {
        var rmb1 = rmb.substring(0, 1);
        var rmb2 = rmb.substring(1);
        return rmb1 + "." + rmb2
    } else if (numLength == 2) {
        return "0." + rmb;
    } else if (numLength == 1) {
        return "0.0" + rmb;
    }
}