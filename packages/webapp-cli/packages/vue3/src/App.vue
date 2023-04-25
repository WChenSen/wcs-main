<script setup lang="ts"></script>

<template>
  <div space-x-2 class="test" fcc>
    <router-link to="/login">login</router-link>
    <router-link to="/">home</router-link>
  </div>
  <router-view />
</template>

<style scoped>
.test {
  display: flex;
  align-items: center;
  justify-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  grid-gap: 20px;
}
</style>
