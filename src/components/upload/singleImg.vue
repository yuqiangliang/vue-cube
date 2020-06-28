<template>
    <div class="single-img-upload">
        <div class="img-box">
            <img :src="msg[keys]" alt="">
            <el-upload
            class="upload-demo"
            :action="$uploadUrl"
            accept="image/*"
            ref="upload"
            name="itemImgFile[0]"
            :limit="1"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            >
            <span class='change-img'>更换图片</span>
            </el-upload>
        </div>
        <a href="javascript:;" class="delete-img" @click="deletes">删除</a>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'singleImgUpload',
    props: {
        msg: {
            type: Object
        },
        keys: {
            type: String
        }
    },
    methods: {
        uploadSuccess (e) {
            if (e.code == 'success') {
                const url = e.model && e.model[0] || ''
                this.$set(this.msg, this.keys, url)
                this.$refs.upload.clearFiles()
            }
        },
        deletes () {
            this.$set(this.msg, this.keys, '')
        },
        uploadError () {
            this.$message.error('上传失败')
            this.$emit('uploadError')
        }
    }
}
</script>
<style lang="less" scoped>
.single-img-upload {
    font-size: 0;
    position: relative;
    .img-box {
        width: 60px;
        height: 60px;
        border: 1px solid #ddd;
        border-bottom: 0;
        border-radius: 4px 4px 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        font-size: 0;
        float: left;
        overflow: hidden;
        img {
            max-width: 100%;
            max-height: 100%;
        }
        .change-img {
            position: absolute;
            bottom: 0px;
            left: 0;
            width: 100%;
            height: 20px;
            background: rgba(0,0,0,.5);
            line-height: 20px;
            text-align:center;
            color: #fff;
            font-size: 12px;
        }
    }
    .delete-img {
        margin-left: 10px;
        vertical-align: bottom;
        position: relative;
        top: 38px;
        font-size: 14px;
        color: #426EC9;
    }
    .warn {
        clear: both;
        color: #999;
        font-size: 14px;
        line-height: 20px;
        position: relative;
        top:6px;
    }
}
</style>