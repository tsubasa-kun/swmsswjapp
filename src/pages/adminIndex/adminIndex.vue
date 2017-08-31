<template>
    <div class="content">
        <div>
            <div class="search-div">
                <i class="iconfont icon-search search-icon"></i>
                <input class="keyword-input" type="text" placeholder="搜索姓名、学号或宿舍" v-model="keyword">
            </div>
            <div v-if="tab === 1" v-for="item in resultList">
                <div class="discipline-item" @click="toDetail(item)">
                    <span class="discipline-name">{{ item.XM }}</span>
                    <div class="tag-div">
                        <span class="discipline-label">违纪类型</span>
                        <span class="discipline-text">{{ item.WJLXDM_DISPLAY }}</span>
                    </div>
                    <div class="tag-div ml-10">
                        <span class="discipline-label">宿舍</span>
                        <span class="discipline-text">{{ item.XSSS }}</span>
                    </div>
                    <span class="discipline-time">{{ item.FSRQ }}</span>
                </div>
            </div>
            <v-empty-view v-if="tab === 0" mainLabel="没有违纪信息"></v-empty-view>

            <div class="add-btn-bg"></div>
            <i class="iconfont icon-tianjia add-btn" @click="toAdd"></i>
        </div>
    </div>
</template>

<style scoped>
    .search-div {
        padding: 5PX 10PX 5PX 10PX;
        position: relative;
        border-bottom: solid 1PX #e8e8e8;
    }

    .search-icon {
        color: #BDBFC5;
        font-size: 12PX;
        position: absolute;
        top: 12PX;
        left: 16PX;
    }

    .keyword-input {
        width: 100%;
        border: solid 1PX #e8e8e8;
        border-radius: 4PX;
        font-size: 12PX;
        height: 30PX;
        outline: none;
        padding: 4PX 4PX 4PX 20PX;
    }

    .discipline-item {
        background-color: white;
        padding: 10PX;
        margin-bottom: 1PX;
        position: relative;
    }

    .discipline-name {
        display: block;
        font-size: 16PX;
    }

    .discipline-time {
        display: inline-block;
        font-size: 13PX;
        color: #92969c;
        position: absolute;
        right: 10PX;
        top: 13PX;
    }

    .tag-div {
        display: inline-block;
    }

    .discipline-label {
        display: inline-block;
        font-size: 13PX;
        color: #92969c;
        margin-top: 5PX;
    }

    .discipline-text {
        display: inline-block;
        font-size: 13PX;
        color: black;
        margin-top: 5PX;
    }

    .ml-10 {
        margin-left: 10PX;
    }

    .add-btn-bg {
        display: block;
        position: fixed;
        bottom: 28PX;
        right: 23PX;
        width: 25PX;
        height: 25PX;
        background-color: white;
    }

    .add-btn {
        position: fixed;
        bottom: 0PX;
        right: 10PX;
        color: #06c1ae;
        font-size: 50PX;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import {Indicator} from 'mint-ui';
    import emptyView from '../../components/emptyView/emptyView.vue';

    export default {
        data() {
            return {
                tab: 1,
                keyword: '',
                disciplineList: [],
                resultList: []
            }
        },
        components: {
            'v-empty-view': emptyView
        },
        created() {
//            SDK.setTitleText('宿舍违纪记录');
            let config ={
                left: {
                    left1: {
                        callFunction: function(){
                            SDK.bh.UI.closeWebView();
                        }
                    }
                },
                title: '宿舍违纪记录',
            };
            SDK.bh.UI.setNavHeader(config);


            Indicator.open();
            this.$http.get(Api.queryDromDisciplineInfo)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    Indicator.close();
                    if (res.status === '200') {
                        this.disciplineList = res.datas;
                        this.resultList = this.disciplineList;
                        if (this.disciplineList.length > 0) {
                            this.tab = 1;
                        } else {
                            this.tab = 0;
                        }
                    }
                })
                .catch((msg) => {
                    Indicator.close();
                    Utils.methods.showTip('请求出错');
                });
        },
        methods: {
            toAdd: function () {
                this.$router.push('/search');
            },
            toDetail: function (item) {
                this.$router.push({path: '/disciplineDetail', query: item});
            }
        },
        watch: {
            keyword: function () {
                this.resultList = [];
                if (this.keyword.length <= 0) {
                    this.resultList = this.disciplineList;
                } else {
                    for (let i = 0; i < this.disciplineList.length; i++) {
                        if ((this.disciplineList[i].XM.indexOf(this.keyword) >= 0)
                            || (this.disciplineList[i].XH.indexOf(this.keyword) >= 0)
                            || (this.disciplineList[i].XSSS.indexOf(this.keyword) >= 0)) {
                            this.resultList.push(this.disciplineList[i]);
                        }
                    }
                }
            }
        }
    }
</script>