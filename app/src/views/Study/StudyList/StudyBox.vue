<template>
    <div class="StudyContainer flex">
        <div class="Studybox ">
            <div class="StudyFont">{{ item.title }}</div>
        </div>
    </div>

</template>

<script>
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
}
</script>

<style>
.flex {
    display: flex;

}
.StudyContainer {
    margin: auto;
    padding: 20px;
    border: 1px solid rgb(112, 164, 216);
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-size: medium;
}

.Studybox {
    margin: auto;
    width: 80px;
    height: 80px;
    border: 1px solid rgb(47, 44, 45);
    border-radius: 5px;
}

.StudyFont {
    margin: 60px auto 5px;
    text-align: center;
}
</style>