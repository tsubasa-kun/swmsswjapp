<template>
    <div class="content">
        <div class="title-div">最近搜索</div>
        <div class="item-div" v-for="student in recentlyList" @click="toAdd(student)">
            <div class="item-content-div">
                <span>{{ student.XH }}　{{ student.XM }}　{{ student.SSXX }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .content {
        width: 100%;
        height: 100%;
        background-color: white;
    }

    .title-div {
        background-color: #f9f9f9;
        color: #92969c;
        padding: 5PX 10PX 5PX 10PX;
        border-bottom: solid 1PX #e8e8e8;
    }

    .item-div {
        padding-left: 10PX;
        padding-right: 10PX;
    }

    .item-content-div {
        padding-top: 10PX;
        padding-bottom: 10PX;
        border-bottom: solid 1PX #e8e8e8;
    }
</style>

<script type="text/javascript">
    export default {
        data() {
            return {
                recentlyList: []
            }
        },
        created() {
            this.recentlyList = JSON.parse(localStorage.getItem('recently'));
            if (this.recentlyList === null) {
                this.recentlyList = [];
            }
        },
        methods: {
            toAdd: function (student) {
                this.$router.push({path: '/addDiscipline', query: student});
            }
        }
    }
</script>