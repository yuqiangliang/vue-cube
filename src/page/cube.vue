<template>
    <div class="cube" v-if="!refres">
         <div class="form custom-form" style="min-height:650px;">
            <div class="form-item">
                <span class="label">混排样式：</span>
                <div class="conts">
                   <el-select class="w140" v-model="msg.style" size="small" :placeholder="'请选择'" >
                        <el-option
                        v-for="(item, i) in styleList"
                        :key="i"
                        :label="item.name"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="form-item special">
                <span class="label">布局：</span>
                <div class="conts">
                    <div class="cube-boxs" ref="cubeBoxs" >
                        <div class="cube-boxs-box" :class="`cube-boxs-box-${msg.style}`" @mousedown="mousedown" @mousemove="mousemove" @mouseleave="mouseleave">
                            <div class="cube-item" :class="{active: getItemListActive[i].active}" :style="{width: `${325/msg.style}px`, height: `${325/msg.style}px`}" v-for="(item, i) in getItemList" :key="i" @click="getFlag(i+1)">
                                <i  class="el-icon-plus avatar-uploader-icon" style="font-size: 14px; color:#999;" v-if="!getItemListActive[i].active"></i>
                            </div>
                        </div>
                        <div class="inner-list" @click.prevent>
                            <div class="img-box" :class="{active: item.active}" v-for="(item, i) in msg.data || []" :key="i" :style="computedTopLeft(item)" @click.stop="choiceImg(item, i)">
                                <img :src="item.jump && item.jump.imgUrl" alt="" v-if="item.jump && item.jump.imgUrl">
                                <span class="close" @click.stop="closeImg(item,i)"></span>
                                <span class="warn-msg" @click="choiceImg(item, i)" v-if="!item.jump.imgUrl">
                                    {{`${parseFloat(computedTopLeft(item).width).toFixed(2)}px*${parseFloat(computedTopLeft(item).height).toFixed(2)}px`}}或同等比例
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    </div>
</template> 
<script>
export default {
    name: 'cube',
    props: {
        msg: {
            type: Object,
            default () {
                return {
                    style: 4,
                    data: [
                        {
                            startX: 1,
                            startY: 1,
                            endX: 1,
                            endY:1,
                            jump: {
                                imgUrl: '',
                                dataJumpType: '',
                                dataLinkTarget: '',
                            },
                            active:false,
                            padding: ''
                        }
                    ],
                    id: 0
                }
            }
        }
    },
    data () {
        return {
            styleList: [
                {
                    name: '4*4',
                    value: 4
                },
                {
                    name: '5*5',
                    value: 5
                },
                {
                    name: '6*6',
                    value: 6
                },
                {
                    name: '7*7',
                    value: 7
                },
                {
                    name: '8*8',
                    value: 8
                }
            ],
            flag: false, // 魔方上是否已经是点击状态
            mouseInt: false,
            saveMuseInt: {},
            pageObj: {
                pageXs: 0,
                pageYs: 0
            },
            mousemoveObj: {
                pageX: 0,
                pageY: 0
            },
            innerList: [],
            currentImg: {

            },
            currentImgIndex: 0,
            refres: false
        }
    },
    computed: {
        getItemList () {
            const {style} = this.msg
            let arrs = []
            for (let k =0; k<style * style; k++) {
                arrs.push(k)
            }
            this.$set(this.mousemoveObj, 'pageX', 0)
            this.$set(this.mousemoveObj, 'pageY', 0)
            return arrs
        },
        getItemListActive () {
            let {getItemList,  mousemoveObj: {pageX, pageY}, pageObj: {pageXs, pageYs}, msg: {style}, saveMuseInt: {x, y}} = this
            let arr = []
            let w = 325/style
            let lx = (pageX - pageXs-x*w) 
            let ly = (pageY - pageYs-y*w)
            let spx = parseFloat(lx/w)
            let spy = parseFloat(ly/w)
            const bj = index => {
                if (pageX == 0 && pageY == 0) return false
                let currentXy = this.computedxY(index + 1)
                if (currentXy.x == x && currentXy.y == y ) {
                    return true
                }
                if (spx >= 0 && spy >= 0) {
                    if (currentXy.x >= x && currentXy.y >= y && currentXy.x < spx+x+1 && currentXy.y < spy+y+1 ) {
                        return true
                    }
                } else if (spx >= 0 && spy <= 0) {
                    if (currentXy.x >= x && currentXy.y<=y && currentXy.x < spx+x+1 && currentXy.y >= y+spy) {
                        return true
                    }
                } else if (spx <= 0 && spy >= 0) {
                    if (currentXy.x <= x && currentXy.y >= y && currentXy.x >= x+spx && currentXy.y <= spy+y+1) {
                        return true
                    }
                } else if (spx <=0 && spy <= 0){
                    if (currentXy.x <= x && currentXy.y <= y && currentXy.x >= spx+x && currentXy.y >= y+spy) {
                        return true
                    }
                }
                return false
            }
            getItemList.forEach((r, index) => {
                let item = {
                    index
                }
                if (pageXs == 0) {
                    item.active = false
                } else {
                    item.active = bj(index)
                }
                arr.push(item)
            })
            return arr
        }
    },
    methods: {
        computedxY (i) { // 通过传入的下标计算出当前点击的方块处于哪个坐标
            const {style} = this.msg
            let x = 0,y = 0
            y = i/style < 1 ? 1 : (i%style == 0 ? i/style : parseInt(i/style)+1)
            x = i%style && i%style || style
            return {x, y}
        },
        computedTopLeft (obj) {
            let {startX, startY, endX, endY} = obj
            const {msg: {style}} = this
            let w = 325/style
            let styles = {}
            styles = {
                width: (endX-startX+1) * w+'px',
                height: (endY-startY+1) * w+'px',
                left: (startX-1)*w+'px',
                top: (startY-1)*w+'px'
            }
            return styles
        },
        getFlag (i) {
            const {flag} = this
            if (!flag) {
                this.flag = true
                this.saveMuseInt = this.computedxY(i)
                return
            }
        },
        mousedown (e) {
            if (this.isClickImg) return
            let {pageX, pageY} = e
            this.$set(this.mousemoveObj, 'pageX', pageX)
            this.$set(this.mousemoveObj, 'pageY', pageY)
            if (this.mouseInt) {
                const {saveMuseInt:{x, y}, pageObj: {pageXs,pageYs }, msg: {style}} = this
                let currentXy = {}
                let w = 325/style
                let lx = (pageX - pageXs-x*w) 
                let ly = (pageY - pageYs-y*w)
                let spx = parseFloat(lx/w)
                let spy = parseFloat(ly/w)
                currentXy = {
                    x: !(spx+x)%1 ? spx+x : parseInt(spx+x+1),
                    y: !(spy+y)%1 ? spy+y: parseInt(spy+y+1)
                }
                let wz = {
                    startX: x < currentXy.x ? x ? x : 1: currentXy.x ,
                    startY: y < currentXy.y ? y ? y : 1: currentXy.y ,
                    endX: currentXy.x > x ? currentXy.x : x,
                    endY: currentXy.y > y ? currentXy.y : y,
                    jump: {
                        imgUrl: '',
                        dataJumpType: '',
                        dataLinkTarget: ''
                    },
                    active:true
                }
                let arr = []
                this.msg.data.forEach(r => {
                    r.active = false
                    if (!(r.startX >= wz.startX && r.startY>=wz.startY && r.endX <= wz.endX && r.endY <= wz.endY)) {
                        arr.push(r) 
                    }
                    return r
                })
                if (arr && arr.length) {
                    this.$set(this.msg, 'data', [])
                    this.$set(this.msg, 'data', arr)
                } else {
                    this.msg.data = []
                }
                this.msg.data.push(wz)
                this.resetChocie()
                return
            } else {
                const {pageObj: {pageXs,pageYs }, msg: {style}} = this
                let w = 325/style
                let lx = pageX-pageXs
                let ly = (pageY - pageYs)
                let spx = parseInt(lx/w+1)
                let spy = parseInt(ly/w+1)
                this.saveMuseInt = {
                    x: spx,
                    y: spy
                }
            }
            this.mouseInt = true
            this.pageObj.pageXs = this.$refs.cubeBoxs.offsetLeft
            this.pageObj.pageYs = this.$refs.cubeBoxs.offsetTop
        },
        mousemove (e) {
            if (!this.mouseInt) return
            let {pageX, pageY} = e
            this.$set(this.mousemoveObj, 'pageX', pageX)
            this.$set(this.mousemoveObj, 'pageY', pageY)
        },
        resetChocie () {
            this.flag = false
            this.mouseInt = false
            this.mousemoveObj = {
                pageX:0,
                pageY:0
            }
            this.saveMuseInt= {
                x: 1,
                y: 1
            }
        },
        mouseleave () {
            this.resetChocie()
        },
        choiceImg (item, i) {
            let {msg: {data}} = this
            data.forEach((r, index) => {
                if (index == i) {
                    r.active = true
                } else {
                    r.active = false
                }
            })
            this.$set(this.msg, 'data', [])
            if (data.length == 1) data[0]['active'] = true
            this.$set(this.msg, 'data', data)
            this.currentImg = item
            this.currentImgIndex = i
        },
        closeImg (item, i) {
            let {msg: {data}} = this
            data.splice(i, 1)
            this.$set(this.msg, 'data', [])
            this.$set(this.msg, 'data', data)
            if (data.length) {
                if (item.active) {
                    if (i == 0) {
                        this.choiceImg(data[0], 0)
                    } else {
                        this.choiceImg(data[i-1], i-1)
                    }
                } else {
                    if (this.currentImgIndex > i) {
                        this.choiceImg(data[this.currentImgIndex-1 > 0 ? this.currentImgIndex-1 : 0], this.currentImgIndex-1 > 0 ? this.currentImgIndex-1 : 0)
                    }
                }
            }
            this.resetChocie()
        }
    },
    beforeDestroy () {
         this.resetChocie()
    }
}
</script>
<style lang="less" scoped>
.cube {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .custom-form {
        width: 80%;
    }
    /deep/.cube-boxs {
        width: 325px;
        height: 325px;
        position: relative;
        .cube-boxs-box {
            width: 100%;
            height: 100%;
            &.cube-boxs-box-4 {
                .cube-item {
                    &:nth-child(4n + 1) {
                        border-left: 1px solid #999;
                    }
                    &:nth-child(1), &:nth-child(2), &:nth-child(3), &:nth-child(4) {
                        border-top: 1px solid #999;
                    } 
                }
            }
             &.cube-boxs-box-5 {
                .cube-item {
                    &:nth-child(5n + 1) {
                        border-left: 1px solid #999;
                    }
                    &:nth-child(1), &:nth-child(2), &:nth-child(3), &:nth-child(4),  &:nth-child(5) {
                        border-top: 1px solid #999;
                    } 
                }
            }
            &.cube-boxs-box-6 {
                .cube-item {
                    &:nth-child(6n + 1) {
                        border-left: 1px solid #999;
                    }
                    &:nth-child(1), &:nth-child(2), &:nth-child(3), &:nth-child(4),  &:nth-child(5), &:nth-child(6) {
                        border-top: 1px solid #999;
                    } 
                }
            }
            &.cube-boxs-box-7 {
                .cube-item {
                    &:nth-child(7n + 1) {
                        border-left: 1px solid #999;
                    }
                    &:nth-child(1), &:nth-child(2), &:nth-child(3), &:nth-child(4),  &:nth-child(5), &:nth-child(6) , &:nth-child(7) {
                        border-top: 1px solid #999;
                    } 
                }
            }
            &.cube-boxs-box-8 {
                .cube-item {
                    &:nth-child(8n + 1) {
                        border-left: 1px solid #999;
                    }
                    &:nth-child(1), &:nth-child(2), &:nth-child(3), &:nth-child(4),  &:nth-child(5), &:nth-child(6) , &:nth-child(7), &:nth-child(8) {
                        border-top: 1px solid #999;
                    } 
                }
            }
            .cube-item {
                box-sizing: border-box;
                float:left;
                border-right: 1px solid #aaa;
                border-bottom: 1px solid #aaa;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                &.active {
                    background: #e8f7fd;
                    border-color: #e8f7fd !important;
                }
            }
        }
        .inner-list {
            position: absolute;
            left: 0;
            top: 0;
            .img-box {
                position: absolute;
                background: #e8f7fd;
                box-sizing: border-box;
                border: 1px solid #bdf;
                display:flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                &.active {
                   border-color: #38f;   
                }
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
                .close {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    right: -10px;
                    top: -10px;
                    border-radius: 50%;
                    background: rgba(0,0,0,.8);
                    z-index: 100;
                    background: url('../assets/img/close.png') no-repeat ;
                    background-size: 100% 100%;
                }
                .warn-msg {
                    color: #88c4dc;
                    font-size: 12px;
                    display: inline-block;
                    width: 80%;
                    white-space: normal;
                    overflow: hidden;
                }
            }
        }
    }
    .tiss {
        margin-left: 10px;
        color: #999;
        font-size: 14px;
        &.special {
            margin-left: 0;
        }
    }
}
</style>