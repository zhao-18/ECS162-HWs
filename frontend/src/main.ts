import { mount } from 'svelte'
// import all the static stylesheets
import './styles/main.css'
import './styles/footer.css'
import './styles/header.css'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
