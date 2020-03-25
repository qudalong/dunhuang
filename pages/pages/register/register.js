import {
	request
} from '../../utils/request.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		items: [{
			name: '1',
			value: '个人',
			checked: true
		}, {
			name: '3',
			value: '组织'
		}],
		codeSended: false,
		time: '获取验证码',
		encry: true,
		encry2: true,
		formItem: {
			user_type: 1,
			mobile: '',
			sms_cod: '',
			password: '',
			repassword: ''
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		// console.log(request)
	},
	// 注册
	register() {
		let formItem = this.data.formItem
		if (!formItem.mobile.trim()) {
			wx.showToast({
				title: '请输入手机号或用户名',
				icon: 'none'
			});
			return
		} else if (!formItem.sms_cod.trim()) {
			wx.showToast({
				title: '请输入验证码',
				icon: 'none'
			});
			return
		} else if (!formItem.password.trim()) {
			wx.showToast({
				title: '请输入密码',
				icon: 'none'
			});
			return
		} else if (!formItem.repassword.trim()) {
			wx.showToast({
				title: '请再次输入密码',
				icon: 'none'
			});
			return
		} else if (formItem.password.trim() != formItem.repassword.trim()) {
			wx.showToast({
				title: '输入密码不一致',
				icon: 'none'
			});
			return
		}
		request({
			url: '/api/join',
			data: {
				...formItem
			}
		}).then(res => {
			if (res.data.code == 1) {
				wx.navigateTo({
					url: `/pages/login/login`
				})
			}
			wx.showToast({
				icon: 'none',
				title: res.data.msg
			})
		})
	},

	// 倒计时
	startCountDown() {
		this.setData({
			codeSended: true
		})
		var times = 120
		let intval = setInterval(() => {
			this.setData({
				time: times-- + '秒后重新发送'
			})
			if (this.data.time == '1秒后重新发送') {
				this.setData({
					codeSended: false,
					time: '获取验证码'
				})
				clearInterval(intval)
			}
		}, 1000)
	},

	// ·验证码
	sendSms() {
		let formItem = this.data.formItem
		if (!formItem.mobile.trim()) {
			wx.showToast({
				title: '请输入手机号',
				icon: 'none'
			});
			return
		}
		request({
			url: '/api/sendSms?mobile=' + formItem.mobile,
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


	bmobile(e) {
		this.setData({
			'formItem.mobile': e.detail.value
		})
	},
	bsms_cod(e) {
		this.setData({
			'formItem.sms_cod': e.detail.value
		})
	},
	bpassword(e) {
		this.setData({
			'formItem.password': e.detail.value
		})
	},
	bpasswordre(e) {
		this.setData({
			'formItem.repassword': e.detail.value
		})
	},
	changeShow() {
		this.setData({
			encry: !this.data.encry
		})
	},
	changeShow2() {
		this.setData({
			encry2: !this.data.encry2
		})
	},

	radioChange: function(e) {
		this.setData({
			'formItem.user_type': e.detail.value
		})
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
