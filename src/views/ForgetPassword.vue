<template>
  <div class="forget-password-page">
    <div class="card">
      <h2>🔐 忘记密码</h2>

      <form @submit.prevent="submitForm">
        <input v-model="username" placeholder="请输入用户名" required />
        <input v-model="email" type="email" placeholder="请输入绑定邮箱" required />

        <button :disabled="loading" type="submit">
          {{ loading ? '发送中...' : '发送找回邮件' }}
        </button>
      </form>

      <p class="message" :class="{'error': error, 'success': success}">
        {{ message }}
      </p>

      <router-link to="/login" class="back-link">← 返回登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgetPassword',
  data() {
    return {
      username: '',
      email: '',
      message: '',
      error: false,
      success: false,
      loading: false
    };
  },
  methods: {
    async submitForm() {
        this.message = '';
        this.error = false;
        this.success = false;
        this.loading = true;

        try {
            const res = await this.$axios.post('/api/user/reset-password', {
            username: this.username,
            email: this.email
            }, {
            timeout: 60000,  // 设置15秒超时，防止请求被过早中断
            });

            this.message = res.data.message;
            this.success = res.data.success;
            this.error = !res.data.success;
        } catch (err) {
            console.error('邮件发送请求失败:', err);

            if (err.code === 'ECONNABORTED') {
            this.message = '请求超时，请稍后重试';
            } else if (err.response && err.response.data && err.response.data.message) {
            this.message = err.response.data.message;
            } else {
            this.message = '发送失败，请检查网络或邮箱地址';
            }
            this.error = true;
        } finally {
            this.loading = false;
        }
    }

  }
};
</script>

<style scoped>
.forget-password-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.card {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  text-align: center;
  width: 90%;
  max-width: 600px;
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

input {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #f96e46;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #e55b35;
}

.message {
  margin-top: 1rem;
  font-size: 0.95rem;
}

.message.success {
  color: green;
}

.message.error {
  color: red;
}

.back-link {
  display: inline-block;
  margin-top: 1.5rem;
  color: #666;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.3s;
}

.back-link:hover {
  color: #f96e46;
}
</style>
