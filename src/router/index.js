import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import(/* webpackChunkName: 'Login' */ '../views/Login.vue')
const Index = () => import(/* webpackChunkName: 'Index' */ '../views/Index.vue')
const NewUser = () => import(/* webpackChunkName: 'NewUser' */ '../views/NewUser.vue')
const Info = () => import(/* webpackChunkName: 'Info' */ '../views/Info.vue')
// 科研成果
const ListLook = () => import(/* webpackChunkName: 'Achievements' */ '../views/Achievements/List_look.vue')
const ListQuery = () => import(/* webpackChunkName: 'Achievements' */ '../views/Achievements/List_query.vue')
const Manage = () => import(/* webpackChunkName: 'Achievements' */ '../views/Achievements/Manage.vue')
const Submit = () => import(/* webpackChunkName: 'Achievements' */ '../views/Achievements/Submit.vue')
// 交流社区
const AboutMy = () => import(/* webpackChunkName: 'Communication' */ '../views/Communication/About_my.vue')
const Community = () => import(/* webpackChunkName: 'Communication' */ '../views/Communication/community.vue')
// 我的科研成果登记（审批）
const CurrentStatus = () => import(/* webpackChunkName: 'my' */ '../views/my/Current_status.vue')
const HistoryAdmin = () => import(/* webpackChunkName: 'my' */ '../views/my/History_admin.vue')
const HistoryUser = () => import(/* webpackChunkName: 'my' */ '../views/my/History_user.vue')
// 个人管理
const AddAdmin = () => import(/* webpackChunkName: 'personal' */ '../views/personal/Add_admin.vue')
const ChangeInfo = () => import(/* webpackChunkName: 'personal' */ '../views/personal/Change_info.vue')
const ManageUser = () => import(/* webpackChunkName: 'personal' */ '../views/personal/Manage_user.vue')
const PersonalInfo = () => import(/* webpackChunkName: 'personal' */ '../views/personal/Personal_info.vue')
// 科研成果登记（审批）
const ProcessAgree = () => import(/* webpackChunkName: 'process' */ '../views/process/Process_agree.vue')
const ProcessLook = () => import(/* webpackChunkName: 'process' */ '../views/process/Process_look.vue')
const ProcessRecord = () => import(/* webpackChunkName: 'process' */ '../views/process/Process_record.vue')
const ProcessDetail = () => import(/* webpackChunkName: 'process' */ '../views/process/Process_detail.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/index',
    component: Index,
    children: [
      {
        path: '',
        component: Info
      },
      {
        path: '/listlook',
        component: ListLook
      },
      {
        path: '/listquery',
        component: ListQuery
      },
      {
        path: '/manage',
        component: Manage
      },
      {
        path: '/submit',
        component: Submit
      },
      {
        path: '/aboutmy',
        component: AboutMy
      },
      {
        path: '/community',
        component: Community
      },
      {
        path: '/currentstatus',
        component: CurrentStatus
      },
      {
        path: '/historyadmin',
        component: HistoryAdmin
      },
      {
        path: '/historyuser',
        component: HistoryUser
      },
      {
        path: '/addadmin',
        component: AddAdmin
      },
      {
        path: '/changeinfo',
        component: ChangeInfo
      },
      {
        path: '/manageuser',
        component: ManageUser
      },
      {
        path: '/personalinfo',
        component: PersonalInfo
      },
      {
        path: '/processagreen',
        component: ProcessAgree
      },
      {
        path: '/processlook',
        component: ProcessLook
      },
      {
        path: '/processrecord',
        component: ProcessRecord
      },
      {
        path: '/processdetail',
        component: ProcessDetail
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/newuser',
    component: NewUser
  }
]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
