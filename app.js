//app.js
App( {

  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync( 'logs' ) || []
    logs.unshift( Date.now() )
    wx.setStorageSync( 'logs', logs )
    var that = this

    wx.request( {
      url: 'http://v.juhe.cn/toutiao/index?type=&key=454a6ff4a6673e434d890f5e7acb8331',
      header: {
        'Content-Type': 'application/json'
      },
      success: function( res ) {
        wx.setStorageSync( 'info', res.data.result.data )
      }
    })
  },

  getUserInfo: function( cb ) {
    var that = this
    if( this.globalData.userInfo ) {
      typeof cb == "function" && cb( this.globalData.userInfo )
    } else {
      //调用登录接口
      wx.login( {
        success: function() {
          wx.getUserInfo( {
            success: function( res ) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb( that.globalData.userInfo )
            }
          })
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    info:null
  }
})