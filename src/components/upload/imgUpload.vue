<template>
    <div class="img-upload">
        <div class="img-box">
            <el-upload
            class="upload-demo"
            :action="$uploadUrl"
            ref="upload"
            accept="image/*"
            name="itemImgFile[0]"
            :limit="1"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            >
            <slot></slot>
            </el-upload>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ImgUpload',
    methods: {
        uploadSuccess (e) {
            if (e.code == 'success') {
                let url = e.model && e.model[0] || ''
                this.$emit('uploadSuccess', url)
                this.$refs.upload.clearFiles()
            }
        },
        uploadError () {
            this.$message.error('上传失败')
            this.$emit('uploadError')
        }
    }
}
</script>
<style lang="less" scoped>
</style>