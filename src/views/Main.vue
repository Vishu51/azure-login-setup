<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'main-app',
  components: {
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
:deep(.v-btn--plain:not(.v-btn--active):not(.v-btn--loading):not(:focus):not(:hover)
  .v-btn__content) {
  opacity: 1;
}
.row-class:hover {
  cursor: pointer;
}
:deep(.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper)) {
  background: transparent !important;
}
.logo > .small-logo {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.notification-icon {
  width: 50px;
  margin: 0 0px 0 0px;
  border-right: solid #ededf4;
  border-width: 0 1px;
  cursor: pointer;
  height: 22px;
}
</style>
