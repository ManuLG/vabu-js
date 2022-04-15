<template>
<div>
  <div class="hero-image d-flex align-items-center justify-content-center">
    <div class="text-center w-50">
      <img :src="require('@/static/img/vabu-logo.png')" alt="logo">
      <p>A validation libray that allows you to build complex validations in an easy and clear way</p>

      <div>
        <b-button :to="'#documentation'">
          Documentation
        </b-button>

        <b-button :to="{ name: 'demo' }">
          Live demo
        </b-button>
      </div>
    </div>
  </div>

  <b-container id="documentation" class="mt-4" v-if="false">
    <b-row>
      <b-col cols="3">
        <ul>
          <li>
            Get started
          </li>
          <li>Single validator</li>
          <li>Built-in validators</li>
          <ul>
            <li>notNull</li>
            <li>notNull</li>
          </ul>
        </ul>
      </b-col>

      <b-col cols="9">
        <h2>Get started</h2>

        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa, exercitationem! Excepturi, officiis hic? Quia nesciunt illum nam, sit dignissimos et mollitia! Tenetur, dolore labore? Assumenda voluptatum animi obcaecati tenetur quae?
        </p>

        <div>
          <h2>
            Single validator
          </h2>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta illo rem aliquid eum vero sunt quos provident officia assumenda asperiores labore repellendus maiores vel autem non necessitatibus, repudiandae deserunt hic.
          </p>
        </div>

        <div>
          <h2>Build-in validators</h2>

          <h5>notNull</h5>
          <h5>notEmpty</h5>
          <h5>minLength</h5>
          <h5>maxLength</h5>
          <h5>each</h5>
          <p>If the value is an Array</p>
        </div>


      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  layout: 'default'
})
</script>

<style scoped>
.hero-image {
  height: 100vh;
  background-color: aliceblue;
}
</style>
