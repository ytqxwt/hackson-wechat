var swiperItems_student = {
    swiperItems: [{
      url: "/pages/camera/camera",
        class: 'sign-img',
        image: '../../images/calendar.png',
        text: '签到',
    },
    {
        url: "/pages/coursetable/coursetable",
        class: 'lesson-img',
        image: '../../images/lesson.png',
        text: '课程表',
    },
    {
        url: "",
        class: 'grades-img',
        image: '../../images/grades.png',
        text: '成绩查询',
    },
    {
        url: "/pages/todolist/todolist",
        class: 'memorandum-img',
        image: '../../images/mer.png',
        text: '备忘录',
    },
    {
        url: "/pages/message/message",
        class: 'message-img',
        image: '../../images/message.png',
        text: '消息',
    }, {
        url: "",
        class: 'setting-img',
        image: '../../images/settings.png',
        text: '设置',
    },
    ]
}
var swiperItems_teacher = {
    swiperItems: [{
        class: 'sign-img',
        url: "/pages/setSignTime/setSignTime",
        image: '../../images/setTimes.png',
        text: '设置签到',
    }, {
        class: 'lesson-img',
        url: "",
        image: '../../images/situation.png',
        text: '签到情况',
    },
    {
        class: 'grades-img',
        url: "/pages/setHomework/setHomework",
        image: '../../images/homework.png',
        text: '布置作业',
    }, {
        url: "",
        class: 'memorandum-img',
        image: '../../images/up.png',
        text: '上传课件',
    }, {
        url: "/pages/teacherIndexMessage/teacherIndexMessage",
        class: 'message-img',
        image: '../../images/message.png',
        text: '消息',
    }, {
        url: "/pages/setIndexTeacher/setIndexTeacher",
        class: 'setting-img',
        image: '../../images/settings.png',
        text: '设置',
    },
    ]
}
module.exports = {
    swiperItems_student: swiperItems_student,
    swiperItems_teacher: swiperItems_teacher,
}