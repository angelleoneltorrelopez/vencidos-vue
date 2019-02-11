<template>
  <div>
    <v-app>
      <v-container grid-list-xl text-xs-center>
    <v-layout row justify-center>

      <v-dialog v-model="modal" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Confirmacion</v-card-title>
        <v-card-text> {{msg}} </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="modal = false">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

      <h1>Proveedores</h1>
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
      >
      </v-text-field>

      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Crear Proveedor</v-btn>
        <v-card >
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs10 sm10 md10>
                  <v-text-field v-model="editedItem.nombreprov" hint="Ingresa el nombre del Proveedor"
                    label="Nombre" :rules="[rules.required, rules.min]" :counter="40"
                    ></v-text-field>
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
      :items="proveedores"
      :search="search"
      class="elevation-1"
      :rows-per-page-items="rowsPerPageItems"
    :pagination.sync="pagination"
    >

      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.idproveedor }}</td>
        <td class="text-xs-left">{{ props.item.nombreprov }}</td>
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
        La busqueda de "{{ search }}" no obtuvo resultados.
      </v-alert>

      <template slot="no-data">
        <v-btn color="primary" @click="getAllProveedores">Reset</v-btn>
      </template>
    </v-data-table>
    </v-container>
  </v-app>
  </div>
</template>

<script>

import axios from 'axios'
import VueAxios from 'vue-axios'
  export default {
    name: 'App',
    data: () => ({
      rules: {required: value => !!value || 'Requerido.',
              min: v => v.length <= 40 || 'Caracteres maximo es de 40'
             },
      proveedores: [],
      rowsPerPageItems: [5, 10, 15, 20],
      pagination: {
                  ascending: true,
                  rowsPerPage: 10,
                  sortBy: "nombreprov"
                  },
      dialog: false,
      modal: false,
      msg: "",
      search: '',
      headers: [
                {text: 'Id', value: 'idproveedor', width: "20%" },
                {text: 'Proveedor', align: 'left',
                //sortable: false, desactivar el orden por la columna
                 value: 'nombreprov',  width: "60%"},
                {text: 'Actions', value: 'name', sortable: false , width: "20%"}
              ],
      editedIndex: -1,
      editedItem: {
                  idproveedor: null,
                  nombreprov: '',
                  },
      defaultItem: {
                    idproveedor: null,
                    nombreprov: '',
                   }
                 }),//end data

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Crear' : 'Editar'
      }
    },//end computed

    watch: {
      dialog (val) {
        val || this.close()
      },
      modal (val) {
        val || this.close()
      }
    },//end watch

    created () {/*
      let casasDB = JSON.parse(localStorage.getItem('Casas'));
      if(casasDB === null){
        this.proveedores = [];
      }else{
        this.proveedores = casasDB;
      }*/
      this.getAllProveedores()
    },//end created

    methods: {

      getAllProveedores: function(){
                  axios.get("http://localhost:3000/proveedores/")
                  .then(response => (this.proveedores = response.data,
                  localStorage.setItem('Proveedores', JSON.stringify(this.proveedores))
                ))
                .catch(e => {
                this.proveedores = JSON.parse( localStorage.getItem('Proveedores'))})
              },

      searchProveedores: function(){
              		axios.get("http://localhost:3000/proveedores/"+this.search)
                  .then(response => (this.proveedores = response.data,
                  localStorage.setItem('Proveedores', JSON.stringify(this.proveedores)),
                  this.search = ''
                  ));
              		},

      editItem (item) {
                this.editedIndex = this.proveedores.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
              },

      deleteItem (item) {
        const index = this.proveedores.indexOf(item)
        var opcion = confirm('Eliminar esta Proveedor? '+ item.nombreprov)
        if(opcion){
                this.proveedores.splice(index, 1)
                axios.delete("http://localhost:3000/proveedores/" + item.idproveedor)
                .then(response => {
                  if(response.data.success == 'true')
                  {
                    this.msg = item.nombreprov + ' ' + response.data.data.msg
                    this.modal = true
                  }else{
                    this.msg = item.nombreprov + ' ' + response.data.data.msg
                    this.modal = true
                  }
              });
            }//ebd if
          },//end deleteItem

      close () {
            this.dialog = false
            this.modal = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
      },//end close

      save () {
        this.editedItem.nombreprov = this.editedItem.nombreprov.toUpperCase();
        if(this.editedItem.nombreprov.length > 0 && this.editedItem.nombreprov.length <= 40){
        if (this.editedIndex > -1) {
          axios.put("http://localhost:3000/proveedores/" + this.editedItem.idproveedor,this.editedItem )
         .then(response =>
         {
           if(response.data.success)
         {
           this.msg = this.editedItem.nombreprov + ' ' + response.data.msg
           Object.assign(this.proveedores[this.editedIndex], this.editedItem)
           this.modal = true
         }

          })
        .catch(e => {})


        } else {
          axios.post("http://localhost:3000/proveedores", this.editedItem )
         .then(response =>
         {
           if(response.data.success)
          {
            this.editedItem.idproveedor = response.data.data.insertId
            this.msg = this.editedItem.nombreprov + ' ' + response.data.msg
            this.proveedores.push(this.editedItem)
            this.modal = true
          }
          })
        .catch(e => {})

        }
        this.close()
      }
    }//end save
   }//end methods
  }
</script>
