//index.js
//获取应用实例
const app = getApp();
const http = require('../../utils/util');

Page({
    data: {
        todoList: [],
        isAdd: false
    },

    // 长按事件
    operaItem(e) {
        let index = e.currentTarget.dataset.index;
        let id = e.currentTarget.dataset.id;
        let list = this.data.todoList;
        wx.showActionSheet({
            itemList: ['修改', '删除'],
            success: res => {
                if (res.tapIndex == 0) {
                    list[index].isInput = true;
                    this.setData({
                        todoList: list
                    })
                } else if (res.tapIndex == 1) {
                    this.delItem(id);
                }
            }
        })
    },

    // 查询
    queryItem() {
        http.httpRequest({
            url: '/getTodosList',
            method: 'get'
        }).then(res => {
            console.log(res, "查询")
            if (res.statusCode == 200) {
                let data = JSON.parse(JSON.stringify(res.data));
                for (let item of data) {
                    Object.assign(item, {
                        isInput: false
                    });
                }
                this.setData({
                    todoList: data
                })
            }
        }, err => {
            console.log(err, '查询')
        })
    },

    // 增加
    addItem(e) {
        let con = e.detail.value;
        http.httpRequest({
            url: '/insertTodos',
            method: 'post'
        }, {
            content: con
        }).then(res => {
            console.log(res, "增加")
            if (res.statusCode == 200) {
                this.queryItem();
                this.setData({
                    isAdd: false
                })
            }
        }, err => {
            console.log(err, '增加')
        })
    },

    // 删除
    delItem(id) {
        http.httpRequest({
            url: '/deleteTodos',
            method: 'delete'
        }, {
            id: id
        }).then(res => {
            console.log(res, "删除")
            if (res.statusCode == 200) {
                this.queryItem();
            }
        }, err => {
            console.log(err, '删除')
        })
    },

    // 修改
    updateItem(e) {
        console.log(1223)
        let value = e.detail.value;
        let id = e.currentTarget.dataset.id;
        http.httpRequest({
            url: '/updateTodos',
            method: 'post'
        }, {
            id: id,
            content: value
        }).then(res => {
            console.log(res, "修改");
            if (res.statusCode == 200) {
                this.queryItem();
            }
        }, err => {
            console.log(err, '修改')
        })
    },

    // 点击新建
    clickAddBtn() {
        if (!this.data.isAdd) {
            this.setData({
                isAdd: true
            })
        }
    },

    onLoad(e) {
        this.queryItem();
    }
})