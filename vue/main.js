// COMPONENT PARENT
Vue.component('usuarios', {
    template: '#usuarios-template',
    mounted() {
        axios.get('https://randomuser.me/api/?results=100')
        .then((datos) => {
            console.log(datos)
             const listado = datos.data.results.map((usuario) => {
                return {
                    nombre: `${usuario.name.title} ${usuario.name.first} ${usuario.name.last}`,                    
                    email: usuario.email,
                    foto: usuario.picture.large,
                }
               
           });
           this.usuarios = listado;
        });
    },
    data () {
        return {
            usuarios: [],
            busqueda: '',
        }
    },
    computed: {
        filtrarUsuarios() {
             return this.usuarios.filter((usuarios) => {
                  return usuarios.nombre.includes(this.busqueda);
             });
        }
    }

});
//COMPONENT CHILD
Vue.component('usuario', {
    props: ['datos'],
    template: '#usuario-template',
})
//INSTANCE VUE
new Vue({
    el: 'main',
});
