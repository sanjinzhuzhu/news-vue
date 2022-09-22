<template>
  <div>
    <ArticleItem v-for="obj in list" :key="obj.art_id" :artObj="obj"></ArticleItem>
    
  </div>
</template>

<script>
import ArticleItem from "./ArticleItem";

export default {
  props:{
    list:Array
  },
  components: {
    ArticleItem,
  },
};
</script>

<style>
</style>