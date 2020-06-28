<template>
    <div class="preview">
        <slot></slot>
    </div>
</template>
<style lang="less" scoped>
.preview {
    width: 377px;
    height: 669px;
    overflow-y:scroll;
    position: relative;
    border: 1px solid #ddd;
    box-shadow:0px 8px 16px 0px rgba(10,59,208,0.27);
}
</style>