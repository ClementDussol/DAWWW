<template>
    <div class="range">
        <p class="name">{{ name }}</p>
        <input type="range" ref="range" :value="value" :min="min" :max="max" step="0.01" @input="handleInput"/>
        <p class="value">{{ value }}</p>
    </div>
</template>

<script>
export default {
    name : "range",
    props : ["value", "name", "min", "max"],
    methods : {
        handleInput(){
            this.$emit('input', this.$refs.range.value);
        }
    }
}
</script>

<style scoped>
    .range{
        height: 32px;
        display: flex;
    }
    p {
        padding: 8px 12px;
    }
</style>
