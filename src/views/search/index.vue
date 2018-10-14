<template>
    <div class="search">
        <div class="search-box-wrapper">
            <div class="search-box">
                <i class="icon-search"></i>
                <input type="text" ref="query" v-model="query" class="box" placeholder="搜索歌曲、歌手" @keyup.13="goSearch"/>
                <i v-show="query" class="icon-dismiss" @click="clear"></i>
            </div>
        </div>
        <div class="shortcut-wrapper" ref="shortcutWrapper" v-show="!query">
            <div class="shortcut">
                <div class="hot-key">
                    <h1 class="title">热门搜索</h1>
                    <ul>
                        <li class="item" v-for="item in hotList" :key="item.key" @click="addSearch(item.k)">
                            <span>{{item.k}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <scroll class="search-result" ref="searchResult" v-show="searchList.length" :listenScroll=true>
            <div class="search-list">
                <ul>
                    <li class="search-item" v-for="item in searchList" :key="item.key">
                        <i class="icon"></i>
                        <h6 class="text">{{item.name}}</h6>
                        <p class="subtext"><span v-for="b in item.singer" :key="b.key">{{b.name}} .</span></p>
                    </li>
                </ul>
            </div>
        </scroll>
    </div>
</template>

<script>
import scroll from '@/components/scroll'
import {getHotKey,search} from '@/api/api'
export default {
    data(){
        return{
            hotList:[],
            query:"",
            searchList:[],
            pageNum:20,
            pageSize:1
        }
    },
    components: {
        scroll
    },
    created () {
        this.getHotKey()
    },
    methods: {
        getHotKey(){
            getHotKey().then(res => {
                let HotArr = [];
                while(HotArr.length<8){
                    let n = Math.floor(Math.random()*(res.data.hotkey.length));
                    HotArr.push(res.data.hotkey[n])
                }
                this.hotList = HotArr;
                console.log(this.hotList)
            })
        },
        addSearch(val){
            this.query = val
            this.goSearch()
        },
        search(){
            search("beyond","2",20).then(res => {
                console.log(res)
            })
        },
        clear(){
            this.query = ""
            this.searchList = []
        },
        goSearch(){
            search(this.query,this.pageSize,this.pageNum).then(res => {
                console.log(res)
                this.searchList = res.data.song.list
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import "~@/common/less/variable.less";
.search{
    .search-box-wrapper{
      margin: 20px;
      .search-box{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        padding: 0 6px;
        height: 40px;
        background: @color-highlight-background;
        border-radius: 6px;
        .icon-search{
        font-size: 24px;
        color: @color-background;
        }
        .box{
            flex: 1;
            margin: 0 5px;
            line-height: 18px;
            background: @color-highlight-background;
            color: @color-text;
            font-size: @font-size-medium;
            &:focus{
                outline: none;
            }
        }
        &::placeholder{
            color: @color-text-d;
        }
        .icon-dismiss{
            font-size: 16px;
            color: @color-background;
        }
      }
    }
    .shortcut-wrapper{
      position: fixed;
      top: 178px;
      bottom: 0;
      width: 100%;
      .shortcut{
        height: 100%;
        overflow: hidden;
        .hot-key{
          margin: 0 20px 20px 20px;
          .title{
            margin-bottom: 20px;
            font-size: @font-size-medium;
            color: @color-text-l;
          }
          .item{
            display: inline-block;
            padding: 5px 10px;
            margin: 0 20px 10px 0;
            border-radius: 6px;
            background: @color-highlight-background;
            font-size: @font-size-medium;
            color: @color-text-d;
          }
        }
        .search-history{
          position: relative;
          margin: 0 20px;
          .title{
            display: flex;
            align-items: center;
            height: 40px;
            font-size: @font-size-medium;
            color: @color-text-l;
            .text{
              flex: 1;
            }
            .clear{
              .icon-clear{
                font-size: @font-size-medium;
                color: @color-text-d;
              }
            }
          }
        }
      }
    }
    .search-result{
      position: fixed;
      width: 100%;
      top: 168px;
      overflow: hidden;
      bottom: 0;
      .search-list{
        .search-item{
            position: relative;
            height: 55px;
            padding-left: 56px;
            overflow: hidden;
            .icon{
                position: absolute;
                top: 18px;
                left: 18px;
                width: 22px;
                height: 20px;
                background-position: 0 0;
                background-image: url(./search_sprite.png);
                background-repeat: no-repeat;
                background-size: 22px 30px;
            }
            .text {
                margin: 10px 0 2px;
                line-height: 18px;
                font-weight: normal;
                color: @color-text-ll;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: @font-size-medium;
            }
            .subtext{
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: @color-text-l;
                font-size: @font-size-small;
            }
            &::after{
                content: "";
                position: absolute;
                height: 1px;
                bottom: 0;
                left: 0;
                right: 0;
                background: #333;
            }
        }
      }
    }
}
</style>
