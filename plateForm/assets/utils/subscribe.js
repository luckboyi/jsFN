//传递信息给c端
export const OnEventProc = (json) => {
  var json = JSON.stringify(json);
  console.log(json)
  try {
    window.external.OnEventProc(json)
  } catch (e) {
    alert('非客户端环境')
  }
}

export const PlatformNotify=(text)=>{
  	var data = JSON.parse(text);
  	connect_C.FromC(data);
}


// //c端传输信息过来
// const PlatformNotify = (text) => {
//   console.log(text)
//   var data = JSON.parse(text);
//   connect_C.FromC(data);
// }

// //与C交互的方法
// var connect_C = {
//   ToC: function (json) { //通知给C
//     OnEventProc(json);
//   },
//   FromC: function (res) { //收到C的数据
//     switch (res.Type) {
//       //初始加载基本配置
//       case 0:
//         DeskHandle.setBaseConfig(res);
//         break;
//       default:
//         break;
//     }
//   }
// }
