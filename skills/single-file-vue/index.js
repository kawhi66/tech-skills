import Vue from "vue/dist/vue.js" // compiler-included
import "../../public/style.css"

Vue.config.productionTip = false

new Vue({
    el: "#app",
    template: `<app></app>`,
    components: {
        App: () => import("./app.vue")
    }
})