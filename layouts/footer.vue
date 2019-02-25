<template>
    <div id="footer">
        <div class="footer-div">{{time}}</div>
        <div class="footer-div slide-div">fdfasdf</div>
        <div class="footer-div date-div">{{rightDate}} </div>
    </div>
</template>

<script>
import { myDate, myMonth } from '../libs/dateUtils.js';
export default {
    data() {
        const date = new Date();
        return {
            time: `${date.getHours()}:${date.getUTCMinutes()}`,
            rightDate: `${myDate(date)} / ${date.getDate()}.${myMonth(
                date
            )} ${date.getFullYear()}`
        };
    }
};
</script>

<style>
#footer {
    height: 80px;
    width: 100%;
}
.footer-div{
    float: left;
    width: 33%;
    height: 100%;
    background-color: red;
}
.date-div{
    text-align: right;
    background-color: red;
}
.slide-div {
    text-align: center;
    background-color: red;
}
</style>
