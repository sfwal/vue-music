<template>
    <transition name="slide">
        <music-list :songslist="songsList" :title="title" :bgUrl="bgUrl"></music-list>
    </transition>
</template>

<script>
import MusicList from '@/components/musicList'
import {getSingerInfo} from '@/api/api'
export default {
    data(){
        return{
            songsList:[],
            bgUrl:"",
            title:""
        }
    },
    components:{
        MusicList
    },
    created(){
        this.getSingerInfo()
    },
    methods:{
        getSingerInfo:function(){
            let singerId = this.$route.params.id
            getSingerInfo(singerId).then(res => {
                console.log(res)
                this.songsList = res.data.list
                this.bgUrl = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${res.data.singer_mid}.jpg?max_age=2592000`
                this.title = res.data.singer_name
                // console.log(this.songsList)
            })
        }
    }
}
</script>

<style lang="less" scoped>
.slide-enter-active, .slide-leave-active{
    transition: all 0.3s;
}
.slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0);
}
</style>
