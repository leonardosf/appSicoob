// https://www.npmjs.com/package/uglify-js
module.exports = {

    /**
     * mangle: uglify 2's mangle option
     */
    mangle: { keep_fnames: true },

    /**
     * compress: uglify 2's compress option
     */
    compress: {
        toplevel: true,
        pure_getters: true,
        drop_debugger: true,
        drop_console: true,
        keep_fnames: true
    }
};