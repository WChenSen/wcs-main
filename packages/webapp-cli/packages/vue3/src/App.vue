<script setup lang="ts" name="app"></script>

<template>
  <div space-x-2 class="test mx-0" fcc>
    <router-link to="/login">login</router-link>
    <router-link to="/">home</router-link>
  </div>
  <router-view />
</template>
