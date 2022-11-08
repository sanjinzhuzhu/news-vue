<template>
  <div>
    <van-cell>
      <StudyItem v-for="item in list" :key="item.id" :item="item" />
    </van-cell>
  </div>
</template>

<script>
import StudyItem from './StudyItem.vue'
export default {
  components: {
    StudyItem,
  },
  props: {
    list: {
      // type: Array,
      default() {
        return {

        }
      }
    }
  }
}
</script>

<style>

</style>