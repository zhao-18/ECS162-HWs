import { mount } from 'svelte'
// import all the static stylesheets
import './styles/main.css'
import './styles/footer.css'
import './styles/header.css'
import './styles/utils.css'
import './styles/commentPane.css'
import './styles/comment.css'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
