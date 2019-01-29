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

      <h1>Ingreso</h1>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>

      <v-text-field v-model="search" append-icon="search"
        label="Search" single-line hide-details autofocus>
      </v-text-field>

      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Crear Ingreso</v-btn>
        <v-card>
          <v-card-title >
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs10 sm10 md10>
                  <v-autocomplete
                    :items="productos"
                    item-text="nombre_productos"
                    item-value="idproductos"
                    v-model="editedItem.nombre_productos"
                    label="Producto"
                    hint="Ingresa la Producto"
                  ></v-autocomplete>

                </v-flex>
                <v-flex xs10 sm10 md10>
                  <v-autocomplete
                    :items="casas"
                    item-text="nombrecasa"
                    item-value="idcasa"
                    v-model="editedItem.nombrecasa"
                    label="Casa"
                    hint="Ingresa la Casa"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs10 sm10 md10>
                  <v-autocomplete
                    :items="proveedores"
                    item-text="nombreprov"
                    item-value="idproveedor"
                    v-model="editedItem.nombreprov"
                    label="Proveedor"
                    hint="Ingresa el Proveedor"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs10 sm10 md10>
                  <v-select
                      v-model="editedItem.Politica"
                      :items="polits"
                      item-text="pol"
                      item-value="num"
                      label="Politica"
                      persistent-hint
                      single-line>
                  </v-select>
                </v-flex>
                <v-flex xs11 sm5>
                  <v-dialog
                    ref="dialog"
                    v-model="modal2"
                    :return-value.sync="date"
                    persistent
                    lazy
                    full-width
                    width="290px">
                    <v-text-field
                      slot="activator"
                      v-model="date"
                      label="Vencimiento"
                      prepend-icon="event"
                      readonly>
                    </v-text-field>
                    <v-date-picker v-model="date" type="month" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
                <v-flex xs10 sm10 md10>
                  <v-text-field
                  v-model="editedItem.Lote" hint="Ingresa el Lote"
                  label="Lote"  :counter="40">
                  </v-text-field>
                </v-flex>
                <v-flex xs10 sm10 md10>
                  <v-select
                      v-model="editedItem.Estado"
                      :items="estado"
                      item-text="state"
                      item-value="estado"
                      label="Estado"
                      persistent-hint
                      single-line>
                  </v-select>
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
      :items="ingreso"
      :search="search"
      class="elevation-1"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
    >

      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.Id }}</td>
        <td class="text-xs-left">{{ props.item.nombre_productos }}</td>
        <td class="text-xs-left">{{ props.item.nombrecasa }}</td>
        <td class="text-xs-left">{{ props.item.nombreprov }}</td>
        <td class="text-xs-left">{{ props.item.Politica }}</td>
        <td class="text-xs-left">{{ props.item.Caducidad }}</td>
        <td class="text-xs-left">{{ props.item.Lote }}</td>
        <td class="text-xs-left">{{ props.item.Estado }}</td>
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
        <v-btn color="primary" @click="getAllIngresos">Reset</v-btn>
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
      polits: [
          { pol: 'No Devolucion', num: '-1' },
          { pol: 'En el Mes', num: '0' },
          { pol: '1', num: '1' },
          { pol: '2', num: '2' },
          { pol: '3', num: '3' },
          { pol: '4', num: '4' },
          { pol: '5', num: '5' }
        ],
      estado: [
        {state: 'Activo', estado: '0'},
        {state: 'Inactivo', estado: '1'}
      ],
      date: new Date().toISOString().substr(0, 7),
      modal2: false,
      rules: {required: value => !!value || 'Requerido.',
              min: v => v.length <= 40 || 'Caracteres maximo es de 40'
             },
      ingreso: [],
      productos: [],
      casas: [],
      proveedores: [],
      prod:'',
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
                {text: 'Id', value: 'Id', width: "20%"},
                {text: 'Productos', align: 'left', value: 'nombre_productos'},
                {text: 'Casa', align: 'left', value: 'nombrecasa'},
                {text: 'Proveedor', align: 'left', value: 'nombreprov'},
                {text: 'Politica', align: 'left', value: 'Politica'},
                {text: 'Caducidad', align: 'left', value: 'Caducidad'},
                {text: 'Lote', align: 'left', value: 'Lote'},
                {text: 'Estado', align: 'left', value: 'Estado'},
                {text: 'Actions', value: 'name', sortable: false, width: "20%"}
              ],
      editedIndex: -1,
      editedItem: {
                  Id: null,
                  nombre_productos: '',
                  nombrecasa: '',
                  nombreprov: '',
                  Politica: '',
                  Caducidad: '',
                  Lote: '',
                  Estado: ''
                  },
      defaultItem: {
                    Id: null,
                    nombre_productos: '',
                    nombrecasa: '',
                    nombreprov: '',
                    Politica: '',
                    Caducidad: '',
                    Lote: '',
                    Estado: ''
                   }
                 }),//end data

    computed:{
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
      let casasDB = JSON.parse(localStorage.getItem('Ingresos'));
      if(casasDB === null){
        this.casas = [];
      }else{
        this.casas = casasDB;
      }*/
    //  console.log(JSON.stringify(ap));
    console.log(this.$store.state.ingreso);
      this.getAllIngresos(),
      this.getAllProductos(),
      this.getAllCasas(),
      this.getAllProveedores()
    },//end created



    methods: {

      getAllIngresos: function(){
              		axios.get("http://localhost:3000/ingresos/")
                  .then(response => (
                  this.ingreso = response.data,
                  localStorage.setItem('Ingresos', JSON.stringify(this.ingreso))
                  ));
              		},

      getAllProductos: function(){
              		axios.get("http://localhost:3000/productos/")
                  .then(response => (this.productos = response.data))
                  .catch(e => {
              //    this.msg = 'Sin coneccion al servidor'
              //    this.color = 'error'
              //    this.snackbar = true
            });
              		},
      getAllCasas: function(){
              		axios.get("http://localhost:3000/casas/")
                  .then(response => (
                  this.casas = response.data,
                  localStorage.setItem('Casas', JSON.stringify(this.casas))
                  ));
              		},

      getAllProveedores: function(){
              		axios.get("http://localhost:3000/proveedores/")
                  .then(response => (
                  this.proveedores = response.data,
                  localStorage.setItem('Proveedores', JSON.stringify(this.proveedores))
                  ));
              		},

      searchIngreso: function(){
              		axios.get("http://localhost:3000/ingresos/"+this.search)
                  .then(response => (this.ingreso = response.data,
                  localStorage.setItem('Ingresos', JSON.stringify(this.ingreso)),
                  this.search = ''
                  ));
              		},

      editItem (item) {

              this.editedIndex = this.ingreso.indexOf(item)

                //item.nombre_productos = 11
                this.editedItem = Object.assign({}, item)
                this.dialog = true
              },


      deleteItem (item) {
        const index = this.ingreso.indexOf(item)
        var opcion = confirm('Eliminar este Ingreso? '+ item.nombre_productos)
        if(opcion){

                axios.delete("http://localhost:3000/ingresos/" + item.Id)
                .then(response => {
                  if(response.data.success == 'true')
                  { this.ingreso.splice(index, 1)
                    this.msg = item.nombre_productos + ' ' + response.data.data.msg
                    this.modal = true
                  }else{
                    this.msg = item.nombre_productos + ' ' + response.data.data.msg
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
      //  if(this.editedItem.idproducto.length > 0 && this.editedItem.idproducto.length <= 40){
        this.editedItem.Caducidad = this.date+"-01";
        console.log(JSON.stringify(this.editedItem));
        if (this.editedIndex > -1) {
          axios.put("http://localhost:3000/ingresos/" + this.editedItem.Id,this.editedItem )
         .then(response =>
         {
           if(response.data.success)
         {
           this.msg = this.editedItem.nombre_productos + ' ' + response.data.msg
           Object.assign(this.ingreso[this.editedIndex], this.editedItem)
           this.modal = true
         }

          })
        .catch(e => {})


        } else {
          axios.post("http://localhost:3000/ingresos", this.editedItem )
         .then(response =>
         {
           if(response.data.success)
          {
            this.editedItem.Id = response.data.data.insertId
            this.msg = this.editedItem.nombre_productos + ' ' + response.data.msg
            this.ingreso.push(this.editedItem)
            this.modal = true
          }
          })
        .catch(e => {})

        }
        this.close()
    //  }
    }//end save
   }//end methods
  }
</script>
