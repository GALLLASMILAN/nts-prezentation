<template>
    <div v-show="isReady">
        <Presenation
            :dirs="data"
            :sourceDir="sourceDir"
        />
    </div>
</template>

<script>
import Presenation from "../components/presentation";
export default {
    components: { Presenation },
    async asyncData({ app }) {
        return app.$api
            .get("loaddir/static")
            .then(response => {
                return {
                    isReady: true,
                    data: response.data.files.filter(file => file.isDirectory),
                    sourceDir: response.data.dir,
                };
            })
            .catch(error => {
                console.log(error.message);
                return {
                    isReady: false,
                    
                };
            });
    }
};
</script>

<style>
</style>
