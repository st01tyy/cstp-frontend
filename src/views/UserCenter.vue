<template>
    <div class="root">
        <Header v-bind:username="username" />
        <UserInformation v-bind:username="username" />
    </div>
</template>

<script>
    import Header from "../components/Header";
    import UserInformation from "../components/UserInformation";
    export default {
        name: "UserCenter",
        components: {
            Header, UserInformation
        },
        data: function () {
            return{
                username: ''
            }
        },
        mounted() {
            this.checkIdentity()
        },
        methods:{
            checkIdentity: function(){
                let that = this
                that.$axios.get('http://localhost:8088/data/identity').then(function(response){
                    let username = response.data
                    if(username.length == 0) {
                        console.log('陌生人')
                        that.$router.push('/')
                    }
                    else
                        console.log(username + '已登录')
                    that.username = username
                }).catch(function(response){
                    console.log(response)
                    that.$router.push('/')
                })
            }
        }
    }
</script>

<style scoped>

</style>