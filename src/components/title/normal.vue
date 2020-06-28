<template>
    <div class="normal-title" :class="{border, radio}">{{title}}
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'normalTitle',
    props: {
        title: {
            type: String,
            default () {
                return ''
            }
        },
        border: {
            type: Boolean,
            default () {
                return false
            }
        },
        radio: {
            type: Boolean,
            default () {
                return false
            }
        }
    }
}
</script>
<style lang="less" scoped>
.normal-title {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #333;
    font-weight: 600;
    &.border {
        border-bottom: 1px solid #ddd;
    }
    &.radio {
        border-radius: 4px 4px 0 0;
    }
}
</style>