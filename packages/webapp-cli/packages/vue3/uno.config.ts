import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: {
    fcc: 'flex justify-center items-center',
    fbt: 'flex justify-between items-center'
  },
  postprocess() {},
  presets: [presetUno(), presetAttributify(), presetIcons(), presetTypography()],
  transformers: [transformerAttributifyJsx(), transformerVariantGroup(), transformerDirectives()]
})
