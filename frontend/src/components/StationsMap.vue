<template>
  <div style="overflow:hidden;width: 700px;position: relative;">
    <iframe
      width="600"
      height="400"
      src="https://maps.google.com/maps?hl=en&amp;q=street+(undefined)&amp;ie=UTF8&amp;t=&amp;z=10&amp;iwloc=B&amp;output=embed"
      frameborder="0"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
    ></iframe>
    <div
      style="position: absolute;width: 80%;bottom: 10px;left: 0;right: 0;margin-left: auto;margin-right: auto;color: #000;text-align: center;"
    >
      <div
        style="overflow: auto; position: absolute; height: 0pt; width: 0pt;"
      >
        Powered by
        <a href="https://www.embedista.com/googlemapsembed">Google Map Embed</a>
        Code Generator
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StationsMap',
};
</script>

<style scoped>
</style>
