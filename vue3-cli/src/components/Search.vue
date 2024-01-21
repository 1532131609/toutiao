<template>
<div class="fixedSearch">
  <van-search
  v-model="value"
  shape="round"
  background="#ee0a24"
  placeholder="请输入搜索关键词"
  @click="goSearch"
/>
</div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const value = ref('');
    const router=useRouter();
    const goSearch=()=>{
      router.push("/search")
    };
    return { value,goSearch };
  },
};

</script>

<style>
.fixedSearch{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index:100;
}
</style>