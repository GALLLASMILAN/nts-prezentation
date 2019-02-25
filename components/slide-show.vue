<template>
    <div v-if="isReady()">
        <div v-html="getActualHtml()"></div>
        <br>
        {{actualSlide}} / {{files.files.length}}
    </div>
</template>

<script>
export default {
    props: ["files", "actualSlideShowIndex"],
    data() {
        return {
            slides: 0,
            actualSlide: 0,
            filesWithContent: []
        };
    },
    watch: {
        async actualSlideShowIndex(value) {
            console.log("CALL watch index", value);
            await this.initProperty();
        }
    },
    methods: {
        isReady() {
            return (
                this.filesWithContent.length > 0 &&
                this.filesWithContent[this.actualSlide - 1]
            );
        },
        getActualFile(name) {
            return (
                this.files.dir.replace("static-", "") +
                "/" +
                name +
                "?timestamp=${new Date().getTime()}"
            );
        },
        getActualHtml() {
            console.log(this.actualSlide);
            return this.filesWithContent[this.actualSlide - 1].content;
        },
        async nextSlide() {
            setTimeout(() => {
                this.actualSlide = this.actualSlide + 1;
                if (this.actualSlide < this.filesWithContent.length) {
                    console.log("nextSlide");
                    this.nextSlide();
                } else {
                    setTimeout(() => {
                        this.$emit("finish", this.actualSlideShowIndex + 1);
                    }, 2000);
                }
            }, 2000);
        },
        async initProperty() {
            // reset property
            this.actualSlide = 1;
            this.filesWithContent = [];
            // load logic
            Promise.all(
                this.files.files.map(async file => {
                    const htmlConentResponse = await this.$api.get(
                        this.getActualFile("/" + file.name)
                    );
                    this.filesWithContent.push({
                        ...file,
                        content: await htmlConentResponse.data
                    });
                })
            );
            await this.nextSlide();
        }
    },
    async mounted() {
        this.initProperty();
    }
};
</script>

<style>
</style>
