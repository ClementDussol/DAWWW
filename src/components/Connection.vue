<template>
    <div>
        <svg v-if="connection" :width="width" :height="height" :style="{ top : centerA.y, left : centerA.x }">
            <path :d="path" stroke="springgreen" @click="disconnect" stroke-width="4px"/>
        </svg>
    </div> 
</template>

<script>
    export default {
        name : "connection",
        props : ["connection"],
        computed : {
            centerA(){ return this.getCenter(this.connection[0].el.getBoundingClientRect()) },
            centerB(){ return this.getCenter(this.connection[1].el.getBoundingClientRect()) },
            width(){
                return Math.abs(this.centerA.x - this.centerB.x);
            },
            height(){
                return Math.abs(this.centerA.y - this.centerB.y);
            },
            path(){
                return "M 0 0 L" + this.width + " " + this.height
            }
        },
        methods : {
            getPath(){
                console.log(this.connection);
                
                let boundsA = this.connection[0].el.getBoundingClientRect();
                let centerA = this.getCenter(boundsA);

                let boundsB = this.connection[1].el.getBoundingClientRect();
                let centerB = this.getCenter(boundsB);

                return "M" + centerA.x + ' ' + centerA.y 
                    + " L" + (centerA.x + 32) + ' ' + centerA.y
                    + " L" + (centerB.x - 32) + ' ' + centerB.y 
                    + " L" + (centerB.x) + ' ' + centerB.y
                    + " Z";
            },
            disconnect(){
                this.$parent.disconnect(this.connection);
            },
            getCenter(bounds){
                return { x : (bounds.left + bounds.right) / 2, y : (bounds.top + bounds.bottom) / 2 }
            }
        }
    }
</script>

<style scoped>
    svg {
        position : absolute;
    }
    path:hover {
        stroke:red;
    }
</style>
