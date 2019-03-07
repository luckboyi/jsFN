<template>
    <div class="pr">
        <input type="text"
            :placeholder="placeholder"
            v-model="searchTxt"
            @keyup.enter="search" />
        <!-- <img  /> -->
        <i style="left:10px;" class="searchIcon pa topCenter"></i>
    </div>
</template>
<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            searchTxt: ''
        }
    },
    methods: {
        search() {
            this.$emit('search', this.searchTxt)
        }
    }
}
</script>
<style lang="scss" scoped>
input {
    background: rgba(50, 57, 65, 1);
    border: 1px solid rgba(87, 98, 114, 1);
    border-radius: 15px;
    height: 30px;
    line-height: 30px;
    width: 175px;
    padding-left:30px;
    padding-right:15px;
}
div{
    position: relative;
}
</style>
