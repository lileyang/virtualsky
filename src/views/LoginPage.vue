<template>
  <div class="auth-page">
    <h2>登录</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="用户名" required />
      <input v-model="password" type="password" placeholder="密码" required />
      <button type="submit">登录</button>
      <p class="switch" @click="$router.push('/register').catch(() => {});">还没有账号？去注册</p>
    </form>
  </div>
</template>

<script>

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const res = await this.$axios.post('http://virtual-sky.online:8080/api/login', {
          username: this.username,
          password: this.password
        });
        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
          alert(res.data.message);
          this.$router.push('/Home');
        } else {
          alert(res.data.message || '登录失败');
        }
      } catch (err) {
        console.error(err);
        alert('服务器错误');
      }
    }
  }
};
</script>

<style scoped>
.auth-page {
  width: 90vw;
  margin: 5vw auto;
  font-family: 'MyFont';
  text-align: center;
}

input {
  display: block;
  width: 80%;
  margin: 2vw auto;
  padding: 2vw;
  font-size: 4vw;
  border: 1px solid #ccc;
  border-radius: 1vw;
}

button {
  width: 60%;
  padding: 2vw;
  font-size: 4vw;
  background-color: orange;
  color: white;
  border: none;
  border-radius: 1vw;
  margin-top: 2vw;
}

.switch {
  font-size: 3.5vw;
  margin-top: 2vw;
  color: #007bff;
  cursor: pointer;
}
</style>
