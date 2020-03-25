import {
	request
} from '../../utils/request.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		items: [{
			name: '0',
			value: '个人',
			checked: true
		}, {
			name: '1',
			value: '组织'
		}],
		encry: true,
		formItem: {
			mobile: '',
			password: '',
			user_identity: 0
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},
	// 登录
	login() {
		let formItem = this.data.formItem
		if (!formItem.mobile.trim()) {
			wx.showToast({
				title: '请输入手机号或用户名',
				icon: 'none'
			});
			return
		} else if (!formItem.password.trim()) {
			wx.showToast({
				title: '请输入密码',
				icon: 'none'
			});
			return
		}
		request({
			url: '/api/company',
			data: {
				...formItem
			}
		}).then(res => {
			if (res.data.code == 1) {
				wx.navigateTo({
					url: `/pages/index/index`
				})
			} else {
				wx.showToast({
					icon: 'none',
					title: res.data.msg
				})
			}
		})
	},

	bmobile(e) {
		this.setData({
			'formItem.mobile': e.detail.value
		})
	},
	bpassword(e) {
		this.setData({
			'formItem.password': e.detail.value
		})
	},

	changeShow() {
		this.setData({
			encry: !this.data.encry
		})
	},
	register() {
		wx.navigateTo({
			url: `/pages/register/register`
		});
	},
	forget() {
		wx.navigateTo({
			url: `/pages/forget/forget`
		});
	},
	radioChange: function(e) {
		this.setData({
			'formItem.user_identity': e.detail.value
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
