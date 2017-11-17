import App from '../App'
import Detail from '../pages/navPages/detail'
import Helloworld from '../components/HelloWorld'

export default [{
  path: '/',
  component: App,
  redirect: '/findmusic/recommendmusic',
  children: [
  {path: '/findmusic',redirect: '/findmusic/recommendmusic', component: r => require.ensure([], () => r(require('../pages/navPages/findmusic')), 'findmusic'), children: [
    {path: '/findmusic/recommendmusic', component: r => require.ensure([], () => r(require('../pages/classifyMusic/recommendMusic')), 'recommendMusic')},
    {path: '/findmusic/hotmusic', component: r => require.ensure([], () => r(require('../pages/classifyMusic/hotMusic')), 'hotMusic')},
    {path: '/findmusic/rankingmusic', component: r => require.ensure([], () => r(require('../pages/classifyMusic/rankingMusic')), 'rankingMusic')}
  ]},
  {path: '/mymusic', component: r => require.ensure([], () => r(require('../pages/navPages/mymusic')), 'mymusic')},
  {path: '/friends', component: r => require.ensure([], () => r(require('../pages/navPages/friends')), 'friends')},
  {path: '/mall', component: r => require.ensure([], () => r(require('../pages/navPages/mall')), 'mall')},
  {path: '/musicpeople', component: r => require.ensure([], () => r(require('../pages/navPages/musicpeople')), 'musicpeople')},
  {path: '/loading', component: r => require.ensure([], () => r(require('../pages/navPages/loading')), 'loading')}
  ]
}, {
  path: '/detail',
  component: Detail
}, {
  path: '/helloworld',
  component: Helloworld
}]
