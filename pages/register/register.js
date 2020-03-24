import {
	request
} from '../../utils/request.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		items: [{
			name: 'personage',
			value: '个人',
			checked: true
		}, {
			name: 'organization',
			value: '组织'
		}],
		codeSended: false,
		time: '获取验证码',
		encry: true
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		// console.log(request)
	},
	changeShow() {
		this.setData({
			encry: !this.data.encry
		})
	},
	// 倒计时
	startCountDown() {
		this.setData({
			codeSended: true
		})
		var times = 120
		const intval = setInterval(() => {
			this.setData({
				time: times-- + '秒后重新发送'
			})
			if (this.data.time === 0) {
				this.setData({
					codeSended: false,
					time: '重新发送'
				})
				clearInterval(intval)
			}
		}, 1000)
	},

	// 注册
	sendSms() {
		request({
			url: '/api/sendSms?mobile=18768871893',
			method: 'GET',
			data: {}
		}).then(res => {
			this.startCountDown()
			wx.showToast({
				icon: 'none',
				title: res.data.msg
			})
		})
	},

	// 注册
	register() {
		request({
			url: '/api/join',
			data: {
				user_type: 1, //个人=1/组织=3
				mobile: '18768871893',
				sms_cod: '5670',
				password: '123456',
				repassword: '123456'
			}
		}).then(res => {})
	},

	radioChange: function(e) {
		console.log('radio发生change事件，携带value值为：', e.detail.value)
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
