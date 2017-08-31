<template>
    <div class="index">
        <div v-if="tab === 1" v-for="item in disciplineList">
            <div class="discipline-item" @click="showDetail(item)">
                <span class="discipline-title">{{ item.WJLXDM_DISPLAY }}</span>
                <span class="discipline-time">{{ item.FSRQ }}</span>
                <span class="discipline-content">{{ item.QKSM }}</span>
                <!--<span class="sub-label">{{ item.BZ }}</span>-->
            </div>
        </div>
        <v-student-empty-view v-if="tab === 0" mainLabel="从未发生过宿舍违纪，继续保持呦"></v-student-empty-view>

        <mt-popup class="popup-div" v-model="popupVisible" position="bottom">
            <div class="detail-div">
                <span class="detail-title">{{ detailTitle }}</span>
                <span class="detail-time">{{ detailTime }}</span>
                <i class="iconfont icon-close close-btn" @click="closePopup"></i>
                <span class="detail-sm">{{ detailSM }}</span>
                <!--<span class="detail-bz">{{ detailBZ }}</span>-->
            </div>
        </mt-popup>
    </div>
</template>

<style scoped>
    .discipline-item {
        background-color: white;
        padding: 10PX;
        margin-bottom: 1PX;
        position: relative;
    }

    .discipline-title {
        display: block;
        font-size: 16PX;
        color: #ff571a;
    }

    .discipline-content {
        display: block;
        font-size: 14PX;
        color: black;
        margin-top: 5PX;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: keep-all;
    }

    .discipline-time {
        display: inline-block;
        font-size: 13PX;
        color: #92969c;
        position: absolute;
        right: 10PX;
        top: 13PX;
    }

    .sub-label {
        display: block;
        font-size: 13PX;
        color: #92969c;
        margin-top: 5PX;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: keep-all;
    }

    .popup-div {
        width: 100vw;
        padding: 10PX;
    }

    .detail-div {
        position: relative;
    }

    .detail-title {
        display: inline-block;
        font-size: 16PX;
        color: #ff571a;
    }

    .detail-time {
        display: inline-block;
        font-size: 13PX;
        color: #92969c;
        margin-left: 5PX;
    }

    .detail-sm {
        display: block;
        font-size: 14PX;
        color: black;
        white-space: normal;
        word-break: break-all;
    }

    .detail-bz {
        display: block;
        width: 100%;
        font-size: 13PX;
        color: #92969c;
        white-space: normal;
        word-break: break-all;
    }

    .close-btn {
        position: absolute;
        top: -6PX;
        right: 8PX;
        font-size: 26PX;
        color: #92969c;
    }

</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import {Indicator, Popup} from 'mint-ui';
    import studentEmptyView from '../../components/studentEmptyView/studentEmptyView.vue';

    export default {
        data() {
            return {
                tab: 1,
                disciplineList: [],
                popupVisible: false,
                detailTitle: '',
                detailTime: '',
                detailSM: '',
                detailBZ: '',
            }
        },
        components: {
            'v-student-empty-view': studentEmptyView,
            [Popup.name]: Popup
        },
        created() {
//            SDK.setTitleText('我的宿舍违纪记录');
            let config ={
                left: {
                    left1: {
                        callFunction: function(){
                            SDK.bh.UI.closeWebView();
                        }
                    }
                },
                title: '我的宿舍违纪记录',
            };
            SDK.bh.UI.setNavHeader(config);

            Indicator.open();
            this.$http.get(Api.queryStudentDormDiscipline)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    Indicator.close();
                    if (res.status === '200') {
                        this.disciplineList = res.datas;
                        if (this.disciplineList.length > 0) {
                            this.tab = 1;
                        } else {
                            this.tab = 0;
                        }
                    }
                })
                .catch(msg => {
                    Indicator.close();
                    Utils.methods.showTip('请求出错');
                });
        },
        methods: {
            showDetail: function (item) {
                this.detailTitle = item.WJLXDM_DISPLAY;
                this.detailTime = item.FSRQ;
                this.detailSM = item.QKSM;
                this.detailBZ = item.BZ;
                this.popupVisible = true;
            },
            closePopup: function () {
                this.popupVisible = false;
            }
        }
    }
</script>