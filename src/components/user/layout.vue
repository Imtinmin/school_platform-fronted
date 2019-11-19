<template>
    <div class="user">
        <router-view></router-view>
    </div>
</template>

<style scoped>
.user{
  margin-left:25%;
  margin-right:25%;
  overflow: hidden;
}

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
</style>