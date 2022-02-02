<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col justify="center" align="center">
        <v-card flat tile class="card">
          <v-row>
            <v-col align="start">
              <span class="title">Sobre nós</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
              <span class="subtitle">De Brasília, nascida e criada.</span>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col>
              <v-img
                :src="require('../assets/imagemSobre/sobre.jpeg')"
                class="imgSobre"
              />
            </v-col>
            <v-col align="end">
              <p>
                A Bloco surgiu a partir da vontade de externalizar o amor por
                Brasília, trazendo elementos inspirados no típico cotidiano
                brasiliense, com sua arquitetura inesperada e sua natureza
                particular, que tanto nos encantam.
              </p>
            </v-col>
          </v-row>
          <v-row align="center" style="flex-wrap: wrap-reverse !important;">
            <v-col align="start">
              <p>
                Quando pensamos em Brasília, vêm à nossa cabeça diversos
                elementos marcantes. Contudo, dentre todos eles, um dos que mais
                bem retratam o típico cotidiano brasiliense são os blocos das
                nossas quadras, únicos da capital. E foi deles que surgimos.
              </p>
            </v-col>
            <v-col>
              <v-img
                :src="require('../assets/imagemSobre/ana.jpeg')"
                class="imgSobre"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.card {
  max-width: 1200px;
  background-color: rgba(255, 255, 255, 0.507);
  padding: 1rem;
  margin: 1rem 0;
  color: #000;
}

.title {
  text-align: center;
  font-size: 1.5rem !important;
  font-weight: 300;
  border-left: 9px solid #000;
  color: #000;
  padding: 0 12px;
  margin: 0 0.5rem;
}

.subtitle {
  text-align: center;
  font-size: 1.4rem;
  font-weight: 300;
  color: #000;
  padding: 0 12px;
  margin: 0 0.5rem;
  padding: 0.5rem;
}

p {
  text-indent: 1rem;
  text-align: left;
  font-size: 1.3rem;
  font-weight: 300;
  padding: 0 0.5rem;
  min-width: 240px;
  color: #000 !important;
  /* background: rgba(255, 255, 255, 0.281); */
}
.imgSobre {
  max-width: 500px;
  box-shadow: 7px 4px 4px rgba(0, 0, 0, 0.274);
}
</style>
