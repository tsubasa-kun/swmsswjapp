<template>
    <div class="content">
        <div class="item-div" v-for="student in studentList" @click="toAdd(student)">
            <div class="item-content-div">
                <span>{{ student.XM }}　{{ student.XH }}　{{ student.SSXX }}</span>
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
        props: ['studentList'],
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
                let has = false;
                for (let i = 0; i < this.recentlyList.length; i++) {
                    if (this.recentlyList[i].XSBH === student.XSBH) {
                        has = true;
                        break;
                    }
                }
                if (!has) {
                    this.recentlyList.push(student);
                    localStorage.setItem('recently', JSON.stringify(this.recentlyList));
                }
                this.$router.push({path: '/addDiscipline', query: student});
            }
        }
    }
</script>