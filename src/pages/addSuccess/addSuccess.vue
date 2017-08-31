<template>
    <div class="content">
        <div class="img-div">
            <i class="iconfont icon-wancheng success"></i>
        </div>
        <span class="main-label">保存成功</span>
        <mt-button class="submit-btn" @click="toMain">完成</mt-button>
    </div>
</template>

<style scoped>
    .content {
        width: 100%;
        height: 100vh;
        text-align: center;
        padding: 15PX;
        background-color: white;
    }

    .img-div {
        width: 100%;
        text-align: center;
        padding-top: 80PX;
    }

    .success {
        color: #06c1ae;
        font-size: 80PX;
    }

    .main-label {
        display: block;
        font-size: 18PX;
        color: #000;
        margin-top: 20PX;
        margin-bottom: 15PX;
    }

    .mint-button--default {
        box-shadow: 0 0 2PX #06c1ae;
    }

    .submit-btn {
        width: calc(100% - 40PX);
        color: #06c1ae;
        background-color: white;
    }
</style>

<script type="text/javascript">
    import {Button} from 'mint-ui';
    export default {
        components: {
            [Button.name]: Button
        },
        methods: {
            toMain: function () {
                this.$router.go(-3);
            }
        },
        created() {
//            SDK.setTitleText('宿舍违纪登记');
            let config ={
                left: {
                    left1: {
                        callFunction: function(){
                            window.history.go(-3);
                        }
                    }
                },
                title: '宿舍违纪登记',
            };
            SDK.bh.UI.setNavHeader(config);

        }
    }
</script>