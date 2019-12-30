export default {
    /* 获取localStorage里的token*/
    getToken(name) {
        return localStorage.getItem(name);
    },
    /* 重置表单 */
    handleReset(name) {
        this.$refs[name].resetFields();
    },
}