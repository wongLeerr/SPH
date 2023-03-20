<template>
  <div class="pagination">
    <!-- 上部 -->
    <button :disabled="pageNo === 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo === 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>
    <!-- 中部 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-show="startNumAndEndNum.start <= page"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo === page }"
    >
      {{ page }}
    </button>

    <!-- 下部 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="pageNo === totalPage"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo === totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  data() {
    return {};
  },
  computed: {
    // 总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 连续页码起始数字与结束数字
    startNumAndEndNum() {
      // 解构需要使用的变量
      let { total, totalPage, continues, pageNo, pageSize } = this;
      // 起始数字
      let start = 0;
      // 结束数字
      let end = 0;
      // 如果确定了连续页码数就是5，这就意味着必须保证有5页以上的数据
      // 没有5页数据这种情况客观存在，因此做出特殊处理
      if (totalPage < continues) {
        start = 1;
        end = totalPage;
      } else {
        //   最一般的情况，即总页数大于等于连续页码
        start = pageNo - Math.floor(continues / 2);
        end = pageNo + Math.floor(continues / 2);
        // 但start完全可能是0和负数，因此需要特殊处理
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 但end完全可能是大于totalPage的数字，也要特殊处理
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
