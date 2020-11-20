<template>
  <div class="hello">
    <h1>\{{ msg }}</h1>
    {{#oss}}
    <input type="file" name="file" @change="handleChange">
    <img v-if="imgUrl" class="img" :src="imgUrl" alt>
    {{/oss}}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'{{#oss}},
      imgUrl: ''{{/oss}}
    }
  }{{#oss}},
  methods: {
    async handleChange (e) {
      const file = e.target.files[0]
      try {
        const data = await this.$lingOssUpload.upload({
          file,
          host: 'http://testimagecdn.didano.com',
          dirName: 'formal/test/hehe',
          selfName: false,
          limitType: 'image',
          limitSize: 1024 * 1024 * 1,
          onProgress: (event) => {
            console.log(parseInt((event.loaded / event.total) * 100) + '%')
          }
        })
        this.imgUrl = data.data
      } catch (err) {
        console.log((err && err.message) || "Network Error")
      }
    }
  }{{/oss}}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello {
  color: $red;
}
{{#oss}}
.img {
  max-width: 100%;
  height: auto;
}
{{/oss}}
</style>
