<template>
  <div class="bg-white">
    <header-comp />

    <!-- <cart /> -->

    <nuxt />

    <footer-comp />
  </div>
</template>

<script>
// import Cart from '@/components/Cart'
// export default {
//   components: { Cart },
// }

import HeaderComp from '@/components/HeaderComp';
import FooterComp from '@/components/FooterComp';
export default {
  components: { HeaderComp, FooterComp },
};
</script>
