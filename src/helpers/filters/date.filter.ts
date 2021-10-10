import Vue from 'vue';
import moment from 'moment';

Vue.filter('date', function (value: string, format: string) {
    if (!value) return ''
    return moment(value).format(format);
})
