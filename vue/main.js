// COMPONENT PARENT
Vue.component('usuarios', {
    template: '#usuarios-template',
    mounted() {
        axios.get('https://randomuser.me/api/?results=100&nat=es')
            .then((datos) => {
                const listado = datos.data.results.map((usuario) => {
                    return {
                        nombre: `${usuario.name.first.charAt(0).toUpperCase() + usuario.name.first.slice(1)}
                             ${usuario.name.last.charAt(0).toUpperCase() + usuario.name.last.slice(1)}`,
                        genero: usuario.gender,
                        email: usuario.email,
                        foto: usuario.picture.large,
                        localizacion: usuario.location.city.charAt(0).toUpperCase() + usuario.location.city.slice(1),
                    }
                });
                this.usuarios = listado;
                console.log(this.usuarios)
            });
    },
    data() {
        return {
            usuarios: [],
            busquedaUsuario: '',
            busquedaCiudad: '',
        }
    },
    computed: {
        filtrarUsuarios () {
            return this.usuarios.filter((usuarios) => {
                return usuarios.nombre.toLowerCase().includes(this.busquedaUsuario.toLowerCase())
                && usuarios.localizacion.toLowerCase().includes(this.busquedaCiudad.toLowerCase()) 
            });
       },        
    },
    
});
//COMPONENT CHILD
Vue.component('usuario-target', {
    props: ['datos'],
    template: '#usuario-template',
})
//INSTANCE VUE
new Vue({
    el: 'main',
});