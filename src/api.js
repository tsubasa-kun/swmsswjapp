/**
 * Created by xiekun on 2017/4/12 0012.
 */

export default {
    getMenuInfo: WEBPACK_CONIFG_HOST + '/sys/sswjapp/MobileStudentDormDiscipline/getMenuInfo.do',//获取登录角色对应的权限菜单信息

    queryStudentDormDiscipline: WEBPACK_CONIFG_HOST + '/sys/sswjapp/MobileStudentDormDiscipline/queryStudentDormDiscipline.do',//查询学生宿舍违纪记录

    queryDromDisciplineInfo: WEBPACK_CONIFG_HOST + '/sys/sswjapp/MobileTeacherDormDiscipline/queryDromDisciplineInfo.do',//老师查询宿舍违纪信息
    vagueQueryStudentInfo: WEBPACK_CONIFG_HOST + '/sys/sswjapp/MobileTeacherDormDiscipline/vagueQueryStudentInfo.do',//根据学号或姓名模糊查询学生信息
    queryDisTypeSelectInfo: WEBPACK_CONIFG_HOST + '/sys/sswjapp/MobileTeacherDormDiscipline/queryDisTypeSelectInfo.do',//查询宿舍违纪下拉信息
    saveDormDiscipline: WEBPACK_CONIFG_HOST + '/sys/sswjapp/MobileTeacherDormDiscipline/saveDormDiscipline.do',//宿舍违纪登记保存
}
