<template>
  <section class="profile-section" :style="dynamicStyles">
    <CardComponent :width="width" :height="height">
      <header class="profile-header" :style="{ height: headerHeight, width: width }" role="banner">
        <h2 class="profile-title">{{ title }}</h2>
      </header>
      <div class="content-wrapper">
        <section class="profile-content">
          <slot></slot>
        </section>
      </div>
    </CardComponent>
  </section>
</template>

<script lang="ts">
import CardComponent from "@/components/Global/CardComponent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardWithHeader",
  components: { CardComponent },
  props: {
    width: {
      type: String,
      default: "593px",
    },
    height: {
      type: String,
      default: "239px",
    },
    title: {
      type: String,
      default: "",
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
});
</script>

<style lang="scss" scoped>
.profile-section {
  display: flex;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  width: var(--profile-width, 593px);
  height: var(--profile-height, 239px);
  transition: all 0.3s ease-in-out;
}

.profile-header {
  width: 100%;
  padding: 0 25px;
  border-radius: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: #014421;
}

.profile-title {
  color: $white;
  font-family: "Segoe UI",
  Roboto,
  Oxygen,
  Ubuntu,
  Cantarell,
  "Open Sans",
  "Helvetica Neue",
  sans-serif;
  font-size: 16px;
  font-weight: 600;
}

@include sm {
  .profile-section {
    border-radius: 20px;
    max-width: 200px;
    max-height: 150px;
  }
}

@include md {
  .profile-section {
    border-radius: 20px;
    max-width: 300px;
    max-height: 200px;
  }
}

@include lg {
  .profile-section {
    border-radius: 20px;
    max-width: 400px;
    max-height: 250px;
  }
}

@include xl {
  .profile-section {
    border-radius: 20px;
    max-width: 500px;
    max-height: 300px;
  }
}
</style>
