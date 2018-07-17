<template>
    <div @click="connect"></div>
</template>

<script>
export default {
    name : "anchor",
    methods : {
        connect(){
            console.log(this.$parent);
            this.$parent.$parent.$parent.connect(this.$parent.content, this.$el);
        }
    }
}
</script>

<style scoped>
    div {
        width: 16px;
        height: 16px;
        border-radius: 100%;
        background-color: springgreen;
    }
</style>
