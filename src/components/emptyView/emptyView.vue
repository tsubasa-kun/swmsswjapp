<template>
    <div class="content">
        <div class="img-div">
            <img src="../../assets/no_data.png">
        </div>
        <span class="main-label">{{ mainLabel }}</span>
        <span class="sbu-label">{{ subLabel }}</span>
    </div>
</template>

<style scoped>
    .content {
        height: calc(100vh - 41PX);
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
        height: 120PX;
    }

    .main-label {
        display: block;
        font-size: 18PX;
        color: #000;
        margin-top: 20PX;
        margin-bottom: 15PX;
    }

    .sbu-label {
        display: block;
        font-size: 14PX;
        color: #999999;
    }
</style>

<script type="text/javascript">
    import {Button} from 'mint-ui';
    export default {
        props: ['mainLabel', 'subLabel'],
        components: {
            [Button.name]: Button
        },
        methods: {
        },
        created() {
            SDK.setTitleText('宿舍违纪记录');
        }
    }
</script>