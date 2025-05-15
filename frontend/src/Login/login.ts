import { mount } from 'svelte'
// import all the static stylesheets
import '../styles/utils.css'
import '../styles/login.css'
import Login from "./Login.svelte";

const app = mount(Login, {
    target: document.getElementById('app')!,
})

export default app