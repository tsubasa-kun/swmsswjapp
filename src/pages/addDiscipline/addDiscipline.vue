<template>
    <div>
        <div class="content">
            <div class="tag-div"></div>
            <div class="content-div">
                <span class="discipline-name">{{ student.XM }}</span>
                <div class="info-div">
                    <span class="discipline-label">学号</span>
                    <span class="discipline-text">{{ student.XH }}</span>
                </div>
                <div class="info-div ml-10">
                    <span class="discipline-label">宿舍</span>
                    <span class="discipline-text">{{ student.SSXX }}</span>
                </div>
            </div>

            <div class="tag-div"></div>
            <div class="content-div">
                <div class="info-div">
                    <span class="discipline-name in-line">选择室友</span>
                    <span class="discipline-label">选择后将登记同样的违纪信息</span>
                </div>
                <div class="mt-10" v-if="student.TSSXX && student.TSSXX.length > 0">
                    <mu-checkbox class="ml-20 check-box" v-for="sy in student.TSSXX" name="group" :nativeValue="sy.XSBH"
                                 v-model="syxx" :label="sy.XM" :value="sy.XSBH"/>
                </div>
                <div v-else class="content-div">
                    <span>无</span>
                </div>
            </div>

            <div class="tag-div"></div>
            <div class="content-div">
                <span class="text-label">违纪类型</span>
                <input type="text" class="text-input" placeholder="请选择" v-model="type" readOnly="true"
                       @click="showTypePicker"/>
                <i class="iconfont arrow-lr-icon">&#xe79e;</i>
            </div>
            <div class="content-div mt-1">
                <span class="text-label">违纪日期</span>
                <input type="text" class="text-input" placeholder="请选择" v-model="date" readOnly="true"
                       @click="showDatePicker">
                <i class="iconfont arrow-lr-icon">&#xe79e;</i>
            </div>
            <div class="content-div mt-1">
                <span class="text-label">情况说明</span>
                <textarea class="text-textarea" placeholder="请填写" v-model="describe" maxlength="200"></textarea>
            </div>

            <mt-button class="submit-btn" @click="submit">保存</mt-button>
        </div>

        <div class="cover"></div>
        <div id="type_picker" class="m-picker">
            <div class="picker-title-div">
                <span class="picker-btn ok" @click="pickerOK">确定</span>
                <span class="picker-btn cancel" @click="pickerCancel">取消</span>
            </div>
            <mt-picker :slots="types" @change="onTValuesChange"></mt-picker>
        </div>

        <mt-datetime-picker
                ref="datePicker"
                type="date"
                year-format="{value}"
                month-format="{value}"
                date-format="{value}"
                :startDate="startDate"
                @confirm="datePickerConfirm">
        </mt-datetime-picker>

        <div class="giveup-tip">
            <span class="tip-title">是否确认放弃登记</span>
            <mt-button class="giveup-btn giveup-cancel-btn" type="default" @click="cancelGiveup">取消</mt-button>
            <mt-button class="giveup-btn giveup-OK-btn" type="primary" @click="doGiveup">确定</mt-button>
        </div>
    </div>
</template>

<style scoped>
    .tag-div {
        background-color: #f9f9f9;
        color: #92969c;
        padding: 5PX 10PX 5PX 10PX;
    }

    .content-div {
        background-color: white;
        padding: 10PX;
    }

    .discipline-name {
        display: block;
        font-size: 16PX;
    }

    .info-div {
        display: inline-block;
    }

    .discipline-label {
        display: inline-block;
        font-size: 12PX;
        color: #92969c;
        margin-top: 5PX;
    }

    .discipline-text {
        display: inline-block;
        font-size: 12PX;
        color: black;
        margin-top: 5PX;
    }

    .ml-10 {
        margin-left: 10PX;
    }

    .text-label {
        display: inline-block;
        width: 24%;
        color: #1E2329;
        font-size: 14PX;
    }

    .text-input {
        border: 0;
        width: 68%;
        outline: none;
        font-size: 14PX;
        text-align: right;
    }

    .text-textarea {
        border: 0;
        width: 100%;
        height: 110PX;
        outline: none;
        font-size: 14PX;
        resize: none;
    }

    .mt-1 {
        margin-top: 1PX;
    }

    .mt-10 {
        margin-top: 10PX;
    }

    .ml-20 {
        margin-left: 20PX;
    }

    .in-line {
        display: inline-block;
    }

    .check-box {
        font-size: 14PX;
    }

    .cover {
        display: none;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 9997;
    }

    .m-picker {
        display: none;
        width: 100%;
        position: fixed;
        bottom: 0;
        background-color: white;
        z-index: 9998;
    }

    .picker-title-div {
        padding-top: 10PX;
        padding-bottom: 10PX;
        border-bottom: solid 1PX #e8e8e8;
    }

    .picker-btn {
        color: #06c1ae;
        font-size: 15PX;
    }

    .picker-btn.ok {
        position: absolute;
        right: 10PX;
    }

    .picker-btn.cancel {
        margin-left: 10PX;
    }

    .submit-btn {
        width: calc(100% - 20PX);
        color: white;
        background-color: #06c1ae;
        margin: 20PX 10PX 10PX 10PX;
    }

    .giveup-tip {
        display: none;
        background-color: white;
        width: 80%;
        height: 23%;
        position: fixed;
        border: solid 1PX white;
        border-radius: 6PX;
        top: 40%;
        left: 10%;
        text-align: center;
        padding: 10PX;
        z-index: 9999;
    }

    .tip-title {
        display: block;
        font-size: 16PX;
    }

    .giveup-btn {
        width: 90PX;
        margin: 20PX 10PX 10PX 10PX;
    }

    .giveup-cancel-btn {
        color: black;
        background-color: white;
    }

    .giveup-OK-btn {
        color: white;
        background-color: #06c1ae;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import $ from 'jquery';
    import moment from 'moment';
    import {Indicator, Picker, Button, DatetimePicker} from 'mint-ui';

    export default {
        data() {
            return {
                student: this.$route.query,
                xsbh: this.$route.query.XSBH,
                type: '',
                tempType: '',
                typesValue: [],
                typesMap: [],
                types: [
                    {
                        flex: 1,
                        values: [],
                        className: 'types',
                        textAlign: 'center',
                        defaultIndex: 0
                    }
                ],
                typeKey: '',
                date: '',
                startDate: '',
                describe: '',
                syxx: [],
            }
        },
        components: {
            [Picker.name]: Picker,
            [Button.name]: Button,
            [DatetimePicker.name]: DatetimePicker,
        },
        created() {
//            SDK.setTitleText('宿舍违纪登记');
            let config ={
                left: {
                    left1: {
                        callFunction: function(){
                            $('.cover').show();
                            $('.m-picker').slideUp('fast');
                            $('.giveup-tip').show();
                        }
                    }
                },
                title: '宿舍违纪登记',
            };
            SDK.bh.UI.setNavHeader(config);

            this.startDate = new Date("2007-01-01");

            //获取宿舍室友
            Indicator.open();
            this.$http.get(Api.queryDisTypeSelectInfo)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    Indicator.close();
                    if (res.status === '200') {
                        this.typesMap = res.datas;
                        for (let i = 0; i < this.typesMap.length; i++) {
                            this.typesValue.push(this.typesMap[i].WJLXMC);
                        }
                        this.types[0].values = this.typesValue;
                    }
                })
                .catch(msg => {
                    Indicator.close();
                    Utils.methods.showTip('请求出错');
                });

            //获取违纪类型
            Indicator.open();
            this.$http.get(Api.queryDisTypeSelectInfo)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    Indicator.close();
                    if (res.status === '200') {
                        this.typesMap = [];
                        this.typesMap = res.datas;
                        this.typesValue = [];
                        for (let i = 0; i < this.typesMap.length; i++) {
                            this.typesValue.push(this.typesMap[i].WJLXMC);
                        }
                        this.types[0].values = this.typesValue;
                    }
                })
                .catch(msg => {
                    Indicator.close();
                    Utils.methods.showTip('请求出错');
                });
        },
        methods: {
            onTValuesChange(picker, values) {
                this.tempType = picker.getValues();
                this.getTypeKey(this.tempType);
            },
            showTypePicker: function () {
                $('.cover').show();
                $('#type_picker').slideDown('fast');
            },
            getTypeKey: function (value) {
                for (let i = 0; i < this.typesMap.length; i++) {
                    if (this.typesMap[i].WJLXMC == value) {
                        this.typeKey = this.typesMap[i].WJLXDM;
                    }
                }
            },
            pickerOK: function () {
                $('.cover').hide();
                $('.m-picker').slideUp('fast');
                this.type = Array.from(this.tempType);
                this.getTypeKey(this.type);
            },
            pickerCancel: function () {
                $('.cover').hide();
                $('.m-picker').slideUp('fast');
                this.getTypeKey(this.type);
            },
            showDatePicker: function () {
                this.$refs.datePicker.open();
            },
            datePickerConfirm: function (value) {
                this.date = moment(value).format('YYYY-MM-DD');
            },
            submit: function () {
                if (this.type.length <= 0) {
                    Utils.methods.showTip('请选择违纪类型');
                } else if (this.date.length <= 0) {
                    Utils.methods.showTip('请选择日期');
                } else if (this.describe.length <= 0) {
                    Utils.methods.showTip('请输入说明');
                } else {
                    let tss_xsbh = this.xsbh;
                    if (this.syxx.length > 0) {
                        for (let i = 0; i < this.syxx.length; i++) {
                            tss_xsbh = tss_xsbh + ',' + this.syxx[i];
                        }
                    }
                    var params = '?TSS_XSBH=' + tss_xsbh + '&FSRQ=' + this.date + '&WJLXDM=' + this.typeKey + '&QKSM=' + this.describe;
                    Indicator.open();
                    this.$http.get(Api.saveDormDiscipline + params)
                        .then(res => {
                            return res.json();
                        })
                        .then(res => {
                            Indicator.close();
                            if (res.status === '200' && res.datas.FLAG === '1') {
                                Utils.methods.showTip('提交成功');
                                this.$router.push('/addSuccess')
                            } else {
                                Utils.methods.showTip(res.datas.MSG);
                            }
                        })
                        .catch(msg => {
                            Indicator.close();
                            Utils.methods.showTip('请求出错');
                        });
                }
            },
            cancelGiveup: function () {
                $('.cover').hide();
                $('.giveup-tip').hide();
            },
            doGiveup: function () {
                this.$router.go(-1);
            }
        },
        watch: {}
    }
</script>