<template>
    <div>
        <div v-show="$route.params.id == 'createTeam'">
             <creatTeam></creatTeam>
        </div>
        <div v-show="$route.params.id == 'myTeam'">
            <myTeam></myTeam>
        </div>
        <div v-show="$route.params.id=='teamList'">
            <teamList></teamList>
        </div>
    </div>
</template>
<script>
import teamList from '@/components/team/teamList'
import myTeam from '@/components/team/myTeam'
import creatTeam from '@/components/team/creatTeam'
export default {
    components:{
        teamList,
        myTeam,
        creatTeam
    },
    mounted() {
        
    },
}
</script>

