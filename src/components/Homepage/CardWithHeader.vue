<template>
  <section
    class="profile-section"
    :style="dynamicStyles"
  >
    <main class="profile-container" role="main">
      <header
        class="profile-header"
        :style="{ height: headerHeight }"
        role="banner"
      >
        <!-- Header content -->
      </header>
      <div class="content-wrapper">
        <div class="flex-row">
          <div></div>
          <div class="flex-column"></div>
        </div>
        <section class="profile-content">
          <div class="profile-info">
            <!-- Profile information content -->
          </div>
          <div class="reports-section" role="complementary">
            <!-- Reports section content -->
          </div>
        </section>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  name: "CardWithHeader",
  props: {
    width: {
      type: String,
      default: "593px",
    },
    height: {
      type: String,
      default: "239px",
    },
  },
  computed: {
    headerHeight() {
      const baseHeight = 65;
      const adjustedHeight = parseFloat(this.height) * 0.3;
      return Math.max(adjustedHeight, baseHeight) + "px";
    },
    dynamicStyles() {
      return {
        "--profile-width": this.width,
        "--profile-height": this.height,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--profile-width, 593px);
  height: var(--profile-height, 239px);
  transition: all 0.3s ease-in-out;
}

.profile-container {
  width: 100%;
  height: 100%;
  border-radius: 25px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;
  background-color: #fff;
}

.profile-header {
  width: 100%;
  border-radius: 25px 25px 0 0;
  display: flex;
  align-items: center;
  padding-left: 34px;
  background-color: #014421;
}

@include sm {
  .profile-section {
    max-width: 200px;
    max-height: 150px;
  }
}

@include md {
  .profile-section {
    max-width: 300px;
    max-height: 200px;
  }
}

@include lg {
  .profile-section {
    max-width: 400px;
    max-height: 250px;
  }
}

@include xl {
  .profile-section {
    max-width: 500px;
    max-height: 300px;
  }
}
</style>
