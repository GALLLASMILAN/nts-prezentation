<template>
    <div v-if="isReady()">
        <SlidShow
            :files="files[actualSlideShowIndex]"
            :actualSlideShowIndex="actualSlideShowIndex"
            @finish="next($event)"
        />
    </div>
    <div v-else>
        nemám data
    </div>
</template>

<script>
import SlidShow from "./slide-show";
export default {
    components: { SlidShow },
    props: ["dirs", "sourceDir"],
    data() {
        return {
            files: [],
            actualSlideShowIndex: 1
        };
    },
    methods: {
        isReady() {
            return (
                this.files &&
                this.files.length > 0 &&
                this.files[this.actualSlideShowIndex]
            );
        },
        async next(index) {
            console.log("ttt");
            if (index < this.files.length) {
                this.actualSlideShowIndex = index;
            } else {
                await this.loadData();
                this.actualSlideShowIndex = 0;
            }
        },
        async loadData() {
            // load data
            Promise.all(
                this.dirs.map(async dir => {
                    const source = `loaddir/${this.sourceDir}-${
                        dir.name
                    }?timestamp=${new Date().getTime()}`;
                    const response = await this.$api.get(source);
                    const data = {
                        files: response.data.files
                            .filter(onlyFiles)
                            .filter(onlyHtml),
                        dir: response.data.dir
                    };
                    if (notEmptyFiles(data)) {
                        this.files.push(data);
                    }
                })
            );
        }
    },
    async created() {
        await this.loadData();
    }
};

// filters
function onlyFiles(item) {
    return !item.isDirectory;
}

function onlyHtml(item) {
    return item.extension === "html";
}

function notEmptyFiles(item) {
    return item.files.length > 0;
}
</script>