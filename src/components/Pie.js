import Vue from 'vue'
import Chart from 'chart.js'
import { mergeOptions } from './option'

export default Vue.extend({
  template: `
    <div>
      <canvas :id="chartId" :width="width" :height="height"></canvas>
    </div>
  `,

  props: {
    chartId: {
      default: 'pie-chart',
      type: String
    },
    width: {
      default: 400,
      type: Number
    },
    height: {
      default: 400,
      type: Number
    }
  },

  data () {
    return {
      defaultOptions: {
      }
    }
  },

  methods: {
    renderChart (data, options) {
      let chartOptions = mergeOptions(this.defaultOptions, options)

      this._chart = new Chart(
        this.$refs.canvas.getContext('2d'), {
          type: 'pie',
          data: data,
          options: chartOptions
        }
      )
      this._chart.generateLegend()
    }
  },
  beforeDestroy () {
    this._chart.destroy()
  }
})