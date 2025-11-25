"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { FixedSizeList as List, VariableSizeList } from "react-window"
import { FixedSizeGrid as Grid } from "react-window"

interface VirtualScrollProps<T> {
  items: T[]
  itemHeight: number | ((index: number) => number)
  containerHeight: number
  renderItem: (props: { index: number; style: React.CSSProperties; data: T }) => React.ReactNode
  overscan?: number
  className?: string
  onScroll?: (scrollTop: number) => void
  estimatedItemSize?: number
}

export function VirtualScroll<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
  className = "",
  onScroll,
  estimatedItemSize = 50,
}: VirtualScrollProps<T>) {
  const listRef = useRef<any>(null)

  // 固定高度的虚拟滚动
  const FixedHeightList = useMemo(() => {
    if (typeof itemHeight === "number") {
      return (
        <List
          ref={listRef}
          height={containerHeight}
          itemCount={items.length}
          itemSize={itemHeight}
          overscanCount={overscan}
          className={className}
          onScroll={({ scrollTop }) => onScroll?.(scrollTop)}
          itemData={items}
        >
          {({ index, style, data }) => renderItem({ index, style, data: data[index] })}
        </List>
      )
    }
    return null
  }, [items, itemHeight, containerHeight, overscan, className, onScroll, renderItem])

  // 可变高度的虚拟滚动
  const VariableHeightList = useMemo(() => {
    if (typeof itemHeight === "function") {
      return (
        <VariableSizeList
          ref={listRef}
          height={containerHeight}
          itemCount={items.length}
          itemSize={itemHeight}
          overscanCount={overscan}
          className={className}
          onScroll={({ scrollTop }) => onScroll?.(scrollTop)}
          itemData={items}
          estimatedItemSize={estimatedItemSize}
        >
          {({ index, style, data }) => renderItem({ index, style, data: data[index] })}
        </VariableSizeList>
      )
    }
    return null
  }, [items, itemHeight, containerHeight, overscan, className, onScroll, renderItem, estimatedItemSize])

  // 滚动到指定项目
  const scrollToItem = useCallback((index: number, align: "auto" | "smart" | "center" | "end" | "start" = "auto") => {
    if (listRef.current) {
      listRef.current.scrollToItem(index, align)
    }
  }, [])

  // 滚动到指定位置
  const scrollTo = useCallback((scrollTop: number) => {
    if (listRef.current) {
      listRef.current.scrollTo(scrollTop)
    }
  }, [])

  return (
    <div className="virtual-scroll-container">
      {typeof itemHeight === "number" ? FixedHeightList : VariableHeightList}
    </div>
  )
}

// 虚拟网格组件
interface VirtualGridProps<T> {
  items: T[]
  columnCount: number
  rowHeight: number
  columnWidth: number
  containerHeight: number
  containerWidth: number
  renderCell: (props: {
    columnIndex: number
    rowIndex: number
    style: React.CSSProperties
    data: T | undefined
  }) => React.ReactNode
  overscan?: number
  className?: string
}

export function VirtualGrid<T>({
  items,
  columnCount,
  rowHeight,
  columnWidth,
  containerHeight,
  containerWidth,
  renderCell,
  overscan = 5,
  className = "",
}: VirtualGridProps<T>) {
  const gridRef = useRef<any>(null)

  const rowCount = Math.ceil(items.length / columnCount)

  const getCellData = useCallback(
    (rowIndex: number, columnIndex: number): T | undefined => {
      const index = rowIndex * columnCount + columnIndex
      return items[index]
    },
    [items, columnCount],
  )

  return (
    <Grid
      ref={gridRef}
      height={containerHeight}
      width={containerWidth}
      rowCount={rowCount}
      columnCount={columnCount}
      rowHeight={rowHeight}
      columnWidth={columnWidth}
      overscanRowCount={overscan}
      overscanColumnCount={overscan}
      className={className}
    >
      {({ columnIndex, rowIndex, style }) =>
        renderCell({
          columnIndex,
          rowIndex,
          style,
          data: getCellData(rowIndex, columnIndex),
        })
      }
    </Grid>
  )
}

// 使用示例组件
export function VirtualCustomerList() {
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟加载大量客户数据
    const generateCustomers = () => {
      const data = []
      for (let i = 0; i < 10000; i++) {
        data.push({
          id: i,
          name: `客户 ${i + 1}`,
          company: `公司 ${i + 1}`,
          email: `customer${i + 1}@example.com`,
          phone: `138${String(i).padStart(8, "0")}`,
          value: Math.floor(Math.random() * 1000000),
          status: ["active", "inactive", "potential"][Math.floor(Math.random() * 3)],
        })
      }
      return data
    }

    setTimeout(() => {
      setCustomers(generateCustomers())
      setLoading(false)
    }, 1000)
  }, [])

  const renderCustomerItem = useCallback(
    ({ index, style, data }: { index: number; style: React.CSSProperties; data: any }) => (
      <div style={style} className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
            {data.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{data.name}</h3>
            <p className="text-sm text-gray-500">{data.company}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium text-gray-900">¥{data.value.toLocaleString()}</p>
          <p className="text-sm text-gray-500">{data.status}</p>
        </div>
      </div>
    ),
    [],
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">加载客户数据中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">客户列表 ({customers.length.toLocaleString()} 条记录)</h2>
        <p className="text-sm text-gray-500">使用虚拟滚动优化大数据渲染性能</p>
      </div>
      <VirtualScroll
        items={customers}
        itemHeight={80}
        containerHeight={600}
        renderItem={renderCustomerItem}
        className="border-t border-gray-200"
      />
    </div>
  )
}
