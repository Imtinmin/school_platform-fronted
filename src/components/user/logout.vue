<template>
    
</template>

<script>
export default {
    mounted(){
        try {
            this.$store.commit('logout');
            localStorage.clear();
            this.$router.push('/');
        } catch (error) {
            this.$handleError(error);
        }

    }
}
</script>