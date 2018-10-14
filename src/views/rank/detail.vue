<template>
    <transition name="slide">
        <music-list :songslist="songsList" :title="title" :bgUrl="bgUrl"></music-list>
    </transition>
</template>

<script>
import MusicList from '@/components/musicList'
import {getRankInfo} from '@/api/api'
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
        this.getRankInfo()
    },
    methods:{
        getRankInfo:function(){
            let rankId = this.$route.params.id
            getRankInfo(rankId).then(res => {
                //console.log(res)
                this.songsList = res.songlist
                this.bgUrl = res.topinfo.pic_album
                this.title = res.topinfo.ListName
                console.log(this.songsList)
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
