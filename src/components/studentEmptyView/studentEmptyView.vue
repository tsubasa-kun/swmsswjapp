<template>
    <div class="content">
        <div class="img-div">
            <img src="../../assets/u116.png">
        </div>
        <span class="main-label">{{ mainLabel }}</span>
    </div>
</template>

<style scoped>
    .content {
        height: 100vh;
        width: 100%;
        background-color: white;
        text-align: center;
        padding: 15PX;
    }

    .img-div {
        width: 100%;
        text-align: center;
        padding-top: 60PX;
    }

    .img-div img {
        width: 120PX;
        height: auto;
    }

    .main-label {
        display: block;
        font-size: 16PX;
        color: #000;
        margin-top: 20PX;
        margin-bottom: 15PX;
    }
</style>

<script type="text/javascript">
    import {Button} from 'mint-ui';
    export default {
        props: ['mainLabel'],
        components: {
            [Button.name]: Button
        },
        methods: {
        },
        created() {
            SDK.setTitleText('我的宿舍违纪记录');
        }
    }
</script>