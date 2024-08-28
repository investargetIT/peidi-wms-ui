<script setup>
import bg from '@images/pages/login.jpeg';

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
            欢迎登录
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
              <VTextField v-model="username" label="用户名" type="username" class="mb-4" />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField v-model="password" label="密码" placeholder="············"
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
              <VBtn block type="submit">登录</VBtn>
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

    <v-dialog v-model="dialog" width="auto">
      <v-card min-width="400" title="登录失败" subtitle="用户名或密码错误">
        <template v-slot:actions>
          <v-btn class="ms-auto" text="取消" @click="dialog = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>

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
      password: '',
      dialog: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await fetch(BASE_URL + '/user/login/password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `username=${this.username}&password=${this.password}`,
        });
        const result = await response.json();
        if (result.success) {
          localStorage.setItem('authToken', result.data);
          this.$router.push('/inventory-warning');
        } else {
          this.dialog = true;
          console.log('Login failed:', result);
        }
      } catch (error) {
        // 网络错误处理
        console.error('Network error:', error);
      }
    }
  }
};
</script>
