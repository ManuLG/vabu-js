<template>
  <div>
      <b-container>
          <b-row>
              <b-col>
                        <h1>Demo page</h1>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor veritatis odio quia, sunt dolorem dolore error nam, est commodi quis molestiae illo tempora ratione vitae quod? Ducimus cupiditate provident maxime.</p>


    <pre><code class="language-js">import { ValidatorBuilder } from 'vabu-js'

const nameValidation = new ValidatorBuilder()
  .setValue('My awesome name')
  .notNull()
  .notEmpty()
  .validate()</code></pre>
              </b-col>
          </b-row>
      </b-container>
  </div>
</template>

<script>
export default {
  name: 'DemoPage',
  head() {
    return {
        link: [
          { rel: 'stylesheet', href: require('@/static/css/prism.css') },
        ],
        script: [
            {
            src: '/vabu-js/js/prism.js'
            }
        ],
        }
    }
}
</script>
