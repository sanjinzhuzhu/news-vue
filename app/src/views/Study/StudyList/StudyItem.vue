<template>
    <div>
        <van-cell-group>
            <van-cell icon="fire" fixed>{{ item.title }}
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
import event from '../event'
export default {
    props: {
        item: {
            type: Object,
            default() {
                return {
                }
            }
        }
    },
    methods: {
        clickHandler(id, e) {
            e.preventDefault()
            event.$emit('jump', id)
        }
    }
}
</script>

<style lang="less" scoped>
// .van-cell {
//     .div {
//         border-bottom: grey solid 1px
//     }
// }
</style>
