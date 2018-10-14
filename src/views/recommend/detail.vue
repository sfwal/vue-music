<template>
    <transition name="slide">
        <music-list :songslist="songsList" :title="title" :bgUrl="bgImg"></music-list>
    </transition>
</template>

<script>
import MusicList from '@/components/musicList'
import {getCdInfo} from '@/api/api'
export default {
    data(){
        return{
            songsList:[],
            bgImg:"",
            title:""
        }
    },
    components:{
        MusicList
    },
    created(){
        this.getCdInfoList()
    },
    methods:{
        getCdInfoList:function(){
            getCdInfo().then(res => {
                console.log(res)
                this.songsList = res.data.cdlist[0].songlist
                this.bgImg = res.data.cdlist[0].logo
                this.title = res.data.cdlist[0].dissname
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
