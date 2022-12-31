<template>
  <div>
    <van-nav-bar title="学习中心" left-arrow @click-left="$router.back()" fiexd />
    <!-- 学习组件 -->
    <StudyList :list="StudyList" />
    <MonitorConsole />
  </div>
</template>

<script>
import StudyList from './StudyList/index.vue'
import MonitorConsole from './MonitorConsole/index.vue'

export default {
  components: {
    StudyList,
    MonitorConsole
  },
  data() {
    return {
      StudyList: [
        {
          id: 1,
          title: 'HTML',

        },
        {
          id: 2,
          title: 'CSS',

        },
        {
          id: 3,
          title: 'JavaScript',

        },
        {
          id: 4,
          title: 'Ajax',

        },
        {
          id: 5,
          title: 'Vue',

        },
        {
          id: 6,
          title: 'Git',

        },
        {
          id: 7,
          title: 'Node.js',

        },
        {
          id: 8,
          title: 'Webpack',

        }
      ],
      StudyNav:[
        {id:1}, {id:2}, {id:3}, {id:4}, {id:5}, {id:6}, {id:7}, {id:8},
      ]
    }
  }
}
</script>

<style>

</style>