<template>
  <v-dialog max-width="400px" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text class="hidden-xs-only" v-bind="attrs" v-on="on">
        Вход
        <v-icon right>mdi-login-variant</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h1 class="title">Вход для администраторов</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field v-model="login" :rules="inputRules" label="Логин" prepend-icon="mdi-account-circle" />
          <v-text-field
            v-model="password"
            :rules="inputRules"
            :type="showPassword ? 'text' : 'password'"
            label="Пароль"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text block color="success" @click="submit">Вход</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    login: "",
    password: "",
    showPassword: false,
    inputRules: [
      v => v.length >= 3 || "Минимальная длина данного поля - 3 символа"
    ]
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
          console.log(this.login, this.password)

          this.dialog = false
      }
    }
  }
};
</script>