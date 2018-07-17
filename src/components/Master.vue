<template>
    <container name="Master" :draggable="true" :main="true" :content="master"></container>
</template>

<script>
    import Tone from 'tone'

    export default {
        name:"master",
        data : () => ({
            master : Tone.Master
        })
    }
</script>

<style>

</style>
