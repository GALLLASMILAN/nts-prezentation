<template>
    <div id="main">
        <Menu />
        <div id="content">
            <nuxt />
        </div>
        <Footer />
    </div>
</template>

<script>
import Menu from "./menu";
import Footer from "./footer";
export default {
    components: { Menu, Footer }
};
</script>


<style>
html {
    padding: 0;
    margin: 0;
}
#main {
    margin: 0px;
    height: 1200px;
    width: 1920px;
}
#content {
    height: 1020px;
}
</style>
