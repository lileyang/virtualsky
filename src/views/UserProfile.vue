<template>
  <div class="user-profile">
    <div class="card">
      <button class="back-btn" @click="goBack">返回</button>

      <h2>用户中心</h2>
      <div v-if="user" class="info">
        <p><strong>用户名：</strong>{{ user.username }}</p>

        <h3>修改资料</h3>
        <form @submit.prevent="saveProfile">
          <input v-model="email" placeholder="邮箱" type="email" />
          <input v-model="tel" placeholder="电话" />
          <button type="submit" :disabled="savingProfile">
            {{ savingProfile ? '保存中...' : '保存资料' }}
          </button>
        </form>

        <h3>修改密码</h3>
        <form @submit.prevent="changePassword">
          <input v-model="oldPassword" type="password" placeholder="旧密码" required />
          <input v-model="newPassword" type="password" placeholder="新密码" required />
          <button type="submit" :disabled="changingPwd">
            {{ changingPwd ? '提交中...' : '修改密码' }}
          </button>
        </form>

        <button class="logout-btn" @click="logout">退出登录</button>
      </div>

      <div v-else class="loading-text">正在加载用户信息...</div>
    </div>

    <div v-if="loading" class="loading-mask">加载中...</div>
  </div>
</template>

<script>
import { EventBus } from '@/utils/EventBus';

export default {
  data() {
    return {
      user: null,
      email: '',
      tel: '',
      oldPassword: '',
      newPassword: '',
      savingProfile: false,
      changingPwd: false,
      loading: false
    };
  },
  async created() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/login');
      return;
    }

    this.loading = true;
    try {
      const res = await this.$axios.get('/api/user/me', {
        headers: { Authorization: 'Bearer ' + token }
      });
      this.user = res.data;
      this.email = this.user.email || '';
      this.tel = this.user.tel || '';
    } catch (err) {
      alert('获取用户信息失败，请重新登录');
      this.$router.push('/login');
    } finally {
      this.loading = false;
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    formatDate(date) {
      return date ? new Date(date).toLocaleString() : '-';
    },
    async saveProfile() {
      this.savingProfile = true;
      try {
        const res = await this.$axios.post(
          '/api/user/update',
          { email: this.email, tel: this.tel },
          {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
          }
        );
        if (res.data.success !== false) {
          alert('资料更新成功');
        } else {
          alert(res.data.message || '资料保存失败');
        }
      } catch (err) {
        alert('保存失败，请稍后重试');
      } finally {
        this.savingProfile = false;
      }
    },
    async changePassword() {
        if (!this.oldPassword || !this.newPassword) {
            return alert('请输入旧密码和新密码');
        }

        this.changingPwd = true;
        try {
            const res = await this.$axios.post(
            '/api/user/change-password',
            {
                oldPassword: this.oldPassword,
                newPassword: this.newPassword
            },
            {
                headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
            );

            alert(res.data.message || '密码修改成功');
            this.oldPassword = '';
            this.newPassword = '';
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message); // 显示后端报错
            } else {
                alert('网络异常，修改失败'); // 网络断开等情况
            }
        } finally {
            this.changingPwd = false;
        }
        },
    logout() {
      localStorage.removeItem('token');
      EventBus.$emit('auth-change'); 
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.back-btn {
      position: absolute;
      max-width: 4rem;
      min-width: 80px;
      font-size: 18px;
      min-height: 40px;
      text-align: center;
      left: 1rem;
      background-color: rgb(255, 255, 255);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      color: rgb(65, 65, 65);
      box-shadow: 0 2px 4px rgba(53, 53, 53, 0.2);
      backdrop-filter: blur(4px);
      cursor: pointer;
      transition: 0.3s ease;
  }

.user-profile {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5vh 2vw;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  min-height: 100vh;
  box-sizing: border-box;
  font-family: 'Helvetica Neue', 'Segoe UI', Roboto, sans-serif;
}

.card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  padding: 2.5rem;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

h3 {
  font-size: 1.2rem;
  color: #34495e;
  margin-top: 2rem;
  margin-bottom: 1rem;
  border-left: 4px solid #42a5f5;
  padding-left: 0.5rem;
}

.info p {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #555;
  line-height: 1.5;
}

form {
  margin-top: 0.5rem;
}

input {
  width: 100%;
  padding: 0.8rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #42a5f5;
  box-shadow: 0 0 4px rgba(66, 165, 245, 0.2);
}

button {
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

button[type="submit"] {
  background-color: #42a5f5;
  color: white;
}

button[type="submit"]:hover {
  background-color: #1e88e5;
}

button[type="submit"]:disabled {
  background-color: #b0bec5;
  cursor: not-allowed;
}

.logout-btn {
  background-color: #f44336;
  margin-top: 1rem;
  color: white;
}

.logout-btn:hover {
  background-color: #d32f2f;
}

.loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.85);
  font-size: 1.2rem;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.loading-text {
  text-align: center;
  font-size: 1rem;
  color: #888;
}

@media (max-width: 768px) {
  .card {
    padding: 2rem 1.2rem;
  }

  h2 {
    font-size: 1.6rem;
  }

  input,
  button {
    font-size: 1rem;
    padding: 0.7rem;
  }

  h3 {
    font-size: 1rem;
  }
}

</style>
