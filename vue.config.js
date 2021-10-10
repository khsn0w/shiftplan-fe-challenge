module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "@/styles/_init.scss";
                `
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/shiftplan-fe-challenge/'
        : '/'
};
