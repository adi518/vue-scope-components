<template>
  <div id="app">
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:300');

// Bootstrap
$spacer: 1rem;
$spacers: ();
$spacers: map-merge((10: $spacer * 1), $spacers);
$spacers: map-merge((15: $spacer * 1 + 0.5), $spacers);
$spacers: map-merge((20: $spacer * 2), $spacers);
$spacers: map-merge((25: $spacer * 2 + 0.5), $spacers);
$spacers: map-merge((30: $spacer * 3), $spacers);
$spacers: map-merge((35: $spacer * 3 + 0.5), $spacers);

$body-bg: #121212;
$body-color: #f5da55;
$link-color: #8b9dc3;
$font-family-base: 'Roboto', sans-serif;

// Bootstrap (required)
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins';

// Bootstrap (optional)
@import '~bootstrap/scss/reboot';
@import '~bootstrap/scss/type';
@import '~bootstrap/scss/images';
@import '~bootstrap/scss/button-group';
@import '~bootstrap/scss/buttons';
@import '~bootstrap/scss/grid';
@import '~bootstrap/scss/utilities';

pre,
code,
kbd,
samp {
  font-size: 1rem;
}
</style>
