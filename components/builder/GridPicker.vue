<template>
    <div>
        <section class="builder__grid-picker">
            <b-button variant="outline-info" @click="addGrid">Add</b-button>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'GridPicker',
        data() {
            return {

            }
        },
        mounted() {

        },
        methods: {
            addGrid(e) {
                e.preventDefault();
                console.log('cleckied')
            }
        }
    }
</script>

<style>
.builder__grid-picker {
    border: 2px dashed rgba( 0,0,0,0.3 );
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    background-color: rgba(255,255,255,0.3);
}
</style>