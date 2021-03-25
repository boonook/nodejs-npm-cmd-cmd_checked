<template>
  <div class="spring-travel">
    <div class="spring-travel-bg">
      <img mode="widthFix" src="../../images/bg.png" style="width:100%;" alt="">
      <div class="spring-travel-dec">
        <p>
          您的好友正在航班管家领红包
        </p>
        <p>帮他助力吧</p>
      </div>
      <div class="footerBtn">
        <div  class="footerBtnLeft" @click="_onHelpHe">
          <img src="../../images/helphe.png" mode="widthFix" style="width:100%" alt="帮他助力">
        </div>
        <div @click="_onMyGave">
          <img src="../../images/myget.png" mode="widthFix" style="width:100%" alt="我也要领">
        </div>
      </div>
      <div class="firend-list-box">
        <p class="firend-list-dec">已有{{helps.length}}位好友助力</p>
        <ul class="firend-list">
          <li v-for="(item,index) in helps" :key="index">
            <div class="list-item-content">
              <div class="list-item-content-box">
                <img mode="widthFix" :src="item.userImage||''" style="width:100%" alt="">
              </div>
            </div>
          </li>
          <li>
            <div class="list-item-content" @click="_onHelpHe">
              <div class="list-item-content-box">
                <img  mode="widthFix" src="../../images/add.png" style="width:44px" alt="">
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <c-components></c-components>
  </div>
</template>

<script>
  import {handleException} from "../../../../service/helper";
  import {helpDetail,setOperator} from '../../service';
  import get from "@/utils/get";
  export default {
    name: "springTravel",
    props: {},
    components: {},
    data() {
      return {
        userCouponGuid:'581658DF9EC8D000',
        helps:[]
      }
    },
    methods: {
      getHelpDetail(){
          uni.showLoading({title: ""});
          helpDetail({id:this.userCouponGuid}).then(res=>{
            uni.hideLoading();
            this.helps = get(res, "res.bd.data.helps", []) || [];
          }).catch(err =>{
            uni.hideLoading();
            handleException.call(this, err, true)
          });
      },
      _onHelpHe(){
        uni.showLoading({title: ""});
        setOperator({id:this.userCouponGuid}).then(()=>{
          uni.hideLoading();
          handleException.call(this,'助力成功！', true);
          this.getHelpDetail();
        }).catch(err =>{
          uni.hideLoading();
          handleException.call(this, err, true)
        });
      },
      _onMyGave(){
        ///我也要领取
        const link = 'https://h5.133.cn/hangban/vue/promotion/promotion/springTravel';
        this.$router.push({
          path: "/pages/web-view/index",
          query: {url: link}
        });
      }
    },
    mounted() {
      this.getHelpDetail();
    },
    onLoad() {
      // this.userCouponGuid = this.$route.query && this.$route.query.userCouponGuid;
    },
    watch: {},
    destroyed() {

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .spring-travel {
    min-height:100vh;
    background-color:#F9E7CA;
    overflow-x: hidden;
    .spring-travel-bg{
      position:relative;
      .spring-travel-dec{
        position: absolute;
        top: 0;
        margin-top: 10%;
        width: 80%;
        margin-left:10%;
        p{
          text-align: center;
          color:#fff;
          font-size:18px;
          line-height:33px;
        }
      }
      .footerBtn{
        position: absolute;
        top: 0;
        margin-top: 111%;
        z-index:3;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        width: 80%;
        margin-left:10%;
        >div{
          flex:1;
        }
        .footerBtnLeft{
          margin-right:19px;
        }
      }
      .firend-list-box{
        position: absolute;
        z-index:3;
        top:0;
        margin-top: 143%;
        width:90%;
        margin-left:5%;
        min-height:50px;
        background-color:rgba(253,249,251,0.53);
        border-radius:16px;
        .firend-list-dec{
          text-align: center;
          color: #FF0044;
          font-size:16px;
          line-height:15px;
          padding:16px 0;
        }
        .firend-list{
          background-color:#fff;
          margin:0 10px 20px 10px;
          padding-top:20px;
          padding-right:10px;
          padding-bottom:20px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          li{
            width:25%;
            margin-bottom:10px;
            .list-item-content{
              margin-left:10px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              .list-item-content-box{
                width:48px;
                height:48px;
                background-color:#F0F0F0;
                border-radius:24px;
                overflow: hidden;
              }
            }
          }
        }
      }
    }
  }
</style>
