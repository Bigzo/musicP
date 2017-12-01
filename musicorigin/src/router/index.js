import App from '../App'
import HelloWorld from '../components/HelloWorld'
export default [{
  path: '/',
  component: App,
  redirect: '/musicList',
  children: [
   {path: '/musicList',redirect: '', component: r => require.ensure([], () => r(require('../pages/musicList')), 'musicList'), children: []},
  ]
},
{
	path: '/HelloWorld',
	component: HelloWorld
}]
