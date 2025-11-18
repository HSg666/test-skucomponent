<script setup>
import Vant4Sku from 'vant4-sku'
import { ref, computed } from 'vue'
import { generateSpecs } from './utils/generateSpecs'

const showSkuPopup = ref(false)
const selectedSku = ref({}) // 组件提交的sku总数据
// 商品数据结构
const product = {
  id: 1,
  name: 'XX商品',
  mainImage: 'https://i-blog.csdnimg.cn/direct/78acd709017b4ddd857ce1a89079ab60.jpeg',
  skulist: [
    {
      id: 1,
      price: 199,
      originPrice: 299,
      stock: 100,
      img: 'https://i-blog.csdnimg.cn/direct/78acd709017b4ddd857ce1a89079ab60.jpeg',
      color: '深灰绿色',
      size: '床单款1.8M床',
    },
    {
      id: 2,
      price: 199,
      originPrice: 299,
      stock: 50,
      img: 'https://i-blog.csdnimg.cn/direct/6f4997df324b465da2b57d0f45944bb9.jpeg',
      color: '烟灰卡其',
      size: '床单款1.5M床',
    },
  ],
}

// 映射字段
const fieldMap = {
  color: '颜色',
  size: '尺寸',
}

// 自动生成规格结构
const productWithSpecs = computed(() => {
  return {
    ...product,
    specs: generateSpecs(product.skulist, fieldMap),
  }
})
console.log(productWithSpecs.value, 'productWithSpecs')

// productWithSpecs 需要处理后才展示，下面会讲到如何处理以及提供sku格式化工具方法。

const handleAddToCart = (skuobj) => {
  selectedSku.value = skuobj.sku
  console.log('加入购物车:', skuobj)
}

const handleBuyNow = (skuobj) => {
  selectedSku.value = skuobj.sku
  console.log('立即购买:', skuobj)
}
</script>

<template>
  <div>
    <van-button type="primary" @click="showSkuPopup = true">显示Sku商品规格</van-button>

    <Vant4Sku
      v-model="showSkuPopup"
      :product="productWithSpecs"
      @addToCart="handleAddToCart"
      @buyNow="handleBuyNow"
    />
  </div>
</template>

<style scoped></style>
