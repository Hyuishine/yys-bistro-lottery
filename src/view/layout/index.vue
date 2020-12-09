<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2020-12-09 22:44:42
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2020-12-09 23:14:26
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <v-app id="inspire">
    <v-container fluid>
      <v-main>
        <v-flex>
          <v-layout flex
                    justify-space-between
                    row>
            <v-row align="center"
                   justify="center">
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </v-row>
          </v-layout>
        </v-flex>
      </v-main>
    </v-container>
  </v-app>
</template>