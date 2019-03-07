<template>
  <div class="w12">
    <infoCom v-if="$store.state.user.basicInfo.nickName !=''" :basicInfo="userInfo"/>
    <infoCom v-if="$store.state.user.basicInfo.nickName ==''" :basicInfo="userInfo"/>
  </div>
</template>
<script>
import infoCom from "@/components/personalInfo/info";
import { get_other_userInfo } from "@/request/user";
export default {
  components: {
    infoCom
  },
  data() {
    return {
      userInfo: {}
    };
  },
  created() {
    this.getOtherInfo();
  },
  methods: {
    async getOtherInfo() {
      let res = await get_other_userInfo(this.$route.params.id);
      if (res.code == 200) {
        this.userInfo = res.data;
      }
    }
  }
};
</script>

