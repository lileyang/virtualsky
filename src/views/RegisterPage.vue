<template>
  <div class="auth-page">
    <h2>注册</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="username" placeholder="用户名" required />
      <input v-model="password" type="password" placeholder="密码" required />
      <input v-model="email" placeholder="邮箱" />
      <input v-model="tel" placeholder="电话" />
      <button type="submit">注册</button>
      <p class="switch" @click="$router.push('/login')">已有账号？去登录</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterPage',
  data() {
    return {
      username: '',
      password: '',
      tel: '',
      email: '',
    };
  },
  methods: {
    async handleRegister() {
        try {
            const res = await axios.post(axios.defaults.baseURL +'api/register', {
            username: this.username,
            email: this.email,
            tel: this.tel, // ✅ 添加 tel 字段
            password: this.password
            });

            if (res.data.success) {
            alert(res.data.message || '注册成功');
            this.$router.push('/login');
            } else {
            alert(res.data.message || '注册失败');
            }

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || '注册请求出错');
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
  background-color: seagreen;
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
