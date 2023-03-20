<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委托亦称事件委派 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动列表,带有过渡效果 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用事件委派+编程式路由导航实现路由的跳转与传递参数 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: index === currentIndex }"
              >
                <!-- 一级菜单 -->
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级、三级菜单 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!-- 三级联动右上侧部分导航 -->
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 按需引入节流函数
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      // 鼠标移动到的一级菜单的索引值
      currentIndex: -1,
      // 控制三级联动列表的显示与隐藏
      show: true,
    };
  },
  methods: {
    // 鼠标经过一级菜单时把相应索引赋值给currentIndex
    // 由于此操作可能会切换的非常频繁，因此使用节流函数(里面不用箭头函数)
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    // 鼠标进入三级联动
    enterShow() {
      if (this.$route.path !== "/home") this.show = true;
    },
    // 鼠标离开三级联动
    leaveShow() {
      // 鼠标离开一级菜单时把currentIndex的值初始化为-1（解决鼠标移开但是样式依旧在的问题）
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },
    // 去往search路由
    goSearch(event) {
      // event.target.dataset获取靶元素的自定义属性及对应的属性值
      let { categoryname, category1id, category2id, category3id } =
        event.target.dataset;
      // 如果可以从此DOM元素身上结构出自定义属性categoryname（我们给他加了自定义属性data-categoryName），那他一定是a标签
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 一级菜单对应a标签
        if (category1id) {
          query.category1Id = category1id;
          // 二级菜单对应a标签
        } else if (category2id) {
          query.category2Id = category2id;
          // 三级菜单对应a标签
        } else {
          query.category3Id = category3id;
        }
        // 整合location和query对象
        location.query = query;
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        // 实现路由跳转
        this.$router.push(location);
      }
    },
  },
  // 组件挂载完毕,向服务器发请求,获取数据展示数据
  mounted() {
    // 判断当前路由是否为home
    if (this.$route.path !== "/home") {
      // 不是Home组件,show初始值默认为false
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      // 计算属性categoryList右侧函数中的参数state即为大仓库当中的数据
      categoryList: (state) => {
        // 我只想要大仓库中的home模块的categoryList数据
        return state.home.categoryList;
      },
    }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 自定义过渡动画效果
    .sort-enter {
      height: 0;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>