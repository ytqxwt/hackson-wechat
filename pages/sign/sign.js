Page({
  data: {
    items: [
      { name: 'USA', value: '父亲', checked: 'true'},
      { name: 'CHN', value: '母亲' },
      { name: 'BRA', value: '儿子' },
      { name: 'JPN', value: '女儿' },
      { name: 'BRA', value: '哥哥' },
      { name: 'JPN', value: '姐姐' },
      { name: 'BRA', value: '弟弟' },
      { name: 'JPN', value: '妹妹' },
    ]
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  }
})