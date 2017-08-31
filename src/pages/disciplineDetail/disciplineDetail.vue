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
                    <span class="discipline-text">{{ student.XSSS }}</span>
                </div>
            </div>

            <div class="tag-div">违纪信息</div>
            <div class="content-div">
                <span class="text-label">违纪类型</span>
                <span class="discipline-text">{{ student.WJLXDM_DISPLAY }}</span>
            </div>
            <div class="content-div mt-1">
                <span class="text-label">违纪日期</span>
                <span class="discipline-text">{{ student.FSRQ }}</span>
            </div>
            <div class="content-div mt-1">
                <span class="text-label align-top">情况说明</span>
                <span class="discipline-text width-72">{{ student.QKSM }}</span>
            </div>
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
        white-space: normal;
        word-break: break-all;
    }

    .width-72 {
        width: 72%;
    }

    .align-top {
        vertical-align: top;
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

    .mt-1 {
        margin-top: 1PX;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';

    export default {
        data() {
            return {
                student: this.$route.query,
            }
        },
        components: {
        },
        created() {
//            SDK.setTitleText('详情');
            let config ={
                left: {
                    left1: {
                        callFunction: function(){
                            window.history.go(-1);
                        }
                    }
                },
                title: '详情',
            };
            SDK.bh.UI.setNavHeader(config);
        },
        methods: {
        },
        watch: {}
    }
</script>