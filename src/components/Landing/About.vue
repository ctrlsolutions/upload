<template>
  <div class="about-container">
    <h1 class="title">ABOUT</h1>
    <p class="about-content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc molestie dictum blandit. Vivamus tempus urna ut quam hendrerit rutrum eget sed orci. Nullam tincidunt vitae ligula nec tempor. Maecenas dapibus mauris sed sapien pretium aliquet. Nullam pellentesque pulvinar risus, eu vestibulum nibh consequat blandit. Pellentesque egestas erat sed vestibulum interdum. Aenean accumsan metus aliquet placerat cursus. Cras facilisis lacus ut elit imperdiet, at ornare lacus laoreet. Donec interdum justo nec porta luctus. Pellentesque pretium tempor eros. Curabitur in velit tincidunt, ullamcorper diam et, faucibus eros. Cras fringilla nibh vel diam pretium porttitor. Nullam finibus eu enim non aliquet.
    </p>
  </div>
</template>

<script>
export default {
  name: "AboutSection",
};
</script>

<style lang="scss">
.about-container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  font-family: 'Inter', sans-serif;
  font-weight: 800; 

  min-height: 100vh; 
  max-width: 100%;  


  @include sm { 
    min-width: 20rem; 
    padding-left: 2rem; 
    padding-right: 10rem;
    padding-top: 2rem;
    padding-bottom: 22rem;

  }

  @include md { 
    min-width: 36rem; 
    padding-left: 3rem; 
    padding-right: 20rem; 
    padding-top: 2rem;
    padding-bottom: 22rem;
  }

  @include lg { 
      min-width: 48.063rem;
      padding-left: 5rem;
      padding-right: 25rem;
      padding-top: 4rem;
      padding-bottom: 22rem;
  }

  @include xl {
      min-width: 70rem;
      padding-left: 7rem;
      padding-right: 17rem;
      padding-top: 8rem;
      padding-bottom: 22rem;
  }
}

.about-content {
  color: #333;

  @include sm {
    font-size: .450rem;
  }

  @include md {
    font-size: .5rem;
  }

  @include lg {
    font-size: .90rem;
  }

  @include xl {
    font-size: 1rem;
  }
}

.title {
  color: maroon;
  font-weight: 800; 


  @include sm {
    font-size: 1rem;
  }

  @include md {
    font-size: 2rem;
  }

  @include lg {
    font-size: 3.25rem;
  }

  @include xl {
    font-size: 4rem;
  }
}
</style>
