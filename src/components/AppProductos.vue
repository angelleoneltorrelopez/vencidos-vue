<template>
  <div>
    <v-app >
      <v-container grid-list-xl text-xs-center>
    <v-layout row justify-center>

      <v-snackbar
      v-model="snackbar"
      :color="color"
      top right
      :timeout="timeout"
      multi-line
    >
    <b>  {{ msg }}</b>
      <v-btn dark flat  @click="snackbar = false"
      >
    <b>  Close</b>
      </v-btn>
    </v-snackbar>

      <h1>Productos</h1>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
        autofocus
      ></v-text-field>

      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Crear Producto</v-btn>
        <v-card >
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs10 sm10 md10>
                  <v-text-field v-model="editedItem.nombre_productos"
                  hint="Ingresa el nombre del Producto"
                  label="Nombre"
                  :rules="[rules.required, rules.min]"
                  :counter="40"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-flex xs12 sm6 md4>
            <v-btn color="red" dark @click="close">Cancelar
            <v-icon dark right>cancel</v-icon>
            </v-btn>
            </v-flex>
            <v-flex xs12 sm6 md4>
            <v-btn color="primary" dark @click="save">Guardar
            <v-icon dark right>check_circle</v-icon>
            </v-btn>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-data-table
      :headers="headers"
      :items="productos"
      :search="search"
      class="elevation-1"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
    >
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.idproductos }}</td>
        <td class="text-xs-left">{{ props.item.nombre_productos }}</td>
        <td class="justify-center layout px-0">
          <v-icon small
            class="mr-2"
            @click="editItem(props.item)"
          > edit </v-icon>
          <v-icon   small
            @click="deleteItem(props.item)"
          > delete </v-icon>
        </td>
      </template>

      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>

      <template slot="no-data">
        <v-btn color="primary" @click="getAllProductos">Reset</v-btn>
      </template>
    </v-data-table>
    </v-container>
  </v-app>
  </div>
</template>

<script>

import axios from 'axios'
  export default {
    name: 'App',
    data: () => ({
      snackbar: false,
      color: '',
      timeout: 6000,
      rules: {required: value => !!value || 'Requerido.',
              min: v => v.length <= 40 || 'Caracteres maximo es de 40'
             },
      productos: [],
      rowsPerPageItems: [5, 10, 15, 20],
      pagination: {
          ascending: true,
          rowsPerPage: 10,
          sortBy: "nombre_productos"
      },
      dialog: false,
      modal: false,
      msg: "",
      search: '',
      headers: [
        { text: 'Id', value: 'idproductos', width: "20%" },
        {text: 'Producto', align: 'left',
        //  sortable: false, desactivar el orden por la columna
          value: 'nombre_productos',
        width: "60%"},
        { text: 'Actions', value: 'name', sortable: false , width: "20%"}
      ],
      editedIndex: -1,
      editedItem: {
        idproductos: null,
        nombre_productos: '',
      },
      defaultItem: {
        idproductos: null,
        nombre_productos: '',
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Crear' : 'Editar'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      modal (val) {
        val || this.close()
      }
    },

    created () {/*
      let productosDB = JSON.parse(localStorage.getItem('Productos'));
      if(productosDB === null){
        this.productos = [];
      }else{
        this.productos = productosDB;
      }*/
      this.getAllProductos()
    },

    methods: {

      getAllProductos: function(){
  		axios.get("http://localhost:3000/productos/")
      .then(response => (this.productos = response.data))
      .catch(e => {
      this.msg = 'Sin coneccion al servidor'
      this.color = 'error'
      this.snackbar = true});
  		},

      searchProductos: function(){
  		axios.get("http://localhost:3000/productos/"+this.search)
      .then(response => (this.productos = response.data,
        localStorage.setItem('Productos', JSON.stringify(this.productos)),
        this.search = ''
      ));

  		},

      editItem (item) {
        this.editedIndex = this.productos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.productos.indexOf(item)
      //  console.log(item.idproductos)
        var opcion = confirm('Eliminar este Producto? '+ item.nombre_productos)
        if(opcion){

        axios.delete("http://localhost:3000/productos/" + item.idproductos)
        .then(response => {
          if(response.data.success == 'true')
          {
            this.productos.splice(index, 1)
            this.msg = item.nombre_productos + ' ' + response.data.data.msg
            this.color = 'success'
            this.snackbar = true
          }else{
            this.msg = item.nombre_productos + ' ' + response.data.data.msg
            this.color = 'error'
            this.snackbar = true
          }
      })
      .catch(e => {
      this.msg = 'Sin coneccion al servidor'
      this.color = 'error'
      this.snackbar = true})
    }
      },

      close () {
        this.dialog = false
        this.modal = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        this.editedItem.nombre_productos = this.editedItem.nombre_productos.toUpperCase();
        if(this.editedItem.nombre_productos.length > 0 && this.editedItem.nombre_productos.length <= 40){
        if (this.editedIndex > -1) {
          axios.put("http://localhost:3000/productos/" + this.editedItem.idproductos,this.editedItem )
         .then(response =>
         {
           if(response.data.success)
         {
           this.msg = this.editedItem.nombre_productos + ' ' + response.data.msg
           Object.assign(this.productos[this.editedIndex], this.editedItem)
           this.color = 'success'
           this.snackbar = true
         }

          })
        .catch(e => {this.msg = 'Sin coneccion al servidor'
        this.color = 'error'
        this.snackbar = true})


        } else {
          axios.post("http://localhost:3000/productos", this.editedItem )
         .then(response =>
         {
           if(response.data.success)
          {
            this.editedItem.idproductos = response.data.data.insertId
            this.msg = this.editedItem.nombre_productos + ' ' + response.data.msg
            this.productos.push(this.editedItem)
            this.color = 'success'
            this.snackbar = true
          }
          else{
            this.color = 'error'
            this.snackbar = true
          }
          })
        .catch(e => {
        this.msg = 'Sin coneccion al servidor'
        this.color = 'error'
        this.snackbar = true})

        }
        this.close()
      }
      }//end save
    },

  }
</script>
