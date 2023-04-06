<template>
  <div v-for="a in arr">{{ a }}</div>
</template>

<script>
export default {
  name: 'Todo',
  data() {
    return {
      arr: [1, 2, 3],
    };
  },
};
</script>

<style></style>
