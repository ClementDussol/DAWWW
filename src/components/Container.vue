<template>
    <div class="container" :style="style">
        <p @mousedown.prevent="onMouseDown" :style="{ cursor : draggable ? 'move' : 'auto', backgroundColor : this.color }">{{ name }}</p>
        <slot></slot>
        <anchor class="input"  v-if="main == true"/>
        <anchor class="output" v-if="main == true"/>
    </div>
</template>

<script>
export default {
    props : {
        draggable : {
            type : Boolean,
            default : false,
        },
        name : {
            type : String,
            default : "Node"
        },
        color : {
            type : String,
            default : "black"
        },
        content : {
            type : Object,
            default : ()=>({})
        },
        main : {
            type : Boolean,
            default : false,
        }
    },
    data : () => ({
        dragging : false,
        mouseOffset : { x : 0, y : 0},
        position : { x : 0, y : 0 }
    }),
    computed : {
        style(){
            let style = {
                top  : this.position.y + "px",
                left : this.position.x + "px",
            }
            if(!this.main)
                style.width = "100%" 
            
            return style;
        }
    },
    methods : {
        onMouseDown(e){
            if(!this.draggable) return;
            this.dragging = true;

            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
        },
        onMouseMove(e){
            if(!this.draggable) return;
            if(!this.dragging) return;
            this.position.x += e.movementX;
            this.position.y += e.movementY;  
        },
        onMouseUp(e){
            if(!this.draggable) return;
            this.dragging = false;
            document.removeEventListener("mousemove", this.onMouseDown);
            document.removeEventListener("mouseup", this.onMouseUp);
        }
    }
}
</script>

<style scoped>
    .container {
        width: fit-content;
        position: relative;
        background-color: white;
    }
    .container > p {
        padding: 8px 12px;
        margin: 0;
        color : white;
    }
    .input, .output {
        position: absolute;
    }
    .input {
        top: 8px;
        left: -24px;
    }
    .output {
        top: 8px;
        right: -24px;
    }
</style>
