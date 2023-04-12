import { defineComponent, ref } from 'vue';
import App from './app';

export default defineComponent({
  name: 'aIndex',
  setup() {
    const count = ref(0);

    count.value++;
    count.value + 1;
    1 + count.value;

    return () => (
      <>
        <h2>About</h2>
        <App />
      </>
    );
  },
});
