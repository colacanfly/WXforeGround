
var i =0;
var bgColor;
var t;
Page({
  /*** 页面的初始数据*/
  data:{
    result : '',
    scores: [],
    n : '',
    index : '',
    index_color : '',
  },
  onLoad: function () {
    console.log('我是父元素')
     wx.request({
       url: 'http://127.0.0.1:8000/connect',
       header:{
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
       method: 'GET',
       success: res => {
         if (res.statusCode == 200) {
           console.log(res.data)
           this.setData({
             n: res.data.n,
             scores:res.data.scores
           })
         }
      }
     })
  },
  changeColor: function(e) {
    // this.index = e.currentTarget.id;
    // console.log(e.currentTarget.id)
    t = parseInt(e.currentTarget.id);
    console.log(this.data.scores[t])
    var temp = this.data.scores[t]
    if (temp == 'green') {
      bgColor = 'red';
    }else if(temp == 'red'){
      bgColor = 'yellow';
    }else if(temp == 'yellow'){
      bgColor = 'green';
    }
    console.log(parseInt(e.currentTarget.id))
    this.data.scores[t] = bgColor;
    this.setData({
      scores : this.data.scores
    })
    wx.request({
      url: 'http://127.0.0.1:8000/update',	//获取服务器地址，此处为本地地址
      header:{
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      method: "POST",
      data: {		//向服务器发送的信息
        index : t ,
        index_color : bgColor
      },
      success: res => {
        if (res.statusCode == 200) {
          this.setData({
            result: res.data.result	//服务器返回的结果
          })
        }
      }
    })

    // 设置背景颜色数据

    // this.setData( {

    //   score: bgColor

    // } );

  }
})