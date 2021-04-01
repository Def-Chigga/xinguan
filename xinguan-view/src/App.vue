<template>
  <div id="app">
    <!--路由切换下的router-view添加过渡-->
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOut">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="scss">
</style>
