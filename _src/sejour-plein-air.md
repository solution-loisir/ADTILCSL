---
layout: sejour-layout
title: Séjour plein air
description: Le Séjour plein air a lieu à chaque année au mois d'octobre. c'est l'occasion pour les étudiants du cours l'Adulte le sport et le plein air de réaliser leurs projets.
date: 2019-07-10
tags: 
  - pages
  - sejourInformationGeneral
---
# Information générale
À chaque année au mois d'octobre, le Séjour plein air a lieu au [Camp Bruchési](https://www.campbruchesi.ca/ "Site web du Camp Bruchési") situé à Saint-Hippolyte dans les laurentides. c'est l'occasion pour les étudiants du cours l'Adulte le sport et le plein air de réaliser leurs projets.

Le Séjour c'est aussi un événement qui mets en relation étudiants, enseignants, collaborateurs et diplômés dans un environnement naturel d'une grande beauté et dans un contexte favorisant les interactions d'une grande richesse.

Le Séjour plein air est d'abord et avant tout une célébration du loisir pour tous ceux qui ont la chance d'y participer!

{% picture 
input = '/images/sejour-plein-air.jpg',
alt = 'Photo de groupe au Séjour plein air 2019',
lazy = true
%}

## Pour se rendre
Le Camp Bruchési est situé au : [50 365e avenue, Saint-Hippolyte (Québec) J8A 2Y6](https://www.google.com/maps/place/50+365e+Av,+Saint-Hippolyte,+QC+J8A+2Y6/@45.9458259,-73.9916273,17z/data=!3m1!4b1!4m5!3m4!1s0x4ccf3578d3e72bc5:0x342a8f8990b22bed!8m2!3d45.9458259!4d-73.9894386 "Page Google Maps pour cette adresse").
## Consultez la météo
Vous voudrez probablement [consulter la météo](https://www.accuweather.com/fr/ca/saint-hippolyte/j8a/hourly-weather-forecast/56156 "Météo pour Saint-Hippolyte sur AccuWeather") avant de vous rendre au séjour. Ne serait-ce que pour savoir quel type de vêtement apporter ou choisir l'épaisseur de votre sac de couchage (la literie n'est pas fourni).
## Quoi apporter

<div id="what-to-bring-todo-list" v-scope v-effect="save()">
<form @submit.prevent @click="keepInputFocused" v-scope="CreateTodoForm()"></form>
<br>
<button @click="removeTodoStorage">Réinitialiser la liste par défault</button>

<ul role="list" v-cloak>
<li v-show="!filteredTodos(item => !item.isChecked).length && todos.length"><p>Vous êtes prêts!</p></li>
<li v-show="!todos.length"><p>Il n'y a aucun item.</p></li>
<li v-for="todo in filteredTodos(item => !item.isChecked)" :key="todo.uid">
<span v-scope="TodoItem()"></span>
<button @click="removeTodo(todo)" title="Supprimer" class="todo-remove-btn">❌</button>
</li>
</ul>

<hr v-show="filteredTodos(item => item.isChecked).length">

<ul role="list" v-cloak>
<li v-for="todo in filteredTodos(item => item.isChecked)" :key="todo.uid">
<span v-scope="TodoItem()"></span>
</li>
</ul>
</div>

<template id="create-todo-form">
<input 
type="text" 
v-model="todoName" 
@keyup.enter="submitTodoWithEnterKey" 
placeholder="Inscrivez un nouvel item"  
/>
<button @click="createNewTodo">Nouvel item</button>
</template>

<template id="todo-item">
<input 
type="checkbox" 
:id="todo.uid" 
@change="todo.isChecked = !todo.isChecked" 
name="todoListItem" 
:checked="todo.isChecked"
/>
<label :for="todo.uid" :class="{'line-through': todo.isChecked}">${ todo.name }</label>
</template>