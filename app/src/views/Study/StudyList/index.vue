<template>
  <div>
      <StudyBox v-for="item in list" :key="item.id" :item="item" />
    <van-cell>
      <StudyItem v-for="item in list" :key="item.id" :item="item" />
    </van-cell>
  </div>

</template>

<script>
import StudyItem from './StudyItem.vue';
import StudyBox from './StudyBox.vue';
export default {
  components: {
    StudyItem,
    StudyBox
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