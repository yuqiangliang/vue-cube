<template>
    <div class="search-form">
        <div class="form-item" v-for="(item, i) in searchArray" :key="i">
            <span class="label" v-if="item.label">{{item.label}}</span>
            <input  v-if="item.type == 'input'" v-model="item.value" :type="item.types || 'text'" class="input" :placeholder="item.placeholder">
            <!-- <select v-model="item.value" class="selects" v-if="item.type == 'select'">
                <option v-for="(items, ii) in item.list" :key="ii" :value="items.value">{{items.label}}</option>
            </select> -->
            <el-select v-model="item.value" size="small" :placeholder="item.placeholder || '请选择'" v-if="item.type == 'select'">
                <el-option
                v-for="(item, i) in item.list"
                :key="i"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-date-picker
                v-if="item.type == 'datePicker'"
                v-model="item.value"
                :type="item.types"
                :range-separator="item.rangeSpeparator"
                :start-placeholder="item.startText"
                :end-placeholder="item.endText">
            </el-date-picker>
        </div>
        <span class="btn search maL2" @click="search">搜索</span>
        <span class="btn default maL" @click="clear">清空</span>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'searchForm',
    props: {
        searchArray: {
            type: Array,
            default () {
                return [
                    {
                        type: 'input',
                        placeholder: '请输入',
                        types: 'text',
                        value: '',
                        label: '关键词：'
                    },
                    {
                        type: 'select',
                        placeholder: '请选择',
                        value: '',
                        list: [
                            {
                                label: '',
                                value: ''
                            }
                        ]
                    },
                    {
                        type: 'datePicker',
                        startText: '开始日期',
                        endText: '结束日期',
                        types: 'daterange',
                        value: '',
                        rangeSpeparator: '至'
                    }
                ]
            }
        }
    },
    methods: {
        search () {
            const {searchArray} = this
            let obj = {}
            searchArray.forEach(r => {
                obj[r.key] = r.value
            })
            this.$emit('search', obj)
        },
        clear () {
            const {searchArray} = this
            let obj = {}
            searchArray.forEach(r => {
                r.value = ''
                obj[r.key] = ''
            })
            this.$emit('clear', obj)
        }
    }
}
</script>
<style lang="less" scoped>
.search-form {
    background: #fff;
    width: 100%;
    padding: 15px 20px 0 0;
    .form-item {
        display: inline-block;
        margin-bottom: 15px;
        .label {
            font-size: 14px;
            font-weight: 600;
            color: #333;
            margin-left: 20px;
            vertical-align: middle;
        }
        .input {
            width: 250px;
            height: 30px;
            border:1px solid #ddd;
            outline: none;
            border-radius: 2px;
            padding-left: 10px;
        }
        .selects {
            min-width: 120px;
            height: 30px;
            border: 1px solid #ddd;
        }
        /deep/.el-date-editor {
            height: 30px;
            vertical-align: middle;
            .el-range__icon {
                line-height: 24px;
            }
            .el-range-separator  {
                line-height: 20px;
            }
        }
    }
    .btn {
        margin-bottom: 15px;
    }
}
</style>