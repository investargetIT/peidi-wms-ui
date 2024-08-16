<script setup>
import bg from '@images/pages/login.jpeg';
import { useTheme } from 'vuetify';

const form = ref({
  username: '',
  password: '',
  remember: false,
})

const vuetifyTheme = useTheme()


const isPasswordVisible = ref(false)
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="auth-wrapper d-flex align-center justify-center pa-4" style="min-height: 100vh; /* 确保容器至少占据整个视口的高度 */
  background: no-repeat center bottom / cover;
  display: flex;
  align-items: center;
  justify-content: flex-end;" :style="{ backgroundImage: `url(${bg})` }">
    <VCard class="auth-card pa-4 pt-7"
      style="width: 300px; max-width: 90vw; max-height: 600px;margin-left: auto; margin-right:2.3%;">
      <VCardItem class="d-flex flex-column align-start">
        <RouterLink to="/" class="d-flex align-center gap-3">
          <!-- eslint-disable vue/no-v-html -->
          <!-- <div class="d-flex" v-html="logo" /> -->
          <h2 class="font-weight-medium text-2xl text-uppercase" style="text-align: left;">
            欢迎登陆
          </h2>
        </RouterLink>
      </VCardItem>

      <!-- <VCardText class="pt-2">
        <h4 class="text-h4 mb-1">
          Welcome to Materio! 👋🏻
        </h4>
        <p class="mb-0">
          Please sign-in to your account and start the adventure
        </p>
      </VCardText> -->

      <VCardText>
        <VForm @submit.prevent="handleSubmit">
          <VRow>
            <!-- username -->
            <VCol cols="12">
              <VTextField v-model="form.username" label="用户名" type="username" class="mb-4" />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField v-model="form.password" label="密码" placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" class="mb-4" />
              <!-- remember me checkbox -->
              <!-- <div class="d-flex align-center justify-space-between flex-wrap my-6">
                <VCheckbox v-model="form.remember" label="Remember me" />

                <a class="text-primary" href="javascript:void(0)">
                  Forgot Password?
                </a>
              </div> -->

              <!-- login button -->
              <VBtn block type="submit">
                登陆
              </VBtn>
            </VCol>

            <!-- create account -->
            <!-- <VCol cols="12" class="text-center text-base">
              <span>New on our platform?</span>
              <RouterLink class="text-primary ms-2" to="/register">
                Create an account
              </RouterLink>
            </VCol>

            <VCol cols="12" class="d-flex align-center">
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol> -->

            <!-- auth providers -->
            <!-- <VCol cols="12" class="text-center">
              <AuthProvider />
            </VCol> -->
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>

<script>
const BASE_URL = import.meta.env.VITE_API_USER_ENDPOINT;
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async handleSubmit() {
      try {
        console.error('错误！');
        // 假设你的登录接口是 '/api/login'
        const response = await fetch(BASE_URL + 'user/login/password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          }),
        });

        const result = await response.json();

        if (response.ok) {
          // 登录成功处理
          console.log('Login successful:', result);
          // 可以执行登录成功后的逻辑，比如跳转到其他页面
          // 假设 result 中包含 token 信息
          if (result.token) {
            // 将 token 存储到 localStorage
            localStorage.setItem('authToken', result.token);
            // 可以执行登录成功后的逻辑，比如跳转到其他页面
            this.$router.push('/dashboard'); // 例如跳转到用户仪表板
          } else {
            console.error('No token found in the response');
          }
        } else {
          // 登录失败处理
          this.errorMessage = result.message || 'Login failed. Please try again.';
          console.error('Login failed:', result);
        }
      } catch (error) {
        // 网络错误处理
        console.error('Network error:', error);
      }
    }
  }
};
</script>
