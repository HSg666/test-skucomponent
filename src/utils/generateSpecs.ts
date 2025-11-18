/**
 * 从 skulist 自动生成 specs 结构，并映射字段名为中文
 * @param skulist - SKU 列表
 * @param fieldMap - 字段名映射表，如 { color: '颜色' }
 * @returns specs - 规格结构
 */
export function generateSpecs(
  skulist: Array<Record<string, any>>,
  fieldMap: Record<string, string> = {},
): Array<{ name: string; key: string; options: Array<any> }> {
  if (!skulist || skulist.length === 0) return []

  // 自动从 fieldMap 的 key 中提取 includeFields
  const includeFields = Object.keys(fieldMap)

  // 只从 skulist 中提取指定字段作为规格维度
  const allKeys = [...new Set(skulist.flatMap((sku) => Object.keys(sku)))].filter((key) =>
    includeFields.includes(key),
  )

  // 为每个 key 生成 options，并映射中文名
  const specs = allKeys.map((key) => {
    const options = [...new Set(skulist.map((sku) => sku[key]))].filter(Boolean)
    return {
      name: fieldMap[key] || key, // 显示用的中文名
      key, // 用于匹配的原始字段名
      options,
    }
  })

  return specs
}
