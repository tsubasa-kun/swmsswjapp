<template>
    <div class="content">
        <div class="search-div">
            <i class="iconfont icon-search search-icon"></i>
            <input class="keyword-input" v-model="keyword" type="text" placeholder="搜索姓名或学号">
            <span class="search-btn" @click="doCancel">取消</span>
        </div>
        <!--<v-recently-search v-if="tab === 1"></v-recently-search>-->
        <!--<v-search-result v-if="tab === 2" :studentList="studentList"></v-search-result>-->
        <div class="tip-div" v-if="tab === 1">
            <span>请搜索需要登记的学生</span>
        </div>
        <v-search-result v-if="tab === 2" :studentList="studentList"></v-search-result>
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
        width: 80%;
        border: solid 1PX #e8e8e8;
        border-radius: 4PX;
        font-size: 12PX;
        height: 30PX;
        outline: none;
        padding: 4PX 4PX 4PX 20PX;
    }

    .search-btn {
        display: inline-block;
        color: #06c1ae;
        /*background-color: #06c1ae;*/
        line-height: 28PX;
        width: 18%;
        text-align: center;
    }

    .tip-div {
        text-align: center;
    }

    .tip-div span {
        display: block;
        margin-top: 30PX;
        font-size: 16PX;
        color: #92969c;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import {Indicator} from 'mint-ui';
    import emptyView from '../../components/emptyView/emptyView.vue';
    import recentlySearch from '../../components/recentlySearch/recentlySearch.vue';
    import searchResult from '../../components/searchResult/searchResult.vue';

    export default {
        data() {
            return {
                tab: 1,
                keyword: '',
                studentList: [],
                recentlyList: []
            }
        },
        components: {
            'v-empty-view': emptyView,
            'v-recently-search': recentlySearch,
            'v-search-result': searchResult
        },
        created() {
//            SDK.setTitleText('宿舍违纪登记');
            let config ={
                left: {
                    left1: {
                        callFunction: function(){
                            window.history.go(-1);
                        }
                    }
                },
                title: '宿舍违纪登记',
            };
            SDK.bh.UI.setNavHeader(config);
        },
        methods: {
            doCancel: function () {
                this.$router.go(-1);
            },
            toAddCheck: function () {

            }
        },
        watch: {
            keyword: function () {
                if (this.keyword.length <= 0) {
                    this.tab = 1;
                } else {
                    this.$http.get(Api.vagueQueryStudentInfo + '?NAME=' + this.keyword)
                        .then(res => {
                            return res.json();
                        })
                        .then(res => {
                            Indicator.close();
                            if (res.status === '200') {
                                this.studentList = res.datas;
                                if (this.studentList.length > 0) {
                                    this.tab = 2;
                                } else {
                                    this.tab = 1;
                                }
                            }
                        })
                        .catch(msg => {
                            Indicator.close();
                            Utils.methods.showTip('请求出错');
                        });
                }
            }
        }
    }
</script>