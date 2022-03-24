<template>
  <v-app >
     <v-app-bar app height="70">
     <v-row>
     <v-spacer></v-spacer>
     <v-img max-height="50" max-width="50" src="./assets/tel.png"></v-img>
    <div class="ma-2 transition-swing" >
      <span class="text-h3" :style="{color: 'blue'}" ><strong>Truephone</strong> </span>
    </div>
     <v-spacer></v-spacer>
     
   </v-row>
     
     </v-app-bar>
        <v-main>
           <router-view />
       </v-main>
 
 </v-app>
</template>

<script>

export default {
   name: "app",
};

</script>

